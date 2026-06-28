with open('src/app/components/pages/product-detail-page.component.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('[class.border-zinc-800]="isCinematicGlow"', '[class.border-zinc-800]="isCinematicGlow()"')
content = content.replace('[class.border-zinc-200]="!isCinematicGlow"', '[class.border-zinc-200]="!isCinematicGlow()"')
content = content.replace('[class.text-[#41BF84]]="isCinematicGlow"', '[class.text-[#41BF84]]="isCinematicGlow()"')

with open('src/app/components/pages/product-detail-page.component.ts', 'w', encoding='utf-8') as f:
    f.write(content)
