import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoluntaryFinishTaskPage } from './voluntary-finish-task.page';

describe('VoluntaryFinishTaskPage', () => {
  let component: VoluntaryFinishTaskPage;
  let fixture: ComponentFixture<VoluntaryFinishTaskPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VoluntaryFinishTaskPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoluntaryFinishTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
