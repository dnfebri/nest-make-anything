import { AuthAdminModule } from 'src/auth/auth-admin/auth-admin.module';
import { RewardCategoryModule } from './reward-category/reward-category.module';

export const AppPublicModule = [AuthAdminModule, RewardCategoryModule];
