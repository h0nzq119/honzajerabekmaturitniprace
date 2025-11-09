# honzq.vintage - Vintage Clothing Store

A simple, elegant black and white e-commerce website for selling vintage clothing.

## Features

- Clean black and white design
- Vibrant animated brand name
- 26 pre-configured product slots
- Category filtering (Tops, Bottoms, Outerwear, Accessories)
- Responsive design for mobile and desktop
- Easy product management

## Getting Started

Simply open `index.html` in your web browser to view the website.

## How to Add/Edit Products

All products are stored in the `products.js` file. Each product has the following structure:

```javascript
{
    id: 1,                          // Unique identifier
    name: "Product Name",           // Name of the item
    category: "tops",               // Category: tops, bottoms, outerwear, or accessories
    price: 50,                      // Price in dollars (no $ symbol)
    image: "",                      // URL to product image (or leave empty for placeholder)
    status: "available"             // Status: "available" or "sold"
}
```

### To Edit a Product:

1. Open `products.js`
2. Find the product by its ID
3. Update the fields you want to change
4. Save the file

### To Add Product Images:

You have two options:

**Option 1: Use image URLs**
```javascript
image: "https://example.com/image.jpg"
```

**Option 2: Use local images**
1. Create an `images` folder in the same directory as `index.html`
2. Add your images to this folder
3. Reference them like this:
```javascript
image: "images/jacket.jpg"
```

### To Mark a Product as Sold:

Change the status from `"available"` to `"sold"`:
```javascript
status: "sold"
```

### Categories

Products are organized into 4 categories:
- `tops` - T-shirts, shirts, sweaters, hoodies
- `bottoms` - Jeans, pants, shorts
- `outerwear` - Jackets, coats
- `accessories` - Hats, bags, belts, sunglasses

## File Structure

```
├── index.html          # Main HTML file
├── style.css           # Styling and design
├── script.js           # Website functionality
├── products.js         # Product database (EDIT THIS FILE)
└── images/             # (Optional) Folder for product images
```

## Customization Tips

### Change Brand Colors
Edit the gradient in `style.css` at line 33:
```css
background: linear-gradient(135deg, #ff0080, #ff8c00, #40e0d0, #ff0080);
```

### Adjust Product Grid
In `style.css` at line 87, modify:
```css
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
```

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Support

For issues or questions about this website, contact the developer or refer to the code comments.
