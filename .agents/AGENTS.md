# GLASTOR: LEYES INQUEBRANTABLES DE INGENIERÍA VISUAL Y DISEÑO

Este documento establece las directrices fundamentales de arquitectura de interfaz, rendimiento y estética para el ecosistema digital de **Glastor** en **Angular (AnalogJS)**. Cualquier Agente de IA o Ingeniero de Software que contribuya a este proyecto DEBE adherirse estrictamente a estas reglas. Actúan como nuestro "Guardian Angel".

---

## 1. ESTÉTICA Y DIRECCIÓN DE ARTE (NIVEL "AWWWARDS")

La interfaz debe sentirse premium, brutalista, tecnológica y orientada al futuro.

- **Paleta de Colores Restringida:**
  - Fondo base absoluto (`--glastor-bg`): `#000000` / `#0D0D0D` (Ultra negro).
  - Acento principal (`--glastor-accent`): `#41BF84` (Verde esmeralda — COLOR PRIMARIO).
  - Acento secundario (`--glastor-mint`): `#6FDBA8` (Mint claro para VFX).
  - Acentos oscuros: `#01260E` (Verde bosque), `#2F4659` (Azul acero), `#1A3A4A` (Marino).
  - Textos sutiles: `#B8F0D4` (Mint pálido).
- **Gradientes Oficiales:**
  - `brand`: `linear-gradient(90deg, #01260E, #41BF84)`
  - `steel`: `linear-gradient(90deg, #000, #2F4659)`
  - `cinematic`: `linear-gradient(135deg, #01260E, #2F4659)`
- **Tipografía Estricta:**
  - Encabezados (Display): Uso de fuentes masivas, peso `font-black`, interlineado comprimido (`leading-[0.85]`), siempre en mayúsculas (`uppercase`) y con `tracking-tighter`.
  - Datos/Etiquetas (Mono): Fuentes monoespaciadas (`font-mono`) para pequeñas etiquetas, timestamps, estados del sistema, con `tracking-widest` para dar ese aire "técnico".
- **Sin bordes gruesos ni cajas genéricas:** Separación de componentes usando sutiles bordes translúcidos (`border-white/10`).
- **Fondos dinámicos:** Incorporación de efectos como `NoiseOverlay` y orbes borrosos controlados por el scroll.

## 2. CINÉTICA Y MICRO-INTERACCIONES (MOTION)

El movimiento no es un adorno, es información y peso físico.

- **Inercia Base:** El proyecto utiliza **Lenis** para el Smooth Scrolling.
- **Interacciones de Interfaz:** Usar **GSAP** u otras librerías inyectadas en los ciclos de vida de Angular. Los componentes NUNCA deben aparecer "de golpe" (pop-in). Deben usar máscaras, desvanecimientos (`opacity`) o desenfoques (`backdrop-blur`).
- **Estados de Interacción:** Todo botón o enlace debe tener un estado de reposo, un estado `hover:` evidente y un estado de `active:` o `focus:`.

## 3. ACCESIBILIDAD ESTRICTA (WCAG AAA)

No sacrificamos el diseño por la accesibilidad, ni la accesibilidad por el diseño.

- **Contraste 7:1:** Todos los grises deben ser como mínimo `text-zinc-400`. Prohibido el uso de `text-zinc-600` sobre fondos `#050505` para contenido legible.
- **Visibilidad Cognitiva:** La tecla Tabulador DEBE generar un anillo de foco verde vibrante. (Ver la regla en `styles.scss` para `*:focus-visible`).
- **Lector de Pantalla:** Todo botón sin texto explícito DEBE llevar su `aria-label`.
- **Sensibilidad al Movimiento:** Respetar `prefers-reduced-motion`.

## 4. ARQUITECTURA TÉCNICA (LA REGLA DEL ALCANCE)

Código predecible y modular en Angular.

- **Estado Global Aislado:** Para estados globales (como el Carrito B2B o telemetría) utilizar exclusivamentre **Servicios de Angular** apoyados en **Signals** (e.g. `signal()`, `computed()`) o RxJS.
- **Componentes Tontos vs. Inteligentes:** Componentes UI Standalone (`@Component({ standalone: true })`) deben limitarse a renderizar la vista (con `@Input()` y `@Output()`). Toda la lógica compleja pertenece al estado del componente de página superior o a servicios.
- **AnalogJS / Server Side Rendering (SSR):** Maximizar el uso de Server-Side Generation/Rendering donde aplique. Manejar el acceso a `window` y `document` cuidadosamente verificando `isPlatformBrowser`.

## 5. REVISIÓN ANTES DE GUARDAR

Antes de finalizar la creación de un nuevo componente, verifica obligatoriamente:

- [ ] ¿Respeta la paleta cromática exacta `#050505` y `#00ff66`?
- [ ] ¿Pasa los estándares de Lector de Pantalla y Contraste?
- [ ] ¿Mantiene un rendimiento excelente (usando `OnPush` o Signals)?

## 6. gstack Methodology: Skill Directives

Cuando el usuario escriba uno de estos comandos `/`, la IA DEBE adoptar la persona especificada:

- `/office-hours`: YC Office Hours (Product Strategy) - Retar la idea inicial y buscar el MVP real (10x mejor, pero más pequeño). No escribir código.
- `/plan-ceo-review`: CEO / Founder (Scope & Vision) - Buscar el "producto de 10 estrellas" y reducir drásticamente el alcance para lanzar rápido.
- `/plan-eng-review`: Engineering Manager (Architecture) - Definir flujo de datos, state machines, manejo de errores y proveer diagramas de arquitectura.
- `/plan-design-review`: Senior Designer (Aesthetics & UX) - Puntuar opciones de diseño, rechazar UI genérica, y demandar la estética premium definida en este documento.
- `/review`: Staff Engineer (Code Quality) - Buscar bugs sutiles, condiciones de carrera, leaks en RXJS (suscripciones sin desuscribir).
- `/qa`: QA Lead (Testing & Edge Cases) - Generar reportes de bugs detallados imaginando casos extremos. No escribir código sin presentar reporte.
- `/investigate`: Debugger - Debugueo sistemático. Trazar flujo, sin suposiciones a ciegas.
- `/ship`: Release Engineer - Auditoría de cambios recientes para lanzar a producción.

## 7. CONTENIDO, REDACCIÓN Y MICRO-COPIA (VOZ GLASTOR)

Basado en nuestro manual de marca, la redacción debe ser tan impecable y contundente como el diseño visual. 

- **Autenticidad y Precisión Técnica:**
  - Evitar frases genéricas de marketing. Las descripciones deben ser directas, técnicas y reflejar autoridad.
  - Usar terminología específica (ej. "Protocolos Python, WebGL, DevOps, SSG" en lugar de "tecnologías modernas").
- **Tipografía y Legibilidad (Adaptación Brutalista):**
  - **Títulos/Encabezados (Display):** A diferencia de proyectos anteriores, aquí SÍ abrazamos las mayúsculas sostenidas (`uppercase`) en tamaños masivos para los titulares, demostrando valentía y peso visual.
  - **Cuerpo de texto y Párrafos:** Usar minúsculas/mayúsculas (sentence case) normales. Redactar textos concisos.
  - **Longitud de línea:** Mantener entre 20 y 100 caracteres por línea. Priorizar el espacio en blanco (whitespace) antes que forzar el texto a ocupar todo el ancho.
- **Micro-copia y Puntuación:**
  - Los botones y etiquetas de datos (timestamps, estados) deben usar fuente monoespaciada (`font-mono`) en mayúsculas para mantener el aura técnica.
  - Usar rayas largas (—) para pausas o aclaraciones parentéticas.
  - Evitar sobre-ornamentar el texto. Que las palabras y la jerarquía de tamaños hablen por sí solas.
- **Accesibilidad Tipográfica:**
  - El tamaño mínimo absoluto para micro-copia técnica (HUDs, insignias) es de **10px**.
  - Evitar el uso de opacidades inferiores al **60%** en textos pequeños si el contraste base (que exigimos sea 7:1) se ve comprometido.
