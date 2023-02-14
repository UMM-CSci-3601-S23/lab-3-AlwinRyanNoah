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

  //filtering using the server
  //we are filtering status and owner through the server
  getTodos(filters?: { status?: boolean; owner?: string }): Observable<Todo[]> {
   let httpParams: HttpParams = new HttpParams();
   if (filters) {
     if (filters.owner) {
       httpParams = httpParams.set('owner', filters.owner);
     }
     if (filters.status) {
       httpParams = httpParams.set('status', filters.status.toString());
     }
   }
   return this.httpClient.get<Todo[]>(this.todoUrl, {
      params: httpParams,
    });
   }

   getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
  }

  //filtering using angular
  //we are filtering body and category through angular
  filterTodos(todos: Todo[], filters?: { body?: string; category?: string }): Todo[] {
    let filteredTodos = todos;

    if (filters.body){
      filters.body = filters.body.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => todo.body.toLowerCase().indexOf(filters.body) !== -1);
    }

    if (filters.category){
      filters.category = filters.category.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => todo.category.toLowerCase().indexOf(filters.category) !== -1);
    }

    return filteredTodos;
}
}
