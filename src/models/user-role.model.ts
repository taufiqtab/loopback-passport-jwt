import { Entity, model, property, belongsTo } from '@loopback/repository';
import { User } from './user.model';
import { Role } from './role.model';

@model()
export class UserRole extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => User)
  userId: number;

  @belongsTo(() => Role)
  roleId: number;

  constructor(data?: Partial<UserRole>) {
    super(data);
  }
}
