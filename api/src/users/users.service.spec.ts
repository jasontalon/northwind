import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { HasuraService } from '../hasura/hasura.service';
import IUser from '../models/user';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, HasuraService],
      imports: [ConfigModule.forRoot(), HttpModule],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find users', async () => {
    const users = await service.findAll();

    expect(users).toEqual(expect.anything());
    debugger;
  });
});
