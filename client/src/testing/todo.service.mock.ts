import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Todo} from 'src/app/todos/todo';
import { TodoService } from 'src/app/todos/todo.service';

@Injectable()
export class MockTodoService extends TodoService {
  static testTodos: Todo[] = [
    {
      _id: 'alwin_id',
      owner: 'Alwin',
      status: true,
      body: 'Revvin up your engine listen to her howlin roar',
      category: 'homework',
    },
    {
      _id: 'ryan_id',
      owner: 'Ryan',
      status: false,
      body: 'Metal under tension beggin you to touch and go',
      category: 'software design',
    },
    {
      _id: 'noah_id',
      owner: 'Noah',
      status: true,
      body: 'Highway to the Danger Zone ride into the Danger Zone',
      category: 'video games',
    },
    {
      _id: 'kk_id',
      owner: 'KK',
      status: false,
      body: 'Headin into twilight spreadin out her wings tonight',
      category: 'software design',
    }
  ];

  constructor(){
    super(null);
  }

  getTodos(filters?: { status?: boolean; owner?: string }): Observable<Todo[]> {
      return of (MockTodoService.testTodos);
  }

  getTodoById(id: string): Observable<Todo> {
      if ( id === MockTodoService.testTodos[0]._id) {
        return of (MockTodoService.testTodos[0]);
      } else {
        return of(null);
      }
  }
}

