import { animate, state, style, transition, trigger } from "@angular/animations";

export const slideLeft = trigger('slideLeft', [
  state('void', style({ transform: 'translateX(100%)' })),
  state('*', style({ transform: 'translateX(0)' })),
  transition('void => *', [
    animate('300ms ease-in')
  ]),
  transition('* => void', [
    animate('300ms ease-out', style({ transform: 'translateX(100%)' }))
  ])
]);