import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';

describe('AppService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [{
            provide: HttpClient,
            useValue: {
                get: (...args: any): any => { },
                post: (...args: any): any => { },
                put: (...args: any): any => { },
                delete: (...args: any): any => { }
            }
        }]
    }));

    it('should be created', () => {
        const service: AppService = TestBed.get(AppService);
        expect(service).toBeTruthy();
    });
});
