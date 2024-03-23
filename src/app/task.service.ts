import { Injectable } from '@angular/core';
import { Task } from './interface/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private taskListSubject = new BehaviorSubject<Task[]>(this.tasks);
  taskList$ = this.taskListSubject.asObservable();
  private localStorageKey = 'tasks';

  constructor() {
    this.loadTasksFromLocalStorage();
   }

  loadTasksFromLocalStorage(): void {
    const taskJson = localStorage.getItem(this.localStorageKey);
    if(taskJson){
      this.tasks = JSON.parse(taskJson);
      this.updateTaskList();
    }
  }
 
  saveTasksToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
  }

  getTaskById(taskId:any):Task | undefined {
    return this.tasks.find(task => task.id === taskId)
  }

  // Add Task
  addTask(task: Task): boolean {
    try {
      this.tasks.push(task);
      this.updateTaskList();
      this.saveTasksToLocalStorage();
      return true; 
    } catch (error) {
      return false; 
    }
  }
  
  // Delete Task
  deleteTask(taskId:number): void{
    this.tasks = this.tasks.filter(task => 
       task.id !== taskId
    );
  
    this.updateTaskList();
    this.saveTasksToLocalStorage();
  }

  // Updating the List
  updateTaskList():void{
    this.taskListSubject.next([...this.tasks])
  }

  // Id generating
  generateUniqueId():number{
    return Math.floor(Math.random()*1000)
  }

  // Edit Task
  updateTask(task: Task): boolean {
    try {
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this.tasks[index] = task;
        this.updateTaskList();
        this.saveTasksToLocalStorage();
      }
      return true; 
    } catch (error) {
      console.error("Failed to update task:", error);
      return false;
    }
  }
}
