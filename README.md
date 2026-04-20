# STIM - Stacktim Insights Monitor

Dashboard for monitoring and analyzing insights from Stacktim. (test)

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

### Database

Start migration :

```bash

pnpm prisma migrate dev --name 'name of migration'

```

Visualisation of the database with drizzle :

```bash

pnpm prisma studio

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
