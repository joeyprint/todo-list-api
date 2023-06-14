import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export enum TODO_LIST_TYPE {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
}
export interface TodoEntity extends InMemoryDBEntity {
  id: string;
  title: string;
  type: TODO_LIST_TYPE;
  createdAt: string;
  updatedAt: string;
}
