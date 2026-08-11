export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
}

export interface Blog {
  slug: string;
  title: string;
  description: string;
  content: string;
}