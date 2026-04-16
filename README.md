# STIM - Stacktim Insights Monitor

Dashboard for monitoring and analyzing insights from Stacktim.

## Setup

### Local Development

#### Install dependencies:

```bash

pnpm i

```

#### Start the development server on `http://localhost:3000`:

```bash

pnpm dev

```

## Setup with docker

### Database

Start migration :

```bash

npx drizzle-kit push

```

Visualisation of the database with drizzle :

```bash

npx drizzle-kit studio

```

Make sure to install dependencies:

```bash

# pnpm
docker compose up --build

```

### Development Server

Start the development server on `http://localhost:3000`:

```bash

docker compose up

```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

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
