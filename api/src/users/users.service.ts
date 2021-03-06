import { Injectable } from '@nestjs/common';
import { HasuraService } from '../hasura/hasura.service';
import IUser from '../models/user';
import * as moment from 'moment';

@Injectable()
export class UsersService {
  constructor(private readonly hasuraService: HasuraService) {}
  async find(userId: string): Promise<IUser> {
    const { users } = await this.hasuraService.query(
      `{ users(where: {userId: {_eq: "${userId}"}}) { userId passwordSalt passwordHash role lastLoginAt created_at } }`,
    );

    if (users?.length ?? 0 > 0) return <IUser>users[0];
    return null;
  }
  async findAll(): Promise<IUser[]> {
    const { users } = await this.hasuraService.query(
      `query { users { userId passwordSalt passwordHash role lastLoginAt created_at } }`,
    );

    return users;
  }
  async create(user: IUser) {
    const query = `mutation insert_user($user: users_insert_input!) { insert_users(objects: [$user]) { affected_rows } }`,
      variables = {
        user,
      };

    await this.hasuraService.query(query, variables);
  }

  async updateSignIn(userId: string, refreshToken: string) {
    const query = `mutation insert_user_tokens($user: user_tokens_insert_input!) {
      insert_user_tokens(objects: [$user]) {
        affected_rows
      }
    }
    `;

    await this.hasuraService.query(query, {
      user: {
        userId,
        refreshToken,
        expiresAt: moment
          .utc()
          .add(1, 'month')
          .format(),
      },
    });
  }

  async getUserByRefreshToken(refreshToken: string) {
    const query = `query  {
      users(where: {
        user_tokens: 
          {refreshToken: {_eq: "${refreshToken}"}, expiresAt: {_gt: "${moment
      .utc()
      .format()}"}}}) {
        userId passwordSalt passwordHash role lastLoginAt created_at 
      }
    }`;

    const { users } = await this.hasuraService.query(query);
    if (users?.length ?? 0 > 0) return <IUser>users[0];
    return null;
  }

  async expireRefreshToken(refreshToken: string) {
    const query = `mutation {
      update_user_tokens(where: {refreshToken: {_eq: "${refreshToken}"}}, 
      _set: {expiresAt: "${moment.utc().format()}"}) {
        affected_rows
      }
    }`;

    await this.hasuraService.query(query);
  }
}
