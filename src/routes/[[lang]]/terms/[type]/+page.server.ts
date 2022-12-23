import {getShopPolicies} from '$lib/server/shopifyAdmin';
import { error } from '@sveltejs/kit';
import { defaultLocaleActive } from '../../../../lib/i18n';
import { getShopPoliciesTransalted } from '../../../../lib/server/shopifyAdmin';

export async function load({ params }) {
  const type = params.type?.toUpperCase().replaceAll('-', '_');
  if(!type) {
    throw error(404, 'Not found');
  }

  
  if(defaultLocaleActive()){
    const policies = await getShopPolicies();
    // log policy types
    console.log(policies);
    const policy = policies?.body?.data?.shop?.shopPolicies.find(p => p.type === type);
    console.log(policy !== undefined, type,)

    if(policy) {
      return {
        policy
      }
    }
  }else {
    const policies = await getShopPoliciesTransalted();
    // log policy types
    console.log(policies);
    const policy = policies?.body?.data?.shop?.shopPolicies.find(p => p.type === type);
    policy.body = policy?.translations[0]?.value;

    if(policy) {
      return {
        policy
      }
    }
  }


  throw error(404, 'Not found');
}
