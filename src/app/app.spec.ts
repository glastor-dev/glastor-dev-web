import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { PortalComponent } from './portal';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('debería instanciar la clase AppComponent correctamente', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

describe('PortalComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('debería instanciar la clase PortalComponent correctamente', () => {
    const fixture = TestBed.createComponent(PortalComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('debería tener el nombre de marca GLASTOR ® correcto por defecto', () => {
    const fixture = TestBed.createComponent(PortalComponent);
    const app = fixture.componentInstance;
    expect(app.brandName).toEqual('GLASTOR ® - Mayorista');
  });

  it('debería inicializar con las vistas por defecto', () => {
    const fixture = TestBed.createComponent(PortalComponent);
    const app = fixture.componentInstance;
    expect(app.currentView()).toEqual('inicio');
  });
});
