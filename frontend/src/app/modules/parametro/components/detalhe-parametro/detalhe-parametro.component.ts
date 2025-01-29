import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { AbstractFormComponent } from '../../../../core/interfaces/abstract-form-component.interface';
import { Parametro } from '../../../../core/models/parametro.model';
import { NavigationService } from '../../../../core/services/navigation.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { ParametroService } from '../../services/parametro.service';
import { FormParametroComponent } from '../form-parametro/form-parametro.component';

@Component({
  selector: 'spar-detalhe-parametro',
  templateUrl: './detalhe-parametro.component.html',
  styleUrl: './detalhe-parametro.component.scss',
  imports: [CommonModule, FormParametroComponent]
})
export class DetalheParametroComponent {

  parametroId?: number;
  parametro!: Parametro;

  @ViewChild(AbstractFormComponent) formComponent!: AbstractFormComponent<Parametro>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly toastService: ToastService,
    private readonly parametroService: ParametroService,
  ) { }

  ngOnInit() {
    this.parametroId = this.route.snapshot.params['id'];
    if (this.parametroId) {
      this.carregarParametro();
    }
  }

  cancelar() {
    this.navigationService.back();
  }

  public carregarParametro() {
    if (!this.parametroId) {
      return;
    }
    this.parametroService.getParametro(this.parametroId)
      .subscribe((parametro: Parametro) => {
        this.parametro = parametro;
      }
      );
  }

  public salvarParametro() {
    const formValue = this.formComponent.getValue();
    this.parametroService.putParametro({
      ...formValue,
      valorJson: JSON.stringify(formValue.valorJson),
      SistemaId: formValue.sistema?.sistemaID
    })
      .pipe(take(1))
      .subscribe((parametro: Parametro) => {
        this.parametro = parametro;
        this.toastService.showSuccess('Sistema salvo com sucesso!');
      }
      );
  }

}
