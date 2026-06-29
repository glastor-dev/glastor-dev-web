# 11. Autenticidad y Consistencia de Marca

- Todas las descripciones SEO deben ser directas, técnicas y reflejar la personalidad única de Glastor. Evitar frases genéricas como “diseño y desarrollo de plataformas visuales de alto rendimiento”.
- Los textos deben ser específicos: priorizar tecnologías, metodologías y resultados concretos (ejemplo: “Protocolos Python, WebGL, DevOps, VFX, seguridad ofensiva…” en vez de “arsenal técnico”).
- Botones y enlaces deben usar siempre las clases de fuente y color de la marca, sin mayúsculas sostenidas.
- Si se usan citas, deben ser visualmente diferenciadas y alineadas a la identidad visual.
- En secciones con mucho texto (proyectos, servicios), priorizar la concisión y el espacio en blanco.
- Footer y legales deben mantener claridad, precisión y coherencia con la identidad Glastor (ejemplo: “Legales”, “Medios de Pagos”).

---

Estas reglas se han reforzado tras la última auditoría de contenido y diseño. Todo el equipo debe revisar periódicamente los textos y layouts para asegurar que no se introduzcan frases genéricas ni inconsistencias con la identidad Glastor®.

## REGLAS DE DISEÑO Y CONTENIDO — GLASTOR®

## 1. Alineación

- Usar texto alineado a la izquierda por defecto.
- Solo centrar texto cuando deba alinearse con otros elementos centrados en espacios estrechos (ej: presentaciones).

## 2. Uso de Mayúsculas y Minúsculas

- Evitar el uso de mayúsculas sostenidas (NO USAR SOLO MAYÚSCULAS).
- Utilizar mayúsculas y minúsculas en títulos, encabezados y cuerpo de texto.
- La fuente está optimizada para mayúsculas y minúsculas, no para mayúsculas sostenidas.

## 3. Énfasis

- Resaltar solo con **negrita** o **color** (nunca ambos a la vez).
- No usar cursiva, subrayado ni mayúsculas para énfasis.
- Usar titulares grandes y/o en negrita para captar atención.
- Titulares en verde (color Glastor) para máxima identidad.
- Mantener jerarquía visual clara usando tamaño, color, grosor y espaciado.

## 4. Longitud de Línea

- Mantener entre 20 y 100 caracteres por línea (incluyendo espacios).
- Preferir espacios en blanco laterales antes que forzar el texto a ocupar todo el ancho.

## 5. Márgenes

- Usar márgenes amplios para lograr diseños abiertos y accesibles.
- No saturar el espacio con texto; priorizar la concisión.
- El tamaño del margen depende del sistema de diseño y el contexto, pero siempre debe haber espacio generoso.

## 6. Citas

- Las citas deben ser visualmente distinguibles del resto del texto.
- Elegir el estilo de cita según el contexto, pero siempre debe parecer una cita.

## 7. Puntuación

- Usar comillas y apóstrofes inclinados (no verticales rectos, salvo para pies/pulgadas).
- Guiones cortos para unir palabras (ej: “iniciar sesión”).
- Rayas cortas para separar números (ej: “2023–2024”).
- Rayas largas para pausas/frases parentéticas (sin espacios antes/ni después).

## 8. Tracking (Espaciado entre letras)

- No modificar el tracking por defecto salvo justificación técnica.
- La fuente Red Hat está optimizada para tracking automático.
- Usar grosores variables solo dentro del set permitido (normal, negrita, etc.).
- No usar grosores personalizados fuera del set estándar.

## 9. Identidad Visual

- Prohibido el uso de componentes genéricos (ej: cards estándar).
- Siempre usar la paleta, estilos y layouts propios de Glastor.
- El sitio debe ser fluido, impactante y orientado a conversión.
- Lenis es obligatorio para el manejo de scroll.

## 10. Tipografía y Sistema de Escala (Brutalismo Glastor)

La forma en que aplicamos nuestras fuentes es el pilar de nuestra identidad visual. A diferencia de interfaces corporativas tradicionales, Glastor® utiliza un enfoque brutalista, agresivo y de altísimo impacto visual para sus titulares, contrastado con una legibilidad perfecta para sus descripciones técnicas.

**Nuestras Familias Tipográficas Oficiales:**

1. **Archivo (Display):** Para impacto masivo. Reemplaza a Red Hat Display.
2. **Inter (Text/Sans):** Para legibilidad en lectura prolongada y subtítulos. Reemplaza a Red Hat Text.
3. **JetBrains Mono (Mono):** Para datos técnicos, código y micro-etiquetas. Reemplaza a Red Hat Mono.

**El Sistema de Escala H1-H6:**
Para garantizar una adaptación responsiva fluida, utilizamos fórmulas `clamp()` en CSS (implementadas globalmente bajo clases `.glastor-h*`).

- **Display Masivo (H1, H2, H3):**
  - **Uso:** Heroes, Títulos de sección, Títulos de tarjetas masivas.
  - **Estilo:** `Archivo`, peso **Black (900)**, **Mayúsculas Sostenidas (Uppercase)** obligatorias, interlineado extremadamente comprimido (`leading-[0.85]`), y espaciado negativo (`tracking-tighter`).
  - _Nota:_ Abrazamos las mayúsculas en estos tamaños masivos para demostrar valentía y peso físico, contradiciendo la regla clásica de "no usar mayúsculas".

- **Lectura e Interfaz (H4, Subtítulos, Párrafos):**
  - **Uso:** Nombres de producto, subtítulos introductorios, descripciones.
  - **Estilo:** `Inter` variable (`100..900`). H4 en `bold` y mayúsculas, subtítulos en `light` y párrafos en `normal`. Mantenemos márgenes generosos y un interlineado relajado (`leading-relaxed`) para no abrumar.

- **Datos Técnicos (H5, H6, Etiquetas):**
  - **Uso:** Metadatos, insignias, identificadores B2B.
  - **Estilo:** `JetBrains Mono`, peso **Black**, mayúsculas, color verde acento (`#41BF84`), y espaciado ampliado (`tracking-widest` o `tracking-[0.2em]`) para evocar instrumentación de precisión.

**Reglas Prácticas Tipográficas:**

- **SÍ:** Utiliza las clases globales `.glastor-h*` (ej: `.glastor-h1`, `.glastor-h4`) o las etiquetas nativas HTML para heredar estos estilos.
- **SÍ:** Usa mucho espacio en blanco lateral para dar respiro al peso brutalista.
- **NO:** No mezcles familias (ej. no uses Inter para un H1 masivo).
- **NO:** No modifiques el _tracking_ manual ni el _leading_ si utilizas las clases `.glastor-h*`, estas ya están matemáticamente calibradas.

---

## 12. Accesibilidad y WCAG 2.2

- **Tamaño de Fuente Mínimo:**
  - El tamaño mínimo absoluto para micro-copia técnica (captions, HUD, detalles mono) es de **10px**.
  - El texto de lectura estándar debe ser de al menos **12px** a **16px**.
- **Contraste:** Seguir los estándares WCAG 2.2 (2023). El texto debe tener un ratio de contraste de al menos **4.5:1** (Nivel AA) contra su fondo.
- **Micro-copia Dinámica:** Evitar el uso de opacidades inferiores al **60%** en textos pequeños si el contraste base no es lo suficientemente alto.
- **Navegación por Teclado:** Todos los elementos interactivos deben tener estados de "focus" claros y ser navegables mediante teclado.

---

Este archivo debe ser consultado y respetado por todo el equipo de desarrollo y diseño. Cualquier excepción debe ser justificada y aprobada por la dirección de Glastor®.
