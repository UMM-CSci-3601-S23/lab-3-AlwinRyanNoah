import {TodoCategory} from 'src/app/todos/todo';

export class TodoListPage {
  navigateTo() {
    return cy.visit('/todos');
  }

  getUrl() {
    return cy.url();
  }

  getTodoTitle() {
    return cy.get('.todo-list-title');
  }

  getTodoListItems() {
    return cy.get('.todo-nav-list .todo-list-item');
  }

  selectStatus(value) {
    return cy.get('[data-test="todoStatusSelect"]').click()
    .get(`mat-option[value="${value}"`).click();
  }
}
