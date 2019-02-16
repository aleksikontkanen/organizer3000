import { Injector } from '@angular/core';

let appInjector: Injector;

export function setAppInjector(injector: Injector): void {
    if (appInjector) {
        throw new Error('AppInjector can only be set once');
    }

    appInjector = injector;
}

export function getAppInjector(): Injector {
    if (!appInjector) {
        throw new Error('AppInjector is not set');
    }

    return appInjector;
}
