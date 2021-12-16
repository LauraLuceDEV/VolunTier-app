import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoluntaryFormStrengthsPage } from './voluntary-form-strengths.page';

describe('VoluntaryFormStrengthsPage', () => {
  let component: VoluntaryFormStrengthsPage;
  let fixture: ComponentFixture<VoluntaryFormStrengthsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VoluntaryFormStrengthsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoluntaryFormStrengthsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
