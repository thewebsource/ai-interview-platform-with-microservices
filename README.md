### Install pnpm
```bash 
npm install -g pnpm
```
Why use pnpm?
------------
- faster installs
- less disk usage
- best for monorepo

### Install TurboRepo
Turborepo is a high-performance build system for JavaScript and TypeScript codebases. It is designed for scaling monorepos and also makes workflows in single-package workspaces faster, too.
```bash 
pnpm add -g turbo
```

### Install TypeScript
```bash 
npm install -g typescript
```

### Install Git
Verify:
```bash 
git --version
```
### Install Docker
Verify:
```bash 
docker -v
docker compose version
```
### Initialize Monorepo
Create workspace file:
pnpm-workspace.yaml
```bash 
packages:
  - "apps/*"
  - "packages/*"
```
### Initialize package.json
```bash 
pnpm init
```
### Install TurboRepo
```bash 
pnpm add -D turbo typescript ts-node nodemon concurrently
```
### Create First Service
```bash 
mkdir apps/api-gateway
cd apps/api-gateway
pnpm init
```