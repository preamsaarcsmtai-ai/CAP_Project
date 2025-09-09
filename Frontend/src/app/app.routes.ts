import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Superadmin } from './superadmin/superadmin';


export const routes: Routes = [
      {
    path: '',
    component: Layout,
    children: [
      { path: 'superadmin', component: Superadmin },
      { path: '', redirectTo: 'superadmin', pathMatch: 'full' }
    ]
  }
];
