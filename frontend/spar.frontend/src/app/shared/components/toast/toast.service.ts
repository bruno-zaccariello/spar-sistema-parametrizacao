import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private static DURATION_MS = 5000;
  private static genId = ToastService.idGenerator();

  private static *idGenerator(): Generator<number> {
    let id = 0;
    while (true) {
      yield id++;
    }
  }

  messagesSubject = new Subject<ToastMessage>();

  constructor() { }

  public getEvent(): Observable<ToastMessage> {
    return this.messagesSubject.asObservable();
  }

  public showSuccess(message: string, duration: number = ToastService.DURATION_MS): void {
    this.emit(new ToastMessage(message, 'success', duration));
  }

  public showError(message: string, duration: number = ToastService.DURATION_MS): void {
    this.emit(new ToastMessage(message, 'error', duration));
  }

  public showInfo(message: string, duration: number = ToastService.DURATION_MS): void {
    this.emit(new ToastMessage(message, 'info', duration));
  }

  public showWarning(message: string, duration: number = ToastService.DURATION_MS): void {
    this.emit(new ToastMessage(message, 'warning', duration));
  }

  public emit(event: ToastMessage): void {
    this.messagesSubject.next(this.assignId(event));
  }

  private assignId(message: ToastMessage): ToastMessage {
    message.id = ToastService.genId.next().value;
    return message;
  }
}

export class ToastMessage {
  constructor(
    public message: string,
    public type: 'success' | 'error' | 'info' | 'warning' = 'info',
    public duration: number = 5000
  ) { }

  public id!: number;
}