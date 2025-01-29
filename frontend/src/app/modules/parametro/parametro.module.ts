import { NgModule } from "@angular/core";
import { DetalheParametroComponent } from "./components/detalhe-parametro/detalhe-parametro.component";
import { ListarParametroComponent } from "./components/listar-parametro/listar-parametro.component";
import { ParametroService } from "./services/parametro.service";

@NgModule({
    imports: [
        ListarParametroComponent,
        DetalheParametroComponent,
    ],
    providers: [ParametroService],
    exports: [ListarParametroComponent, DetalheParametroComponent]
})
export class ParametroModule { }
