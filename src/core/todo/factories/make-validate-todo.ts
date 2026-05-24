import { sanitizeStr } from '@/utils/sanitize-str';
import { validateTodoDescription } from '../schemas/validate-todo-description';
import { makeNewTodo } from './make-new-todo';
import { Todo } from '../schemas/todo.contract';
//import { TodoPresenter } from '../schemas/todo.contract';

type InvalidTodo = {
    sucsses: false;
    error: string[]
}

type ValidaTodo = {
    sucsses: true;
    data: Todo
}

type makeValidatedTodo = ValidaTodo | InvalidTodo

export function makeValidatedTodo(description: string): makeValidatedTodo {
  const cleanDescription = sanitizeStr(description);
  const validatedDescription = validateTodoDescription(cleanDescription);

  if (validatedDescription.success) {
    return {
      success: true,
      todo: makeNewTodo(cleanDescription),
    };
  }

  return {
    success: false,
    errors: validatedDescription.errors,
  };
}
