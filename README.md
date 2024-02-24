# external-site-ogp

## Description

This is a api server for fetching OGP data from external site.

## Usage

```sh
pnpm i
pnpm dev
```

```sh
❯ curl "http://localhost:8787/api/ogp?url=https://example.com"
{"title":"","description":"","image":"","siteName":""}
```

## Deploy

```sh
pnpm run deploy
```
