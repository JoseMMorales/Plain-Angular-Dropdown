import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DropDownComponent } from './drop-down/drop-down.component';

@NgModule({
  declarations: [AppComponent, DropDownComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
