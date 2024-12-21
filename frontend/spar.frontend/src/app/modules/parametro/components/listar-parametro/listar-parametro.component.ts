import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { take } from 'rxjs';
import { Parametro } from '../../../../core/models/parametro.model';
import { ParametroService } from '../../services/parametro.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { Routes } from '../../../sistema/sistema-routing.module';
import { ParametroRoutes } from '../../parametro-routing.module';

@Component({
  selector: 'spar-listar-parametro',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule
  ],
  providers: [ParametroService, JsonPipe],
  templateUrl: './listar-parametro.component.html',
  styleUrl: './listar-parametro.component.scss'
})
export class ListarParametroComponent implements OnInit {

  @Input('sistemaId') sistemaId?: number;
  @Input('enableActions') enableActions: boolean = true;

  dataSource = new MatTableDataSource<Parametro>([]);
  parametros!: Parametro[];
  displayedColumns: string[] = ['chave', 'valorJson', 'actions'];

  constructor(
    private readonly navigationService: NavigationService,
    private readonly parametroService: ParametroService
  ) { }

  ngOnInit() {
    this.carregarParametros();

    if (!this.enableActions) {
      this.displayedColumns = ['chave', 'valorJson'];
    }
  }

  public carregarParametros() {
    this.parametroService.getAll(this?.sistemaId)
      .pipe(take(1))
      .subscribe((parametros: Parametro[]) => {
        this.parametros = parametros ?? [];
        this.dataSource.data = this.parametros;
      });
  }

  cadastrarParametro() {
    this.navigationService.navigateTo(ParametroRoutes.CADASTRO);
  }

  editarParametro(parametro: Parametro) {
    this.navigationService.navigateTo(ParametroRoutes.DETALHE('' + parametro.parametroID));
  }

  deletarParametro(arg: any) { }

}
