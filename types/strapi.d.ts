interface Tag {
  id: number;
  name: string;
}

interface BlogPost {
  id: number;
  title: string;
  content: string;
  tags: number[];
  publishedAt: Date;
}

interface QueryParams {
  where?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

interface QueryResult<T> {
  findOne: (params: QueryParams) => Promise<T | null>;
  create: (params: QueryParams) => Promise<T>;
}

interface StrapiDB {
  query: <T>(uid: string) => QueryResult<T>;
}

interface Strapi {
  db: StrapiDB;
}

declare const strapi: Strapi; 