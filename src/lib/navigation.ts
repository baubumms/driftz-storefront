import { writable, get } from 'svelte/store';
import { _ } from 'svelte-i18n';
import { Logger } from '$lib/logger';

const logger = new Logger('navigation');

export const generateNavigation = async () => {
  const t: (key: string) => string = get(_);

  const navigation = {
    initialized: true,
    main: {
      title: 'Shop',
      items: [
        // {
        //   title: 'Blog',
        //   url: '/blog'
        // },
        {
          title: t('navigation.calculators'),
          url: '/tool/calculator'
        }
      ]
    },
    // collections: {
    //   title: 'Collections',
    //   items: collections
    // },
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
          title: t('navigation.refund_policy'),
          url: '/terms/refund-policy'
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
  };

  return navigation;
};
