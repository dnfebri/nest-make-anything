import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Admin } from '../../entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ErrorException } from 'src/shared/exceptions/error.exception';
import { compare } from 'bcrypt';
import { make } from 'src/shared/utils/hash';
import { EntityCondition } from 'src/types/entity-condition.type';
import { IPaginationOptions } from 'src/types/pagination-options';
import { NullableType } from 'src/types/nullable.type';
import { getDeepDiff } from 'src/shared/utils/deep-diff.helper';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>,
    private datasource: DataSource,
  ) {}

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<Admin[]> {
    return await this.adminsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  async findOne(condition: EntityCondition<Admin>): Promise<Admin> {
    const admin = await this.adminsRepository.findOne({
      where: condition,
    });

    if (!admin) {
      throw new NotFoundException('Cant find admin');
    }
    return admin;
  }

  async fillterAdminByName(context: string): Promise<NullableType<Admin[]>> {
    try {
      const admin = await this.adminsRepository
        .createQueryBuilder('admin')
        .leftJoinAndSelect('admin.role', 'role')
        .where('admin.name like :name', { name: `%${context}%` })
        .getMany();
      if (!admin) throw new NotFoundException();
      return admin;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async create(data: CreateAdminDto): Promise<Admin> {
    const queryRunner = this.datasource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const res = await queryRunner.manager.save(
        queryRunner.manager.create(Admin, {
          ...data,
        }),
      );
      await queryRunner.commitTransaction();
      return res;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: string, payload: UpdateAdminDto): Promise<Admin> {
    const currentUser = await this.findOne({
      id,
    });

    if (!currentUser) {
      throw new ErrorException(
        {
          user: 'userNotFound',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (payload.password)
      if (payload.curent_password) {
        const isValidCurrentPassword = await compare(
          payload.curent_password,
          currentUser.password,
        );
        if (!isValidCurrentPassword) {
          throw new ErrorException(
            {
              currentPassword: 'incorrectCurrentPassword',
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        if (payload.curent_password === payload.password) {
          throw new ErrorException(
            {
              password: 'password not changed',
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
      } else {
        throw new ErrorException(
          {
            currentPassword: 'missingCurrentPassword',
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

    if (payload.email) {
      if (!payload.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        throw new ErrorException(
          {
            email: 'email format is not valid',
          },
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    }

    const queryRunner = this.datasource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const admin = await queryRunner.manager.findOneOrFail(Admin, {
      where: { id: id },
      lock: { mode: 'pessimistic_write' },
    });

    const deepDeef = getDeepDiff(
      { email: admin.email, name: admin.name },
      {
        email: payload.email,
        name: payload.name,
        role_id: payload.role_id,
      },
    );
    if (Object.values(deepDeef).length <= 0) {
      await queryRunner.rollbackTransaction();
      return admin;
    }

    try {
      delete payload.curent_password;
      delete payload.role_id;
      await queryRunner.manager.update(
        Admin,
        { id: admin.id },
        payload.password
          ? { password: make(payload.password) }
          : { ...payload },
      );
      await queryRunner.commitTransaction();
      return admin;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: string): Promise<void> {
    const queryRunner = this.datasource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(Admin, { id: id });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }
}
