import { injectContent } from "@analogjs/content";
import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { BlogPost } from "src/app/models/post";
import { BlogPostComponent } from "../../components/blog-post/blog-post.component";
import { ActivatedRoute } from "@angular/router";

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
  private readonly route = inject(ActivatedRoute);
  post$ = injectContent<BlogPost>({ param: 'slug', subdirectory: this.route.snapshot.paramMap.get('slug') });
}