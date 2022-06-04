import {sync, checkSyncStatus} from './npmmirror'

/**
 * 同步 npmmirror.com 上的npm包
 * @param pkgName 包名
 * @param timeout 超时，单位秒
 */
export function syncNpmMirrorPackage(pkgName: string, timeout: number = 10) {
    return sync(pkgName).then(logId => {
        return checkSyncStatus(logId, timeout)
    })
}
