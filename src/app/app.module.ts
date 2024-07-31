import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AppPublicModule } from 'src/app-public/module';
import { AppCommonModule } from 'src/app-common/module';
import { AppsLoadConfig } from 'src/shared/config/apps-load.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: AppsLoadConfig,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    ...AppPublicModule,
    ...AppCommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
