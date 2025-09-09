import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Institution {
  name: string;
  code: string;
    address?: string; 
  branches: string[];
}

@Component({
  selector: 'app-superadmin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './superadmin.html',
  styleUrls: ['./superadmin.css'],
})
export class Superadmin {
  showAddInstitutionModal = false; // initially hidden

  // initial institutions
  institutions: Institution[] = [
    {
      name: 'MIT College of Engineering',
      code: 'MIT',
      branches: ['Engineering', 'Arts', 'Medical'],
    },
    {
      name: 'State University System',
      code: 'STATE',
      branches: ['Engineering', 'Arts', 'Medical'],
    },
  ];

  // for form binding
  newInstitution: Institution = { name: '', code: '', branches: [] };

  // modal controls
  openAddInstitutionModal() {
    this.showAddInstitutionModal = true;
  }

  closeAddInstitutionModal() {
    this.showAddInstitutionModal = false;
  }

  // generate unique collapse id
  getCollapseId(index: number): string {
    return 'institutionCollapse' + index;
  }

  // add new institution
  addInstitution() {
    if (this.newInstitution.name.trim() && this.newInstitution.code.trim()) {
      this.institutions.push({ ...this.newInstitution, branches: [] });
      this.newInstitution = { name: '', code: '', branches: [] }; // reset form
      this.closeAddInstitutionModal(); // close modal
    }
  }

  // page navigation (demo)
  goTo(page: string) {
    console.log('Navigating to', page);
  }
}
