import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/interface/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {

  taskId: any;
  taskForm!: FormGroup;
  feedbackMessage: string | null = null;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.taskId = +this.route.snapshot.paramMap.get('id')!;
    const task = this.taskService.getTaskById(this.taskId);
    if (task) {
      this.taskForm = this.formBuilder.group({
        title: [task.title, Validators.required],
        description: [task.description],
        dueDate: [task.dueDate, Validators.required],
        completed: [task.completed]
      });
    }
  }

  updateTask(): void {
    if (this.taskForm.valid) {
      const updatedTask: Task = {
        id: this.taskId,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        dueDate: this.taskForm.value.dueDate,
        completed: this.taskForm.value.completed
      };

      if (this.taskService.updateTask(updatedTask)) {
        this.showAlert("Task updated successfully!");
        setTimeout(() => {
          this.router.navigate(['/tasks']);
        }, 2000);


      } else {
        this.showAlert("Failed to Update task. Please try again.");
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
