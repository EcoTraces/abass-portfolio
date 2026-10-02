import imageUrlBuilder from "@sanity/image-url";
import { sanityConfig } from "@/sanity/lib/client";

type SanityImageSource =
  | string
  | null
  | undefined
  | {
      _type?: string;
      asset?: {
        _ref?: string;
        _id?: string;
        url?: string;
      } | null;
      crop?: { top?: number; bottom?: number; left?: number; right?: number };
      hotspot?: { x?: number; y?: number; height?: number; width?: number };
      alt?: string;
    };

export function getSanityImageUrl(image: SanityImageSource, width?: number): string | null {
  if (!image) {
    return null;
  }

  if (typeof image === "string") {
    return image;
  }

  const assetUrl = image.asset?.url;
  if (!sanityConfig.projectId || !sanityConfig.dataset) {
    return assetUrl ?? null;
  }

  try {
    const builder = imageUrlBuilder({
      projectId: sanityConfig.projectId,
      dataset: sanityConfig.dataset,
    });

    let urlBuilder = builder.image(image).auto("format").fit("crop").crop("focalpoint");

    if (width) {
      urlBuilder = urlBuilder.width(width);
    }

    return urlBuilder.url();
  } catch {
    return assetUrl ?? null;
  }
}
