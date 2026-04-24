# STIM - Stacktim Insights Monitor

Dashboard for monitoring and analyzing insights from Stacktim. (test)

## Setup

### Setup with docker

#### Install dependencies and start the development server on `http://localhost:3000`:

```bash

docker compose up

```

### Database

Start migration :

```bash

pnpm run migrate

```

Visualisation of the database with drizzle :

```bash

pnpm run studio

```

## Config VSCode

For auto save and linting, add the following settings to your VSCode configuration:

file path: `.vscode/settings.json`

```json
{
   "eslint.useFlatConfig": true,
   "editor.formatOnSave": true,
   "editor.defaultFormatter": "esbenp.prettier-vscode",
   "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
   },
   "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
   "eslint.format.enable": false,
   "prettier.requireConfig": true
}
```
