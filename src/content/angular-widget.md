---
title: "Angular widget"
slug: angular-widget
subtitle: How do you find out if your friends like you?
thumbnail: /post-assets/angular-widget/thumbnail.jpg
date: 2025-11-24 20:00:00.000Z
author: Michał Nieruchalski
meta:
  - name: description
    content: "A short story about parsing and analyzing Facebook Messenger Chats"
  - property: og:title
    content: "Deciphering Facebook: Analyzing Messenger Chats"
  - property: og:description
    content: "A short story about parsing and analyzing Facebook Messenger Chats"
  - property: og:image
    content: https://nieruchalski.dev/post-assets/deciphering-facebook/header.jpg
  - property: og:url
    content: https://nieruchalski.dev/blog/deciphering-facebook
---

<!-- TODO: Figure our better title and description -->
<!-- TODO: compress the image -->
<figure>
  <img
    src="/post-assets/angular-widget/header.jpg"
    alt="Angular logo on bunch of boxes"
    title="Angular logo on bunch of boxes"
  />
  <figcaption>
    Photo by <a href="https://unsplash.com/photos/brown-cardboard-boxes-on-black-plastic-crate-q8kR_ie6WnI">Claudio Schwarz</a>
  </figcaption>
</figure>

# Background

During NG Poland 2025, Nir Kaufman gave a great talk titled 

> "Angular Without the Framework: When You Stop Following the Rules"

In it, he demonstrated how to configure Angular to create standalone widgets rather than full applications. He argued that the recent shift toward favoring "standalone" components has opened the door for using Angular in much smaller applications.

It all sounded like a cool idea, but I had one question: <u>What would be the bundle size of this Angular widget?</u>
In this article, I'll build a simple widget in Angular and inspect its size. Then I'll compare it with the same widget implemented in React and Preact.

<!-- TODO: fix the routing problem -->
> *tl;dr*

Let's imagine you're a maintainer of "CodeCorner", a 2006 website created for developers. Your task is to display a pie chart in the right sidebar showing the distribution of where currently active users are from. Since it's going to be a complex widget with advanced UI, you've decided to build it with a framework rather than vanilla JavaScript.

<figure>
  <img
    src="/post-assets/angular-widget/codecorner.png"
    alt="Facebook Messenger Logo"
    title="Facebook Messenger Logo"
  />
  <figcaption>CodeCorner - <a href="https://codecorner.nieruchalski.dev" target="_blank">demo</a></figcaption>
</figure>

# Angular widget

Here’s the code for the angular widget, on the side note, `@angular/core` and `@angular/platform-browser` are the only dependencies I have. So no routing, zone.js or rxjs.

```javascript
import { createApplication } from '@angular/platform-browser';
import { Component, computed, createComponent, signal } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';

const primaryTheme = ['#FF6384', '#36A2EB', '#FFCE56'];
const secondaryTheme = ['#00FF41', '#008F11', '#003B00'];

@Component({
  selector: 'pie-chart',
  template: `
    <figure [style]="{ textAlign: 'center' }">
      <svg viewBox="0 0 100 100" width="120" height="120">
        <path d="M 50 50 L 50 10 A 40 40 0 0 1 88 62 Z" [attr.fill]="colors()[0]">
          <title>30% Europe</title>
        </path>
        <path d="M 50 50 L 88 62 A 40 40 0 0 1 12 62 Z" [attr.fill]="colors()[1]">
          <title>45% North America</title>
        </path>
        <path d="M 50 50 L 12 62 A 40 40 0 0 1 50 10 Z" [attr.fill]="colors()[2]">
          <title>25% Asia</title>
        </path>
      </svg>
      <div [style]="{ textAlign: 'center', marginTop: '8px' }">
        <figcaption>Angular Pie Chart</figcaption>
        <button (click)="toggleTheme()">theme</button>
      </div>
    </figure>
  `
})
export class App {
  protected readonly theme = signal<'primary' | 'secondary'>('primary');
  protected readonly colors = computed(() => this.theme() === 'primary' ? primaryTheme : secondaryTheme);

  toggleTheme() {
    this.theme.update(t => t === 'primary' ? 'secondary' : 'primary');
  }
}

export async function buildWidget(host: HTMLElement = document.body) {
  const app = await createApplication({ providers: [provideZonelessChangeDetection()] });
  const comp = createComponent(App, { environmentInjector: app.injector });
  host.appendChild(comp.location.nativeElement);
  app.attachView(comp.hostView);
}
```

Then you build the project with ng build and voila! You get a bundled main.js file. Now you can distribute this file and use it as follows:

```javascript
import { buildWidget } from './main.js';
buildWidget(document.querySelector('.angular-pie'));
```

Okay, so it works. Let's inspect the size. The result is 105kB. That's a lot for a very simple pie chart, but I think it would be acceptable for more complex widgets. Let's compare it with other frameworks.

# React widget
Here’s the code for the react widget:

```javascript
import { useState } from 'react'
import { createRoot } from 'react-dom/client'

const primaryTheme = ['#FF6384', '#36A2EB', '#FFCE56'];
const secondaryTheme = ['#00FF41', '#008F11', '#003B00'];

function App() {
  const [ theme, setTheme ] = useState('primary');
  const colors = theme === 'primary' ? primaryTheme : secondaryTheme;

  function toggleTheme() {
    setTheme((t) => t === 'primary' ? 'secondary' : 'primary');
  }

  return (
    <figure style={{ textAlign: 'center' }}>
      <svg viewBox="0 0 100 100" width="120" height="120">
        <path d="M 50 50 L 50 10 A 40 40 0 0 1 88 62 Z" fill={colors[0]}>
          <title>30% Europe</title>
        </path>
        <path d="M 50 50 L 88 62 A 40 40 0 0 1 12 62 Z" fill={colors[1]}>
          <title>45% North America</title>
        </path>
        <path d="M 50 50 L 12 62 A 40 40 0 0 1 50 10 Z" fill={colors[2]}>
          <title>25% Asia</title>
        </path>
      </svg>
      <div style={{ textAlign: 'center', marginTop: '8px' }}>
        <figcaption>React Pie Chart</figcaption>
        <button onClick={toggleTheme}>theme</button>
      </div>
    </figure>
  );
}

export function buildWidget(host = document.body) {
  const root = createRoot(host);
  root.render(<App />);
}
```

I’ve decided to build it with `esbuild`. Here's my `esebuild` config:

```javascript
import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['src/main.jsx'],
  outdir: 'dist',
  format: 'esm',
  bundle: true,
  jsx: 'automatic',
  minify: true
}).then(() => {
  console.log('Build complete.');
}).catch(() => process.exit(1));
```

Then you build it with `pnpm build` and check the result. Surprisingly, the React widget is 195kB almost twice the size of Angular's! That's unexpected - before the experiment, I would have bet that Angular would be much worse.

# Preact widget
In the real world, for this use case I'd probably use Preact though. It gives you a React-like API and it's super small. Let's see how this would work in my use case.

Both the source code and esbuild config are almost identical with the react example above. You can check this [here](https://github.com/remes2000/angular-widgets/tree/main/packages/pie-preact).

The result is 14kB - much smaller than React and Angular versions.

# Summary
| Framework | Bundle Size  |
|-----------|--------------|
| Preact    | 14 kB        |
| Angular   | 105 kB       |
| React     | 195 kB       |


# Conculsions

1. It's totally possible to create single-component Angular applications (widgets). It's easy and straightforward.
2. In my tests, the resulting angular bundle size is about 2x smaller than React's - which came as a surprise.
3. Both Angular and React widgets are significantly bigger than theirs Preact alternative.

I’ve used `ng build` for the angular version, and `esbuild` for both react and preact. My measurements could be biased by the config of the bundler. If you think that's the case please let me know.

All the code is available on my [GitHub](https://github.com/remes2000/angular-widgets/tree/main)

Running demo of [CodeCorner](https://codecorner.nieruchalski.dev/)