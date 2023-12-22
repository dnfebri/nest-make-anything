import { EntityHelper } from 'src/shared/utils/entity-helper';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reward } from './reward.entity';

@Entity()
export class RewardCategory extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Reward, (Reward) => Reward.category, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  reward: Reward[];
}
