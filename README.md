# ticket-manager-api
ユーザー登録、ログイン、チケット作成・取得・更新、作成者本人のみ更新可能な認可まで実装.

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
- Bearer token 認証

### Ticket
- チケット作成
- チケット一覧取得
- チケット詳細取得
- チケット status 更新
- 作成者とチケットの関連付け
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

### Relation
- User has many Tickets
- Ticket belongs to one User
