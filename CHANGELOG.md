# Changelog — GLASTOR® Tienda

Todos los cambios notables de este proyecto se documentan en este archivo.
El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/)
y el versionado sigue [Semantic Versioning](https://semver.org/lang/es/).

---

## [16.0.0] — 2026-06-24

### 🚀 Lanzamiento inicial de producción

#### Added
- Portal SPA completo con arquitectura Angular 17+ (Signals)
- **Hero Section** con animaciones GSAP: carrusel cinematográfico de 4 slides con transiciones fluidas
- **Catálogo** con filtros por categoría, búsqueda y grid de productos
- **Detalle de Producto** con galería de imágenes, acordeón de specs, selector de variantes y reseñas dinámicas
- **Carrito de Compra** con drawer lateral, control de cantidades y cálculo de IVA (21%)
- **Lista de Deseos** (Wishlist) persistente con drawer lateral
- **DevOps Hub** — Panel de administración con CRM, logs en tiempo real, consola Redis y constructor de productos
- **Checkout** con flujo de facturación y factura digital descargable
- **Página de Legales** con 8 documentos legales (Privacidad, RGPD, Consumidor, etc.)
- **Navbar** con modo dock/glassmorphic y menú fullscreen estilo Awwwards
- **Footer** con marquesina de marcas distribuidoras, logo GLASTOR® y sello AFIP
- **Cookie Banner** con gestión de consentimiento RGPD
- Modo **Cinematic Glow** (dark mode premium) togglable
- Marquesina de logos de marcas oficiales (Honeywell, Zebra, Datalogic, Milwaukee, etc.)
- Sección de testimonios y sección "Íconos del mes"
- Gestión de estado con Angular Signals y `AppStateService`

#### Architecture
- Componentes modularizados: `HomePageComponent`, `CatalogPageComponent`, `ProductDetailPageComponent`, `NavbarComponent`, `FullscreenMenuComponent`, `CookieBannerComponent`, `ProductCardComponent`
- CSS del Hero extraído a archivo externo con debounce en resize
- Backend Node.js con API REST, base de datos SQLite y autenticación JWT

---

## Convención de Versiones

- **MAJOR** (X.0.0): Cambios de arquitectura o rediseño completo
- **MINOR** (0.X.0): Nuevas funcionalidades o secciones añadidas
- **PATCH** (0.0.X): Correcciones de bugs, ajustes visuales, optimizaciones

---

_Proyecto propietario — © 2026 GLASTOR S.A. Todos los derechos reservados._
