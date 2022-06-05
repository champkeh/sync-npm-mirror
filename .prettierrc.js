// https://prettier.io/docs/en/options.html
module.exports = {
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    semi: false,
    singleQuote: false,
    quoteProps: "consistent",
    jsxSingleQuote: false,
    trailingComma: "all",
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: "always",
    requirePragma: false,
    insertPragma: false,
    proseWrap: "preserve",
    htmlWhitespaceSensitivity: "css",
    vueIndentScriptAndStyle: false,
    endOfLine: "lf",
    embeddedLanguageFormatting: "auto",
    overrides: [
        {
            files: [
                ".commitlintrc.js",
                ".eslintrc.js",
                ".lintstagedrc.mjs",
                ".prettierrc.js",
                ".stylelintrc.js",
                "tsconfig.json",
                "vite.config.ts",
            ],
            options: {
                tabWidth: 4,
                quoteProps: "as-needed",
            },
        },
    ],
}
