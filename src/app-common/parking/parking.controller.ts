import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { NullableType } from 'src/types/nullable.type';
import { Parking } from 'src/entities/parking.entity';

@Controller({ path: 'parking', version: '1' })
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Get()
  async findAll() {
    return await this.parkingService.findAll();
  }

  @Post()
  async create() {
    return await this.parkingService.create();
  }

  @Get(':code')
  async findOne(
    @Param('code') code: string,
  ): Promise<NullableType<{ data: Parking; price: number }>> {
    return await this.parkingService.findOne(code);
  }

  @Put(':code')
  async updatePay(@Param('code') code: string): Promise<NullableType<Parking>> {
    return await this.parkingService.updatePay(code);
  }
}
