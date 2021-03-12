import { ToasterService } from './core/services/toaster.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpTokenInterceptor } from './core/interceptor/http-token.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
  ],
  providers: [
    ToasterService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
