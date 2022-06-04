import { cac } from 'cac'
import {syncNpmMirrorPackage} from './index'
import {resolveTargetPackage} from "./utils";
const pkg = require('../package.json')

const cli = cac('sync-npm-mirror')

cli.command('[...packageNames]', 'sync packages in npm mirror')
    .option('--timeout <timeout>', 'timeout in seconds', {
        default: 30
    })
    .action((pkgNames, options) => {
        if (pkgNames.length === 0) {
            const pkg = resolveTargetPackage(__dirname)
            pkgNames.push(pkg)
        }
        syncNpmMirrorPackage(pkgNames, options.timeout)
    })


cli.help()
cli.version(pkg.version)

cli.parse()
