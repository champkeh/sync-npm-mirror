import { cac } from 'cac'
import {syncNpmMirrorPackage} from './index'
const pkg = require('../package.json')

const cli = cac('sync-npm-mirror')

cli.command('[...packageNames]', 'sync packages in npm mirror(taobao)')
    .option('--timeout <timeout>', 'timeout in seconds for each package', {
        default: 30
    })
    .action((pkgNames, options) => {
        if (pkgNames.length === 0) {
            throw new Error('sync-npm-mirror require at least one pkg name as argument')
        }

        syncNpmMirrorPackage(pkgNames, options.timeout)
    })


cli.help()
cli.version(pkg.version)

cli.parse()
