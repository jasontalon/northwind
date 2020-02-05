import { Injectable } from '@nestjs/common';
import { HasuraService } from '../hasura/hasura.service';
import IUser from '../models/user';
import * as moment from 'moment';

@Injectable()
export class UsersService {
  constructor(private readonly hasuraService: HasuraService) {}
  async find(userid: string): Promise<IUser> {
    const { users } = await this.hasuraService.query(
      `{ users(where: {userid: {_eq: "${userid}"}}) { userid passwordSalt passwordHash refreshToken role lastLoginAt createdAt } }`,
    );

    if (users?.length ?? 0 > 0) return <IUser>users[0];
    return null;
  }
  async findAll(): Promise<IUser[]> {
    const { users } = await this.hasuraService.query(
      `query { users { userid passwordSalt passwordHash refreshToken role lastLoginAt createdAt } }`,
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

  async updateSignIn(userid: string, refreshToken: string) {
    const query = `mutation { update_users(where: {userid: {_eq: "${userid}"}}, _set: {refreshToken: "${refreshToken}", lastLoginAt: "${moment
      .utc()
      .format()}"}) { affected_rows } }`;

    await this.hasuraService.query(query);
  }
}
