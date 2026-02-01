import { readPartial, render } from '../utils/template.js';

/**
 * Generate banner HTML if banner is active
 */
export const generateBanner = async (bannerData) => {
  if (!bannerData.active || !bannerData.message) {
    return '';
  }
  
  const template = await readPartial('banner');
  return render(template, {
    message: bannerData.message,
  });
};
