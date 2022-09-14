export interface Article {
  article_id: string;
  article_info: ArticleInfo;
  category: Category;
  tags: Tag[];
}

export interface ArticleInfo {
  article_id: string;
  cover_image: string;
  title: string;
  brief_content: string;
  mark_content: string;
  ctime: string;
  mtime: string;
  rtime: string;
  view_count: number;
  collect_count: number;
  digg_count: number;
  comment_count: number;
}

export interface Category {
  category_id: string;
  category_name: string;
}

export interface Tag {
  id: number;
  tag_id: string;
  tag_name: string;
}
