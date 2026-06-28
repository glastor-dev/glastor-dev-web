with open('src/app/components/pages/product-detail-page.component.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('="isCinematicGlow"', '="isCinematicGlow()"')
content = content.replace('="!isCinematicGlow"', '="!isCinematicGlow()"')

with open('src/app/components/pages/product-detail-page.component.ts', 'w', encoding='utf-8') as f:
    f.write(content)
