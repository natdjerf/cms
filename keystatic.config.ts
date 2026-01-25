import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    home: singleton({
      label: 'Home Page',
      path: 'content/home',
      format: { data: 'yaml' },
      schema: {
        title: fields.text({ label: 'Title' }),
        hours: fields.text({
          label: 'Hours',
          description: 'As text: 10:30am to 10:00pm',
        }),
        hours_description: fields.text({
          label: 'Hours description',
          description: 'Open daily...',
        }),
        open_for_the_season: fields.checkbox({
          label: 'Open/Closed for the season',
          description: 'Are we open for the season?',
          defaultValue: false,
        }),
        seasons_open: fields.text({
          label: 'Seasons open',
          description: 'How many seasons we have been open with suffix ie 60th or 61st',
        }),
        address_line_1: fields.text({
          label: 'Address line 1',
          description: 'Street number and name',
        }),
        address_line_2: fields.text({
          label: 'Address line 2',
          description: 'City, state, zip',
        }),
        phone: fields.text({ label: 'Phone' }),
        email: fields.text({ label: 'Email' }),
        section_welcome_header: fields.text({ label: 'Section welcome header' }),
        section_welcome_text: fields.text({
          label: 'Section welcome text',
          multiline: true,
        }),
        section_food_header: fields.text({ label: 'Section food header' }),
        section_food_text: fields.text({
          label: 'Section food text',
          multiline: true,
        }),
        section_family_header: fields.text({ label: 'Section family header' }),
        section_family_text: fields.text({
          label: 'Section family text',
          multiline: true,
        }),
        section_favorites_header: fields.text({ label: 'Section favorites header' }),
        section_favorites_seafood: fields.text({
          label: 'Section favorites seafood',
          multiline: true,
        }),
        section_favorites_griddle: fields.text({
          label: 'Section favorites griddle',
          multiline: true,
        }),
        section_favorites_beverages: fields.text({
          label: 'Section favorites beverages',
          multiline: true,
        }),
        welcome_image_about_url: fields.text({
          label: 'Welcome image about URL',
          description: 'Path to image file',
        }),
        welcome_image_about_description: fields.text({
          label: 'Welcome image about description',
          multiline: true,
        }),
        welcome_image_food_url: fields.text({
          label: 'Welcome image food URL',
          description: 'Path to image file',
        }),
        welcome_image_food_description: fields.text({
          label: 'Welcome image food description',
          multiline: true,
        }),
        family_image_1_url: fields.text({
          label: 'Family image 1 URL',
          description: 'Path to image file',
        }),
        family_image_1_description: fields.text({
          label: 'Family image 1 description',
          multiline: true,
        }),
        family_image_2_url: fields.text({
          label: 'Family image 2 URL',
          description: 'Path to image file',
        }),
        family_image_2_description: fields.text({
          label: 'Family image 2 description',
          multiline: true,
        }),
        family_image_3_url: fields.text({
          label: 'Family image 3 URL',
          description: 'Path to image file',
        }),
        family_image_3_description: fields.text({
          label: 'Family image 3 description',
          multiline: true,
        }),
        intro: fields.text({
          label: 'Intro',
          multiline: true,
        }),
        image: fields.text({
          label: 'Background Image URL',
        }),
      },
    }),
    banner: singleton({
      label: 'Banner',
      path: 'content/banner',
      format: { data: 'yaml' },
      schema: {
        message: fields.text({ label: 'Message' }),
        active: fields.checkbox({
          label: 'Active',
          description: 'Is banner notice active?',
        }),
      },
    }),
  },
  collections: {
    gallery: collection({
      label: 'Gallery',
      path: 'content/gallery/*',
      format: { data: 'yaml' },
      slugField: 'name',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        title: fields.text({ label: 'Title' }),
        category: fields.text({
          label: 'Category',
          description: 'Select one: plate (food photos), store (the shop), team (family and employees)',
          defaultValue: 'plate',
        }),
        image_url: fields.text({
          label: 'Image URL',
          description: 'Path to image file, e.g., img/photo.png',
        }),
      },
    }),
    menu: collection({
      label: 'Menu',
      path: 'content/menu/*',
      format: { data: 'yaml' },
      slugField: 'name',
      schema: {
        category: fields.text({
          label: 'Category',
          description: 'Select one: lobster, box, broiler, plates, baskets, sandwiches, griddle, wraps, subs, salads, speciality_salads, clubs, sides, kids, favorites',
        }),
        name: fields.slug({ name: { label: 'Item Name' } }),
        title: fields.text({
          label: 'Title',
          description: 'For admin page',
        }),
        price: fields.text({
          label: 'Price (if one size)',
          description: 'As number - 9.95. Fill in if one size only (ie, sandwich or basket). If multiple sizes, leave blank and fill in small/medium/large sizes.',
        }),
        small_price: fields.text({
          label: 'Small Price',
          description: 'As number - 9.95',
        }),
        medium_price: fields.text({
          label: 'Medium Price',
          description: 'As number - 9.95',
        }),
        large_price: fields.text({
          label: 'Large Price',
          description: 'As number - 9.95',
        }),
        description: fields.text({
          label: 'Description',
        }),
      },
    }),
    beverages: collection({
      label: 'Beverages',
      path: 'content/beverages/*',
      format: { data: 'yaml' },
      slugField: 'name',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        Name: fields.text({
          label: 'Name (display)',
          description: 'Same as title and category',
        }),
        title: fields.text({
          label: 'Title',
          description: 'Category for admin page',
        }),
        category: fields.text({
          label: 'Category',
          description: 'Select one (lowercase): cocktails, frozen, beer, draft, wine, liquor, lime_rickeys, soda, bottled. Note: beer includes cider, seltzer',
        }),
        drinks: fields.text({
          label: 'Drinks',
          description: "As comma separated list, ie 'Harpoon, Corona, ...'",
          multiline: true,
        }),
      },
    }),
  },
});
