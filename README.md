
# Angular Transactions

<div align="center">
  <img src="https://img.shields.io/badge/Angular-19-red?logo=angular" />
  <img src="https://img.shields.io/badge/Docker-blue?logo=docker" />
  <img src="https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-blue?logo=githubactions" />
</div>

> A simple finance‑transactions web app – Angular 19 front‑end, Express + TypeScript back‑end, fully containerised and delivered with DevSecOps best practices.


---

## Overview

This repository contain a single‑page application for displaying finance transactions.

* **Front‑end :** Angular 19 + SCSS
* **Back‑end :** Node.js 20, Express, TypeScript
* **Dev & Ops :** Docker, GitHub Actions, SonarCloud, Snyk, GitHub Pages, Render.com


## Prerequisites

| Tool           | Recommended version         |
| -------------- | --------------------------- |
| Node.js        | 20.x                        |
| npm            | 10.x (bundled with Node 20) |
| Docker         | ≥ 24                        |
| Docker Compose | v2                          |

## Running locally

```bash
# clone the repo
git clone https://github.com/samsam-ahmadi/angular-transactions.git
cd angular-transactions

# Front‑end
npm ci --prefix Frontend
npm run start --prefix Frontend     # http://localhost:4200

# Back‑end
npm ci --prefix Backend
npm run start:mac/windows  --prefix Backend        # http://localhost:8080/api
```


## Docker/Docker‑Compose

```bash
# one‑off build
docker compose up --build 


# URLS:
# http://127.0.0.1:8090/                  =>    Frontend
# http://127.0.0.1:8080/api/transactions  =>    Backend
```


## Tests & code quality

| Tool                  | Purpose                              |
| --------------------- | ------------------------------------ |
| **Karma + Jasmine**   | Angular unit tests (Chrome Headless) |
| **ESLint + Prettier** | Linting / formatting                 |
| **SonarCloud**        | SAST + coverage gate                 |
| **Snyk Open Source**  | Dependency vulnerability scan        |

```bash
# Front‑end tests
npm run test --cwd Frontend
```

## CI / CD pipeline

> The full DevSecOps flow lives in **GitHub Actions** with two dedicated workflows.

1. **`security-scans.yml`** – SonarCloud + Snyk. Required to pass before merge.
2. **`ci.yml`** – Lint, tests, build Docker images, deploy.



## Free hosting setup

| Layer     | Service                     | Details                                     |
| --------- | --------------------------- | ------------------------------------------- |
| Front‑end | **GitHub**            | Published from `Frontend/dist/frontend/browser` via Actions |
| Back‑end  | **Render.com** | Using Github actions         |

URLs:

```text
FE  = https://samsam-ahmadi.github.io/angular-transactions/
API = https://angular-transactions.onrender.com/api
```

# Assignment Rabobank

Rabobank’s software is mainly used to get insights on customer transactions. Within this assignment there is some backend software created to spin up a NodeJS service which serves a transactions file. Create an Angular application where a user can see their transactions in in list (timeline).

The requirements are:
- All transactions should be shown 
- All transactions should be showed grouped based on date and ordered (newest on top)
- The information in the timeline should only show `otherParty.name` and the `amount` in EUR. (Be aware there is some USD as well, need to convert it based on the rate)
- When clicking on a transaction you should navigate to a detail page showing the more in-depth details
- It would be nice if there is some sort of styling (scss)

In addition to the code, consider other matters that you consider as part of your work.

## Thats it, happy 💻!