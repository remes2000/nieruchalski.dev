import { MarkdownComponent, injectContent } from "@analogjs/content";
import { AsyncPipe, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { BlogPost } from "src/app/models/post";

@Component({
  selector: 'app-blog-post-page',
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe, NgIf],
  template: `
    <ng-container *ngIf="post$ | async as post">
      <h2>{{ post.attributes.title }}</h2>

      <analog-markdown [content]="post.content" />
    </ng-container>
  `
})
export default class BlogPostPage {
  post$ = injectContent<BlogPost>();
}