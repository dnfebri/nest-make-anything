# Work with database

In NestJS Boilerplate uses [TypeORM](https://www.npmjs.com/package/typeorm) and [MySQL](https://www.mysql.com//) for working with database, and all examples will for [MySQL](https://www.mysql.com//), but you can use any database.

---

## Table of Contents

- [Work with database](#work-with-database)
  - [Table of Contents](#table-of-contents)
  - [Working with database schema](#working-with-database-schema)
    - [Generate migration](#generate-migration)
    - [Run migration](#run-migration)
    - [Revert migration](#revert-migration)
    - [Drop all tables in database](#drop-all-tables-in-database)
  - [Seeding](#seeding)
    - [Creating seeds](#creating-seeds)
    - [Run seed](#run-seed)

---

## Working with database schema

### Generate migration

1. Create entity file with extension `.entity.ts`. For example `post.entity.ts`:

    ```ts
    // /src/.../entities/post.entity.ts

    import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
    import { EntityHelper } from 'src/utils/entity-helper';

    @Entity()
    export class Post extends EntityHelper {
      @PrimaryGeneratedColumn()
      id: number;

      @Column()
      title: string;

      @Column()
      body: string;

      // Here any fields what you need
    }
    ```

1. Next, generate migration file:

    ```bash
    yarn migration:generate -- src/database/migrations/CreatePostTable
    ```

1. Apply this migration to database via [yarn migration:run](#run-migration).

### Run migration

```bash
yarn migration:run
```

### Revert migration

```bash
yarn migration:revert
```

### Drop all tables in database

```bash
yarn schema:drop
```

---

## Seeding

### Creating seeds

1. Create seed file with `yarn seed:create -- --name=Post`. Where `Post` is name of entity.
1. Go to `src/database/seeds/post/post-seed.service.ts`.
1. In `run` method extend your logic.
1. Run [yarn seed:run](#run-seed)

### Run seed

```bash
yarn seed:run
```

---

Previous: [Installing and Running](installing-and-running.md)
