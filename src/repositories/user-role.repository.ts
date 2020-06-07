import { DefaultCrudRepository } from '@loopback/repository';
import { UserRole } from '../models';
import { LocalMysqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class UserRoleRepository extends DefaultCrudRepository<
  UserRole,
  typeof UserRole.prototype.id
  > {
  constructor(
    @inject('datasources.localMysql') dataSource: LocalMysqlDataSource,
  ) {
    super(UserRole, dataSource);
  }
}
