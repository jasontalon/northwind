import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HasuraService {
  private readonly url: string;
  private readonly secret: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.url = this.configService.get<string>('GQL_URL');
    this.secret = this.configService.get<string>('GQL_SECRET');
  }

  async query(query: string, variables: any = null) {
    const { data: { data = null, errors = null } = {} } = await (<any>(
      this.httpService
        .post(
          this.url,
          {
            query,
            variables,
          },
          {
            headers: {
              'x-hasura-admin-secret': this.secret,
            },
          },
        )
        .toPromise()
    ));
    if (errors) throw errors;
    return data;
  }
}
