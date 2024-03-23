import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/interface/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: Task[] =[];
  selectedTask: Task | null = null;

  constructor(private router: Router,private taskService: TaskService){}
  ngOnInit():void{
    this.taskService.taskList$.subscribe(tasks =>{
      this.tasks = tasks
    })
  }


  details(task: Task): void {
    this.selectedTask = task;
    const taskId = task.id;
    this.router.navigate(['/task', taskId]);
  }

  navigateToAddTask():void {
    this.router.navigate(['/add-task'])
  }

  toggleTaskStatus(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task); 
  }

  deleteTask(taskId: any): void {
    const isConfirmed = confirm("Are you sure you want to delete this task?");
    if (isConfirmed) {
      this.taskService.deleteTask(taskId);
     
    }
  }
  
  showAlert(message: string): void {
    alert(message);
  }
  

  editTask(taskId: any): void {
    this.router.navigate(['/edit-task',  taskId ]); 
  }
}
