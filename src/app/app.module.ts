import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }  from './app.component';

import { PagerService } from './_services/pager.service';
import { PagerComponent } from './pager/pager.component';
import { PaginationFooterComponent } from './pagination-footer/pagination-footer.component';


@NgModule({
  declarations: [
    AppComponent,
    PagerComponent,
    PaginationFooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
