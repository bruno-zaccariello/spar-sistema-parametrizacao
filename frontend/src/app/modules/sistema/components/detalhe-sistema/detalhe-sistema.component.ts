import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { take } from 'rxjs';
import { slideLeft } from '../../../../../assets/animations/slide-left.animation';
import { AbstractFormComponent } from '../../../../core/interfaces/abstract-form-component.interface';
import { NavigationService } from '../../../../core/services/navigation.service';
import { ListarParametroComponent } from '../../../parametro/components/listar-parametro/listar-parametro.component';
import { SistemaService } from '../../services/sistema.service';
import { FormSistemaComponent } from "../form-sistema/form-sistema.component";
import { Sistema } from './../../../../core/models/sistema.model';
import { ToastService } from './../../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-detalhe-sistema',
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ListarParametroComponent,
    FormSistemaComponent
  ],
  templateUrl: './detalhe-sistema.component.html',
  styleUrls: ['./detalhe-sistema.component.scss'],
  animations: [slideLeft]
})
export class DetalheSistemaComponent implements OnInit {

  sistemaId?: number;
  sistema!: Sistema;

  exibirParametros: boolean = false;

  @ViewChild(AbstractFormComponent) formComponent!: AbstractFormComponent<Sistema>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly sistemaService: SistemaService,
    private readonly toastService: ToastService
  ) { }

  ngOnInit() {
    this.sistemaId = this.route.snapshot.params['id'];
    if (this.sistemaId) {
      this.carregarSistema();
    }
  }

  cancelar() {
    this.navigationService.back();
  }

  public carregarSistema() {
    if (!this.sistemaId) {
      return;
    }
    this.sistemaService.getSistema(this.sistemaId)
      .subscribe((sistema: Sistema) => {
        this.sistema = sistema;
      }
      );
  }

  public salvarSistema() {
    this.sistemaService.putSistema(this.formComponent.getValue())
      .pipe(take(1))
      .subscribe((sistema: Sistema) => {
        this.sistema = sistema;
        this.toastService.showSuccess('Sistema salvo com sucesso!');
      }
      );
  }

}
