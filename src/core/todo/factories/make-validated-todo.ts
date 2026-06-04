import { sanitizeStr } from '@/utils/sanitize-str';
import { validateTodoDescription } from '../schemas/validate-todo-description';
import { makeNewTodo } from './make-new-todo';
import { Todo } from '../schemas/todo.contract';
//import { TodoPresenter } from '../schemas/todo.contract';

export type InvalidTodo = {
    sucsses: false;
    error: string[]
}

export type ValidaTodo = {
    sucsses: true;
    data: Todo
}

type makeValidatedTodo = ValidaTodo | InvalidTodo

export function makeValidatedTodo(description: string): makeValidatedTodo {
  const cleanDescription = sanitizeStr(description);
  const validatedDescription = validateTodoDescription(cleanDescription);

  if (validatedDescription.success) {
    return {
      sucsses: true,
      todo: makeNewTodo(cleanDescription),
    };
  }

  return {
    sucsses: false,
    error: validatedDescription.errors,
  };
}
