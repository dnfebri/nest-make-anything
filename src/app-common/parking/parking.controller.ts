import { Controller, Get } from '@nestjs/common';
import { ParkingService } from './parking.service';

@Controller({ path: 'parking', version: '1' })
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Get()
  findAll() {
    return this.parkingService.findAll();
  }
}
