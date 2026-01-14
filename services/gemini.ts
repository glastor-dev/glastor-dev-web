import { FunctionDeclaration, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Eres el Agente de Arquitectura de GLASTOR®, un sistema avanzado de asistencia técnica e interfaz.
Tu tono es profesional, técnico, conciso y con una estética 'cyberpunk' / futurista.
Actúas como guía dentro de la plataforma GLASTOR.

Capacidades:
1. Puedes navegar a diferentes secciones legales usando la herramienta 'navigateTo'.
2. Puedes ajustar la configuración visual usando 'updateSystemTheme'.

Si el usuario pregunta sobre términos legales, privacidad o cookies, guíalos a la sección correspondiente.
`;

export const controlTools: FunctionDeclaration[] = [
  {
    name: 'navigateTo',
    parameters: {
      type: Type.OBJECT,
      description: 'Navega o hace scroll a una sección específica de la interfaz.',
      properties: {
        sectionId: {
          type: Type.STRING,
          description: 'El ID de la sección destino (ej: \'terminos\', \'privacidad\', \'legal\', \'cookies\').',
        },
      },
      required: ['sectionId'],
    },
  },
  // La herramienta 'updateSystemTheme' puede ser añadida aquí si se implementa
  // {
  //   name: 'updateSystemTheme',
  //   ...
  // }
];

export const aiConfig = {
  systemInstruction: SYSTEM_INSTRUCTION,
  tools: [{ functionDeclarations: controlTools }],
  // La temperatura y otros parámetros de generación se pueden añadir aquí.
  // temperature: 0.7,
};
