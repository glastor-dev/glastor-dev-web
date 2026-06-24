# GLASTOR: LEYES INQUEBRANTABLES DE INGENIERÍA VISUAL Y DISEÑO

Este documento establece las directrices fundamentales de arquitectura de interfaz, rendimiento y estética para el ecosistema digital de **Glastor**. Cualquier Agente de IA o Ingeniero de Software que contribuya a este proyecto DEBE adherirse estrictamente a estas reglas. Actúan como nuestro "Guardian Angel".

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
- **Inercia Base:** El proyecto utiliza **Lenis** para el Smooth Scrolling. Todo desplazamiento en la página debe tener la masa y fricción calculadas en `SmoothScroll.tsx`.
- **Interacciones de Interfaz:** Usar `framer-motion`. Los componentes NUNCA deben aparecer "de golpe" (pop-in). Deben usar máscaras (como `MaskedReveal`), desvanecimientos (`opacity`) o desenfoques (`backdrop-blur`).
- **Estados de Interacción:** Todo botón o enlace debe tener un estado de reposo, un estado `hover:` evidente (cambio de color, ligero escalado `scale-105`) y un estado de `active:` o `focus:`.

## 3. ACCESIBILIDAD ESTRICTA (WCAG AAA)
No sacrificamos el diseño por la accesibilidad, ni la accesibilidad por el diseño.
- **Contraste 7:1:** Todos los grises deben ser como mínimo `text-zinc-400`. Prohibido el uso de `text-zinc-600` sobre fondos `#050505` para contenido legible.
- **Visibilidad Cognitiva:** La tecla Tabulador DEBE generar un anillo de foco verde vibrante. (Ver la regla en `globals.css` para `*:focus-visible`).
- **Lector de Pantalla:** Todo botón sin texto explícito (iconos, cierres de modales) DEBE llevar su `aria-label`.
- **Sensibilidad al Movimiento:** Respetar de manera sagrada la directiva del sistema del usuario `prefers-reduced-motion`. Si está activa, se deshabilitan las físicas inerciales (Lenis) y animaciones bruscas.

## 4. ARQUITECTURA TÉCNICA (LA REGLA DEL ALCANCE)
Código predecible y modular.
- **Estado Global Aislado:** Prohibido propagar propiedades complejas (Prop Drilling). Para estados globales (como el Carrito B2B o telemetría) utilizar exclusivamentre **Zustand** en la carpeta `/store`.
- **Componentes Tontos vs. Inteligentes:** Componentes como botones de servicio, tarjetas y modales deben limitarse a renderizar la vista (UI). Toda la lógica de "orden detectada" o "cálculo de cotización" pertenece al estado del componente superior o a Zustand.
- **Server vs Client Components (Next.js 15):** Maximizar el uso de Server Components. Solo usar `"use client";` de manera quirúrgica al inicio de los archivos que necesiten Framer Motion, Lenis, Hooks de React (`useState`, `useEffect`) o Zustand. 

## 5. REVISIÓN ANTES DE GUARDAR (EL "GUARDIÁN")
Antes de finalizar la creación de un nuevo componente o característica, verifica obligatoriamente:
- [ ] ¿Respeta la paleta cromática exacta `#050505` y `#00ff66`?
- [ ] ¿Tiene soporte total de interacción visual (Hover/Focus/Active)?
- [ ] ¿Pasa los estándares de Lector de Pantalla y Contraste?
- [ ] ¿Mantiene un rendimiento excelente o abusa de hooks innecesarios?

## 6. COMUNICACIÓN Y ESTRATEGIA (STRAIGHT TALK)
El tono de voz de Glastor no vende "diseños bonitos", vende **rendimiento, sistemas escalables y resultados**.
- **Actitud:** Independiente, directo, con hambre, adaptable, láser y enfocado.
- **Copywriting:** Utilizar frases cortas, verbos de acción fuertes y un lenguaje aspiracional pero técnico. Evitar la jerga abstracta innecesaria.
- **Enfoque Comercial:** Las propuestas de valor deben destacar métricas reales (velocidad, adopción, conversiones) y el equilibrio entre *Rendimiento Técnico* (WebGL, Optimización) y *Diseño Emocional*.
- **Transparencia:** Mostrar siempre la base de operaciones (Madrid / Remoto Global) para anclar la marca en el mundo real y generar confianza.

> *"Construimos solamente ingeniería. Cada línea de código es un paso hacia la absoluta precisión visual y funcional."*

## 7. REFERENCIAS Y BENCHMARKS AWWWARDS / FWA
El estándar de calidad, interacciones y estética de este proyecto debe emular y competir directamente con los siguientes referentes de clase mundial:

### Componentes y UI/UX Pro
- [21st.dev](https://21st.dev/)
- [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

### Referencias de Dirección de Arte y Estética (Awwwards/FWA Level)
- [Elva Labs](https://elvalabs.ai/)
- [Aeruk Art](https://aerukart.com/)
- [Pattern Breaking](https://patternbreak.ing/)
- [Lupine Lights](https://www.lupinelights.com/)
- [Sowieso](https://sowieso.wero-wallet.eu/nl)
- [Matveyan](https://matveyan.com/)
- [Torii Studio](https://torii.studio/)
- [Salo UK](https://salo.uk/)
- [Webisoft](https://webisoft.com/)
- [Wibify Agency](https://wibify.agency/en)
- [Ownitt](https://ownitt.fr/)
- [Vaulk](https://vaulk.com/en-GB)
- [Razorpay Sprint 26](https://razorpay.com/sprint/26)
- [Awwwards](https://www.awwwards.com/)
