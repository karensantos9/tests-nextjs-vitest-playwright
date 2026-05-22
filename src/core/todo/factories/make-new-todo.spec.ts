import { makeNewTodo } from './make-new-todo';
describe('makeNewTodo (unit)', () => {
  test('Should return a new valid todo', () => {
    // AAA -> Arrange, Act, Assert
    // Arrange -> Criar as coisas que eu preciso
    const expectedTodo = {
      id: expect.any(String), //tradução da linha: o id tem que estar no objeto e tem que ser string
      description: 'meu novo todo',
      createdAt: expect.any(String), //tradução da linha: o id tem que estar no objeto e tem que ser string
    };

    // Act executar a ação que estou executanco
    const newTodo = makeNewTodo('meu novo todo');

    // Assert
    // toBe === (valores primitivos: número, string...)

    // Checando apenas a description
    expect(newTodo.description).toBe(expectedTodo.description);

    // toEqual - pode não checar algumas chaves, como undefine(para objeto)
    // toStrictEqual - chega todas as chaves do objeto(para objeto)
    // Checando o objeto inteiro
    expect(newTodo).toStrictEqual(expectedTodo);
  });
});