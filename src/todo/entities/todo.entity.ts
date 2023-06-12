import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface TodoEntity extends InMemoryDBEntity {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}
