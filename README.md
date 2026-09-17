# to-do-list-react-app

This repo contains a React + Vite front-end web app that serves as a personal to-do list application.

## Architecture

The app consists of the following components, each running in Docker containers:

- **React + Vite front-end** — The personal to-do list web app UI
- **Node.js + Express backend microservice** — API layer that the front-end communicates with
- **PostgreSQL database** — Persistent storage managed by the backend service

The front-end talks to the Node.js/Express backend, which in turn communicates with the PostgreSQL database instance. All services are containerized using Docker.
---

**Jives** will be helping to create this React web app.
