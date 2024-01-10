/**
 * @jest-environment jsdom
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();
  });

  it('should create header component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    expect(
      compiled.querySelector('header.app-header a h1')?.textContent
    ).toContain('QR Code Generator');
  });

  it(`should have as title 'QR Code Generator'`, () => {
    expect(component.title).toEqual('QR Code Generator');
  });
});
