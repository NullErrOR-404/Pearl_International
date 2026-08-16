const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const env = fs.readFileSync('.env.local', 'utf8');
const SUPABASE_URL = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const SUPABASE_SERVICE_ROLE_KEY = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)?.[1]?.trim();

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const updates = [
  {
    slug: 'fresh-coconut',
    name: 'Coconut',
    full_description: 'Sourced directly from the fertile, sun-drenched groves of Pollachi, Tamil Nadu, our premium coconuts are handpicked at peak maturity to guarantee superior size, rich water content, and dense kernel. Cultivated under ideal tropical conditions and prepared to meet rigorous international export standards, we deliver authentic, farm-fresh quality from South India straight to global markets.'
  },
  {
    slug: 'tender-coconut',
    name: 'Tender Coconut',
    full_description: 'Harvested young from the pristine groves of Pollachi, our tender coconuts are packed with naturally sweet, electrolyte-rich water and a soft, delicate kernel. Carefully selected and prepared to meet strict international cold-chain standards, we deliver pure, refreshing hydration straight from South Indian farms to your global customers.'
  },
  {
    slug: 'coco-peat',
    name: 'Coco Peat',
    full_description: 'Manufactured in the rich agricultural hub of Kangeyam, Tamil Nadu, our premium coco peat delivers exceptional water retention, aeration, and natural organic purity. Carefully processed and graded to meet rigorous global standards, it provides an eco-friendly, high-performance growing medium for agricultural and horticultural success worldwide.'
  },
  {
    slug: 'green-cardamom',
    name: 'Cardamom',
    full_description: 'Sourced from the mist-kissed hills of Idukki, Kerala, our premium green cardamom is naturally grown in rich, fertile soil and harvested at peak maturity. Boasting an intense aroma, vibrant color, and rich essential oil content, each pod is carefully graded to deliver authentic South Indian spice excellence to global markets.'
  },
  {
    slug: 'black-pepper',
    name: 'Black Pepper',
    full_description: 'Sourced from the lush, spice-rich plantations of Thekkady and Idukki in Kerala, our premium black pepper is hand-harvested at peak maturity to ensure bold, heavy corns packed with natural piperine. Renowned for its sharp, pungent aroma and fiery kick, each batch is rigorously cleaned and graded to deliver authentic South Indian spice excellence to international markets.'
  },
  {
    slug: 'onions',
    name: 'Onion',
    full_description: "Sourced directly from the fertile agricultural heartland of Nashik, Maharashtra—India's premier onion capital—our premium red onions are renowned for their distinct pungency, rich flavor, and long shelf life. Carefully harvested and rigorously sorted, each batch is packed to meet strict international export standards, delivering farm-fresh quality from India to global markets."
  },
  {
    slug: 'small-onions',
    name: 'Small Onion',
    full_description: 'Sourced directly from the fertile agricultural fields of Trichy, Tamil Nadu, our premium small onions (shallots) are celebrated for their rich flavor, distinct pungency, and medicinal value. Carefully hand-sorted and prepared for export, they deliver authentic South Indian quality and unmatched taste to global kitchens.'
  }
];

async function updateProducts() {
  for (const update of updates) {
    const { data, error } = await supabase
      .from('products')
      .update({ 
        name: update.name,
        full_description: update.full_description 
      })
      .eq('slug', update.slug);
      
    if (error) {
      console.error(`Error updating ${update.slug}:`, error.message);
    } else {
      console.log(`Successfully updated ${update.slug}`);
    }
  }
}

updateProducts();
