const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const env = fs.readFileSync('.env.local', 'utf8');
const SUPABASE_URL = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const SUPABASE_ANON_KEY = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim();

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const brainDir = 'C:\\Users\\mhdsamxn\\.gemini\\antigravity-ide\\brain\\06f7cd24-93d8-4108-9d38-b0d11f895a70';
const publicDir = 'c:\\Pearl International\\public\\images\\products';

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Find the latest image for each prefix
function getLatestImage(prefix) {
  const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith(prefix) && f.endsWith('.jpg'))
    .sort((a, b) => {
      const timeA = parseInt(a.split('_').pop().replace('.jpg', ''));
      const timeB = parseInt(b.split('_').pop().replace('.jpg', ''));
      return timeB - timeA;
    });
  return files.length > 0 ? path.join(brainDir, files[0]) : null;
}

const imagesToCopy = [
  { prefix: 'fresh_onions', dest: 'onions.jpg' },
  { prefix: 'small_onions', dest: 'small-onions.jpg' },
  { prefix: 'fresh_coconut', dest: 'fresh-coconut.jpg' },
  { prefix: 'tender_coconut', dest: 'tender-coconut.jpg' },
  { prefix: 'coco_peat', dest: 'coco-peat.jpg' }
];

for (const img of imagesToCopy) {
  const source = getLatestImage(img.prefix);
  if (source) {
    fs.copyFileSync(source, path.join(publicDir, img.dest));
    console.log(`Copied ${img.dest}`);
  } else {
    console.log(`Missing image for ${img.prefix}`);
  }
}

const products = [
  {
    category_id: 'd4567890-1234-5678-1234-567812345678', // Vegetables
    name: 'Red Onions',
    slug: 'onions',
    short_description: 'Premium export-quality pungent red onions.',
    full_description: 'Our red onions are cultivated in rich, fertile soils, ensuring a robust flavor, vibrant color, and long shelf life. They are carefully cured, sorted by size, and packed to meet stringent international quality standards, making them perfect for culinary and commercial use worldwide.',
    image: '/images/products/onions.jpg',
    highlights: ['Rich pungent flavor', 'Extended shelf life', 'Uniform grading'],
    specifications: {
      'Origin': 'India',
      'Size': '40mm - 60mm+',
      'Moisture Content': 'Low (Properly cured)'
    },
    packaging: 'Packed in 10 kg / 25 kg red mesh bags to ensure proper ventilation during transit.',
    status: 'published',
    featured: true,
    sort_order: 1
  },
  {
    category_id: 'd4567890-1234-5678-1234-567812345678', // Vegetables
    name: 'Small Onions (Shallots)',
    slug: 'small-onions',
    short_description: 'Intensely flavored fresh shallots.',
    full_description: 'Small onions, commonly known as shallots, are prized for their intense, slightly sweet flavor. Essential for many traditional and gourmet dishes, our shallots are hand-harvested, cleaned, and exported fresh to retain their distinct aroma and taste.',
    image: '/images/products/small-onions.jpg',
    highlights: ['Intense natural flavor', 'Hand-harvested', 'Premium quality'],
    specifications: {
      'Origin': 'India',
      'Size': '20mm - 30mm',
      'Quality': 'A-Grade'
    },
    packaging: 'Packed in 5 kg / 10 kg mesh bags for maximum freshness.',
    status: 'published',
    featured: false,
    sort_order: 2
  },
  {
    category_id: 'b2345678-1234-5678-1234-567812345678', // Coconuts
    name: 'Fresh Coconut',
    slug: 'fresh-coconut',
    short_description: 'Fully mature, farm-fresh whole coconuts.',
    full_description: 'Sourced from the finest coastal coconut groves, our fresh whole coconuts are carefully selected for their thick meat and rich water content. Perfect for extraction, culinary uses, or direct retail.',
    image: '/images/products/fresh-coconut.jpg',
    highlights: ['High water content', 'Thick coconut meat', 'Long transit life'],
    specifications: {
      'Origin': 'India',
      'Weight': '500g - 700g',
      'Maturity': 'Fully Mature'
    },
    packaging: '25 nuts packed securely in durable PP bags.',
    status: 'published',
    featured: true,
    sort_order: 3
  },
  {
    category_id: 'b2345678-1234-5678-1234-567812345678', // Coconuts
    name: 'Tender Coconut',
    slug: 'tender-coconut',
    short_description: 'Refreshing, naturally sweet tender coconuts.',
    full_description: 'Harvested at the perfect stage of maturity, our tender coconuts offer a naturally sweet, hydrating beverage rich in electrolytes. Each nut is carefully handled to prevent damage and preserve freshness during international transport.',
    image: '/images/products/tender-coconut.jpg',
    highlights: ['Naturally sweet water', 'Rich in electrolytes', 'Hygienically handled'],
    specifications: {
      'Origin': 'India',
      'Water Content': '350ml - 500ml',
      'Shelf Life': '4 weeks (Chilled)'
    },
    packaging: 'Individually wrapped and packed in specialized export cartons.',
    status: 'published',
    featured: true,
    sort_order: 4
  },
  {
    category_id: 'b2345678-1234-5678-1234-567812345678', // Coconuts
    name: 'Coco Peat',
    slug: 'coco-peat',
    short_description: 'High-quality organic coco peat blocks.',
    full_description: 'Our coco peat (coir pith) is a 100% natural and organic soil conditioner and growing medium. It boasts high water retention capacity and excellent aeration, making it the preferred choice for hydroponics, nurseries, and horticulture worldwide.',
    image: '/images/products/coco-peat.jpg',
    highlights: ['High water retention', '100% Organic & Biodegradable', 'Low EC levels'],
    specifications: {
      'Origin': 'India',
      'Block Size': '5 Kg Block',
      'Expansion': '75 - 80 Liters per block'
    },
    packaging: 'Palletized and stretch-wrapped for safe container transport.',
    status: 'published',
    featured: false,
    sort_order: 5
  }
];

async function insertProducts() {
  const { data, error } = await supabase.from('products').insert(products);
  if (error) {
    console.error('Error inserting products:', error);
  } else {
    console.log('Successfully inserted products');
  }
}

insertProducts();
