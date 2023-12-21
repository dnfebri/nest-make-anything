# Installation

---

## Table of Contents

- [Installation](#installation)
  - [Table of Contents](#table-of-contents)
  - [Comfortable development](#comfortable-development)
  - [Quick run](#quick-run)
  - [Links](#links)

---

## Comfortable development

1. Clone repository

2. Go to folder, and copy `.env.example` as `.env`.

    ```bash
    cd my-app/
    cp .env.example .env
    ```

3. Change `DATABASE_HOST=mysql` to `DATABASE_HOST=localhost`

   Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

4. Install dependency

    ```bash
    yarn
    ```

5. Run migrations

    ```bash
    yarn migration:run
    ```

6. Run seeds

    ```bash
    yarn seed:run
    ```

7. Run app in dev mode

    ```bash
    yarn start:dev
    ```

8. Run additional container:

    ```bash
    docker compose up -d --build
    ```

9. Open <http://localhost:8000>

---

## Quick run

If you want quick run your app, you can use following commands:

1. Clone repository

2. Go to folder, and copy `.env.example` as `.env`.

    ```bash
    cd my-app/
    cp .env.example .env
    ```

3. Run containers

    ```bash
    docker compose up -d
    ```

4. For check status run

    ```bash
    docker compose logs
    ```

5. Open <http://localhost:8000>

---

## Links

- Swagger (API docs): <http://localhost:8000/docs>
- Maildev: <http://localhost:1080>

---

Next: [Working with database](database.md)
