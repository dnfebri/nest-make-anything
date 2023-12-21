# Entity

How we crate entity

---

## Table of Contents

- [Entity](#entity)
  - [Table of Contents](#table-of-contents)
  - [Audit trail](#audit-trail)
  - [Deleted Trail](#deleted-trail)

---

## Audit trail

If your entity need `createdAt` and `updatedAt` you can assign `AuditTrail` Column. That will automatically add createdAt and updatedAt on your entity

Example:

```ts
// /src/users/entities/user.entity.ts

import { Exclude } from 'class-transformer';

@Entity()
export class User extends EntityHelper {
  // Some code here...

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;

  // Some code here...
}

```

## Deleted Trail

What if you want add soft delete on your entity. You just add `DeletedTrail` Column.

Example

```ts
// /src/users/entities/user.entity.ts

import { Exclude } from 'class-transformer';

@Entity()
export class User extends EntityHelper {
  // Some code here...

  @Column(() => DeletedTrail, { prefix: false })
  deleted_trail: DeletedTrail;

  // Some code here...
}
```

Set prefix to `false` it consist for naming. not `auditTrailcreated_at` but `created_at` only

---

Previous: [Database](database.md)

Next: [Serialization](serialization.md)
