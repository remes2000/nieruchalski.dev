import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter } from '@analogjs/router';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import 'prismjs/components/prism-sql';
import { MatomoConsentMode, provideMatomo, withRouter } from 'ngx-matomo-client';
import { environment } from './../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideContent(withMarkdownRenderer()),
    provideMatomo(
      {
        siteId: environment.matomoSiteId,
        trackerUrl: environment.matomoSiteUrl,
        requireConsent: MatomoConsentMode.COOKIE,
      },
      withRouter(),
    )
  ],
};
