import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { randomUUID } from 'crypto';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TODO_LIST_TYPE, TodoEntity } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: InMemoryDBService<TodoEntity>) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): TodoEntity {
    const createdAt = new Date().toISOString();

    switch (createTodoDto?.type) {
      case TODO_LIST_TYPE.TODO:
      case TODO_LIST_TYPE.DOING:
      case TODO_LIST_TYPE.DONE:
        const mappedTodo = {
          id: randomUUID(),
          title: createTodoDto.title,
          type: createTodoDto?.type ?? TODO_LIST_TYPE.TODO,
          createdAt,
          updatedAt: createdAt,
        };

        return this.todoService.create(mappedTodo);
      default:
        throw new HttpException('Bad Requested', HttpStatus.BAD_REQUEST, {
          description: "Type doesn't match",
        });
    }
  }

  @Get()
  findAll(): Array<TodoEntity> {
    return this.todoService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): TodoEntity {
    return this.todoService.get(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): TodoEntity {
    const updatedAt = new Date().toISOString();
    const data = this.todoService.get(id);

    switch (updateTodoDto?.type) {
      case TODO_LIST_TYPE.TODO:
      case TODO_LIST_TYPE.DOING:
      case TODO_LIST_TYPE.DONE:
        const mappedTodo = {
          ...data,
          ...updateTodoDto,
          updatedAt,
        };

        this.todoService.update(mappedTodo);
        return mappedTodo;
      default:
        throw new HttpException('Bad Requested', HttpStatus.BAD_REQUEST, {
          description: "Type doesn't match",
        });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string): { id: string } {
    this.todoService.delete(id);

    return { id };
  }
}
