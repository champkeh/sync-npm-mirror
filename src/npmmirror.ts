import { type Ora } from "ora"
import http from "./http"
import { sleep } from "./utils"

interface NpmMirrorSyncStatus {
  ok: boolean
  logId: string
}

interface NpmMirrorCheckSyncStatusResponse {
  ok: boolean
  syncDone: boolean
  logUrl: string
}

/**
 * 请求同步淘宝镜像上的`pkgName`包
 * @param spinner
 * @param pkgName 包名
 */
export function sync(spinner: Ora, pkgName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    spinner.start(`Start sync package: ${pkgName}`)
    http
      .put(
        `https://registry-direct.npmmirror.com/${pkgName}/sync?sync_upstream=true`,
      )
      .then((resp) => {
        if (resp.status === 201) {
          try {
            const status = JSON.parse(
              resp.data as string,
            ) as NpmMirrorSyncStatus
            if (status.ok) {
              resolve(status.logId)
            } else {
              reject(new Error("failed"))
            }
          } catch (e) {
            reject(e)
          }
        } else {
          reject(new Error(resp.statusText))
        }
      })
      .catch(reject)
  })
}

/**
 * 检查同步结果
 * @param spinner
 * @param pkg 包名
 * @param logId 对应的logId
 * @param MAXCOUNT 最大请求数 (每秒一次)
 * @param count 当前请求数，不要传次参数
 */
export function checkSyncStatus(
  spinner: Ora,
  pkg: string,
  logId: string,
  MAXCOUNT: number,
  count = 1,
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    spinner.text = `${count}/${MAXCOUNT} check sync status for ${pkg} (${logId})`
    http
      .get(`https://registry-direct.npmmirror.com/express/sync/log/${logId}`)
      .then(async (resp) => {
        if (resp.status === 200) {
          try {
            const result = JSON.parse(
              resp.data as string,
            ) as NpmMirrorCheckSyncStatusResponse
            if (result.ok && result.syncDone) {
              return getVersion(result.logUrl, pkg).then((v) => resolve(v))
            } else {
              if (count < MAXCOUNT) {
                await sleep(1000).then(() => {
                  resolve(
                    checkSyncStatus(spinner, pkg, logId, MAXCOUNT, count + 1),
                  )
                })
              } else {
                reject(new Error("timeout"))
                setTimeout(() => {
                  console.log(`${pkg} logUrl is ${result.logUrl}`)
                })
              }
            }
          } catch (e) {
            reject(e)
          }
        } else {
          reject(new Error("request failed"))
        }
      })
      .catch(reject)
  })
}

/**
 * 根据logUrl获取同步的版本
 * @param logUrl
 * @param pkg
 */
function getVersion(logUrl: string, pkg: string): Promise<string> {
  return new Promise((resolve) => {
    http
      .get(logUrl)
      .then(async (resp) => {
        if (resp.status === 200) {
          const matched = (resp.data as string).match(
            /"version":"(?<version>\d+\.\d+\.\d+)"/,
          )
          if (matched && matched.groups && matched.groups.version)
            resolve(matched.groups.version)
        }
        await getVersionLatest(pkg).then(resolve)
      })
      .catch(() => {
        resolve("unknown")
      })
  })
}

interface PkgResponse {
  "dist-tags": {
    latest: string
  }
}

/**
 * 获取 npmmirror 上的最新版本
 * @param pkg
 */
function getVersionLatest(pkg: string): Promise<string> {
  return new Promise((resolve) => {
    http
      .get(`https://registry.npmmirror.com/${pkg}`)
      .then((resp) => {
        if (resp.status === 200) {
          const version = (JSON.parse(resp.data as string) as PkgResponse)[
            "dist-tags"
          ]["latest"]
          resolve(version)
        }
        resolve("unknown")
      })
      .catch(() => {
        resolve("unknown")
      })
  })
}
