import { MENU_SECTIONS } from '../config/menu.js';
import { readPartial, render } from '../utils/template.js';

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
 * Format price string for a menu item
 * Handles single price and small/medium/large pricing
 */
const formatPrice = (item) => {
  if (item.price) {
    return `  -  ${item.price}`;
  }
  if (item.small_price) {
    let price = `  -  ${item.small_price}`;
    if (item.medium_price) price += `  |  ${item.medium_price}`;
    if (item.large_price) price += `  |  ${item.large_price}`;
    return price;
  }
  return '';
};

/**
 * Generate menu section HTML from menu items
 */
export const generateMenuSections = async (menuItems) => {
  const sectionTemplate = await readPartial('menu-section');
  const itemTemplate = await readPartial('menu-item');
  
  const grouped = groupByCategory(menuItems);
  
  let html = '';
  for (const [category, config] of Object.entries(MENU_SECTIONS)) {
    const items = grouped[category] || [];
    if (items.length === 0) continue;
    
    // Render each item
    const itemsHtml = items
      .map(item => render(itemTemplate, {
        name: item.name,
        price: formatPrice(item),
      }))
      .join('\n');
    
    // Render section
    html += render(sectionTemplate, {
      display_name: config.display_name,
      section_description: config.section_description 
        ? `      <p class="bodySmall paddingTop10">${config.section_description}</p>` 
        : '',
      items: itemsHtml,
      additional_text: config.additional_text 
        ? `      <p class="bodySmall">${config.additional_text}</p>` 
        : '',
    });
  }
  
  return html;
};
