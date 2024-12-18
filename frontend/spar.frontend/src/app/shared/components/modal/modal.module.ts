import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { DialogModule } from '@angular/cdk/dialog';
import { ModalService } from './services/modal.service';
import { ModalHeaderComponent } from './components/modal-header/modal-header.component';
import { ModalFooterComponent } from './components/modal-footer/modal-footer.component';
import { ModalBodyComponent } from './components/modal-body/modal-body.component';

const components = [
  ModalComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent
]

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    ...components
  ],
  providers: [
    ModalService
  ],
  exports: [...components]
})
export class ModalModule { }
