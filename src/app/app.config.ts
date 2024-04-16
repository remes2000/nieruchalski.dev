import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter } from '@analogjs/router';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-c';
import { MatomoConsentMode, provideMatomo, withRouter } from 'ngx-matomo-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideContent(withMarkdownRenderer()),
    provideMatomo(
      {
        siteId: +import.meta.env.VITE_MATOMO_SITE_ID,
        trackerUrl: import.meta.env.VITE_MATOMO_SITE_URL,
        requireConsent: MatomoConsentMode.COOKIE,
      },
      withRouter(),
    )
  ],
};
