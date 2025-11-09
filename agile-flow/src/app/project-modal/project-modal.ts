import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-modal.html',
  styleUrls: ['./project-modal.scss']
})
export class ProjectModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<any>();

  projectForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      teamSize: ['1-3'],
      deadline: ['']
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.submitForm.emit(this.projectForm.value);
    }
  }
}
