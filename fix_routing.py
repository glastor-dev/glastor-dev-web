with open('src/app/portal.ts', 'r', encoding='utf-8') as f:
    content = f.read()

target_import = "import { RouterOutlet } from '@angular/router';"
replacement_import = "import { RouterOutlet, Router } from '@angular/router';"
content = content.replace(target_import, replacement_import)

target_inject = "currencyService = inject(CurrencyService);"
replacement_inject = "currencyService = inject(CurrencyService);\n  router = inject(Router);"
content = content.replace(target_inject, replacement_inject)

target_set_view = """      setTimeout(() => {
        if (view === 'devops') {
          this.currentView.set('admin');
          this.activeAdminTab.set('devops');
        } else {
          this.currentView.set(validView);
          if (view === 'admin') {
            this.activeAdminTab.set('crm');
          }
        }"""
replacement_set_view = """      setTimeout(() => {
        if (view === 'devops') {
          this.currentView.set('admin');
          this.activeAdminTab.set('devops');
          this.router.navigate(['/admin']);
        } else {
          this.currentView.set(validView);
          if (view === 'admin') {
            this.activeAdminTab.set('crm');
          }
          if (productId) {
            this.router.navigate(['/tienda', productId]);
          } else {
            this.router.navigate(['/' + validView]);
          }
        }"""
content = content.replace(target_set_view, replacement_set_view)

with open('src/app/portal.ts', 'w', encoding='utf-8') as f:
    f.write(content)
