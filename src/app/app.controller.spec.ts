import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppModule } from './app.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('Get App Api', () => {
    expect(appController).toBeDefined();
  });

  it('Get App Api Info Web API', () => {
    expect(appController.getInfo()).toEqual({ name: 'Web API' });
  });
});
