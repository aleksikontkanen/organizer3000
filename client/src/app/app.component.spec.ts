import { TestBed, async, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppService } from './app-service/app.service';
import { AppServiceMock } from './app-service/app.service.mock';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let app: AppComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: [{
                provide: AppService,
                useClass: AppServiceMock
            }],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;
    }));

    it('should create the app', () => {
        expect(app).toBeTruthy();
    });

    it('should subscribe to lists', fakeAsync(() => {
        const serviceSpy = spyOn(AppServiceMock.prototype, 'getTodoLists').and.callThrough();

        fixture.detectChanges();

        expect(serviceSpy.calls.count()).toBe(1);
    }));
});
