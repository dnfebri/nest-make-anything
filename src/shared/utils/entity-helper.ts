import { Exclude, Expose, instanceToPlain } from 'class-transformer';
import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class EntityHelper extends BaseEntity {
  __typename?: string;

  @AfterLoad()
  setEntityName() {
    this.__typename = this.constructor.name;
  }

  toJSON() {
    return instanceToPlain(this);
  }
}

export class AuditTrail {
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ nullable: true, default: 'System' })
  @Expose({ groups: ['admin'] })
  created_by: string;

  @UpdateDateColumn({
    nullable: true,
  })
  updated_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  @Expose({ groups: ['admin'] })
  updated_by: string;
}

export class DeletedTrail {
  @DeleteDateColumn({ nullable: true })
  @Expose({ groups: ['admin'] })
  deleted_at: Date;

  @Column({ nullable: true })
  @Expose({ groups: ['admin'] })
  deleted_by: string;
}

export class OTPEntity {
  @Column({ type: String, nullable: true })
  @Exclude({ toPlainOnly: true })
  otp_secret: string | null;

  @Column({ type: Number, nullable: true, default: 1 })
  @Exclude({ toPlainOnly: true })
  otp_counter: number | null;
}
