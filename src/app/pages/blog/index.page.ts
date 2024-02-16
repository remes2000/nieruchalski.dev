import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import { BlogPost } from 'src/app/models/post';

@Component({
  selector: 'app-blog-index-page',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  template: `
    <h2>Posts</h2>
    <ul>
      @for (post of posts; track post.slug) {
        <li>
          <a [routerLink]="['/blog', post.slug]">{{ post.attributes.title }}</a>
        </li>
      }
    </ul> 
  `,
})
export default class BlogIndexPage {
  posts = injectContentFiles<BlogPost>();
} 
