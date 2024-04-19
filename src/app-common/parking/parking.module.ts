import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parking } from 'src/entities/parking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parking])],
  providers: [ParkingService],
  controllers: [ParkingController],
})
export class ParkingModule {}
