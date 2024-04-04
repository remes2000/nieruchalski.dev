import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import { BlogPostFeatureComponent } from '../../components/blog-post-feature/blog-post-feature.component';
import { RouteMeta } from '@analogjs/router';
import { BlogPost } from 'src/app/models/post';

export const routeMeta: RouteMeta = {
  title: 'Michał Nieruchalski',
  meta: [
    {
      name: 'description',
      content: 'My blog about tech',
    },
    {
      property: 'og:title',
      content: 'Michał Nieruchalski',
    },
    {
      property: 'og:description',
      content: 'My blog about tech',
    },
    {
      property: 'og:image',
      content: `${import.meta.env.VITE_WEBSITE_URL}/main-featured-image.jpg`,
    },
    {
      property: 'og:url',
      content: import.meta.env.VITE_WEBSITE_URL,
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
};

@Component({
  selector: 'app-blog-index-page',
  standalone: true,
  imports: [RouterLink, AsyncPipe, BlogPostFeatureComponent],
  template: `
    <div class="wrapper">
      <header>
        <h1>Hello <span class="funny-head">ヽ(•‿•)ノ</span></h1>
        <p>Nice to see you! Enjoy!</p>
      </header>
      <article>
        <h2>Recent posts</h2>
        <ul>
          @for (post of posts; track post.slug) {
            <li>
              <app-blog-post-feature [post]="post" />
            </li>
          }
        </ul>
      </article>
    </div>
  `,
  styleUrls: ['./index.page.scss'],
})
export default class BlogIndexPage {
  posts = injectContentFiles<BlogPost>()
    .toSorted(({ attributes: { date: aDate } }, { attributes: { date: bDate } }) => {
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    });
} 
