// Importa o módulo que contém sanitizeStr
// Importamos como módulo para poder usar spyOn
import * as sanitizeStrMod from '@/utils/sanitize-str';

// Função principal que estamos testando
import { makeValidatedTodo } from './make-validated-todo';

// Módulo responsável por criar um novo Todo
import * as makeNewTodoMod from './make-new-todo';

// Módulo responsável pela validação da descrição
import * as validateTodoDescriptionMod from '../schemas/validate-todo-description';

// Tipos de retorno da função
import { InvalidTodo, ValidTodo } from '../schemas/todo.contract';

// Agrupa todos os testes da função makeValidatedTodo
describe('makeValidatedTodo (unit)', () => {

  test('deve chamar a função sanitizeStr com o valor correto', () => {

    // Cria todos os mocks necessários
    const { description, sanitizeStrSpy } = makeMocks();

    // Executa a função sendo testada
    makeValidatedTodo(description);

    // Verifica se sanitizeStr foi chamada
    // exatamente uma vez com a descrição recebida
    expect(sanitizeStrSpy)
      .toHaveBeenCalledExactlyOnceWith(description);
  });

  test('deve chamar a validateTodoDescription com o retorno de sanitizeStr', () => {

    const {
      description,
      sanitizeStrSpy,
      validaTodoDescriptionSpy
    } = makeMocks();

    // Valor que queremos que sanitizeStr retorne
    const sanitizeStrReturn = 'retorno da sanitizeStr';

    // Substitui o retorno real pelo valor acima
    sanitizeStrSpy.mockReturnValue(sanitizeStrReturn);

    // Executa a função
    makeValidatedTodo(description);

    // Verifica se a validação recebeu
    // exatamente o retorno da sanitizeStr
    expect(validaTodoDescriptionSpy)
      .toHaveBeenCalledExactlyOnceWith(
        sanitizeStrReturn,
      );
  });

  test('deve criar um novo todo se a validação retornar sucesso', () => {

    const { description } = makeMocks();

    // Executa a função
    const result =
      makeValidatedTodo(description) as ValidTodo;

    // Verifica se a operação foi bem sucedida
    console.log(result);
    expect(result.success).toBe(true);

    // Verifica os dados retornados
    expect(result.todo.id).toBe('any-id');
    expect(result.todo.description).toBe('abcd');
    expect(result.todo.createdAt).toBe('any-date');
  });

  test('deve retornar os erros caso a validação falhe', () => {

    const {
      errors,
      description,
      validaTodoDescriptionSpy,
    } = makeMocks();

    // Simula falha na validação
    validaTodoDescriptionSpy.mockReturnValue({
      errors,
      success: false,
    });

    const result =
      makeValidatedTodo(description) as InvalidTodo;

    // Verifica se retornou exatamente os erros
    expect(result).toStrictEqual({
      errors,
      success: false,
    });
  });
});

// Função auxiliar que prepara todos os mocks
const makeMocks = (description = 'abcd') => {

  // Lista fake de erros
  const errors = ['any', 'error'];

  // Todo fake usado nos testes
  const todo = {
    id: 'any-id',
    description,
    createdAt: 'any-date',
  };

  // Espiona sanitizeStr e define retorno padrão
  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, 'sanitizeStr')
    .mockReturnValue(description);

  // Espiona validateTodoDescription
  // e simula sucesso por padrão
  const validaTodoDescriptionSpy = vi
    .spyOn(
      validateTodoDescriptionMod,
      'validateTodoDescription',
    )
    .mockReturnValue({
      errors: [],
      success: true,
    });

  // Espiona makeNewTodo
  // e retorna um todo fake
  const makeNewTodoSpy = vi
    .spyOn(makeNewTodoMod, 'makeNewTodo')
    .mockReturnValue(todo);

  return {
    errors,
    todo,
    description,
    sanitizeStrSpy,
    validaTodoDescriptionSpy,
    makeNewTodoSpy,
  };
};