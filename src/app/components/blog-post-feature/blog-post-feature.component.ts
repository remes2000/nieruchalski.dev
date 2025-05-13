import { ContentFile } from '@analogjs/content';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPost } from 'src/app/models/post';

@Component({
    selector: 'app-blog-post-feature',
    imports: [RouterLink],
    templateUrl: './blog-post-feature.component.html',
    styleUrl: './blog-post-feature.component.scss'
})
export class BlogPostFeatureComponent {
  @Input({ required: true }) post: ContentFile<BlogPost | Record<string, never>>;
}
