import { GALLERY_SECTIONS } from '../config/gallery.js';
import { readPartial, render, normalizeUrl } from '../utils/template.js';

/**
 * Group items by their category field
 */
const groupByCategory = (items) => {
  const groups = {};
  for (const item of items) {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
  }
  return groups;
};

/**
 * Generate gallery section HTML from gallery items
 */
export const generateGallerySections = async (galleryItems) => {
  const sectionTemplate = await readPartial('gallery-section');
  const itemTemplate = await readPartial('gallery-item');
  
  const grouped = groupByCategory(galleryItems);
  
  let html = '';
  for (const [category, config] of Object.entries(GALLERY_SECTIONS)) {
    const items = grouped[category] || [];
    if (items.length === 0) continue;
    
    // Render each gallery item
    const itemsHtml = items
      .map(item => render(itemTemplate, {
        category,
        image_url: normalizeUrl(item.image_url),
        title: item.title || '',
      }))
      .join('\n');
    
    // Render section
    html += render(sectionTemplate, {
      display_name: config.display_name,
      category,
      items: itemsHtml,
    });
  }
  
  return html;
};
