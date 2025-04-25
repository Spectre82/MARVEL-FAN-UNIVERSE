export interface Hero {
  id: string;
  name: string;
  alterEgo?: string;
  image: string;
  description: string;
  firstAppearance?: string;
  abilities?: string[];
  mcuAppearances?: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  image: string;
  summary: string;
  content: string;
}