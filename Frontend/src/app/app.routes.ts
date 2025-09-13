import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Superadmin } from './pages/superadmin/superadmin';
import { Students } from './pages/students/students';
import { Institution } from './pages/institution/institution';
import { Users } from './pages/users/users';
import { TestInterface } from './components/test-interface/test-interface';

import { Results } from './components/results/results'
import { Admin } from './pages/admin/admin';
import { AdminLayout } from './admin-layout/admin-layout';
import { Questionbank } from './pages/questionbank/questionbank';
import { Adminusers } from './pages/adminusers/adminusers';
import { StudentDashboard } from './pages/studentslayout/dashboard/Studentdashboard';
import { StudentLogin } from './pages/studentslayout/student-login/student-login';
import { FacultyDashboardComponent } from './pages/facultydashboard/facultydashboard';




export const routes: Routes = [
  // Superadmin & other main routes
  {
    path: '',
    component: Layout,
    children: [
      { path: 'superadmin', component: Superadmin },
      { path: 'dashboard', component: Superadmin }, // maybe redirect?
      { path: 'institution', component: Institution },
      { path: 'users', component: Users },
      { path: '', redirectTo: 'superadmin', pathMatch: 'full' }
    ]
  },



    {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: 'admin', component: Admin },
      { path: 'dashboard', component: Admin },
      { path: 'questionbank', component: Questionbank },
      { path: 'users', component: Adminusers },
      { path: '', redirectTo: 'admin', pathMatch: 'full' }
    ]
  },

  // Student login route
  {
    path: 'student-login',
    component: StudentLogin
  },
  {
    path: 'students',
    component: StudentDashboard,  // This is the student dashboard layout
    children: [
      { path: '', component: Students },  // default view inside dashboard
      { path: 'test/:id', component: TestInterface },  // nested test route
      { path: 'results/:id', component: Results }     // nested results route
    ]
  },
  
  {path:"faculty",component:FacultyDashboardComponent},
  // fallback redirect
  { path: '**', redirectTo: 'superadmin' }
];
