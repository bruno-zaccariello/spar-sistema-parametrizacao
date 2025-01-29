import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { take } from 'rxjs';
import { AbstractFormComponent } from '../../../../core/interfaces/abstract-form-component.interface';
import { Parametro } from '../../../../core/models/parametro.model';
import { Sistema } from '../../../../core/models/sistema.model';
import { FormOf } from '../../../../core/utils/form.util';
import { JsonEditorComponent } from '../../../../shared/components/json-editor/json-editor.component';
import { SistemaService } from '../../../sistema/services/sistema.service';


export type ParametroForm = FormOf<Parametro>;

@Component({
  selector: 'spar-form-parametro',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, JsonEditorComponent, MatSelectModule],
  templateUrl: './form-parametro.component.html',
  styleUrl: './form-parametro.component.scss',
  providers: [
    {
      provide: AbstractFormComponent<Parametro>,
      useExisting: forwardRef(() => FormParametroComponent)
    }
  ]
})
export class FormParametroComponent extends AbstractFormComponent<Parametro | Partial<Parametro>> {

  @Input() parametro?: Parametro;
  @Input() required = false;

  sistemas!: Sistema[];

  editorOptions: JsonEditorOptions = new JsonEditorOptions();

  readonly PLACEHOLDER_DESCRICAO = 'Esse sistema é utilizado com finalidades de teste e desenvolvimento.';

  form!: FormGroup<FormOf<Parametro | Partial<Parametro>>>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly sistemaService: SistemaService
  ) {
    super();
  }

  ngOnInit() {
    this.iniciarForm();
    setTimeout(() => {
      this.carregarSistemas();
    })
  }

  private iniciarForm() {
    this.editorOptions.mode = 'tree';
    this.editorOptions.modes = ['code', 'form', 'text', 'tree', 'view'];

    this.form = this.fb.group(
      ({
        parametroID: this.fb.control(this.parametro?.parametroID),
        chave: this.fb.control(this.parametro?.chave, this.getValidator()),
        valorJson: this.fb.control(JSON.parse(this.parametro?.valorJson ?? '{}'), this.getValidator()),
        sistemaID: this.fb.control(this.parametro?.sistema?.sistemaID, this.getValidator())
      } as FormOf<Parametro | Partial<Parametro>>)
    );
  }

  private carregarSistemas() {
    this.sistemaService.getAll()
      .pipe(take(1))
      .subscribe(sistemas => {
        this.sistemas = sistemas;
      });
  }

  private getValidator() {
    return this.required ? [Validators.required] : [];
  }

}
