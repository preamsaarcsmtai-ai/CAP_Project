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



export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: 'superadmin', component: Superadmin },
      { path: 'dashboard', component: Superadmin },
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
  {
    path: 'students',
    component: Students,
  },
  {
    path: 'students/test/:id',
    component: TestInterface
  },

  {
    path: 'students/results/:id',
    component: Results   // <-- now not nested
  }

];
