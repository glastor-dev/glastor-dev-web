
# Changelog: Registro de Evolución Técnica de Glastor Web

Este documento sigue el estándar [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) y [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]
- Mejoras en responsividad y experiencia móvil.
- Nuevos componentes y secciones en desarrollo.

## [1.0.0] - 2026-01-10

### Added
- **Arquitectura Frontend Moderna:** Proyecto creado con React 19, Vite 6 y TypeScript.
- **Estilos y UI:** Integración completa de Tailwind CSS para diseño responsivo y utilidades modernas.
- **Componentes Personalizados:** 
  - Hero, Header, Footer, ProjectGrid, TechStack, StatsSection, TrustSection, SystemMonitor, Terminal interactiva, KernelStatusBar, CommandPalette, AIChat, ArchitectureDiagram.
- **Consola Interactiva:** Terminal simulada con comandos personalizados y animaciones (incluyendo neofetch, proyectos, etc).
- **Integración IA:** Soporte para Google Gemini API.
- **Visualización de Datos:** Uso de Recharts para estadísticas y gráficos.
- **Gestión de Proyectos:** Sincronización dinámica de proyectos desde GitHub.
- **Accesibilidad y UX:** Navegación fluida, scroll reveal, dark mode y temas personalizables.
- **Automatización y DevOps:** Configuración de scripts de build, preview y desarrollo.
- **Documentación y Gobernanza:** Archivos .github completos (contributing, codeowners, templates, seguridad, etc).

### Changed
- Refactor de componentes para mayor modularidad y mantenibilidad.
- Mejoras en la gestión de temas y persistencia de preferencias de usuario.

### Security
- Variables sensibles (como GEMINI_API_KEY) gestionadas por entorno seguro.
- Dependabot y CodeQL configurados para mantener la seguridad y actualización del stack.

---
© 2026 Andrés Antonio Cardoso | Ingeniería de Software de Código Abierto