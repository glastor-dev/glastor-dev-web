# GLASTOR: LEYES INQUEBRANTABLES DE INGENIERÍA VISUAL Y DISEÑO

Este documento establece las directrices fundamentales de arquitectura de interfaz, rendimiento y estética para el ecosistema digital de **Glastor** en **Angular (AnalogJS)**. Cualquier Agente de IA o Ingeniero de Software que contribuya a este proyecto DEBE adherirse estrictamente a estas reglas. Actúan como nuestro "Guardian Angel".

---

## 1. ESTÉTICA Y DIRECCIÓN DE ARTE (NIVEL "AWWWARDS")
La interfaz debe sentirse premium, brutalista, tecnológica y orientada al futuro.
- **Paleta de Colores Restringida:** 
  - Fondo base absoluto: `#050505` (Ultra negro, nunca gris claro).
  - Acento principal (Neón/Energía): `#00ff66` (Glastor Green).
  - Textos secundarios: Tonos exactos de `zinc-400` para descripciones largas, y `white` para encabezados.
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
