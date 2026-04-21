# Task & User Management App

React + TypeScript で作成した、業務向けのユーザー管理・タスク管理アプリです。

---

## 対応可能な業務
・React / TypeScriptでの既存画面の修正  
・フォーム追加 / バリデーション実装  
・API連携（axios）  
・軽微なUI改善  

---

## 想定案件
・既存サービスのフロントエンド改修  
・バグ修正対応  
・小規模な機能追加  

---

## デモ
https://task-user-management-app.vercel.app/dashboard

※実際に操作可能です  
※初回アクセス時はAPI起動に少し時間がかかります

---

## 概要
一覧表示、検索、絞り込み、CRUD、モーダルフォーム、削除確認、ダッシュボード集計など、実務でよくある管理画面の機能を意識して作成しています。

---

## 主な機能

### ダッシュボード
- 総ユーザー数 / 有効ユーザー数 / タスク数の表示
- 未完了 / 期限超過タスクの集計

### ユーザー管理
- 一覧表示 / 検索 / 絞り込み
- 新規作成 / 編集 / 削除
- タスク保持ユーザーの削除ガード

### タスク管理
- 一覧表示 / 検索 / 絞り込み
- 新規作成 / 編集 / 削除

### 画面状態
- ローディング / エラー / 0件表示 / 再読み込み

---

## 使用技術
- React
- TypeScript
- Vite
- axios
- react-hook-form
- react-router-dom
- json-server
- dayjs

---

## 設計
- Container / Presentation 分離
- API処理を services 層に分離
- mock API（json-server）を利用

---

## 補足
本アプリはフロントエンドの実装力を示すポートフォリオとして作成しています。  
mock API を利用しており、本番APIへの差し替えを想定した構成です。