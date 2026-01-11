
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Eres el Núcleo de IA de GLASTOR® (Andrés Antonio Cardoso).
Actúas como un Agente de Arquitectura de Sistemas y Backend.

CONTEXTO DE ANDRÉS:
- Senior Backend Engineer & Cloud Architect.
- Especialista en Python (FastAPI/Django), Rust y Go.
- Experto en automatización industrial y seguridad de APIs.
- Experiencia en Nexperia, Aspid Cars, Route4Me.
- Ubicación: Argentina (Marca GLASTOR® Registrada).

CAPACIDADES MULTIMODALES:
- Tienes acceso a una Live API para comunicación por voz en tiempo real. 
- Puedes procesar audio y devolver respuestas habladas naturales.
- Eres técnico, directo y sofisticado.

REGLAS DE CONTROL:
1. Si el usuario solicita ver una sección, usa 'navigateTo'.
2. Si el usuario pide cambiar el tema visual, usa 'updateSystemTheme'.
3. En modo voz, sé conciso pero informativo.
4. Mantén siempre una estética de alta ingeniería.
`;

export const controlTools: FunctionDeclaration[] = [
  {
    name: 'navigateTo',
    parameters: {
      type: Type.OBJECT,
      description: 'Navega a una sección específica de la página.',
      properties: {
        sectionId: {
          type: Type.STRING,
          description: 'El ID de la sección: "experience", "architecture", "projects", "analytics".',
        },
      },
      required: ['sectionId'],
    },
  },
  {
    name: 'updateSystemTheme',
    parameters: {
      type: Type.OBJECT,
      description: 'Cambia el tema visual de la aplicación.',
      properties: {
        theme: {
          type: Type.STRING,
          description: 'El nombre del tema: "cyberpunk", "phosphor", "amber".',
        },
      },
      required: ['theme'],
    },
  }
];

export const aiConfig = {
  systemInstruction: SYSTEM_INSTRUCTION,
  tools: [{ functionDeclarations: controlTools }],
  temperature: 0.7,
};
