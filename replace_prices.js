const fs = require('fs');
let html = fs.readFileSync('src/app/portal.html', 'utf8');

// Replace ${{ something.toFixed(2) }} or ${{ something }} with {{ formatPrice(something) }}
// We need to match precisely the price fields we found.
html = html.replace(/\$\{\{\s*(.*?\.toFixed\(2\))\s*\}\}/g, (match, p1) => {
    return `{{ formatPrice(${p1.replace('.toFixed(2)', '')}) }}`;
});

// There are also some plain ${{ p.price }} maybe? Let's check
html = html.replace(/\$\{\{\s*([^\}]+price[^\}]*)\s*\}\}/g, (match, p1) => {
    // if it already has formatPrice, ignore
    if (p1.includes('formatPrice')) return match;
    // otherwise replace
    return `{{ formatPrice(${p1}) }}`;
});

// Let's also check for order.total.toFixed(2) or discount or subtotal or iva or shipping
html = html.replace(/\$\{\{\s*(.*?(?:total|discount|subtotal|iva|shipping|revenue|discountAmount).*?(?:\.toFixed\(2\))?)\s*\}\}/g, (match, p1) => {
    if (p1.includes('formatPrice')) return match;
    return `{{ formatPrice(${p1.replace('.toFixed(2)', '')}) }}`;
});


fs.writeFileSync('src/app/portal.html', html);
console.log('done!');
