import { cac } from 'cac'
import {syncNpmMirrorPackage} from './index'
import pkg from '../package.json'

const cli = cac('sync-npm-mirror')

cli.command('[...packageNames]', 'sync packages in npm mirror')
    .option('--timeout <timeout>', 'timeout in seconds', {
        default: 20
    })
    .action((pkgNames, options) => {
        syncNpmMirrorPackage(pkgNames, options.timeout)
    })


cli.help()
cli.version(pkg.version)

cli.parse()
