with open('src/app/components/pages/checkout-page.component.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('setValue($event)', 'setValue()')

with open('src/app/components/pages/checkout-page.component.ts', 'w', encoding='utf-8') as f:
    f.write(content)

with open('src/app/components/pages/arrepentimiento-page.component.ts', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('setValue($event)', 'setValue()')
with open('src/app/components/pages/arrepentimiento-page.component.ts', 'w', encoding='utf-8') as f:
    f.write(content)

