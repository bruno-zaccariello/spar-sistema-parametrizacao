import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { Parametro } from '../../../../core/models/parametro.model';
import { NavigationService } from '../../../../core/services/navigation.service';
import { ModalModule } from '../../../../shared/components/modal/modal.module';
import { ModalOptions } from '../../../../shared/components/modal/models/modal-options.model';
import { ModalService } from '../../../../shared/components/modal/services/modal.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { ParametroRoutes } from '../../../parametro/parametro-routing.module';
import { ParametroService } from '../../services/parametro.service';
import { FormParametroComponent } from '../form-parametro/form-parametro.component';

@Component({
  selector: 'spar-cadastro-parametro',
  imports: [CommonModule, FormParametroComponent, ModalModule],
  templateUrl: './cadastro-parametro.component.html',
  styleUrl: './cadastro-parametro.component.scss'
})
export class CadastroParametroComponent {

  @ViewChild(FormParametroComponent, { static: true }) formComponent!: FormParametroComponent;

  readonly MODAL_ID = 'alerta_cadastro_parametro';

  parametroRecemSalvo?: Parametro;

  modalOptions: ModalOptions = {
    width: '600px',
    height: 'fit-content'
  };

  constructor(
    private readonly navigationService: NavigationService,
    private readonly parametroService: ParametroService,
    private readonly toastService: ToastService,
    private readonly modalService: ModalService
  ) { }

  navigateListarParametros() {
    this.navigationService.navigateTo(ParametroRoutes.LISTAR);
  }

  navigateEditarParametro() {
    this.navigationService.navigateTo(ParametroRoutes.DETALHE('' + this.parametroRecemSalvo?.parametroID));
  }

  cancelar() {
    this.navigationService.back();
  }

  public salvarParametro() {
    delete this.parametroRecemSalvo;
    this.parametroService.postParametro(this.formComponent.getValue())
      .pipe(take(1))
      .subscribe({
        next: (parametro: Parametro) => {
          this.parametroRecemSalvo = parametro;
          this.modalService.open(this.MODAL_ID);
          this.toastService.showSuccess('Parâmetro cadastrado com sucesso!');
        },
        error: (error) => {
          this.toastService.showError('Erro ao salvar parametro!');
        }
      });
  }

}
