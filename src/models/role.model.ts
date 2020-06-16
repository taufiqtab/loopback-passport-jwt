import { Entity, model, property } from '@loopback/repository';

@model()
export class Role extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    id: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  constructor(data?: Partial<Role>) {
    super(data);
  }
}
