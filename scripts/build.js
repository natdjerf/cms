import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const TEMPLATES_DIR = path.join(ROOT, 'src', 'templates');
const STATIC_DIR = path.join(ROOT, 'static');
const CSS_DIR = path.join(ROOT, 'src', 'css');
const JS_DIR = path.join(ROOT, 'src', 'js');
const FONTS_DIR = path.join(ROOT, 'src', 'fonts');
const DIST_DIR = path.join(ROOT, 'dist');

// Menu section configuration
const MENU_SECTIONS = {
  lobster: { display_name: 'Lobster Roll', section_description: 'Served with chips and a pickle spear', one_size: true },
  box: { display_name: 'By the Box', section_description: 'Prices are small, medium, and large boxes', one_size: false },
  broiler: { display_name: 'Fresh from The Broiler', section_description: 'Served with rice pilaf and a small garden salad', one_size: true },
  plates: { display_name: 'Plates', section_description: 'Served with french fries and homemade coleslaw', additional_text: 'Sweet potato fries available for additional fee', one_size: true },
  favorites: { display_name: 'Favorites', section_description: '', one_size: true },
  baskets: { display_name: 'Baskets', section_description: 'Served with french fries', additional_text: 'Sweet potato fries available for additional fee', one_size: true },
  speciality_salads: { display_name: 'Speciality Salads', section_description: 'Choice of Italian, oil and vinegar, Greek, ranch, caesar, balsamic vinaigrette, or blue cheese dressing', one_size: true },
  salads: { display_name: 'Salads', section_description: 'Choice of Italian, oil and vinegar, Greek, ranch, caesar, balsamic vinaigrette, or blue cheese dressing', one_size: true },
  griddle: { display_name: 'Off the Griddle', section_description: 'Order as a platter to add french fries and coleslaw - $7', one_size: true },
  sandwiches: { display_name: 'Deli Sandwiches', section_description: 'Served with chips and a pickle spear', additional_text: 'Choice of white bread or wheat bread', one_size: true },
  clubs: { display_name: 'Clubs', section_description: 'Served with chips and a pickle spear', additional_text: 'Choice of white bread or wheat bread', one_size: true },
  wraps: { display_name: 'Wraps', section_description: 'Served with chips and a pickle spear', one_size: true },
  subs: { display_name: 'Subs', section_description: 'Served with chips and a pickle spear', one_size: true },
  sides: { display_name: 'Sides', section_description: '', one_size: false },
  kids: { display_name: 'Kiddie Meals', section_description: 'Served with kids french fries and soda', one_size: true },
};

const BEVERAGE_SECTIONS = {
  cocktails: { display_name: 'Cocktails' },
  frozen: { display_name: 'Frozen' },
  beer: { display_name: 'Beer, Seltzer, Cider' },
  draft: { display_name: 'Draft' },
  wine: { display_name: 'Wine' },
  liquor: { display_name: 'Liquor' },
  lime_rickeys: { display_name: 'Lime Rickeys' },
  soda: { display_name: 'Fountain Soda, Juice, Hot' },
  bottled: { display_name: 'Bottled' },
};

const GALLERY_SECTIONS = {
  plate: { display_name: 'Food' },
  team: { display_name: 'The family and employees' },
  store: { display_name: 'The shop over the years' },
};

/**
 * Read and parse a YAML file
 */
const readYaml = async (filePath) => {
  const content = await fs.readFile(filePath, 'utf-8');
  const data = YAML.parse(content);
  return { data };
};

/**
 * Read all YAML files from a collection directory
 */
const readCollection = async (collectionName) => {
  const collectionPath = path.join(CONTENT_DIR, collectionName);
  
  try {
    const files = await fs.readdir(collectionPath);
    const yamlFiles = files.filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
    
    return Promise.all(
      yamlFiles.map(async (file) => {
        const filePath = path.join(collectionPath, file);
        const { data } = await readYaml(filePath);
        return {
          slug: path.basename(file, '.yaml').replace('.yml', ''),
          ...data,
        };
      })
    );
  } catch (error) {
    console.warn(`Collection ${collectionName} not found or empty`);
    return [];
  }
};

/**
 * Read a singleton content file
 */
const readSingleton = async (name) => {
  const filePath = path.join(CONTENT_DIR, `${name}.yaml`);
  try {
    return await readYaml(filePath);
  } catch (error) {
    console.warn(`Singleton ${name} not found at ${filePath}`);
    return { data: {} };
  }
};

/**
 * Read an HTML template file
 */
const readTemplate = async (name) => {
  const filePath = path.join(TEMPLATES_DIR, `${name}.html`);
  return fs.readFile(filePath, 'utf-8');
};

/**
 * Simple template rendering - replaces {{variable}} with data
 */
const render = (template, data) => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = data[key];
    if (value !== undefined && value !== null) {
      return String(value);
    }
    return '';
  });
};

/**
 * Generate menu section HTML
 */
const generateMenuSections = (menuItems) => {
  const sections = {};
  
  // Group items by category
  for (const item of menuItems) {
    const category = item.category;
    if (!sections[category]) {
      sections[category] = [];
    }
    sections[category].push(item);
  }
  
  // Generate HTML for each section
  let html = '';
  for (const [category, config] of Object.entries(MENU_SECTIONS)) {
    const items = sections[category] || [];
    if (items.length === 0) continue;
    
    html += `
    <div class="fullWidthSmall">
      <h3 class="h3 upperCase paddingTop20 primaryColor">${config.display_name}</h3>
      ${config.section_description ? `<p class="bodySmall paddingTop10">${config.section_description}</p>` : ''}
      <div class="paddingTop20 paddingBottom20">
        ${items.map(item => {
          const priceStr = item.price 
            ? `  -  ${item.price}`
            : (item.small_price ? `  -  ${item.small_price}${item.medium_price ? `  |  ${item.medium_price}` : ''}${item.large_price ? `  |  ${item.large_price}` : ''}` : '');
          return `<p class="paddingTop8">${item.name}${priceStr}</p>`;
        }).join('\n        ')}
      </div>
      ${config.additional_text ? `<p class="bodySmall">${config.additional_text}</p>` : ''}
    </div>`;
  }
  
  return html;
};

/**
 * Generate beverage section HTML
 */
const generateBeverageSections = (beverageItems) => {
  const sections = {};
  
  // Group items by category
  for (const item of beverageItems) {
    const category = item.category;
    if (!sections[category]) {
      sections[category] = [];
    }
    sections[category].push(item);
  }
  
  // Generate HTML for each section
  let html = '';
  for (const [category, config] of Object.entries(BEVERAGE_SECTIONS)) {
    const items = sections[category] || [];
    if (items.length === 0) continue;
    
    html += `
    <div class="fullWidthSmall">
      <h3 class="h3 upperCase paddingTop20 primaryColor">${config.display_name}</h3>
      <div class="paddingTop20 paddingBottom20">
        ${items.map(item => {
          const drinks = item.drinks ? item.drinks.split(',').map(d => d.trim()) : [];
          return drinks.map(drink => `<p>${drink}</p>`).join('\n        ');
        }).join('\n        ')}
      </div>
    </div>`;
  }
  
  return html;
};

/**
 * Normalize a single image URL
 */
const normalizeUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('/') || url.startsWith('http')) return url;
  return '/' + url;
};

/**
 * Generate gallery section HTML
 */
const generateGallerySections = (galleryItems) => {
  const sections = {};
  
  // Group items by category
  for (const item of galleryItems) {
    const category = item.category;
    if (!sections[category]) {
      sections[category] = [];
    }
    sections[category].push(item);
  }
  
  // Generate HTML for each section
  let html = '';
  for (const [category, config] of Object.entries(GALLERY_SECTIONS)) {
    const items = sections[category] || [];
    if (items.length === 0) continue;
    
    html += `
    <div>
      <h3 class="h3 upperCase paddingTop40 paddingBottom40">${config.display_name}</h3>
      <div class="galleryGrid ${category}Grid paddingMin">
        ${items.map(item => {
          const imageUrl = normalizeUrl(item.image_url);
          return `
        <div>
          <picture class="${category}">
            <source media="(min-width: 200px)" srcset="${imageUrl}">
            <img src="${imageUrl}" alt="${item.title || ''}">
            <p>${item.title || ''}</p>
          </picture>
        </div>`;
        }).join('\n        ')}
      </div>
    </div>`;
  }
  
  return html;
};

/**
 * Generate banner HTML
 */
const generateBanner = (bannerData) => {
  if (!bannerData.active || !bannerData.message) {
    return '';
  }
  return `
    <div class="flex backgroundSecondary justifyCenter paddingBanner">
      <h5 class="h5Body">${bannerData.message}</h5>
    </div>`;
};

/**
 * Generate visit status text
 */
const generateVisitStatus = (homeData) => {
  const { hours, open_for_the_season, seasons_open } = homeData;
  
  if (open_for_the_season) {
    return seasons_open 
      ? `Now open for our ${seasons_open} season! We will be open every day ${hours}`
      : `Now open! We will be open every day ${hours}`;
  }
  return 'We are closed for the season';
};

/**
 * Normalize image URLs to have leading slash
 */
const normalizeImageUrls = (data) => {
  const normalized = { ...data };
  for (const [key, value] of Object.entries(normalized)) {
    // Only normalize fields that end with _url and contain image paths
    if (typeof value === 'string' && key.endsWith('_url')) {
      // Add leading slash if it's a relative path starting with img/
      if (value.startsWith('img/')) {
        normalized[key] = '/' + value;
      } else if (value && !value.startsWith('/') && !value.startsWith('http') && (value.includes('.png') || value.includes('.jpg') || value.includes('.jpeg') || value.includes('.webp') || value.includes('.svg') || value.includes('.gif'))) {
        normalized[key] = '/' + value;
      }
    }
  }
  return normalized;
};

/**
 * Render a page with base layout
 */
const renderPage = async (templateName, data, layoutData = {}) => {
  // Normalize image URLs to have leading slashes
  const normalizedData = normalizeImageUrls(data);
  
  const template = await readTemplate(templateName);
  const renderedContent = render(template, normalizedData);
  
  const baseTemplate = await readTemplate('base');
  return render(baseTemplate, {
    ...layoutData,
    ...normalizedData,
    content: renderedContent,
    phone_clean: (normalizedData.phone || '').replace(/-/g, ''),
  });
};

/**
 * Copy directory recursively
 */
const copyDir = async (src, dest) => {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
};

/**
 * Ensure directory exists
 */
const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true });
};

/**
 * Main build function
 */
const build = async () => {
  console.log('🔨 Building site...\n');
  const startTime = Date.now();

  // Clean dist directory
  await fs.rm(DIST_DIR, { recursive: true, force: true });
  await ensureDir(DIST_DIR);

  // Read all content
  console.log('📖 Reading content...');
  const home = await readSingleton('home');
  const banner = await readSingleton('banner');
  const gallery = await readCollection('gallery');
  const menu = await readCollection('menu');
  const beverages = await readCollection('beverages');

  console.log(`   - Home page loaded`);
  console.log(`   - Banner loaded (active: ${banner.data.active})`);
  console.log(`   - ${gallery.length} gallery items`);
  console.log(`   - ${menu.length} menu items`);
  console.log(`   - ${beverages.length} beverage categories`);

  // Prepare shared data
  const sharedData = {
    ...home.data,
    phone_clean: (home.data.phone || '').replace(/-/g, ''),
    banner: generateBanner(banner.data),
  };

  // Build pages
  console.log('\n📄 Building pages...');
  
  // Home page
  const homePage = await renderPage('home', sharedData, {
    title: "Tony's Clam Shop",
    description: "Tony's Clam Shop - Quincy's favorite seafood restaurant since 1964",
  });
  await fs.writeFile(path.join(DIST_DIR, 'index.html'), homePage);
  console.log('   - index.html');

  // Menu page
  const menuData = {
    ...sharedData,
    menuSections: generateMenuSections(menu),
    beverageSections: generateBeverageSections(beverages),
  };
  const menuPage = await renderPage('menu', menuData, {
    title: "Menu - Tony's Clam Shop",
    description: "View our full menu of fresh seafood, sandwiches, and more",
  });
  await fs.writeFile(path.join(DIST_DIR, 'menu.html'), menuPage);
  console.log('   - menu.html');

  // Gallery page
  const galleryData = {
    ...sharedData,
    gallerySections: generateGallerySections(gallery),
  };
  const galleryPage = await renderPage('gallery', galleryData, {
    title: "Gallery - Tony's Clam Shop",
    description: "Photos from Tony's Clam Shop",
  });
  await fs.writeFile(path.join(DIST_DIR, 'gallery.html'), galleryPage);
  console.log('   - gallery.html');

  // About page
  const aboutPage = await renderPage('about', sharedData, {
    title: "About - Tony's Clam Shop",
    description: "Learn about Tony's Clam Shop history and family",
  });
  await fs.writeFile(path.join(DIST_DIR, 'about.html'), aboutPage);
  console.log('   - about.html');

  // Visit page
  const visitData = {
    ...sharedData,
    visitStatus: generateVisitStatus(home.data),
  };
  const visitPage = await renderPage('visit', visitData, {
    title: "Visit - Tony's Clam Shop",
    description: "Find us in Quincy, MA - hours, location, and contact info",
  });
  await fs.writeFile(path.join(DIST_DIR, 'visit.html'), visitPage);
  console.log('   - visit.html');

  // Press page
  const pressPage = await renderPage('press', sharedData, {
    title: "Press - Tony's Clam Shop",
    description: "Tony's Clam Shop in the news",
  });
  await fs.writeFile(path.join(DIST_DIR, 'press.html'), pressPage);
  console.log('   - press.html');

  // 404 page
  const notFoundPage = await renderPage('404', sharedData, {
    title: "Page Not Found - Tony's Clam Shop",
    description: "Page not found",
  });
  await fs.writeFile(path.join(DIST_DIR, '404.html'), notFoundPage);
  console.log('   - 404.html');

  // Copy static assets
  console.log('\n📁 Copying assets...');
  
  // Copy images
  await copyDir(path.join(STATIC_DIR, 'img'), path.join(DIST_DIR, 'img'));
  console.log('   - img/');
  
  // Copy CSS
  await copyDir(CSS_DIR, path.join(DIST_DIR, 'css'));
  console.log('   - css/');
  
  // Copy fonts
  try {
    await copyDir(FONTS_DIR, path.join(DIST_DIR, 'fonts'));
    console.log('   - fonts/');
  } catch {
    console.warn('   - fonts/ (not found, skipping)');
  }
  
  // Copy JS if exists
  try {
    const jsFiles = await fs.readdir(JS_DIR);
    if (jsFiles.length > 0) {
      await copyDir(JS_DIR, path.join(DIST_DIR, 'js'));
      console.log('   - js/');
    }
  } catch {
    // JS directory might not exist yet
  }

  const elapsed = Date.now() - startTime;
  console.log(`\n✅ Build complete in ${elapsed}ms`);
  console.log(`   Output: ${DIST_DIR}`);
};

// Run build
build().catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});
