import ora from 'ora'
import {sync, checkSyncStatus} from './npmmirror'

/**
 * 创建一个同步任务
 * @param pkg 包名
 * @param timeout 超时时间，单位：秒
 */
function createSyncTask(pkg: string, timeout: number) {
    const spinner = ora()
    return sync(spinner, pkg).then(logId => {
        return checkSyncStatus(spinner, pkg, logId, timeout)
    }).then(() => {
        spinner.succeed(`Sync success (${pkg})`)
    }).catch(e => {
        spinner.fail(`Sync failed (${pkg}): ${e.message}`)
        throw e
    })
}

/**
 * 同步 npmmirror.com 上的npm包
 * @param pkgName 包名
 * @param timeout 超时时间，单位秒，默认:30
 */
export function syncNpmMirrorPackage(pkgName: string | string[], timeout: number = 30) {
    if (!Array.isArray(pkgName)) {
        pkgName = [pkgName]
    }

    console.log('Begin sync packages for', pkgName)

    let success = 0
    let fail = 0
    let taskQueue = Promise.resolve()

    pkgName.forEach(pkg => {
        taskQueue = taskQueue.then(() => {
            return createSyncTask(pkg, timeout).then(() => {
                success++
            }).catch(() => {
                fail++
            })
        })
    })

    taskQueue.then(() => {
        console.log(`\n===================\nSuccess: ${success}\nFail: ${fail}\n`)
    })
}
