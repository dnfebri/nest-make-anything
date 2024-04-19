import { Injectable, NotFoundException } from '@nestjs/common';
import { Parking } from 'src/entities/parking.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NullableType } from 'src/types/nullable.type';
import { CalculatePriceParking } from 'src/shared/constants/calculate';

@Injectable()
export class ParkingService {
  constructor(
    @InjectRepository(Parking)
    private parkingRepository: Repository<Parking>,
  ) {}

  findAll(): Promise<Parking[]> {
    return Parking.find();
  }

  async create(): Promise<Parking> {
    const datePrefix = new Date().toISOString().slice(0, 10); // Format TTTT-MM-DD
    const randomString = (Math.random() + 1).toString(36).substring(7); // Random string angka dan huruf
    const code = `${datePrefix}-${randomString}`;
    return await this.parkingRepository.save(
      this.parkingRepository.create({
        code,
        time_in: new Date(),
        price: 0,
      }),
    );
  }

  async findOne(
    code: string,
  ): Promise<NullableType<{ data: Parking; price: number }>> {
    const parking = await this.parkingRepository.findOne({
      where: { code },
    });
    if (!parking) throw new NotFoundException('Code Parking Not Found');
    const price = CalculatePriceParking(parking.time_in, new Date());
    return { data: parking, price };
  }

  async updatePay(code: string): Promise<Parking> {
    const parking = await this.findOne(code);
    console.log(parking);
    if (!parking) throw new NotFoundException('Code Parking Not Found');
    const price = CalculatePriceParking(parking.data.time_in, new Date());
    parking.data.time_out = new Date();
    parking.data.price = price;
    return await this.parkingRepository.save(parking.data);
  }
}
