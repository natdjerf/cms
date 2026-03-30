import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const TEMPLATES_DIR = path.join(ROOT, 'src', 'templates');

/**
 * Read an HTML template file
 */
export const readTemplate = async (name) => {
  const filePath = path.join(TEMPLATES_DIR, `${name}.html`);
  return fs.readFile(filePath, 'utf-8');
};

/**
 * Read an HTML partial file
 */
export const readPartial = async (name) => {
  const filePath = path.join(TEMPLATES_DIR, 'partials', `${name}.html`);
  return fs.readFile(filePath, 'utf-8');
};

/**
 * Simple template rendering - replaces {{variable}} with data
 */
export const render = (template, data) => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = data[key];
    if (value !== undefined && value !== null) {
      return String(value);
    }
    return '';
  });
};

/**
 * Normalize a single image URL to have leading slash
 */
export const normalizeUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('/') || url.startsWith('http')) return url;
  return '/' + url;
};

/**
 * Normalize image URLs in data object to have leading slash
 */
export const normalizeImageUrls = (data) => {
  const normalized = { ...data };
  for (const [key, value] of Object.entries(normalized)) {
    // Only normalize fields that end with _url and contain image paths
    if (typeof value === 'string' && key.endsWith('_url')) {
      // Add leading slash if it's a relative path starting with img/
      if (value.startsWith('img/')) {
        normalized[key] = '/' + value;
      } else if (value && !value.startsWith('/') && !value.startsWith('http') && 
                 (value.includes('.png') || value.includes('.jpg') || value.includes('.jpeg') || 
                  value.includes('.webp') || value.includes('.svg') || value.includes('.gif'))) {
        normalized[key] = '/' + value;
      }
    }
  }
  return normalized;
};

/**
 * Render a page with base layout
 */
export const renderPage = async (templateName, data, layoutData = {}) => {
  // Normalize image URLs to have leading slashes
  const normalizedData = normalizeImageUrls(data);
  
  const template = await readTemplate(templateName);
  const renderedContent = render(template, normalizedData);
  
  const baseTemplate = await readTemplate('base');
  // layoutData is spread LAST so page-specific title/description override content data
  return render(baseTemplate, {
    ...normalizedData,
    ...layoutData,
    content: renderedContent,
    phone_clean: (normalizedData.phone || '').replace(/-/g, ''),
  });
};
