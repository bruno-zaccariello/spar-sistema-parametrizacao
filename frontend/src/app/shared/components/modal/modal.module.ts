import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalBodyComponent } from './components/modal-body/modal-body.component';
import { ModalFooterComponent } from './components/modal-footer/modal-footer.component';
import { ModalHeaderComponent } from './components/modal-header/modal-header.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './services/modal.service';

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
