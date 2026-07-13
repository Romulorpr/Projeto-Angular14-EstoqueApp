import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NovProdComponent } from './nov-prod.component';

describe('NovProdComponent', () => {
  let component: NovProdComponent;
  let fixture: ComponentFixture<NovProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovProdComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});