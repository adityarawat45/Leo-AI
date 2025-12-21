# Leo-AI

A Motia project created with the starter template.

## What is Motia?

Motia is an open-source, unified backend framework that eliminates runtime fragmentation by bringing **APIs, background jobs, queueing, streaming, state, workflows, AI agents, observability, scaling, and deployment** into one unified system using a single core primitive, the **Step**.

## Quick Start

```bash
# Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

This starts the Motia runtime and the **Workbench** - a powerful UI for developing and debugging your workflows. By default, it's available at [`http://localhost:3000`](http://localhost:3000).

```bash
# Test your first endpoint
curl http://localhost:3000/hello
```

## Step Types

Every Step has a `type` that defines how it triggers:

| Type | When it runs | Use case |
|------|--------------|----------|
| **`api`** | HTTP request | REST APIs, webhooks |
| **`event`** | Event emitted | Background jobs, workflows |
| **`cron`** | Schedule | Cleanup, reports, reminders |

## Development Commands

```bash
# Start Workbench and development server
npm run dev
# or
yarn dev
# or
pnpm dev

# Start production server (without hot reload)
npm run start
# or
yarn start
# or
pnpm start

# Generate TypeScript types from Step configs
npm run generate-types
# or
yarn generate-types
# or
pnpm generate-types

# Build project for deployment
npm run build
# or
yarn build
# or
pnpm build
```

## Project Structure

```
steps/              # Your Step definitions (or use src/)
motia.config.ts     # Motia configuration
```

Steps are auto-discovered from your `steps/` or `src/` directories - no manual registration required.

## Learn More

- [Documentation](https://motia.dev/docs) - Complete guides and API reference
- [Quick Start Guide](https://motia.dev/docs/getting-started/quick-start) - Detailed getting started tutorial
- [Core Concepts](https://motia.dev/docs/concepts/overview) - Learn about Steps and Motia architecture
- [Discord Community](https://discord.gg/motia) - Get help and connect with other developers



About LEO AI : LEO is an event-driven backend system that listens to GitHub events (issues, pull requests, merges, etc.), processes them through a structured workflow, optionally enriches them using AI, and posts clean, readable notifications to a Discord server.

Built using **Motia** as the workflow engine.

---

## ✨ What does it do?

- Listens to **GitHub webhooks**
- Handles events like:
  - Issue opened / closed / edited
  - Pull request opened / closed / merged(Soon)
- Normalizes and validates incoming webhook data
- Generates human-friendly messages (AI-assisted or deterministic)
- Sends real-time notifications to **Discord** via webhooks


## 🏗️ Architecture Overview


Please refer to the .env.example file to setup the env variables

--To setup your github repository. Please generate a webhook with the required permsissions. Ref : https://docs.github.com/en/webhooks/using-webhooks/creating-webhooks

--Generate a discord webhook as well. reference : https://docs.github.com/en/webhooks/using-webhooks/creating-webhooks