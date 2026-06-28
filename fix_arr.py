with open('src/app/components/pages/arrepentimiento-page.component.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Imports
if 'BotProtectionComponent' not in content:
    content = content.replace("import { AppStateService } from '../../app-state.service';", "import { AppStateService } from '../../app-state.service';\nimport { BotProtectionComponent } from '../ui/bot-protection.component';")
    content = content.replace("imports: [CommonModule, ReactiveFormsModule],", "imports: [CommonModule, ReactiveFormsModule, BotProtectionComponent],")

# Form Group
if "botToken: ['', Validators.required]" not in content:
    content = content.replace("producto: ['', Validators.required]", "producto: ['', Validators.required],\n      botToken: ['', Validators.required]")

# Template Injection
bot_html = '''
                <div class="pt-2">
                  <app-bot-protection (tokenGenerated)="arrepentimientoForm.get('botToken')?.setValue($event)"></app-bot-protection>
                </div>

                <div class="pt-4">'''

content = content.replace('<div class="pt-4">', bot_html)

with open('src/app/components/pages/arrepentimiento-page.component.ts', 'w', encoding='utf-8') as f:
    f.write(content)
