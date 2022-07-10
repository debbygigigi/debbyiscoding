---
title: '從零開始架自己的部落格 - 為什麼選 Next.js'
excerpt: '講到架自己的部落格，第一步就是思考要用什麼工具跟框架，這邊分享一下自己為什麼最後選用 Next.js 吧'
coverImage:
  url: '/assets/blog/why-choose-nextjs/cover.jpeg'
  unsplashAuthor: 'Dayne Topkin'
  unsplashAuthorLink: 'https://unsplash.com/@dtopkin1?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
date: '2022-07-10T13:35:07.322Z'
author:
  name: Debby Ji
  picture: ''
ogImage:
  url: '/assets/blog/why-choose-nextjs/cover.jpeg'
---

<img src="/assets/blog/why-choose-nextjs/cover.jpeg">
Photo by <a href="https://unsplash.com/@dtopkin1?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Dayne Topkin</a> on <a href="https://unsplash.com/s/photos/start?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

講到架自己的部落格，第一步就是思考要用什麼工具跟框架，這邊分享一下自己為什麼最後選用 Next.js 吧：

## 為什麼不用 gatsbyjs 或 hexo 這種也很多人使用的自架部落格方式呢

這兩種我以前都有曾經用過，他們很方便的地方是整個 blog 框架都已經寫好了，文章要放哪都有規劃好，只要把寫好的文章放到他們規定的位置，再透過 github 部署或是其他部署服務，部落格就誕生了。

這些對於只想專注於寫部落格或是想快速搭建部落格的人很方便，但就會少了一些彈性，如果我想要一些客製化就會比較難調整，而且我希望可以自己動手搭建所有我的網站需要的東西。

記得當初有參考 Dan Abramov 大神的[部落格](https://overreacted.io/) 使用的框架 [gatsby-starter-blog](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog)，如果有打算使用 gatsby 架部落格可以參考。

## 既然都要自己動手搭建了，怎麼不用 Creat React App 呢

一般來說，如果我們要開啟一個 React 專案，會使用 [Creat React App](https://create-react-app.dev/docs/getting-started) 建新專案，但差別在於 Create React App 建立的專案是 client side render，也就是網頁上所有資料跟畫面都是透過前端打 API 取得，如果爬蟲沒有支援打 API 取得資源，那就會得到空白的網頁，進一步影響 SEO。

Create React App 建立的專案難道就不能做到 Server side render 嗎？可以，但就要自己建立一個 node server 跟處理畫面 render。（關於這部分實作有找到一篇不錯的文章：[React SSR | 從零開始實作 SSR — 基礎篇](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc)）

不過有更簡單的方式，那就是直接用 Next.js。Next.js 支援 [Server side render](https://nextjs.org/docs/basic-features/data-fetching/overview) ，讓 React Server side render 變得簡單許多。

## 有考慮過最新的 Remix 嗎

第一次注意到 [Remix](https://remix.run/) 是因為 React 社群最活躍的 [Kent C. Dodds](https://kentcdodds.com/) 加入他們的團隊，且他的網站也全部 [用 Remix 重寫](https://kentcdodds.com/blog/how-i-built-a-modern-website-in-2021)。

Remix 可以說是 React 生態中最新的搭建網站工具吧，主打更快更好的開發者體驗 DX，會被拿來比較應該是 Remix 也有支援 SSR，查了一些比較文章都認為 Remix 還太新了，可以做為 side project，Next.js 還是比較穩定，且使用者跟社群都眾多。

雖然我的網站也算是 side project，但還是希望先把 Next.js 摸透再嘗試其他的工具。

## 開始 Next.js 專案

直接跟著官網用 create-next-app 指令建立

```bash
npx create-next-app@latest --typescript
```

如果有喜歡的 [example](https://nextjs.org/examples) 可以加上 `--example` 直接把 example 載下來。

例如這裡有一個 blog 的 example [blog-starter-typescript](https://github.com/vercel/next.js/tree/canary/examples/blog-starter-typescript) 可以用這個指令載下來

```
npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next.js/tree/canary/examples/blog-starter-typescript"
```

建立好專案後，第一步就完成了。
