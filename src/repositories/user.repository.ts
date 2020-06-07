import { DefaultCrudRepository } from '@loopback/repository';
import { User } from '../models';
import { LocalMysqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
  > {
  constructor(
    @inject('datasources.localMysql') dataSource: LocalMysqlDataSource,
  ) {
    super(User, dataSource);
  }
}
