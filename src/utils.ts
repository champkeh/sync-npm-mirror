import path from "path"
import fs from "fs"
import { Pkg } from "../types"

export function sleep(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

export function resolveTargetPackage(directory: string): string {
  console.log(directory)
  const pkg = path.resolve(directory, "package.json")
  if (fs.existsSync(pkg)) {
    const content = fs.readFileSync(pkg, { encoding: "utf8" })
    return (JSON.parse(content) as Pkg).name
  } else {
    return resolveTargetPackage(path.dirname(directory))
  }
}
