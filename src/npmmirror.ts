import http from "./http";
import {sleep} from "./utils";

interface NpmMirrorSyncStatus {
    ok: boolean
    logId?: string
}

interface NpmMirrorCheckSyncStatusResponse {
    ok: boolean
    syncDone: boolean
}

/**
 * 请求同步淘宝镜像上的`pkgName`包
 * @param pkgName 包名
 */
export function sync(pkgName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        http.put(`https://registry-direct.npmmirror.com/${pkgName}/sync?sync_upstream=true`).then(resp => {
            if (resp.status === 201) {
                try {
                    const status = JSON.parse(resp.data) as NpmMirrorSyncStatus
                    if (status.ok) {
                        resolve(status.logId)
                    } else {
                        reject(new Error('failed'))
                    }
                } catch (e) {
                    reject(e)
                }
            } else {
                reject(new Error(resp.statusText))
            }
        })
    })
}

/**
 * 检查同步结果
 * @param logId
 * @param MAXCOUNT 最大请求数，默认10次(每秒一次)
 * @param count 当前请求数，不要传次参数
 */
export function checkSyncStatus(logId: string, MAXCOUNT: number = 10, count: number = 1): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        console.log('check sync status for logId:', logId)
        http.get(`https://registry-direct.npmmirror.com/express/sync/log/${logId}`).then(resp => {
            if (resp.status === 200) {
                try {
                    const result = JSON.parse(resp.data) as NpmMirrorCheckSyncStatusResponse
                    if (result.ok && result.syncDone) {
                        resolve(true)
                    } else {
                        if (count < MAXCOUNT) {
                            sleep(1000).then(() => {
                                resolve(checkSyncStatus(logId, MAXCOUNT, count + 1))
                            })
                        } else {
                            reject(new Error('timeout'))
                        }
                    }
                } catch (e) {
                    reject(e)
                }
            } else {
                reject(new Error('request failed'))
            }
        })
    })
}
