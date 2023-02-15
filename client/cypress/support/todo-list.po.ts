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
    return cy.get('.user-nav-list');
  }

  selectCategory(value: TodoCategory) {
    return cy.get('[data-test="todoRoleSelect"]').click()
    .get(`mat-option[value="${value}"`).click();
  }
}
