import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { EntityCondition } from 'src/types/entity-condition.type';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminsRepository: Repository<Admin>,
  ) {}

  async findOne(condition: EntityCondition<Admin>): Promise<Admin> {
    const admin = await this.adminsRepository.findOne({
      where: condition,
    });

    if (!admin) {
      throw new NotFoundException('Cant find admin');
    }
    return admin;
  }
}
