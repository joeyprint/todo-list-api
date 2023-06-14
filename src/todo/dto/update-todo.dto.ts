import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsString } from 'class-validator';

import { TODO_LIST_TYPE } from '../entities/todo.entity';

import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsString()
  title?: string;

  @IsEnum(TODO_LIST_TYPE)
  type?: TODO_LIST_TYPE;
}
