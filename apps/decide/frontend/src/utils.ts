// use the image server if not using local images
export const IMAGE_SERVER =
  typeof process === "undefined" || import.meta.env.VITE_USE_LOCAL_IMAGES !== "true"
    ? "https://blueprint.the-tractor.store"
    : "";

/**
 * Replaces the placeholder "[size]" in the image URL with the specified size.
 */
export function src(image: string, size: number): string {
  return IMAGE_SERVER + image.replace("[size]", `${size}`);
}

/**
 * Generates the srcset attribute value for an image with different sizes.
 */
export function srcset(image: string, sizes: number[] = []): string {
  return sizes.map((size) => `${src(image, size)} ${size}w`).join(", ");
}

/**
 * Formats a price value.
 */
export function fmtprice(price: number): string {
  return `${price},00 Ø`;
}
