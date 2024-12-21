import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

export class ParametroRoutes {
    static readonly LISTAR = '/parametro';
    static readonly CADASTRO = '/parametro/cadastro';
    static readonly DETALHE = (id: string) => '/parametro/' + id;
}

export const Routes = [
    {
        path: '',
        loadComponent() {
            return import('./components/listar-parametro/listar-parametro.component').then(m => m.ListarParametroComponent);
        },
    },
    // {
    //     path: 'cadastro',
    //     loadComponent() {
    //         return import('./components/cadastro-parametro/cadastro-parametro.component').then(m => m.CadastroParametroComponent);
    //     },
    // },
    {
        path: ':id',
        loadComponent() {
            return import('./components/detalhe-parametro/detalhe-parametro.component').then(m => m.DetalheParametroComponent);
        },
    }
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(Routes)],
    exports: []
})
export class SistemaRoutingModule { }
