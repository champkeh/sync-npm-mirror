/**
 * @type {import('@commitlint/types').UserConfig}
 */
const Configuration = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "feat", // 增加新功能
                "refactor", // 代码重构
                "fix", // 修复bug
                "docs", // 文档相关
                "test", // 测试相关
                "style", // 代码格式相关
                "chore", // 杂项
                "revert", // 回滚
            ],
        ],
        // <type> 格式 小写
        "type-case": [2, "always", "lower-case"],
        // <type> 不能为空
        "type-empty": [2, "never"],
    },
}

// https://commitlint.js.org/#/reference-configuration
module.exports = Configuration
