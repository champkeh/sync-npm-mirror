export default {
    "*": ["prettier --write --ignore-unknown --no-editorconfig"],
    "*.{ts,cts,mts}": [() => "tsc -p tsconfig.json --noEmit"],
    "*.{js,cjs,mjs,ts,cts,mts}": ["eslint --fix"],
}
