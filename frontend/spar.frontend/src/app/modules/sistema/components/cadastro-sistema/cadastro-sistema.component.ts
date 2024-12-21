import { AfterContentInit, AfterRenderRef, AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { AbstractFormComponent } from '../../../../core/interfaces/abstract-form-component.interface';
import { Sistema } from '../../../../core/models/sistema.model';
import { NavigationService } from '../../../../core/services/navigation.service';
import { FormOf } from '../../../../core/utils/form.util';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { SistemaService } from '../../services/sistema.service';
import { SistemaRoutes } from '../../sistema-routing.module';
import { CommonModule } from '@angular/common';
import { FormSistemaComponent } from '../form-sistema/form-sistema.component';
import { ModalModule } from '../../../../shared/components/modal/modal.module';
import { ModalOptions } from '../../../../shared/components/modal/models/modal-options.model';
import { ModalSizes } from '../../../../shared/components/modal/enums/modal-sizes.enum';
import { ModalService } from '../../../../shared/components/modal/services/modal.service';

@Component({
  selector: 'spar-cadastro-sistema',
  imports: [CommonModule, FormSistemaComponent, ModalModule],
  templateUrl: './cadastro-sistema.component.html',
  styleUrl: './cadastro-sistema.component.scss',
})
export class CadastroSistemaComponent {

  @ViewChild(FormSistemaComponent, { static: true }) formComponent!: FormSistemaComponent;

  readonly MODAL_ID = 'alerta_cadastro_sistema';

  sistemaRecemSalvo?: Sistema;

  modalOptions: ModalOptions = {
    width: '600px',
    height: 'fit-content'
  };

  constructor(
    private readonly navigationService: NavigationService,
    private readonly sistemaService: SistemaService,
    private readonly toastService: ToastService,
    private readonly modalService: ModalService
  ) { }

  navigateListarSistemas() {
    this.navigationService.navigateTo(SistemaRoutes.LISTAR);
  }

  navigateEditarSistema() {
    this.navigationService.navigateTo(SistemaRoutes.DETALHE('' + this.sistemaRecemSalvo?.sistemaID));
  }

  cancelar() {
    this.navigationService.back();
  }

  public salvarSistema() {
    delete this.sistemaRecemSalvo;
    this.sistemaService.postSistema(this.formComponent.getValue())
      .pipe(take(1))
      .subscribe({
        next: (sistema: Sistema) => {
          this.sistemaRecemSalvo = sistema;
          this.modalService.open(this.MODAL_ID);
          this.toastService.showSuccess('Sistema cadastrado com sucesso!');
        },
        error: (error) => {
          this.toastService.showError('Erro ao salvar sistema!');
        }
      });
  }

}
