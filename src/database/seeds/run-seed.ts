import { NestFactory } from '@nestjs/core';
import { PaymentSeedService } from './payment/payment-seed.service';
import { AdminSeedService } from './admin/admin-seed.service';
import { SeedModule } from './seed.module';
import { NotificationTemplateUserSeedService } from './notification-template/notification-template-user-seed.service';
import { CategorySeedService } from './category/category-seed.service';
import { SubCategorySeedService } from './sub-category/sub-category-seed.service';
import { SubSubCategorySeedService } from './sub-sub-category/sub-sub-category-seed.service';
import { ProductSeedService } from './product/product-seed.service';
import { UserSeedService } from './user/user-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(UserSeedService).run();

  await app.get(AdminSeedService).run();

  await app.get(CategorySeedService).run();
  await app.get(SubCategorySeedService).run();
  await app.get(SubSubCategorySeedService).run();
  await app.get(ProductSeedService).run();
  // await app.get(ProductVariantSeedService).run();

  await app.get(NotificationTemplateUserSeedService).run();

  await app.get(PaymentSeedService).run();
  // await app.get(AddressSeedService).run();
  // await app.get(OrderSeedService).run();

  await app.close();
};

void runSeed();
