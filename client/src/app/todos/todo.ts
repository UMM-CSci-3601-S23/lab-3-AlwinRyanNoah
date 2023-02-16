export interface Todo {
  _id: string;
  owner: string;
  status: boolean;
  body: string;
  category: TodoCategory;
  avatar?: string;

}

export type TodoCategory = 'software design' | 'video games' | 'homework' | 'groceries';
