import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'parametro',
        pathMatch: 'full'
    },
    {
        path: 'parametro',
        loadChildren() {
            return import('./modules/parametro/parametro-routing.module').then(m => m.ParametroRoutingModule);
        },
    },
    {
        path: 'sistema',
        loadChildren() {
            return import('./modules/sistema/sistema-routing.module').then(m => m.SistemaRoutingModule);
        }
    }
];
