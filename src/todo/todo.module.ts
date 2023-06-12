import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [InMemoryDBModule.forFeature('todo', {})],
})
export class TodoModule {}
