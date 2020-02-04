import { Test, TestingModule } from '@nestjs/testing';
import { HasuraService } from './hasura.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/common';

describe('HasuraService', () => {
  let service: HasuraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HasuraService],
      imports: [ConfigModule.forRoot(), HttpModule],
    }).compile();

    service = module.get<HasuraService>(HasuraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch data', async () => {
    const data = await service.query(
      `query  {
        users {
          userid
          passwordSalt
          passwordHash
          refreshToken
          role
          lastLoginAt
          createdAt
        }
      }
      
    `,
    );

    expect(data).toEqual(expect.anything);
  });
});
