with open('src/app/app.ts', 'r', encoding='utf-8') as f:
    content = f.read()

target = "const cursor = document.getElementById('sodra-custom-cursor');"
replacement = "if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;\n          const cursor = document.getElementById('sodra-custom-cursor');"

content = content.replace(target, replacement)

with open('src/app/app.ts', 'w', encoding='utf-8') as f:
    f.write(content)
