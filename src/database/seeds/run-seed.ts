import { NestFactory } from '@nestjs/core';
import { AdminSeedService } from './admin/admin-seed.service';
import { SeedModule } from './seed.module';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(AdminSeedService).run();

  await app.close();
};

void runSeed();
