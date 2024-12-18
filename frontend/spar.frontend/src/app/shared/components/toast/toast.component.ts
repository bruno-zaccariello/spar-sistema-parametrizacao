import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ToastMessage, ToastService } from './toast.service';

@Component({
  selector: 'spar-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.3s ease', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('0.3s ease', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ToastComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject<void>();
  messages: Map<number, ToastMessage> = new Map();

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly toastService: ToastService
  ) { }

  ngOnInit() {
    this.toastService.getEvent()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((message: ToastMessage) => {
        this.messages.set(message.id, message);
        this.cdr.markForCheck();
        this.timeoutToast(message);
      });
  }

  private timeoutToast(message: ToastMessage): void {
    setTimeout(() => {
      this.closeToast(message.id);
    }, message.duration);
  }

  private closeToast(id: number) {
    this.messages.delete(id);
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
