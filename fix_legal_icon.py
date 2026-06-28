with open('src/app/components/pages/legal-page.component.ts', 'r', encoding='utf-8') as f:
    content = f.read()

target_import = "import { AppStateService } from '../../app-state.service';"
replacement_import = "import { AppStateService } from '../../app-state.service';\nimport { HugeiconsIconComponent } from '@hugeicons/angular';\nimport { ArrowRight01Icon } from '@hugeicons/core-free-icons';"
content = content.replace(target_import, replacement_import)

target_imports_array = "imports: [CommonModule],"
replacement_imports_array = "imports: [CommonModule, HugeiconsIconComponent],"
content = content.replace(target_imports_array, replacement_imports_array)

target_icon = '<span class="material-icons text-[16px] opacity-100">arrow_forward</span>'
replacement_icon = '<hugeicons-icon [icon]="ArrowRight01Icon" [size]="16" [strokeWidth]="2" class="opacity-100"></hugeicons-icon>'
content = content.replace(target_icon, replacement_icon)

target_class = "export class LegalPageComponent {\n  private appState = inject(AppStateService);"
replacement_class = "export class LegalPageComponent {\n  ArrowRight01Icon = ArrowRight01Icon;\n  private appState = inject(AppStateService);"
content = content.replace(target_class, replacement_class)

with open('src/app/components/pages/legal-page.component.ts', 'w', encoding='utf-8') as f:
    f.write(content)
