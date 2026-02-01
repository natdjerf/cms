import { BEVERAGE_SECTIONS } from '../config/beverages.js';
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
 * Generate beverage section HTML from beverage items
 */
export const generateBeverageSections = async (beverageItems) => {
  const sectionTemplate = await readPartial('beverage-section');
  const itemTemplate = await readPartial('beverage-item');
  
  const grouped = groupByCategory(beverageItems);
  
  let html = '';
  for (const [category, config] of Object.entries(BEVERAGE_SECTIONS)) {
    const items = grouped[category] || [];
    if (items.length === 0) continue;
    
    // Render each drink from each item's drinks list
    const itemsHtml = items
      .flatMap(item => {
        const drinks = item.drinks ? item.drinks.split(',').map(d => d.trim()) : [];
        return drinks.map(drink => render(itemTemplate, { drink }));
      })
      .join('\n');
    
    // Render section
    html += render(sectionTemplate, {
      display_name: config.display_name,
      items: itemsHtml,
    });
  }
  
  return html;
};
