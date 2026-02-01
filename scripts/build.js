import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Utils
import { readSingleton, readCollection, copyDir, ensureDir } from './utils/files.js';
import { renderPage } from './utils/template.js';

// Generators
import { generateMenuSections } from './generators/menu.js';
import { generateBeverageSections } from './generators/beverages.js';
import { generateGallerySections } from './generators/gallery.js';
import { generateBanner } from './generators/banner.js';
import { generateVisitStatus } from './generators/visit.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const STATIC_DIR = path.join(ROOT, 'static');
const CSS_DIR = path.join(ROOT, 'src', 'css');
const JS_DIR = path.join(ROOT, 'src', 'js');
const FONTS_DIR = path.join(ROOT, 'src', 'fonts');
const DIST_DIR = path.join(ROOT, 'dist');

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
    banner: await generateBanner(banner.data),
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
    menuSections: await generateMenuSections(menu),
    beverageSections: await generateBeverageSections(beverages),
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
    gallerySections: await generateGallerySections(gallery),
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
