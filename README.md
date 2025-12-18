# 架空の EC サイト制作（フロントエンド）

## はじめに

本 EC サイト制作は、ソフトバンク入社に向けて、学習した Nuxt と express を使って成果物を作る目的で行うものである。<br>
アプリケーションの細かな機能実装や入社までに完成させることに注力はせず、架空の EC サイト制作を通じて、あくまで Nuxt と express を使ったアプリケーション開発に慣れることを真の目的とする。

フロントエンドに Nuxt、バックエンドに express を利用する。<br>
前述の通り、Nuxt 開発に慣れることを目的とするため、デザインに拘らない。<br>
UI デザインは最低限の簡易的なものにしたり、UI コンポーネントライブラリなどを利用する。<br>

サイト構成や掲載コンテンツは下記ソフトバンクオンラインショップを参考にする<br>
https://www.softbank.jp/online-shop/

このリポジトリでは、Nuxt で開発したフロントエンド側のデータを管理する。

フロントエンド開発はまずサイト管理画面から作成することとする。<br>
管理画面開発後、EC サイトを構築していく流れ。

## 技術スタック

Nuxt4

## ルーティング

### 管理画面

- /admin/（TOP ページ）
- /admin/login（ログインページ）
- /admin/item（商品一覧ページ）
- /admin/item/:id（商品詳細ページ）
- /admin/item/update/:id（商品編集ページ）
- /admin/item/add（商品追加ページ）
- /admin/item/category/:cat（カテゴリー別商品一覧ページ）
- /admin/item/tag/:tag（タグ別商品一覧ページ）
- /admin/settings（各種設定ページ）

### EC サイト画面

- /（TOP ページ）
- /register（会員登録ページ）
- /login（ログインページ）
- /mypage（マイページ）
- /cart（カートページ）
- /purchase/:step（購入ページ）
- /item（全商品一覧ページ）
- /item/:id（商品詳細ページ）
- /item/category/:cat（カテゴリー別商品一覧ページ）
- /item/tag/:tag（タグ別商品一覧ページ）

## コンポーネント

### 共通

- ItemList.vue（商品リスト）
- ItemCard.vue（商品カード）

### 管理画面固有

- AdminHeader.vue（ヘッダー）
- AdminFooter.vue（フッター）
- AdminSideMenu.vue（サイドメニュー）

### EC サイト画面固有
