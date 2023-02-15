import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TodoCardComponent } from './todo-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

describe('TodoCardComponent', () => {
  let component: TodoCardComponent;
  let fixture: ComponentFixture<TodoCardComponent>;

  beforeEach(waitForAsync (() => {
     TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatCardModule
      ],
      declarations: [ TodoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() =>{
    fixture = TestBed.createComponent(TodoCardComponent);
    component = fixture.componentInstance;
    component = fixture.componentInstance;
    component.todo = {
      _id: 'fry_id',
      owner: 'Fry',
      status: true,
      body: 'deez nuts',
      category: 'homework',
      avatar: 'https://i.kym-cdn.com/entries/icons/original/000/037/848/cover2.jpg'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
