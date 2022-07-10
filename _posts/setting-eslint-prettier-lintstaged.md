---
title: 'Build blog with me #2 - 設定 eslint + prettier + lint-staged'
excerpt: ''
coverImage:
  url: '/assets/blog/setting-eslint-prettier-lintstaged/cover.jpeg'
  unsplashAuthor: 'Matt Duncan'
  unsplashAuthorLink: 'https://unsplash.com/@foxxmd'
date: '2022-07-10T16:49:07.322Z'
author:
  name: Debby Ji
  picture: ''
ogImage:
  url: '/assets/blog/setting-eslint-prettier-lintstaged/cover.jpeg'
---

一個新的專案剛建立起來時，下一步我就會設定 eslint 跟 prettier，我認為在專案前期就要設定好，如果到後面才加上去就會很麻煩。

雖然目前這個專案只有我一個人在開發，但我還是希望我的整個專案能夠符合一般常見的的規範，可以風格一致。

## eslint

因為這次是用 Nextjs 開發，Nextjs 內建就有 eslint 相關的文件，我們就一起跟著 [官方文件](https://nextjs.org/docs/basic-features/eslint) 來實作。

```bash
yarn lint

# You'll see a prompt like this:
#
# ? How would you like to configure ESLint?
#
# ❯   Base configuration + Core Web Vitals rule-set (recommended)
#     Base configuration
#     None
```

官方有內建指令，第一次使用會跳出 config 設定，我選擇 **Strict**，他會建立一個 `.eslintrc.json` 如下，並且背後幫我們下載 `eslint` 和 `eslint-config-next` 作為 dependency。

```json
{
  "extends": "next/core-web-vitals"
}
```

`eslint-config-next` 這個是 Nextjs 自家自己的 [eslint 規則](https://nextjs.org/docs/basic-features/eslint#eslint-plugin)，裡面很多都是跟 Nextjs 自己的用法有關，像是他希望我們網站內部的連結不要用 a tag，而是他們提供的 Link 元件，如果我們使用了就會有下方圖片的提示：

![a tag error](/assets/blog/setting-eslint-prettier-lintstaged/a-tag-error.png)

裝完之後在想，還要不要裝其他的 plugin 呢？
發現官方文件有寫，`eslint-config-next` 其實已經內建好幾個常見的 plugin 了（[Source code](https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/index.js)），像是 `plugin:react/recommended`、`plugin:react-hooks/recommended`、`plugin:@next/next/recommended` ，還有一些 babel 跟 parser 的設定都幫我們處理好了！
除非要加上額外的 plugin 或是有些規則不想要，不然就用現有的設定就好了。

## Prettier

`Prettier` 是用來規範程式碼的排版，讓程式碼看起來比較整齊，像是用 tab 還是 space、用單引號還是雙引號等等，下面是我的設定檔 `.prettierrc`

```
{
	"semi": true,
	"singleQuote": true,
	"tabWidth": 2,
	"useTabs": false,
	"printWidth": 120
}
```

為了避免 `eslint` 跟 `prettier` 的衝突，需要另外安裝 `eslint-config-prettier`

```bash
npm install --save-dev eslint-config-prettier
# or
yarn add --dev eslint-config-prettier
```

`.eslintrc.json` 也要加上 `prettier`

```json
{
  "extends": ["next/core-web-vitals", "prettier"]
}
```

那我個人習慣在儲存檔案時就順便排版，所以 vscode 的 `setting.json` 要再加上這段

```
"editor.formatOnSave": true
```

就可以在按下存擋時自動排版了。

## lint-staged + husky

雖然目前我們有 eslint 幫我們檢查檔案有沒有符合規範，但我們很難無時無刻都跑 eslint，而且如果有人推 code 時忘記下 eslint 檢查，就會把不符合規範的 code 推上去。

這時就有個工具出現了，就是 [lint-staged](https://github.com/okonet/lint-staged) ，他的用途是當我們 commit code 時，先幫我們跑 eslint，如果有 code 不符合規範就會被擋下來不讓你 commit。

先下載

```
npm install --save-dev lint-staged
```

我們還需要 git hook 的工具，來幫我們偵測 git commit 時要做什麼事情，用的是 [husky](https://github.com/typicode/husky)，有幾種安裝的方式

```bash
npx husky-init && npm install # npm
npx husky-init && yarn # Yarn 1
yarn dlx husky-init --yarn2 && yarn # Yarn 2+
pnpm dlx husky-init && pnpm install # pnpm
```

啟動 git hook 的環境，會發現跟目錄多了 `.husky` 資料夾

```javascript
yarn husky install
```

加上一個 hook 名稱是 `pre-commit`，後面放上我們希望他執行的指令，那這邊就是希望他執行 `lint-staged`

```
npx husky add .husky/pre-commit "npx lint-staged"
```

會發現 `.husky` 底下多了一個 `.pre-commit` 檔案

```
#!/usr/bin/env sh

. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

`lint-staged` 要做的事也要設定一下，有兩種設定方式

1. `package.json`

```
{
	"lint-staged": {
		"*.{ts,tsx,js}": [
			"next lint --fix"
		],
	},
}
```

2. `.lintstagedrc.js`

```
const path = require('path');

const buildEslintCommand = (filenames) =>
`next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;

module.exports = {
	'*.{js,jsx,ts,tsx}': [buildEslintCommand],
};
```

設定完之後，就可以 git commit 看看有沒有跑成功

可以在 `.husky/pre-commit` 檔案末端加上 `exit 1 # Commit will be aborted` ，就不怕真的 commit 了

如果程式碼不符合標準，在 terminal 會告訴我們錯誤訊息

![lint-staged example](/assets/blog/setting-eslint-prettier-lintstaged/lint-staged-example.png)

## Reference

- [Day19 - 寫出更有品質的程式碼，信 eslint 得永生 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10277227)
- https://typicode.github.io/husky/#/
