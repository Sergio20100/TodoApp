import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LabsComponent } from './pages/labs/labs.component';
export const routes: Routes = [
    // {
    //     path: 'home', loadComponent:()=>import('./pages/home/home.component').then(mod=>mod.HomeComponent)
    // }
    {
        path: '', component:HomeComponent
    },
    {
        path: 'labs', component:LabsComponent
    }
];
