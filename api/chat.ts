import { GoogleGenAI } from '@google/genai';
import { aiConfig } from '../services/gemini';

// En Vercel con Vite, usamos tipos estándar o 'any' si no queremos instalar @types/node explícitamente para esto.
// Vercel inyecta req y res automáticamente.

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("La variable de entorno GEMINI_API_KEY no está definida en el servidor.");
}

const ai = new GoogleGenAI({ apiKey });

export default async function handler(req: any, res: any) {
  // Configurar CORS si es necesario, aunque en el mismo dominio (Vercel) no suele hacer falta.
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: 'El cuerpo de la petición debe contener "messages".' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash', // Asegúrate de usar un modelo válido y disponible
      contents: messages.map((m: { role: string; text: string; }) => ({
        role: m.role,
        parts: [{ text: m.text }]
      })),
      config: aiConfig,
    });

    res.status(200).json(response);
  } catch (error: any) {
    console.error('Error en el endpoint /api/chat:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud de chat.', details: error.message });
  }
}