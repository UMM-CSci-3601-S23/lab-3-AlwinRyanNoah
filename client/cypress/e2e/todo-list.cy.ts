import { TodoListPage } from 'cypress/support/todo-list.po';

const page = new TodoListPage();

describe('Todo List', () => {
  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getTodoTitle().should('have.text', 'Todos');
  });

});
