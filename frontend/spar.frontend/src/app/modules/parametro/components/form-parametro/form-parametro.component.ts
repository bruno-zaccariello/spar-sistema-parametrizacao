import { JsonEditorOptions } from 'ang-jsoneditor';
import { Component, forwardRef, Input } from '@angular/core';
import { FormOf } from '../../../../core/utils/form.util';
import { Parametro } from '../../../../core/models/parametro.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AbstractFormComponent } from '../../../../core/interfaces/abstract-form-component.interface';
import { JsonEditorComponent } from '../../../../shared/components/json-editor/json-editor.component';


export type ParametroForm = FormOf<Parametro>;

@Component({
  selector: 'spar-form-parametro',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, JsonEditorComponent],
  templateUrl: './form-parametro.component.html',
  styleUrl: './form-parametro.component.scss',
  providers: [
    {
      provide: AbstractFormComponent,
      useExisting: forwardRef(() => FormParametroComponent)
    }
  ]
})
export class FormParametroComponent extends AbstractFormComponent<Parametro | Partial<Parametro>> {

  @Input() parametro?: Parametro;
  @Input() required = false;

  editorOptions: JsonEditorOptions = new JsonEditorOptions();

  readonly PLACEHOLDER_DESCRICAO = 'Esse sistema é utilizado com finalidades de teste e desenvolvimento.';

  form!: FormGroup<FormOf<Parametro | Partial<Parametro>>>;

  constructor(
    private readonly fb: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.editorOptions.mode = 'tree';
    this.editorOptions.modes = ['code', 'form', 'text', 'tree', 'view'];

    this.form = this.fb.group(
      ({
        parametroID: this.fb.control(this.parametro?.parametroID),
        chave: this.fb.control(this.parametro?.chave, this.getValidator()),
        valorJson: this.fb.control(JSON.parse(this.parametro?.valorJson ?? ''), this.getValidator()),
        sistema: this.fb.control(this.parametro?.sistema, this.getValidator())
      } as FormOf<Parametro | Partial<Parametro>>)
    );
  }

  private getValidator() {
    return this.required ? [Validators.required] : [];
  }

}
