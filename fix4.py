import re
with open('src/app/components/pages/checkout-page.component.ts', 'r', encoding='utf-8') as f:
    content = f.read()
# Find all occurrences of isCinematicGlow followed by whitespace or newline or '?' or ']' or ':'
content = re.sub(r'isCinematicGlow([\s\n\r\?\:\]])', r'isCinematicGlow()\1', content)
# It might replace it where it shouldn't (like in the class definition), so let's fix the class definition back.
content = content.replace('isCinematicGlow() = this.appState.isCinematicGlow()', 'isCinematicGlow = this.appState.isCinematicGlow')

with open('src/app/components/pages/checkout-page.component.ts', 'w', encoding='utf-8') as f:
    f.write(content)

with open('src/app/components/pages/product-detail-page.component.ts', 'r', encoding='utf-8') as f:
    content2 = f.read()
content2 = re.sub(r'isCinematicGlow([\s\n\r\?\:\]])', r'isCinematicGlow()\1', content2)
content2 = content2.replace('isCinematicGlow() = this.appState.isCinematicGlow()', 'isCinematicGlow = this.appState.isCinematicGlow')
with open('src/app/components/pages/product-detail-page.component.ts', 'w', encoding='utf-8') as f:
    f.write(content2)
