import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/interface/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent {
  taskId: any;
  task:any;
  
  constructor(private route: ActivatedRoute, private taskService: TaskService,private router: Router) { }

  ngOnInit(): void {
    this.taskId = +this.route.snapshot.paramMap.get('id')!;
    this.task = this.taskService.getTaskById(this.taskId);
  }

    navigateBack(): void {
    this.router.navigate(['/tasks']);
  
}
}