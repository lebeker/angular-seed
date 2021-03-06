import { FormsModule } from '@angular/forms';
import {
  async,
  TestBed
 } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { HomeComponent } from './home.component';
import { ScientistService } from '../shared/name-list/name-list.service';

export function main() {
  describe('Home component', () => {

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [HomeComponent],
        providers: [
          { provide: ScientistService, useValue: new MockScientistService() }
        ]
      });

    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(HomeComponent);
            let homeInstance = fixture.debugElement.componentInstance;
            let homeDOMEl = fixture.debugElement.nativeElement;
            let mockScientistService = <MockScientistService>fixture.debugElement.injector.get(ScientistService);
            let nameListServiceSpy = spyOn(mockScientistService, 'list').and.callThrough();

            mockScientistService.returnValue = ['1', '2', '3'];

            fixture.detectChanges();

            expect(homeInstance.nameListService).toEqual(jasmine.any(MockScientistService));
            expect(homeDOMEl.querySelectorAll('li').length).toEqual(3);
            expect(nameListServiceSpy.calls.count()).toBe(1);

            homeInstance.newName = 'Minko';
            homeInstance.addName();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li').length).toEqual(4);
            expect(homeDOMEl.querySelectorAll('li')[3].textContent).toMatch('Minko');
          });

      }));
  });
}

class MockScientistService {

  returnValue: string[];

  list(): Observable<string[]> {
      return Observable.create((observer: any) => {
          observer.next(this.returnValue);
          observer.complete();
      });
  }
  post(val:string): Promise<boolean> {
      this.returnValue.push(val);
      return Promise.resolve(true);
  }
}
