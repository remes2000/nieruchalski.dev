import { injectContent } from "@analogjs/content";
import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { BlogPost } from "src/app/models/post";
import { BlogPostComponent } from "../../components/blog-post/blog-post.component";

@Component({
  selector: 'app-blog-post-page',
  standalone: true,
  imports: [AsyncPipe, BlogPostComponent],
  template: `
    @if (post$ | async; as post) {
      <app-blog-post [post]="post" />
    }
  `
})
export default class BlogPostPage {
  post$ = injectContent<BlogPost>();
}