import os
from PIL import Image, ImageDraw, ImageFont

def create_placeholder(filename, text, size=(800, 600), color=(11, 27, 61), text_color=(253, 251, 247)):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    img = Image.new('RGB', size, color=color)
    d = ImageDraw.Draw(img)
    
    # Very basic centering without complex font loading
    try:
        # Load a default font if possible, otherwise use default
        font = ImageFont.load_default()
    except:
        font = None
        
    text_bbox = d.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    x = (size[0] - text_width) / 2
    y = (size[1] - text_height) / 2
    
    d.text((x, y), text, fill=text_color, font=font)
    img.save(filename, 'WEBP')
    print(f"Created {filename}")

placeholders = [
    ('public/images/hero-about.webp', 'About Us Hero', (1920, 600)),
    ('public/images/hero-quality.webp', 'Quality Hero', (1920, 600)),
    ('public/images/hero-services.webp', 'Services Hero', (1920, 600)),
    ('public/images/hero-contact.webp', 'Contact Us Hero', (1920, 600)),
    ('public/images/category-coconuts.webp', 'Coconuts', (800, 800)),
    ('public/images/category-spices.webp', 'Spices', (800, 800)),
    ('public/images/category-vegetables.webp', 'Vegetables', (800, 800)),
    ('public/images/product-coconut.webp', 'Coconut', (800, 600)),
    ('public/images/product-tender-coconut.webp', 'Tender Coconut', (800, 600)),
    ('public/images/product-cocoa-peat.webp', 'Cocoa Peat', (800, 600)),
    ('public/images/product-cardamom.webp', 'Cardamom', (800, 600)),
    ('public/images/product-black-pepper.webp', 'Black Pepper', (800, 600)),
    ('public/images/product-onions.webp', 'Onions', (800, 600)),
    ('public/images/product-small-onions.webp', 'Small Onions', (800, 600)),
]

for filename, text, size in placeholders:
    create_placeholder(filename, text, size)
