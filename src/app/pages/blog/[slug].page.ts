import { injectContent } from "@analogjs/content";
import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { BlogPost } from "src/app/models/post";
import { BlogPostComponent } from "../../components/blog-post/blog-post.component";

@Component({
  selector: 'app-blog-post-page',
  standalone: true,
  imports: [AsyncPipe, BlogPostComponent],
  template: `<app-blog-post [post]="post$ | async" />`
})
export default class BlogPostPage {
  post$ = injectContent<BlogPost>();
}