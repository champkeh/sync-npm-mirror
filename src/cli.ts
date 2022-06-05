import { cac } from "cac"
import { Pkg, CliOption } from "../types"
import { syncNpmMirrorPackage } from "./index"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg: Pkg = require("../package.json") as Pkg

const cli = cac("sync-npm-mirror")

cli
  .command("[...packageNames]", "sync packages in npm mirror(taobao)")
  .option("--timeout <timeout>", "timeout in seconds for each package", {
    default: 30,
  })
  .action(async (pkgNames: string[], options: CliOption) => {
    if (pkgNames.length === 0) {
      throw new Error(
        "sync-npm-mirror require at least one pkg name as argument",
      )
    }

    await syncNpmMirrorPackage(pkgNames, options.timeout)
  })

cli.help()
cli.version(pkg.version)

cli.parse()
