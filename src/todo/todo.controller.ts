import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { randomUUID } from 'crypto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: InMemoryDBService<TodoEntity>) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): TodoEntity {
    const createdAt = new Date().toISOString();

    const mappedTodo = {
      id: randomUUID(),
      title: createTodoDto.title,
      createdAt,
      updatedAt: createdAt,
    };

    return this.todoService.create(mappedTodo);
  }

  @Get()
  findAll(): Array<TodoEntity> {
    return this.todoService.getAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.todoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
  //   return this.todoService.update(+id, updateTodoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.todoService.remove(+id);
  // }
}
