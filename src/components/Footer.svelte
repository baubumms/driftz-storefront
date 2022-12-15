<script>
  import { getAllCollections } from '$utils/shopify';
  import { indexedObjToArray } from '$utils/object';

  let categories = [];

  getAllCollections().then((resp) => {
    if (resp.status == 200) {
      const collections = indexedObjToArray(resp.body.data.collections.edges ?? {});

      categories = [
        {
          title: 'Shop',
          items: collections.map((categorie) => ({
            title: categorie.node.title,
            href: '/product/' + categorie.node.handle
          }))
        },
        {
          title: 'Terms and Policies',
          items: [
            {
              title: 'Legal Notice/Disclaimer',
              href: '/terms/legal-notice'
            },
            {
              title: 'Privacy Policy',
              href: '/terms/privacy-policy'
            },
            {
              title: 'Terms of Service',
              href: '/terms/terms-of-service'
            },
            {
              title: 'Shipping & Refund Policy',
              href: '/terms/refund-policy'
            },
            {
              title: 'Acceptable Use Policy',
              href: '/terms/acceptable-use-policy'
            }
          ]
        },
        {
          title: 'About Us',
          items: [
            {
              title: 'FAQ',
              href: '/terms/legal-notice'
            },
            {
              title: 'Contact Us',
              href: '/terms/privacy-policy'
            }
          ]
        },
        {
          title: 'Social',
          items: [
            {
              title: 'Instagram',
              href: 'https://www.instagram.com/realdriftz'
            },
            {
              title: 'Discord',
              href: '#'
            },
            {
              title: 'YouTube',
              href: 'https://www.youtube.com/@fastbuilds6910'
            }
          ]
        }
      ];
    }
  });
</script>

<div class="py-10 mt-20 bg-dark-blue">
  <div class="grid grid-cols-2 md:grid-cols-4 container text-center gap-x-2 gap-y-7">
    {#each categories as categorie}
      <div>
        <h3 class="md:text-xl font-black mb-3 uppercase">{categorie.title}</h3>
        <ul class="flex flex-col space-y-3 text-sm md:text-base">
          {#each categorie.items as item}
            <a href={item.href} class="">{item.title}</a>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>
