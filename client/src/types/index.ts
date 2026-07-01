export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Snippet {
  _id: string;
  title: string;
  code: string;
  language: string;
  description: string;
  tags: string[];
  isStarred: boolean;
  isPublic: boolean;
  slug?: string;
  createdAt: string;
}
