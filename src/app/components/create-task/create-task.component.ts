import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from 'src/app/interface/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  taskForm!: FormGroup;
  feedbackMessage: string | null = null;


  constructor(private taskService : TaskService, private router: Router){}
  
  ngOnInit():void{
    this.taskForm = new FormGroup({
      title: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      dueDate:  new FormControl('',Validators.required),
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask = {
        id: this.taskService.generateUniqueId(),
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        dueDate: this.taskForm.value.dueDate,
      };
  
      if (this.taskService.addTask(newTask)) {
        this.showAlert("Task created successfully!");
        this.taskForm.reset();
        setTimeout(() => {
          this.router.navigate(['/tasks']);
        }, 2000);

      } else {
        this.showAlert("Failed to create task. Please try again.");
      }
    }
  }

  showAlert(message: string): void {
    this.feedbackMessage = message;
    setTimeout(() => {
      this.feedbackMessage = null;
    }, 2000);
  }
  
  

}
