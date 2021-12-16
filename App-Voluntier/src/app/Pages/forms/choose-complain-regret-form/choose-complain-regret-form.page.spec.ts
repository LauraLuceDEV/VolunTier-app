import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChooseComplainRegretFormPage } from './choose-complain-regret-form.page';

describe('ChooseComplainRegretFormPage', () => {
  let component: ChooseComplainRegretFormPage;
  let fixture: ComponentFixture<ChooseComplainRegretFormPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseComplainRegretFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseComplainRegretFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
