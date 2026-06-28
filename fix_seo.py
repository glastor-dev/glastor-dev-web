import json

with open('src/app/components/pages/product-detail-page.component.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add DOCUMENT to imports from @angular/common
if 'DOCUMENT' not in content:
    content = content.replace('import { CommonModule } from "@angular/common";', 'import { CommonModule, DOCUMENT } from "@angular/common";')

# 2. Inject DOCUMENT
if 'document = inject(DOCUMENT)' not in content:
    content = content.replace('private title = inject(Title);', 'private title = inject(Title);\n  private document = inject(DOCUMENT);')

# 3. Add a variable to keep track of the script element
if 'private schemaScript: HTMLScriptElement | null = null;' not in content:
    content = content.replace('private sub: any;', 'private sub: any;\n  private schemaScript: HTMLScriptElement | null = null;')

# 4. Update ngOnInit
ng_on_init_new = '''  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const prod = this.product();
      if (prod) {
        // Standard Meta
        this.title.setTitle(prod.name + ' - Glastor');
        this.meta.updateTag({ name: 'description', content: prod.description });
        
        // OpenGraph & Twitter
        this.meta.updateTag({ property: 'og:title', content: prod.name + ' - Glastor' });
        this.meta.updateTag({ property: 'og:description', content: prod.description });
        if (prod.image) {
          this.meta.updateTag({ property: 'og:image', content: prod.image });
          this.meta.updateTag({ name: 'twitter:image', content: prod.image });
        }
        this.meta.updateTag({ property: 'og:type', content: 'product' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        
        if (prod.seo) {
          this.meta.updateTag({ name: 'keywords', content: prod.seo.metaTitle });
        }
        
        // Canonical (simulated)
        const canonicalUrl = 'https://glastor.com/producto/' + prod.id;
        this.meta.updateTag({ property: 'og:url', content: canonicalUrl });

        // Schema.org JSON-LD
        this.injectSchema(prod);
      }
    });
  }

  injectSchema(prod: Product) {
    this.removeSchema(); // Clean previous if any
    
    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": prod.name,
      "image": prod.gallery && prod.gallery.length ? [prod.image, ...prod.gallery] : [prod.image],
      "description": prod.description,
      "sku": prod.id,
      "brand": {
        "@type": "Brand",
        "name": "GLASTOR"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://glastor.com/producto/" + prod.id,
        "priceCurrency": "ARS",
        "price": prod.price,
        "availability": prod.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    };
    
    // Add reviews to schema if any
    if (prod.reviews && prod.reviews.length > 0) {
      schema["aggregateRating"] = {
        "@type": "AggregateRating",
        "ratingValue": prod.rating,
        "reviewCount": prod.reviews.length
      };
    }

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
    this.schemaScript = script;
  }

  removeSchema() {
    if (this.schemaScript && this.document.head.contains(this.schemaScript)) {
      this.document.head.removeChild(this.schemaScript);
      this.schemaScript = null;
    }
  }'''

# Replace ngOnInit block
import re
content = re.sub(r'ngOnInit\(\) \{[\s\S]*?\}\s*\}\s*\n\s*ngOnDestroy\(\) \{', ng_on_init_new + '\n\n  ngOnDestroy() {', content)

# 5. Update ngOnDestroy
if 'this.removeSchema();' not in content:
    content = content.replace('if (this.sub) this.sub.unsubscribe();', 'if (this.sub) this.sub.unsubscribe();\n    this.removeSchema();')

with open('src/app/components/pages/product-detail-page.component.ts', 'w', encoding='utf-8') as f:
    f.write(content)
