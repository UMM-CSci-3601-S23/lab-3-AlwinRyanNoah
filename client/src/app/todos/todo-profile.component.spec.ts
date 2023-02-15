import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { MockTodoService } from '../../testing/todo.service.mock';
import { Todo } from './todo';
import { TodoCardComponent } from './todo-card.component';
import { TodoProfileComponent } from './todo-profile.component';
import { TodoService } from './todo.service';

describe('TodoProfileComponent', () => {
  let component: TodoProfileComponent;
  let fixture: ComponentFixture<TodoProfileComponent>;
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(waitForAsync(() => {
   TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      MatCardModule
    ],
      declarations: [ TodoProfileComponent, TodoCardComponent ],
      providers: [
        {provide: TodoService, useValue: new MockTodoService() },
        {provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to a specific todo profile', () => {
    const expectedTodo: Todo = MockTodoService.testTodos[0];
    activatedRoute.setParamMap({ id: expectedTodo._id });

    expect(component.id).toEqual(expectedTodo._id);
    expect(component.todo).toEqual(expectedTodo);
  });

  it('should navigate to correct todo when the id parameter changes', () => {
    let expectedTodo: Todo = MockTodoService.testTodos[0];
    activatedRoute.setParamMap({ id: expectedTodo._id });
    expect (component.id).toEqual(expectedTodo._id);
    expectedTodo = MockTodoService.testTodos[1];
    activatedRoute.setParamMap({ id: expectedTodo._id });
    expect(component.id).toEqual(expectedTodo._id);
  });

  it('should have null for the todo for a bad ID', () => {
    activatedRoute.setParamMap({ id: 'badID' });
    expect(component.id).toEqual('badID');
    expect(component.todo).toBeNull();
  });
});
