import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo, TodoCategory } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: []
})
export class TodoListComponent implements OnInit{
  public serverFilteredTodo: Todo[];
  public filteredTodos: Todo[];

  public todoOwner: string;
  public todoStatus: boolean;
  public todoBody: string;
  public todoCategory: TodoCategory;
  public viewType: 'card' | 'list' = 'card';

  constructor(private todoService: TodoService, private snackBar: MatSnackBar) {
  }

  //Server filtered users
  getTodosFromServer(){
    this.todoService.getTodos({
      status: this.todoStatus
    }).subscribe(returnedTodos => {
      this.serverFilteredTodo = returnedTodos;
      this.updateFilter();
    }, err => {
      console.error('We couldn\'t get the list of todos; the server might be down');
      this.snackBar.open(
        'Problem contacting the server – try again',
        'OK',
        // The message will disappear after 3 seconds.
        { duration: 3000 });
    });
  }

  public updateFilter() {
    this.filteredTodos = this.todoService.filterTodos(
      this.serverFilteredTodo, { body: this.todoBody, category: this.todoCategory }
    );
  }


  ngOnInit(): void {
    this.getTodosFromServer();
  }
}
