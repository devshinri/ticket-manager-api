# ticket-manager-api

認証付きのチケット管理 API です。  
ユーザー登録、ログイン、チケット作成・取得・更新、作成者本人のみ更新できる認可を実装しています。

## 技術スタック

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- JWT
- bcryptjs

## 主な機能

### User
- ユーザー登録
- ユーザー一覧取得

### Auth
- ログイン
- JWT 発行
- Bearer Token 認証

### Ticket
- チケット作成
- チケット一覧取得
- チケット詳細取得
- チケット status 更新
- User と Ticket の関連付け
- 作成者本人のみ更新可能

## データ構造

### User
- id
- email
- passwordHash
- createdAt

### Ticket
- id
- title
- content
- status
- createdAt
- updatedAt
- authorId

## リレーション

- User は複数の Ticket を持つ
- Ticket は 1 人の User に属する

## 認証・認可

- ログイン成功時に JWT を発行
- 認証が必要な API は Bearer Token を使用
- Ticket の更新は作成者本人のみ可能
