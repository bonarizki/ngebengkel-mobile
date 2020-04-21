import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormServicePage } from './form-service.page';

describe('FormServicePage', () => {
  let component: FormServicePage;
  let fixture: ComponentFixture<FormServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
