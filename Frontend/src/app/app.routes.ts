import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Superadmin } from './pages/superadmin/superadmin';
import { Students } from './pages/students/students';
import { Institution } from './pages/institution/institution';
import { Users } from './pages/users/users';
import { TestInterface } from './components/test-interface/test-interface';
import { Results } from './components/results/results'



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
