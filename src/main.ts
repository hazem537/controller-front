import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { registerLocaleData } from '@angular/common';
import localeArEG from '@angular/common/locales/ar-EG';

registerLocaleData(localeArEG, 'ar-EG');


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
