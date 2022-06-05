import { syncNpmMirrorPackage } from "../src"

syncNpmMirrorPackage(["axios", "express", "@jzinfo/utils"], 3).catch((e) => {
  console.log(e)
})
