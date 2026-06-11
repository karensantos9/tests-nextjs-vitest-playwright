export type Todo = {
  id: string;
  description: string;
  createdAt: string;
};

export type InvalidTodo = {
    success: false;
    errors: string[]
}

export type ValidaTodo = {
    success: true;
    todo: Todo
}

export type TodoPresenter = ValidaTodo | InvalidTodo