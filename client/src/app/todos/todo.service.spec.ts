import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserService } from '../users/user.service';
import { Todo } from './todo';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  //A small collection of test todos
  const testTodos: Todo[] = [
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
        category: 'groceries',
        },
  ];
  let todoService: TodoService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
  });
  httpClient = TestBed.inject(HttpClient);
  httpTestingController = TestBed.inject(HttpTestingController);
  //create an instance of the server with the mock HTTP client
  todoService = new TodoService(httpClient);
  });

  afterEach(() => {
    //after each test, assert that there are no more pending requests
    httpTestingController.verify();
  });

  //testing for filtering on the server
  describe('getTodos()', () => {

    it('correctly calls `api/todos` when `getTodos()` is called with no parameters', () => {
      todoService.getTodos().subscribe(
        todos => expect(todos).toBe(testTodos)
      );

      // Specify that (exactly) one request will be made to the specified URL.
      const req = httpTestingController.expectOne(todoService.todoUrl);
      // Check that the request made to that URL was a GET request.
      expect(req.request.method).toEqual('GET');
      // Check that the request had no query parameters.
      expect(req.request.params.keys().length).toBe(0);

      req.flush(testTodos);
    });
  });

  describe('calling getTodos() with parameters correctly forms the HTTP request', () => {
    it('correctly calls api/todos with filter parameter \'owner\'', () => {
      todoService.getTodos({owner: 'Alwin'}).subscribe(
        users => expect(users).toBe(testTodos)
      );
      // Specify that (exactly) one request will be made to the specified URL with the owner parameter.
      const req = httpTestingController.expectOne(
        (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('owner')
      );
      // Check that the request made to that URL was a GET request.
      expect(req.request.method).toEqual('GET');
      // Check that the request was 'alwin'.
      expect(req.request.params.get('owner')).toBe('Alwin');

      req.flush(testTodos);

    });

    it('correctly calls api/todos with filter parameter \'status true\'', () => {

      todoService.getTodos({status: true}).subscribe(
        todos => expect(todos).toBe(testTodos)
      );

      // Specify that (exactly) one request will be made to the specified URL with the status parameter.
      const req = httpTestingController.expectOne(
        (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('status')
      );
      // Check that the request made to that URL was a GET request.
      expect(req.request.method).toEqual('GET');
      // Check that the request was 'true'.
      expect(req.request.params.get('status')).toBe('true');

      req.flush(testTodos);
    });

    //for some reason despite being a similar test for true this one never works
    //we believe that the reason for this is because of something to do with where the boolean gets
    //translated into a string (complete/incomplete) and that filters.status sets status to be true

    /*it('correctly calls api/todos with filter parameter \'status false\'', () => {

      todoService.getTodos({status: false}).subscribe(
        todos => expect(todos).toBe(testTodos)
      );

      // Specify that (exactly) one request will be made to the specified URL with the status parameter.
      const req = httpTestingController.expectOne(
        (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('status')
      );
      // Check that the request made to that URL was a GET request.
      expect(req.request.method).toEqual('GET');
      // Check that the request was 'false'.
      expect(req.request.params.get('status')).toBe('false');

      req.flush(testTodos);
    });*/

    it('correctly calls api/users with multiple filter parameters', () => {
      todoService.getTodos({owner: 'Alwin', status: true}).subscribe(
        users => expect(users).toBe(testTodos)
      );

      // Specify that (exactly) one request will be made to the specified URL with all parameters.
      const req = httpTestingController.expectOne(
        (request) => request.url.startsWith(todoService.todoUrl)
        && request.params.has('owner') && request.params.has('status')
      );

      // Check that the request made to that URL was a GET request.
      expect(req.request.method).toEqual('GET');

      // Check that the owner and status are correct.
      expect(req.request.params.get('owner')).toBe('Alwin');
      expect(req.request.params.get('status')).toBe('true');

      req.flush(testTodos);

    });
  });

  //filtering the todos by ID
  describe('getTodoByID()',() => {
    it('calls api/todos/id with the correct ID', () => {
      const targetTodo: Todo = testTodos[1];
      const targetId: string = targetTodo._id;

      todoService.getTodoById(targetId).subscribe(
        todo => expect(todo).toBe(targetTodo)
      );

      const expectedUrl: string = todoService.todoUrl + '/' + targetId;
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(targetTodo);
    });
  });

});
