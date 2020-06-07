import { DefaultCrudRepository } from '@loopback/repository';
import { Role } from '../models';
import { LocalMysqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.id
  > {
  constructor(
    @inject('datasources.localMysql') dataSource: LocalMysqlDataSource,
  ) {
    super(Role, dataSource);
  }
}
