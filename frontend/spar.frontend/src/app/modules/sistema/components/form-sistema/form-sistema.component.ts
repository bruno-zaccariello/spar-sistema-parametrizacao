import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AbstractFormComponent } from '../../../../core/interfaces/abstract-form-component.interface';
import { Sistema } from '../../../../core/models/sistema.model';
import { FormOf } from '../../../../core/utils/form.util';

type SistemaForm = FormOf<Sistema>;

@Component({
  selector: 'spar-form-sistema',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-sistema.component.html',
  styleUrl: './form-sistema.component.scss',
  providers: [
    {
      provide: AbstractFormComponent,
      useExisting: forwardRef(() => FormSistemaComponent)
    }
  ]
})
export class FormSistemaComponent extends AbstractFormComponent<Sistema | Partial<Sistema>> {

  @Input() sistema?: Sistema;
  @Input() required = false;

  readonly PLACEHOLDER_DESCRICAO = 'Esse sistema é utilizado com finalidades de teste e desenvolvimento.';

  form!: FormGroup<FormOf<Sistema | Partial<Sistema>>>;

  constructor(
    private readonly fb: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group(
      ({
        sistemaID: this.fb.control(this.sistema?.sistemaID),
        nome: this.fb.control(this.sistema?.nome, this.getValidator()),
        descricao: this.fb.control(this.sistema?.descricao, this.getValidator())
      } as FormOf<Sistema | Partial<Sistema>>)
    );
  }

  private getValidator() {
    return this.required ? [Validators.required] : [];
  }

}
