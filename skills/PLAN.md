# PLAN: Modularización, Mejoras y Calidad — GLAS+TOR

## Referencia Principal: https://www.itsoffbrand.com/

---

## FASE 1: MODULARIZACIÓN DEL HOMEPAGE (app.html / portal.html → 8 secciones extraídas)

**Problema actual:** `portal.html` y `app.html` tienen cientos de líneas de código monolítico, secciones inline, y lógica mezclada.

**Solución:** Extraer cada sección en un componente dedicado bajo `components/sections/`:

### Componentes a crear:

| # | Componente | Líneas actuales | Descripción |
|---|-----------|----------------|-------------|
| 1 | `HeroSectionComponent` | ~55 | Hero con headline masivo + OffBrandOrb overlap |
| 2 | `PillarsSection.tsx` | ~150 | "Multiplicamos visualmente" + dos columnas (Dev/VFX) |
| 3 | `ServicesListSection.tsx` | ~70 | Lista editorial de 6 servicios (ServiceEditorialItem) |
| 4 | `PortfolioShowcaseSection.tsx` | ~25 | Header del portfolio + BentoCaseStudies |
| 5 | `PhilosophySection.tsx` | ~45 | "Sistemas escalables. Energía contagiosa." |
| 6 | `PartnersGridSection.tsx` | ~75 | Grid de partners con crosshairs HUD |
| 7 | `ContactCTASection.tsx` | ~145 | Formulario de contacto inline |
| 8 | `AwardsSection.tsx` | ~5 | Wrapper de AwardsHonors |

### Resultado esperado:
- `portal.html` reducido a ~20 líneas (solo composición de componentes con selectores `<app-hero-section>`, etc.)
- Cada sección independently testable
- Mejor code splitting自然
- Fácil reordenamiento de secciones

---

## FASE 2: HEADER COMPARTIDO (eliminación de duplicación)

**Problema:** El header está duplicado idénticamente en 5 páginas (home, about, services, projects, contact). ~25 líneas × 5 = 125 líneas duplicadas.

**Solución:** Crear `src/app/components/header.component.ts` como componente reutilizable con:
- Logo GLAS+TOR
- Navegación overlay
- Sticky backdrop-blur
- Props opcionales para variaciones de tema (dark/contact)

### Estructura:
```
components/
  header.component.ts          ← Nuevo, extraído de portal.html
  navigation-overlay.component.ts  ← Mantenido y modularizado
```

---

## FASE 3: MEJORA DE ANIMACIONES Y TRANSICIONES

### 3.1 Template de transición de página (Router Animations)
**Estado actual:** Transición simple opacity+y.
**Mejora:** Añadir transición cinematográfica estilo OFF+BRAND:
- Clip-path wipe vertical (de abajo hacia arriba)
- Stagger de elementos internos
- Persistencia del orb entre navegaciones

### 3.2 Scroll Progress mejorado (ScrollProgress.tsx)
**Estado actual:** Solo indicador circular de % scroll.
**Mejora:** Añadir sidebar de navegación de secciones (como OFF+BRAND):
- Labels de sección visibles en desktop
- Highlight de sección activa
- Click para scroll suave a sección
- Ocultar en mobile, mostrar en md+

### 3.3 Transiciones de sección (ScrollLine)
**Estado actual:** Línea horizontal que aparece al scroll.
**Mejora:** Añadir variaciones:
- `direction="left"` / `"right"` / `"center"` (ya existe pero no se usa variadamente)
- Color variant: `green` para acento, `white` para neutral
- Integración con IntersectionObserver para disparo más preciso

### 3.4 Preloader mejorado
**Estado actual:** Barra de progreso lineal simple.
**Mejora:** Estilo más cinematográfico:
- Texto de sistema rotativo ("CARGANDO SHADERS" → "COMPILANDO MÓDULOS" → "INICIALIZANDO GPU")
- Efecto de glitch sutil en el texto
- Transición de salida con clip-path

---

## FASE 4: CONTENIDO Y COPY (Referencia OFF+BRAND)

### 4.1 Homepage — Copy refinado
**OFF+BRAND dice:** "A Different creative approach" → simple, directo, memorable.
**Glastor actual:** "SISTEMAS DE ALTO RENDIMIENTO" → muy técnico, frío.

**Mejora del hero:**
```
ANTES:  SISTEMAS / DE ALTO / RENDIMIENTO.
DESPUÉS: INGENIERÍA / QUE INSPIRA / RESULTADOS.
```
Mantener la brutalidad tipográfica pero con message más aspiracional.

### 4.2 About Us — Storytelling mejorado
**Problema:** La página about no tiene timeline, no tiene equipo, no tiene historia de fundación.
**Mejora:** Añadir sección "Nuestra Historia" con:
- Año de fundación
- Hitos clave
- Filosofía de equipo
- Ubicaciones (Madrid + Buenos Aires)

### 4.3 Projects — Contenido verificable
**Problema:** Los 6 proyectos son conceptualmente sólidos pero no muestran trabajo real con URLs.
**Mejora:**
- Añadir links a demos o screenshots reales
- Añadir categorías más claras
- Mejorar las "visual equations" (algunas son triviales: `Community(c) + Education(e) = Wesley`)

### 4.4 Services — Eliminación del pricing calculator
**Problema:** El calculador de precios en services es prematuro y resta seriedad.
**Mejora:** Mantener la descripción de servicios pero mover el CTA a "Solicitar propuesta" en lugar de mostrar precios estimados.

---

## FASE 5: DISEÑO Y ESTILOS (CSS/Globals)

### 5.1 Contact page — Unificación visual
**Problema actual:** Contact page usa `bg-[#222]`, inputs `rounded-full`, estilo completamente diferente al resto del sitio.
**Solución:** Unificar con el design system:
- Fondo: `#050505` (igual que el resto)
- Inputs: `border-b border-white/10` (igual que homepage)
- Labels: `font-mono text-[9px]` (igual que homepage)
- Formulario estilo editorial, no estilo "form builder genérico"

### 5.2 Footer — Mejoras
- Añadir animación de entrada con `MaskedReveal`
- Los botones de AI Summary mejorar su feedback visual
- Añadir hover states más ricos en los links

### 5.3 CSS Global — Nuevas utilidades
```css
/* Transición de clip-path para page transitions */
.clip-reveal { clip-path: inset(0 0 100% 0); }
.clip-reveal-active { clip-path: inset(0 0 0 0); }

/* Gradiente animado para borders */
@keyframes border-glow { ... }
```

---

## FASE 6: PERFORMANCE Y ARQUITECTURA

### 6.1 Lazy Loading de componentes pesados
```typescript
// ANTES (Carga síncrona):
import { PhantomCanvasComponent } from "@/components/canvas/phantom.component";

// DESPUÉS (Standalone Lazy Loading con loadComponent o en rutas):
// Ej. en el router:
{ path: 'canvas', loadComponent: () => import('./canvas/phantom.component').then(c => c.PhantomCanvasComponent) }
```

### 6.2 Lazy loading de OffBrandOrb
El orb está en `fixed` position y se renderiza en todas las páginas. Debería:
- Cargarse dinámicamente
- Tener un fallback CSS puro
- Deshabilitarse en `prefers-reduced-motion`

### 6.3 Server Components para páginas estáticas
Las páginas about, services, projects podrían ser Server Components con secciones client Islands.

### 6.4 Imagen en Footer
```html
<!-- ANTES: -->
<img src="/images/DATAWEB.jpg" alt="Data Fiscal" class="h-10 w-auto" />

<!-- DESPUÉS: -->
<img ngSrc="/images/DATAWEB.jpg" alt="Data Fiscal" width="40" height="40" priority />
```

---

## FASE 7: ACCESIBILIDAD

### 7.1 Skip to content link
Añadir al layout:
```tsx
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute ...">
  Saltar al contenido principal
</a>
```

### 7.2 ARIA labels en canvas
```tsx
<canvas aria-label="Visualización WebGL interactiva de Glastor" role="img" />
```

### 7.3 Scrollbar visibility
Mantener `scrollbar-width: none` pero añadir focus-visible styles para navegación por teclado.

---

## FASE 8: ESTRUCTURA DE ARCHIVOS FINAL

```
app/
  layout.tsx           ← Actualizado con skip-link
  template.tsx         ← Mejorado con clip-path transition
  page.tsx             ← Reducido a ~80 líneas (solo composición)
  globals.css          ← Con nuevas utilidades
  about-us/page.tsx    ← Con storytelling mejorado
  services/page.tsx    ← Sin pricing calculator
  projects/page.tsx    ← Con contenido verificable
  contact/page.tsx     ← Unificado con design system
  legal/page.tsx       ← Sin cambios

components/
  Header.tsx           ← NUEVO: Header compartido
  Footer.tsx           ← Mejorado
  NavigationOverlay.tsx ← Sin cambios
  Preloader.tsx        ← Mejorado con glitch text
  CustomCursor.tsx     ← Sin cambios
  ScrollProgress.tsx   ← Con sidebar de secciones
  SmoothScroll.tsx     ← Sin cambios
  NoiseOverlay.tsx     ← Sin cambios
  CookieConsent.tsx    ← Sin cambios
  CartDrawer.tsx       ← Sin cambios
  
  sections/            ← NUEVO: Secciones del homepage
    HeroSection.tsx
    PillarsSection.tsx
    ServicesListSection.tsx
    PortfolioShowcaseSection.tsx
    PhilosophySection.tsx
    PartnersGridSection.tsx
    ContactCTASection.tsx
    AwardsSection.tsx
  
  reveal/              ← NUEVO: Animaciones de revelado
    MaskedReveal.tsx   ← Movido aquí
    SplitTextReveal.tsx ← Movido aquí
    ScrollLine.tsx     ← Movido aquí
  
  ui/                  ← NUEVO: Componentes UI base
    ServiceEditorialItem.tsx  ← Movido aquí
    HoverTiltCard.tsx         ← Movido aquí
    Magnetic.tsx              ← Movido aquí
    InfiniteMarquee.tsx       ← Movido aquí
    SensoryTelemetryDashboard.tsx ← Movido aquí
  
  canvas/              ← Sin cambios
  OffBrandOrb.tsx      ← Con lazy loading
  BentoCaseStudies.tsx ← Sin cambios significativos
  AwardsHonors.tsx     ← Sin cambios
  HorizontalScrollProjects.tsx ← Verificar uso
```

---

## ORDEN DE EJECUCIÓN RECOMENDADO

1. **Fase 1** (Modularización homepage) → Mayor impacto, desbloquea todo lo demás
2. **Fase 2** (Header compartido) → Elimina duplicación inmediata
3. **Fase 5.1** (Contact page unificación) → Corrección visual urgente
4. **Fase 6.1-6.2** (Dynamic imports) → Performance inmediata
5. **Fase 3** (Animaciones) → Mejora de polish
6. **Fase 4** (Contenido) → Mejora de calidad percibida
7. **Fase 7** (Accesibilidad) → Compliance
8. **Fase 6.3-6.4** (Server Components + imágenes) → Optimización final

---

## NOTAS TÉCNICAS

- **NO implementar cards** (según instrucción del usuario)
- Mantener la estética brutalista suiza OFF+BRAND como referencia
- Todos los componentes nuevos deben seguir `DESIGN_RULES.md`
- Usar `gsap` para animaciones inyectado en el ciclo de vida de Angular
- Los componentes components deben ser standalone y usar Signals (`signal()`)
- Verificar que `ScrollProgress` sidebar no interfiera con el Orb
