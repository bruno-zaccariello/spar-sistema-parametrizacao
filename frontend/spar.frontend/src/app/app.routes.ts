import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'parametro',
        pathMatch: 'full'
    },
    {
        path: 'parametro',
        loadComponent() {
            return import('./modules/parametro/components/listar-parametro/listar-parametro.component').then(m => m.ListarParametroComponent);
        },
    },
    {
        path: 'parametro/:id',
        loadComponent() {
            return import('./modules/parametro/components/detalhe-parametro/detalhe-parametro.component').then(m => m.DetalheParametroComponent);
        },
    },
    {
        path: 'sistema',
        loadChildren() {
            return import('./modules/sistema/sistema-routing.module').then(m => m.SistemaRoutingModule);
        }
    }
];
