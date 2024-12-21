import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

export class SistemaRoutes {
    static readonly LISTAR = '/sistema';
    static readonly CADASTRO = '/sistema/cadastro';
    static readonly DETALHE = (id: string) => '/sistema/' + id;
}

export class ParametroRoutes {

}

export const Routes = [
    {
        path: '',
        loadComponent() {
            return import('./components/listar-sistemas/listar-sistemas.component').then(m => m.ListarSistemasComponent);
        },
    },
    {
        path: 'cadastro',
        loadComponent() {
            return import('./components/cadastro-sistema/cadastro-sistema.component').then(m => m.CadastroSistemaComponent);
        },
    },
    {
        path: ':id',
        loadComponent() {
            return import('./components/detalhe-sistema/detalhe-sistema.component').then(m => m.DetalheSistemaComponent);
        },
    }
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(Routes)],
    exports: []
})
export class SistemaRoutingModule { }
