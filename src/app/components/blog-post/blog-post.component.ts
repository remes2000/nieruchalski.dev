import { ContentFile, MarkdownComponent } from '@analogjs/content';
import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BlogPost } from 'src/app/models/post';

@Component({
    selector: 'app-blog-post',
    imports: [MarkdownComponent, DatePipe],
    templateUrl: './blog-post.component.html',
    styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent {
  @Input({ required: true }) post: ContentFile<BlogPost | Record<string, never>>;
}
