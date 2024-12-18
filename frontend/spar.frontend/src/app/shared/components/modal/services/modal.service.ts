import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, take } from 'rxjs';
import { ModalData } from '../models/modal-data.model';
import { ModalEvent } from '../models/modal-event.model';
import { ModalEventType } from '../enums/modal-event-types.enum';
import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';

@Injectable({ providedIn: 'root' })
export class ModalService {

  public static readonly UNIVERSAL_ID = '*'

  public isModalOpen = false;

  private modalRegistry = new Map<string, ModalData>();

  private readonly OPEN_EVENT = (data: ModalData) => new ModalEvent(ModalEventType.OPEN, data);
  private readonly CLOSE_EVENT = (data: ModalData) => new ModalEvent(ModalEventType.CLOSE, data);

  private modalsTopic: BehaviorSubject<ModalEvent> = new BehaviorSubject(
    new ModalEvent(ModalEventType.CLOSE, { modalId: ModalService.UNIVERSAL_ID })
  );

  constructor(
    private readonly dialog: Dialog
  ) { }

  private check(): void {
    if (this.dialog.openDialogs.length > 0) {
      this.isModalOpen = true;
    } else {
      this.isModalOpen = false;
    }
  }

  private openModal(modalData: ModalData): DialogRef | undefined {
    const element = modalData.modalContent;
    if (!element) { return; }

    const dialogRef = this.dialog.open(element, modalData?.options);
    modalData.dialogRef = dialogRef;

    this.handleDialogRefEvents(modalData);
    this.modalsTopic.next(this.OPEN_EVENT(modalData));
    this.check();

    return (dialogRef as DialogRef);
  }

  private handleDialogRefEvents(modalData: ModalData) {
    modalData?.dialogRef?.closed
      .pipe(take(1))
      .subscribe(() => {
        this.externallClose(modalData.modalId);
      });
  }

  private externallClose(modalId: string): void {
    const data = this.modalRegistry.get(modalId);
    const ref = data?.dialogRef;
    if (!data || !ref) {
      this.dialog.closeAll();
    } else {
      delete data.dialogRef;
      this.modalsTopic.next(this.CLOSE_EVENT(data));
    }
  }

  register(data: ModalData): void {
    this.modalRegistry.set(data.modalId, data);
  }

  unregister(modalId: string): void {
    this.modalRegistry.delete(modalId);
  }

  listenEvents(modalId: string): Observable<ModalEvent> {
    return this.modalsTopic
      .asObservable()
      .pipe(filter(event => event?.data?.modalId === modalId));
  }

  open(modalId: string): DialogRef | undefined {
    const data = this.modalRegistry.get(modalId);
    if (!data) { return; }

    if (!data.options?.repeatable && data.dialogRef) {
      return;
    }
    return this.openModal(data);
  }

  close(modalId: string): void {
    const data = this.modalRegistry.get(modalId);
    const ref = data?.dialogRef;
    if (!data || !ref) {
      this.dialog.closeAll();
    } else {
      ref.close();
      delete data.dialogRef;
      this.modalsTopic.next(this.CLOSE_EVENT(data));
      this.check();
    }
  }

  closeAll() {
    this.dialog.closeAll();
    this.modalsTopic.next(this.CLOSE_EVENT({ modalId: ModalService.UNIVERSAL_ID }))
  }

}
