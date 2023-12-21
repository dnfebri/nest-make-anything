import { EntityHelper } from 'src/shared/utils/entity-helper';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RewardCategory } from './reward-category.entity';

@Entity()
export class Reward extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'json', nullable: true })
  imgs: string[];

  @Column({ unique: true })
  slug: string;

  @Column({ unsigned: true })
  price: number;

  @Column({ type: 'text' })
  description: string;

  @Column({
    default: true,
  })
  is_active: boolean;

  @ManyToOne(() => RewardCategory, (RewardCategory) => RewardCategory.reward, {
    nullable: false,
  })
  category: RewardCategory;
}
