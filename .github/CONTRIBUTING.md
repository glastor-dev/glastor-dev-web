# 🌌 Protocolos de Ingeniería y Guía de Contribución

Gracias por sumarte a la misión de escalar el ecosistema de `**GLASTOR-DEV** la division de desarrollo de GLASTOR®`. Valoramos la excelencia técnica, el rigor arquitectónico y el compromiso con la calidad del software. Esta guía no es solo un conjunto de reglas, sino un marco de trabajo diseñado para optimizar la **Developer Experience (DX)** y garantizar la integridad del core.

## 🏗️ Filosofía de Desarrollo
Priorizamos la **Developer Experience (DX)** y la **Excelencia Técnica** sobre la velocidad de entrega.
- **Zero-Intrusion:** Respetamos la privacidad del usuario final por defecto.
- **Atomic Design:** La UI debe ser modular y escalable.
- **Type Safety:** El uso de TypeScript estricto es mandatorio.

## 🛠 Gestión Estratégica de Incidencias

### Reportes de Errores (Fidelidad Técnica)

Para optimizar los tiempos de resolución, exigimos reportes que eliminen la ambigüedad. Cada *issue* debe actuar como un documento técnico:

- **Executive Summary:** Breve descripción del impacto y alcance.
- **Protocolo de Reproducción:** Secuencia determinística de pasos.
- **Análisis de Desviación:** Contraste detallado entre el comportamiento observado vs. el esperado.
- **Stack Tecnológico:** Especificaciones del entorno (Runtime, Navegador, OS).
- **Evidencia Técnica:** Logs de consola, trazas de error o capturas visuales.

### Arquitectura de Nuevas Funcionalidades

Las propuestas deben alinearse con nuestra hoja de ruta técnica. Si planeas una mejora, presenta un *Design Doc* preliminar que cubra:

- **Business Value:** Justificación del ROI técnico.
- **User Stories:** Casos de uso específicos.
- **Esquema Arquitectónico:** Diagramas o lógica de implementación sugerida.
- **Viabilidad:** Consideraciones sobre retrocompatibilidad y performance.

## 🚀 Pipeline de Integración (Pull Requests)

Implementamos un flujo de CI/CD riguroso para proteger la estabilidad de `main`:

1. **Fork & Branching**
   Utiliza una nomenclatura semántica para tus ramas:
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Protocolo de Commits (Conventional Commits)**
   Seguimos estrictamente el estándar para automatizar el versionado semántico.
   
   | Tipo | Descripción | Ejemplo |
   | :--- | :--- | :--- |
   | `feat` | Nueva funcionalidad | `feat: implementar sistema de telemetría` |
   | `fix` | Corrección de errores | `fix: error de hidratación en SSR` |
   | `docs` | Documentación | `docs: actualizar política de privacidad` |
   | `perf` | Rendimiento | `perf: optimizar carga de fuentes` |
   | `chore` | Mantenimiento | `chore: actualizar dependencias` |

3. **Ciclo de Implementación**
   - Cumplimiento estricto del *Clean Code*.
   - Cobertura de tests unitarios y de integración.
   - Actualización sincrónica de la documentación.
4. **Validación Estática (Linting)**
   Garantiza la consistencia del estilo antes del commit:
   ```bash
   npm run lint --if-present
   ```
5. **Generación de Artefactos**
   Verifica que el build sea exitoso en un entorno local:
   ```bash
   npm run build
   ```
6. **Sincronización y Push**
   ```bash
   git push origin feature/amazing-feature
   ```

**Directrices de Calidad para PRs:**
- **Atomicidad:** Un cambio, una responsabilidad por PR.
- **Referenciación:** Vincula automáticamente mediante `#issue-number`.
- **Changelog:** Es mandatorio registrar los cambios en `CHANGELOG.md`.
- **Definition of Done:** Sin errores de linter, tipos estrictos y build exitoso.

## 💻 Setup del Entorno de Ingeniería

1. **Clonación de Alta Disponibilidad**
   ```bash
   git clone https://github.com/glastor-dev/supernova.git
   cd supernova
   ```
2. **Instalación de Dependencias**
   ```bash
   npm install
   ```
3. **Entorno de Desarrollo y Simulación**
   ```bash
   npm run dev
   ```
   *Para validación de Serverless Functions (Vercel Core):*
   ```bash
   vercel dev
   ```

## 📐 Principios de Ingeniería y DX

- **Integridad Sintáctica:** Adhesión total a las reglas de ESLint y Prettier.
- **Semántica Orientada a Dominio:** Nombramiento descriptivo basado en el contexto de negocio.
- **Modularidad Atómica:** Seguimiento estricto de los principios SOLID y patrones de diseño reactivos.
- **Performance First:** Uso optimizado de React Hooks y memoización estratégica.

## 🧪 Garantía de Calidad y Observabilidad

- **QA Manual & Automatizado:** Validación cruzada de funcionalidades.
- **Matriz de Compatibilidad:** Verificación en motores Blink, WebKit y Gecko.
- **Responsive Design:** Adaptabilidad garantizada en todos los breakpoints.
- **A11y:** Auditoría de accesibilidad conforme a estándares WCAG.

## 📧 Canales de Alta Prioridad y Soporte

Para discusiones arquitectónicas o consultas de infraestructura:

- **GitHub Discussions:** Canal preferente para debate técnico.
- **Soporte Corporativo:** [glastor.info@gmail.com](mailto:glastor.info@gmail.com)
- **Comunicación Directa (Telegram):** [@zerhocool](https://t.me/zerhocool)

---

## Código de Conducta

Este ecosistema opera bajo nuestro [Código de Conducta](.github/CODE_OF_CONDUCT.md). Fomentamos un entorno de colaboración profesional, meritocrático y respetuoso.

Agradecemos tu contribución a la excelencia tecnológica de Supernova.

© 2010-2026 Andrés Antonio Cardoso — Todos los derechos reservados
