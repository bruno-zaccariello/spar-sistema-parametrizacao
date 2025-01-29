import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { take } from 'rxjs';
import { Sistema } from '../../../../core/models/sistema.model';
import { NavigationService } from '../../../../core/services/navigation.service';
import { SistemaService } from '../../services/sistema.service';
import { SistemaRoutes } from '../../sistema-routing.module';

@Component({
  selector: 'spar-listar-sistemas',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule
  ],
  templateUrl: './listar-sistemas.component.html',
  styleUrls: ['./listar-sistemas.component.scss']
})
export class ListarSistemasComponent {

  dataSource = new MatTableDataSource<Sistema>([]);
  sistemas!: Sistema[];
  displayedColumns: string[] = ['nome', 'descricao', 'actions'];

  constructor(
    private readonly navigationService: NavigationService,
    private readonly sistemaService: SistemaService
  ) {
    this.carregarSistemas();
  }

  public carregarSistemas() {
    this.sistemaService.getAll()
      .pipe(take(1))
      .subscribe((sistemas: Sistema[]) => {
        this.sistemas = sistemas ?? [];
        this.dataSource.data = this.sistemas;
      });
  }

  editarSistema(sistema: Sistema) {
    this.navigationService.navigateTo(SistemaRoutes.DETALHE('' + sistema.sistemaID));
  }

  cadastrarSistema() {
    this.navigationService.navigateTo(SistemaRoutes.CADASTRO);
  }

  deletarSistema(arg: any) { }
}
