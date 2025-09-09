import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Superadmin } from './superadmin/superadmin';
import { Institution } from './pages/institution/institution';
import { Users } from './pages/users/users';
import { Students } from './pages/students/students';


export const routes: Routes = [
      {
    path: '',
    component: Layout,
    children: [
      { path: 'superadmin', component: Superadmin },
      {path:'dashboard', component:Superadmin},
      {path:'institution', component:Institution},
      {path:'users', component:Users},
      { path: '', redirectTo: 'superadmin', pathMatch: 'full' }
    ]
  },
  {path:'students',component:Students}
];
