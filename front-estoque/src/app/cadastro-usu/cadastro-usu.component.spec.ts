import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'; // 👈 novo

import { CadastroUsuComponent } from './cadastro-usu.component';

describe('CadastroUsuComponent', () => {
  let component: CadastroUsuComponent;
  let fixture: ComponentFixture<CadastroUsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroUsuComponent ],
      imports: [ ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule ] // 👈 adicionado aqui
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroUsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});