import { Routes } from '@angular/router';
import { Layout } from './pages/superadmin-page/layout/layout'; 
import { Superadmin } from './pages/superadmin-page/superadmin/superadmin';
import { Students } from './pages/studentslayout/home/students-home';
import { Institution } from './pages/superadmin-page/institution/institution';
import { Users } from './pages/superadmin-page/users/users';
import { TestInterface } from './components/students/test-interface/test-interface';

import { Results } from './components/students/results/results'
import { Admin } from './pages/admin-page/admin/admin';
import { AdminLayout } from './pages/admin-page/admin-layout/admin-layout'; 
import { Questionbank } from './pages/admin-page/questionbank/questionbank';
import { Adminusers } from './pages/admin-page/adminusers/adminusers';
import { StudentDashboard } from './pages/studentslayout/dashboard/Studentdashboard';
import { StudentLogin } from './pages/studentslayout/student-login/student-login';
import { FacultyDashboardComponent } from './pages/faculty/facultydashboard';
import { Assesments } from './pages/studentslayout/assesments/assesments';




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
      { path: '', component: Students },
      {path:'assessments',component:Assesments},  // default view inside dashboard
      { path: 'results', component: Results },
     { path: '*', redirectTo: 'students' }     // nested results route
    ]
  },
  { path: 'test/:id', component: TestInterface },  // nested test route
  
  {path:"faculty",component:FacultyDashboardComponent},
  // fallback redirect
  { path: '**', redirectTo: 'superadmin' }
];
