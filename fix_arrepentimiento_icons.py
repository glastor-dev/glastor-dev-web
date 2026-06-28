with open('src/app/components/pages/arrepentimiento-page.component.ts', 'r', encoding='utf-8') as f:
    content = f.read()

target_import = "import { BotProtectionComponent } from '../ui/bot-protection.component';"
replacement_import = "import { BotProtectionComponent } from '../ui/bot-protection.component';\nimport { HugeiconsIconComponent } from '@hugeicons/angular';\nimport { DeliveryBox01Icon, SentIcon, Refresh01Icon, CheckmarkBadge01Icon } from '@hugeicons/core-free-icons';"

content = content.replace(target_import, replacement_import)

target_imports_array = "imports: [CommonModule, ReactiveFormsModule, BotProtectionComponent],"
replacement_imports_array = "imports: [CommonModule, ReactiveFormsModule, BotProtectionComponent, HugeiconsIconComponent],"

content = content.replace(target_imports_array, replacement_imports_array)

target_icon_assignment = '<span class="material-icons scale-150">assignment_return</span>'
replacement_icon_assignment = '<hugeicons-icon [icon]="DeliveryBox01Icon" [size]="32" [strokeWidth]="1.5"></hugeicons-icon>'

content = content.replace(target_icon_assignment, replacement_icon_assignment)

target_icon_sync = '<span class="material-icons animate-spin scale-90">sync</span>'
replacement_icon_sync = '<hugeicons-icon [icon]="Refresh01Icon" [size]="20" [strokeWidth]="1.5" class="animate-spin"></hugeicons-icon>'

content = content.replace(target_icon_sync, replacement_icon_sync)

target_icon_send = '<span class="material-icons scale-90">send</span>'
replacement_icon_send = '<hugeicons-icon [icon]="SentIcon" [size]="20" [strokeWidth]="1.5"></hugeicons-icon>'

content = content.replace(target_icon_send, replacement_icon_send)

target_icon_check = '<span class="material-icons scale-150">check_circle</span>'
replacement_icon_check = '<hugeicons-icon [icon]="CheckmarkBadge01Icon" [size]="48" [strokeWidth]="1.5"></hugeicons-icon>'

content = content.replace(target_icon_check, replacement_icon_check)

target_class = "export class ArrepentimientoPageComponent"
replacement_class = "export class ArrepentimientoPageComponent {\n  DeliveryBox01Icon = DeliveryBox01Icon;\n  SentIcon = SentIcon;\n  Refresh01Icon = Refresh01Icon;\n  CheckmarkBadge01Icon = CheckmarkBadge01Icon;"

content = content.replace(target_class, replacement_class)

with open('src/app/components/pages/arrepentimiento-page.component.ts', 'w', encoding='utf-8') as f:
    f.write(content)
