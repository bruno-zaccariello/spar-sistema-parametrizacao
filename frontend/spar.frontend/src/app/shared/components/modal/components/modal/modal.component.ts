import { CommonModule } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';
import { Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { IModalComponent } from '../../interfaces/modal-component.interface';
import { ModalData } from '../../models/modal-data.model';
import { ModalOptions } from '../../models/modal-options.model';
import { ModalService } from '../../services/modal.service';
import { ModalEventType } from '../../enums/modal-event-types.enum';
import { NgIcon } from '@ng-icons/core';
import { ModalHeaderComponent } from '../modal-header/modal-header.component';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  imports: [CommonModule, NgIcon],
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements IModalComponent, OnInit, OnDestroy {

  private _destroy = new Subject<void>();

  @Output('close')
  private readonly onClose = new EventEmitter<boolean>();

  @Output('open')
  private readonly onOpen = new EventEmitter<DialogRef>();

  @ContentChild(ModalHeaderComponent, { static: true })
  public modalHeader!: ModalHeaderComponent;

  @ContentChild(TemplateRef, { static: true })
  public bodyTemplate!: TemplateRef<any>;

  @ViewChild('modalTemplate', { static: true })
  public modalTemplate!: TemplateRef<any>;

  @Input()
  public modalId!: string;

  @Input()
  public title!: string;

  @Input()
  public options: ModalOptions = {};

  public get modalData(): ModalData {
    return {
      modalId: this.modalId,
      modalContent: this.modalTemplate,
      options: {
        ...ModalOptions.default(),
        ...this.options
      }

    }
  }

  public contextActions = {
    close: () => this.close(),
    open: () => this.open()
  }

  constructor(
    protected readonly modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.listenEvents();
    this.register();
  }

  public register(): void {
    this.modalService.register(this.modalData);
  }

  public unregister(): void {
    this.modalService.unregister(this.modalId);
  }

  public open() {
    this.modalService.open(this.modalId);
  }

  public close() {
    this.modalService.close(this.modalId);
  }

  public listenEvents() {
    this.modalService.listenEvents(this.modalId)
      .pipe(takeUntil(this._destroy))
      .subscribe(
        (event) => {
          switch (event.eventType) {
            case ModalEventType.OPEN:
              this.onOpen.emit();
              break;
            case ModalEventType.CLOSE:
              this.onClose.emit(true);
              break;
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.close();
    this.unregister();
    this._destroy.next();
  }

}
