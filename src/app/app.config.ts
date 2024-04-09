import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withViewTransitions()),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase))),
      importProvidersFrom(provideAuth(() => getAuth())),
      importProvidersFrom(provideDatabase(() => getDatabase()))]
};
 