import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a task', () => {
    const task = {
      id: 1,
      title: 'Task 1',
      description: 'Description for Task 1',
      dueDate: new Date(),
      completed: false
    };
    const result = service.addTask(task);
    expect(result).toBeTruthy();
  });

  it('should delete a task', () => {
    const taskId = 1;
    service['tasks'] = [
      { id: 1, title: 'Task 1', description: 'Description for Task 1', dueDate: new Date(), completed: false },
      { id: 2, title: 'Task 2', description: 'Description for Task 2', dueDate: new Date(), completed: false }
    ];
    service.deleteTask(taskId);
    expect(service['tasks'].length).toEqual(1);
    expect(service['tasks'].findIndex(task => task.id === taskId)).toEqual(-1);
  });

  it('should update a task', () => {
    const taskToUpdate = { id: 1, title: 'Task 1 Updated', description: 'Updated Description for Task 1', dueDate: new Date(), completed: true };
    service['tasks'] = [
      { id: 1, title: 'Task 1', description: 'Description for Task 1', dueDate: new Date(), completed: false },
      { id: 2, title: 'Task 2', description: 'Description for Task 2', dueDate: new Date(), completed: false }
    ];
    const result = service.updateTask(taskToUpdate);
    expect(result).toBeTruthy();
    const updatedTask = service['tasks'].find(task => task.id === taskToUpdate.id);
    expect(updatedTask).toBeTruthy();
    expect(updatedTask).toEqual(taskToUpdate);
  });

  it('should get a task by id', () => {
    const taskId = 1;
    const task = { id: 1, title: 'Task 1', description: 'Description for Task 1', dueDate: new Date(), completed: false };
    service['tasks'] = [task];
    const result = service.getTaskById(taskId);
    expect(result).toEqual(task);
  });

  it('should generate unique ids', () => {
    const id1 = service.generateUniqueId();
    const id2 = service.generateUniqueId();
    expect(id1).not.toEqual(id2);
  });
});
