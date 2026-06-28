import re

with open('src/app/components/pages/checkout-page.component.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix imports
if 'FormBuilder' not in content:
    content = re.sub(r"import \{ FormGroup, FormControl, ReactiveFormsModule(.*?) \} from '@angular/forms';", r"import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators\1 } from '@angular/forms';", content)

if 'BotProtectionComponent' not in content:
    content = content.replace("import { AppStateService }", "import { BotProtectionComponent } from '../ui/bot-protection.component';\nimport { AppStateService }")
    content = re.sub(r"imports: \[(.*?)\]", lambda m: m.group(0) if 'BotProtectionComponent' in m.group(0) else m.group(0).replace("]", ", BotProtectionComponent]"), content)

# Fix setValue
content = content.replace('setValue()', 'setValue($event)')

# Fix this.cart().map
content = content.replace('this.cart().map', 'this.cart.map')

with open('src/app/components/pages/checkout-page.component.ts', 'w', encoding='utf-8') as f:
    f.write(content)

with open('src/app/components/pages/arrepentimiento-page.component.ts', 'r', encoding='utf-8') as f:
    content2 = f.read()
content2 = content2.replace('setValue()', 'setValue($event)')
with open('src/app/components/pages/arrepentimiento-page.component.ts', 'w', encoding='utf-8') as f:
    f.write(content2)
