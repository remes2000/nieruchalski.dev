import { injectContent } from "@analogjs/content";
import { AsyncPipe } from "@angular/common";
import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { BlogPost } from "src/app/models/post";
import { BlogPostComponent } from "../../components/blog-post/blog-post.component";
import { Meta, Title } from "@angular/platform-browser";
import { Subject, takeUntil } from "rxjs";
import { RouteMeta } from "@analogjs/router";

export const routeMeta: RouteMeta = {
  meta: [
    {
      property: 'og:type',
      content: 'article',
    }
  ],
};

@Component({
    selector: 'app-blog-post-page',
    imports: [AsyncPipe, BlogPostComponent],
    template: `
    @if (post$ | async; as post) {
      <app-blog-post [post]="post" />
    }
  `
})
export default class BlogPostPage implements OnInit, OnDestroy {
  title = inject(Title);
  meta = inject(Meta);
  post$ = injectContent<BlogPost>();
  destroyed$ = new Subject<void>();

  ngOnInit(): void {
    this.post$.pipe(takeUntil(this.destroyed$)).subscribe(({ attributes }) => {
      this.title.setTitle(attributes.title);
      // todo: clear metatags on destroy
      (attributes.meta ?? []).forEach((metaTag) => {
        this.meta.updateTag(metaTag);
      });
    });
  }
  
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}