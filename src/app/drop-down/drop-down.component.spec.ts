import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';
import * as rxjs from 'rxjs';

import { DropDownComponent } from './drop-down.component';

describe('DropDownComponent', () => {
  let component: DropDownComponent;
  let fixture: ComponentFixture<DropDownComponent>;

  const dropdownStub: string[] = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DropDownComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('OnIninit', () => {
    it('Should render default field when initialize the Dropdown', () => {
      //Arrange
      const defaultValue = dropdownStub[0];
      const dropdownElement = fixture.debugElement.query(
        By.css('.dropdown-value')
      ).nativeElement.textContent;

      // Act
      component.ngOnInit();

      // Assert
      expect(dropdownElement).toEqual(defaultValue);
      expect(component.currentValue).toEqual(defaultValue);
    });
  });

  describe('dropdown functionalities', () => {
    it('Should populate options in the dropdown', () => {
      //Arrange
      const dropdownOptions = fixture.debugElement.queryAll(By.css('li span'));

      // Act
      component.ngOnInit();

      // Assert
      dropdownOptions.forEach((option, i) => {
        expect(option.nativeElement.textContent).toContain(dropdownStub[i]);
      });
      expect(dropdownOptions.length).toEqual(6);
    });

    it('Should close the dropdown when user choose a value', () => {
      //Arrange
      const valueSelected = 'Option 1';
      const subject = new BehaviorSubject<boolean>(false);

      //Act
      component.select(valueSelected);

      // Assert
      expect(component.currentValue).toEqual('Option 1');
      expect(component.dropdownOpen$.getValue()).toEqual(subject.getValue());
    });

    it('Should make toggle when dropdown value is false', () => {
      //Arrange
      const subject$ = new BehaviorSubject(false);

      //Act
      component.toggleDropdown();

      //Assert
      subject$.next(true);
      expect(component.dropdownOpen$.getValue()).toEqual(subject$.getValue());
    });

    it('Should make toggle when dropdown value is true', () => {
      //Arrange
      const subject$ = new BehaviorSubject(false);

      //Act
      component.dropdownOpen$.next(true);
      component.toggleDropdown();

      //Assert
      expect(component.dropdownOpen$.getValue()).toEqual(subject$.getValue());
    });

    it('Should close the dropdown when clicking outside', () => {
      //Arrange
      const subject$ = new BehaviorSubject(false);

      //Act
      component.ngOnInit();
      document.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      //Assert
      expect(component.dropdownOpen$.getValue()).toEqual(subject$.getValue());
    });
  });
});
