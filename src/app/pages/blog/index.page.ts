import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import { BlogPostFeatureComponent } from '../../components/blog-post-feature/blog-post-feature.component';
import { RouteMeta } from '@analogjs/router';
import { BlogPost } from 'src/app/models/post';
import { WEBSITE_URL } from '../../const';

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
      content: `${WEBSITE_URL}/main-featured-image.jpg`,
    },
    {
      property: 'og:url',
      content: WEBSITE_URL,
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
  styles: [`
    .wrapper {
      max-width: 90rem;
      margin: 0 auto;
      padding: 0 4rem;

      @media screen and (max-width: 500px) {
        padding: 0 2.4rem;
      }

      & > article > ul {
        margin-top: 1.5rem;
        list-style-type: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      & > header {
        margin: 5rem 0;
        font-size: 1.8rem;
        p {
          font-size: 1.2rem;
        }
        .funny-head {
          white-space: nowrap;
          line-height: 2;
        }

        @media screen and (max-width: 400px) {
          text-align: center;
        }        
      }
    }
  `]
})
export default class BlogIndexPage {
  posts = injectContentFiles<BlogPost>();
} 
