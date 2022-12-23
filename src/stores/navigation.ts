import { writable } from 'svelte/store';
import { waitLocale, _, isLoading } from 'svelte-i18n';
import { get } from 'svelte/store';
import { getAllCollections } from '$lib/shopifyStorefront';
import { indexedObjToArray } from '$lib/object';

interface INavigationItem {
  title: string;
  url: string;
  newTab?: boolean;
}

interface INavigationCategory {
  title: string;
  items: INavigationItem[];
}

interface INavigationStore {
  main: INavigationCategory;
  legal?: INavigationCategory;
  social?: INavigationCategory;
  about?: INavigationCategory;
}

const collections = await getAllCollections().then((resp) => {
  if (resp.status == 200) {
    const collections = indexedObjToArray(resp.body.data.collections.edges);

    const tabs: INavigationItem[] = collections.map((collection) => {
      return {
        title: collection.node.title,
        url: `/search/${collection.node.handle}`
      };
    });

    tabs.push({
      title: 'Blog',
      url: '/blog'
    });

    return tabs;
  }

  throw new Error("Couldn't fetch collections");
});

export const navigation = writable<INavigationStore>({
  main: {
    title: 'Shop',
    items: collections
  }
});

let initialized = false;

export const initNavigation = () => {
  if (initialized) {
    return;
  }

  initialized = true;

  _.subscribe((t) => {
    navigation.update((currentState) => ({
      ...currentState,
      legal: {
        title: t('navigation.legal_title'),
        items: [
          {
            title: t('navigation.legal_notice'),
            url: '/terms/legal-notice'
          },
          {
            title: t('navigation.privacy_policy'),
            url: '/terms/privacy-policy'
          },
          {
            title: t('navigation.terms_of_service'),
            url: '/terms/terms-of-service'
          },
          {
            title: t('navigation.shipping_policy'),
            url: '/terms/shipping-policy'
          },
          {
            title: t('navigation.return_policy'),
            url: '/terms/return-policy'
          }
        ]
      },
      about: {
        title: 'About Us',
        items: [
          {
            title: 'FAQ',
            url: '/terms/legal-notice'
          },
          {
            title: 'Contact Us',
            url: '/terms/privacy-policy'
          }
        ]
      },
      social: {
        title: 'Social',
        items: [
          {
            title: 'Instagram',
            url: 'https://www.instagram.com/driftz.eu',
            newtab: true
          },
          {
            title: 'Discord',
            url: '#',
            newtab: true
          },
          {
            title: 'YouTube',
            url: 'https://www.youtube.com/@driftz.',
            newtab: true
          }
        ]
      }
    }));
  });
};
