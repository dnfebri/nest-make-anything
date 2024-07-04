import { ParkingType } from 'src/enums/parking.enum';
import { AuditTrail, EntityHelper } from 'src/shared/utils/entity-helper';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Parking extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  time_in: Date;

  @Column({ nullable: true })
  time_out: Date;

  @Column()
  price: number;

  @Column({ type: 'enum', enum: ParkingType, default: ParkingType.MOTORCYCLE })
  type: string;

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
