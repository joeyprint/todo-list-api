import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { TODO_LIST_TYPE } from '../entities/todo.entity';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(TODO_LIST_TYPE)
  type: TODO_LIST_TYPE;
}
