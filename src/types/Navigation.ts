export interface INavigationItem {
  title: string;
  url: string;
  newTab?: boolean;
}

export interface INavigationCategory {
  title: string;
  items: INavigationItem[];
}

export interface INavigationStore {
  main?: INavigationCategory;
  collections?: INavigationCategory;
  legal?: INavigationCategory;
  social?: INavigationCategory;
  about?: INavigationCategory;
}
