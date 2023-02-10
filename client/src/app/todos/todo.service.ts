import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo, TodoCategory } from './todo';

/*service that provides the interface for getting information
about 'Todos' from the server*/

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  readonly todoUrl: string = environment.apiUrl + 'todos';


  constructor(private httpClient: HttpClient) {
   }

   getTodos(filters?: {category?: TodoCategory; status?: boolean; owner?: string }): Observable<Todo[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.category) {
        httpParams = httpParams.set('role', filters.category);
      }
      if (filters.status) {
        httpParams = httpParams.set('age', filters.status.toString());
      }
    }
    return this.httpClient.get<Todo[]>(this.todoUrl, {
      params: httpParams,
    });
   }

   getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
  }

  filterTodos(todos: Todo[], filters?: { status?: boolean; owner?: string }): Todo[] {
    let filteredTodos = todos;
    /*
    if (filters.status) {
      switch(String(filters.status).toLowerCase()){
        case 'complete': {
          return filteredTodos = filteredTodos.filter(todo => todo.status.toLowerCase().indexOf(filters.status) !== -1);
        }
      }
    } */
    if (filters.owner){
      filters.owner = filters.owner.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => todo.owner.toLowerCase().indexOf(filters.owner) !== -1);
    }

    return filteredTodos;
}
}
