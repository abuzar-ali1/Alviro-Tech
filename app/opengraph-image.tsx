import { createSocialImage } from "./social-image";
import { SITE_TITLE, SOCIAL_IMAGE_SIZE } from "./seo";

export const alt = SITE_TITLE;
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createSocialImage();
}
