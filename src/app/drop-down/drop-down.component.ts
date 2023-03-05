import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription, switchMap } from 'rxjs';
import { options_select } from './drop-down-data';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
})
export class DropDownComponent implements OnInit, OnDestroy {
  currentValue!: string;
  dropdownOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  options: string[] = options_select;

  @ViewChild('dropdown', { static: false }) elem!: ElementRef;
  private subscription!: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.currentValue = this.options[0];
    this.clickOutOfDropdown();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleDropdown(): void {
    !this.dropdownOpen$.getValue()
      ? this.dropdownOpen$.next(true)
      : this.dropdownOpen$.next(false);
  }

  select(value: string): void {
    this.currentValue = value; // Do something with this value...
    this.closeDropdown();
  }

  private clickOutOfDropdown(): void {
    this.subscription = fromEvent(document, 'click').subscribe((e: Event) => {
      if (!this.elem.nativeElement.contains(e.target)) {
        this.dropdownOpen$.next(false);
      }
    });
  }

  private closeDropdown() {
    this.elem.nativeElement.setAttribute('aria-expanded', 'false');
    this.dropdownOpen$.next(false);
  }
}
