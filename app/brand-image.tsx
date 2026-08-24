import type { ImgHTMLAttributes } from "react";

type BrandImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "alt" | "height" | "width"> & {
  alt: string;
  height: number;
  width: number;
};

export function BrandImage({ alt, decoding = "async", loading = "lazy", ...properties }: BrandImageProps) {
  // Authentic, already-compressed WebP assets stay on the firm's original image host.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...properties} alt={alt} decoding={decoding} loading={loading} />;
}
