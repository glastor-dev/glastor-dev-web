import re
with open('src/app/components/pages/catalog-page.component.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('[isWishlisted]=', '[isInWishlist]=')
content = content.replace('(toggleWishlist)="toggleWishlist(product.id, \)"', '(toggleWishlist)="toggleWishlist(\.id, \.event)"')

with open('src/app/components/pages/catalog-page.component.ts', 'w', encoding='utf-8') as f:
    f.write(content)
