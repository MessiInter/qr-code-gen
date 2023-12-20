import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  let appComponent: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    appComponent = new AppComponent();
  });

  it('should render app', () => {
    expect(compiled).toBeDefined();
  });

  it('should render header', () => {
    const header = compiled.querySelector(
      'header.app-header'
    ) as HTMLHeadElement;

    expect(header).toBeDefined();
  });

  it(`should have 'href' attribute in 'a' tag and equal to '/' (home)`, () => {
    const link = compiled.querySelector('header a') as HTMLElement;
    expect(link.getAttribute('href')).toEqual('/');
  });

  it(`should have 'aria-label' attribute in 'a' tag and equal to 'Home'`, () => {
    const link = compiled.querySelector('header a') as HTMLElement;
    expect(link.getAttribute('aria-label')).toEqual('Home');
  });

  it('should render QR Code icon', () => {
    const matIcon = compiled.querySelector(
      'header a mat-icon.qr-icon'
    ) as HTMLElement;

    expect(matIcon?.textContent).toEqual('qr_code_2');
  });

  it(`should render title 'QR Code Generator'`, () => {
    const title = compiled.querySelector('header a h1')?.textContent as string;
    expect(title).toEqual('QR Code Generator');
  });

  it('should have a line break after the title', () => {
    const br = compiled.querySelector('br') as HTMLBRElement;
    expect(br).toBeDefined();
  });

  it('should render main app', () => {
    const main = compiled.querySelector('main') as HTMLElement;
    expect(main).toBeDefined();
  });

  it('should render the form', () => {
    const form = compiled.querySelector(
      'main form.app-form'
    ) as HTMLFormElement;

    expect(form).toBeDefined();
  });

  it('should render the form field', () => {
    const formField = compiled.querySelector(
      'main form.app-form mat-form-field.form-field'
    ) as HTMLElement;

    expect(formField).toBeDefined();
  });

  it(`should have a label in the form field and equal to 'QR Data'`, () => {
    const label = compiled.querySelector(
      'main form.app-form mat-form-field.form-field mat-label'
    )?.textContent as string;
    expect(label).toEqual('QR Data');
  });
});
