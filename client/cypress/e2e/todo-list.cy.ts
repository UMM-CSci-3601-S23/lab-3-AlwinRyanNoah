import { TodoListPage } from 'cypress/support/todo-list.po';

const page = new TodoListPage();

describe('Todo List', () => {
  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getTodoTitle().should('have.text', 'Todos');
  });

  it('Should type something into the owner filter and check that it returned correct elements', () => {
    //get owner 'Fry'
    cy.get('[data-test=todoOwnerInput]').type('Fry');

    //All of the listed todos should have the name we are filtering for
    page.getTodoListItems().each($list => {
      cy.wrap($list).find('.todo-list-owner').should('contain.text', 'FRY');
    });
  });

  it('Should type something into the Body filter and return the correct elements', () => {
    //get body 'In sunt'
    cy.get('[data-test=todoBodyInput]').type('In sunt');

    page.getTodoListItems().should('have.length', 2);
    //All of the listed todos should have the name we are filtering for
    page.getTodoListItems().each($list => {
      cy.wrap($list).find('.todo-list-body').should('contain.text', 'In sunt');
    });
  });

  it('Should type something into the category filter and return the correct elements', () => {
    //get category 'homework'
    cy.get('[data-test=todoCategoryInput]').type('homework');

    page.getTodoListItems().should('have.length.above', 0);
    //All of the listed todos should have the name we are filtering for
    page.getTodoListItems().each($list => {
      cy.wrap($list).find('.todo-list-category').should('contain','homework');
    });
  });

  it('Should choose a status and return the correct elements', () => {
    page.selectStatus('complete');

    page.getTodoListItems().should('have.length.above', 10);
  });
});
