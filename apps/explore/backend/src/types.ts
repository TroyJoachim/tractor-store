export interface Teaser {
  title: string;
  image: string;
  url: string;
}

export interface Product {
  name: string;
  id: string;
  image: string;
  startPrice: number;
  url: string;
}

export interface Category {
  key: string;
  name: string;
  products: Product[];
}

export interface Recommendation {
  name: string;
  sku: string;
  image: string;
  url: string;
  rgb: [number, number, number];
}

export interface Store {
  id: string;
  name: string;
  street: string;
  city: string;
  image: string;
}

export interface DatabaseData {
  teaser: Teaser[];
  categories: Category[];
  recommendations: Record<string, Recommendation>;
  stores: Store[];
}

export interface Filter {
  url: string;
  name: string;
  active: boolean;
}

export interface CategoryPageData {
  title: string;
  products: Product[];
  filters: Filter[];
}

export interface HomePageData {
  teaser: Teaser[];
}

export interface StoresPageData {
  stores: Store[];
}

export interface RecommendationsFragmentData {
  recommendations: Recommendation[];
}
