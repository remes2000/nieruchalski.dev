export interface BlogPost {
  title: string;
  thumbnail: string;
  subtitle?: string;
  date?: string;
  author?: string;
  meta?: {
    name?: string;
    property?: string;
    content?: string;
  }[]
}
