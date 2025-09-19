import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Institution {
  name: string;
  code: string;
  address?: string;
  branches: string[];
  showBranches?: boolean; 
}

@Component({
  selector: 'app-superadmin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './superadmin.html',
  styleUrls: ['./superadmin.css'],
})
export class Superadmin {
  showAddInstitutionModal = false; // initially hidden
  showAddBranch = false;
  addInstitutionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addInstitutionForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Z][a-zA-Z ]*$')]],
      code: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Z][a-zA-Z ]*$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }

  // initial institutions
  institutions: Institution[] = [
    {
      name: 'MIT College of Engineering',
      code: 'MIT',
      branches: ['MIT College of Engineering', 'MIT College of Arts', 'MIT College of Medical'],
      showBranches: false, 
    },
    {
      name: 'State University System',
      code: 'STATE',
      branches: ['Engineering', 'Arts', 'Medical'],
      showBranches: false, 
    },
  ];

  // for form binding
  newInstitution: Institution = { name: '', code: '', branches: [], showBranches: false };

  // modal controls
  openAddInstitutionModal() {
    this.showAddInstitutionModal = true;
  }

  closeAddInstitutionModal() {
    this.showAddInstitutionModal = false;
  }

  // toggle collapsible branches
  toggleBranches(inst: Institution) {
    inst.showBranches = !inst.showBranches;
  }

  // add new institution
  addInstitution() {
    if (this.addInstitutionForm?.valid) {
      const formData = { ...this.addInstitutionForm.value };
      // Add new institution to the list with showBranches = false
      this.institutions.push({
        name: formData.name,
        code: formData.code,
        address: formData.address,
        branches: [],
        showBranches: false,
      });

      this.addInstitutionForm.reset();
      alert(
        `✅ Institution Created Successfully!\n\n` +
        `Name: ${formData.name}\n` +
        `Code: ${formData.code}\n` +
        `Address: ${formData.address}\n` +
        `Admin: ${formData.firstname} ${formData.lastname}\n` +
        `Email: ${formData.email}`
      );
    } else {
      console.log('invalid form');
      this.addInstitutionForm.markAllAsTouched();
    }
  }
  Addbranch(){
    this.showAddBranch = true;
  }
  Closebranch(){
    this.showAddBranch = false;
  }
}
