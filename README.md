# fastify-sample
WebAPIサーバーとして利用することを想定したfastifyのテンプレートです。

# セットアップ
## 依存関係のインストール

```bash
npm install
```

## .envの作成
`.env.example`をコピーして`.env`ファイルを作成してください。

```bash
$ cp .env.example .env
```

## Mysqlの起動
Dockerを使ってDBを起動します。
```bash
$ cd docker
$ docker-compose up -d
```

# サーバーの起動
typescript のコンパイルを fastify の起動をします。  
起動中はソースコードを修正したら即座に反映されます。
```angular2html
npm run dev
```

## 動作確認
次のエンドポイントでレスポンスが返ります。
 - GET localhost:3000 

localhost:3000/users、 localhost:3000/item の  
GET、POST、PUT、DELETE も用意しています。  
DB に migrate 、insert したのちにレスポンスを返すことが可能になります。  
DB migrate に関しては `/migrations/README.md` を参照してください。

上記以外はステータスコード 500 が返ります。

## ファイルストラクチャ

src ディレクトリ配下を実装すれば良いようになってます。

```
src
├── controllers # リクエストとレスポンスを処理します。実際のロジックはなるべくservicesに任せること。
├── helpers # 複数箇所で使い回すような、シンプルな便利関数を記述します。
├── interfaces # typescriptの型定義を記述します。
├── middlewares # ミドルウェアを記述します。
├── models # DBに関するモデルを記述します。
├── routes # ルーティングを記述します。
└── services # ビジネスロジックを記述します。
```


## logger の使い方
ログはfastifyが提供しているものを採用しています。  
controllers など req と res がある場合。

```ts
async login(req: FastifyRequest, res: FastifyReply) {
    req.log.info("info msg");
    res.log.debug("debug msg");
}
```

req と res がない場合。

```ts
import { fastify } from "../app";

fastify.log.info("info msg");
fastify.log.debug("debug msg");
```
# ユニットテスト
ユニットテストフレームワークは jest を採用しています。
 - https://jestjs.io/ja/  
`\tests` フォルダに `hoge.test.ts` のようなファイルを作成してください。
   
テストの実行
```
npm test
```
## fastify-swagger

```bash
npm i @fastify/swagger
npm i -D @sinclair/typebox
```
