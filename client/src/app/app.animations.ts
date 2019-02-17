import { trigger, transition, style, animate } from '@angular/animations';

export const APP_ANIMATIONS = [
    trigger('note', [
        transition(':enter', [
            style({
                transform: 'scale(1.1)',
                opacity: 0,
                pointerEvents: 'none'
            }),
            animate('200ms ease-out')
        ])
    ]),
    trigger('task', [
        transition(':enter', [
            style({
                transform: 'translateX(-3%)',
                opacity: 0,
                pointerEvents: 'none'
            }),
            animate('300ms ease-out')
        ]),
        transition('* => void', [
            animate('500ms ease-in'),
            style({
                transform: 'scale(0.95)',
                opacity: 0,
                pointerEvents: 'none'
            })
        ])
    ])
];
