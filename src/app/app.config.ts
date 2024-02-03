import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LOCALE_ID} from '@angular/core';
import { routes } from './app.routes';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { authIntreceprtorService } from './services/auth.interceptor.service';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom([BrowserAnimationsModule]),
    importProvidersFrom(HttpClientModule),
   
    {provide:LOCALE_ID , useValue:"ar-EG"},
    { provide: HTTP_INTERCEPTORS, useClass: authIntreceprtorService, multi: true }
  ],
};
