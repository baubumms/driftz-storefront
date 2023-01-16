<script lang="ts">
  import type { IResponsiveImage } from '$/types/ResponsiveImage';

  export let srcSet: IResponsiveImage['srcSet'];
  export let height: IResponsiveImage['height'];
  export let width: IResponsiveImage['width'];
  export let alt: IResponsiveImage['alt'];
  let className = '';
  export { className as class };
  export let id: string = undefined;
</script>

<picture>
  <source media="(max-width: 360px)" srcset={srcSet.w360} type="image/webp" />
  <source media="(max-width: 720px)" srcset={srcSet.w720} type="image/webp" />
  <source media="(max-width: 1400px)" srcset={srcSet.w1400} type="image/webp" />
  <source media="(max-width: 2000px)" srcset={srcSet.w2000} type="image/webp" />
  <source srcset={srcSet.wMax} type="image/webp" />
  <source media="(max-width: 360px)" srcset={srcSet.w360} type="image/jpeg" />
  <source media="(max-width: 720px)" srcset={srcSet.w720} type="image/jpeg" />
  <source media="(max-width: 1400px)" srcset={srcSet.w1400} type="image/jpeg" />
  <source media="(max-width: 2000px)" srcset={srcSet.w2000} type="image/jpeg" />
  <source srcset={srcSet.wMax} type="image/jpeg" />
  <img src={srcSet.fallbackSrc} {alt} {width} {height} loading="lazy" class={className} {id} />
</picture>
