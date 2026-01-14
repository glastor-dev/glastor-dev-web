
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai'; // Se mantiene para tipos, pero no para instanciación con API Key
import { aiConfig } from '../services/gemini';
import { ChatMessage } from '../types';

interface AIChatProps {
  setTheme?: (t: string) => void;
}

// Utilidades de audio
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const AIChat: React.FC<AIChatProps> = ({ setTheme }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Sistemas GLASTOR® inicializados. Soy tu Agente de Arquitectura. ¿En qué sección deseas profundizar o qué configuración prefieres?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Telemetría de salud
  const [signalStrength, setSignalStrength] = useState(98);
  
  const [liveInput, setLiveInput] = useState("");
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const [liveOutput, setLiveOutput] = useState("");
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<any>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping, liveInput, liveOutput]);

  // Efecto de fluctuación de señal para estética
  useEffect(() => {
    const interval = setInterval(() => {
      setSignalStrength(prev => Math.max(94, Math.min(100, prev + (Math.random() * 2 - 1))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleToolCall = (fnCall: any) => {
    const { name, args } = fnCall;
    if (name === 'navigateTo') {
      const element = document.getElementById(args.sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else if (name === 'updateSystemTheme') {
      if (setTheme) setTheme(args.theme);
    }
    return "Protocolo ejecutado con éxito.";
  };

  const stopLive = () => {
    setIsLive(false);
    setIsConnecting(false);
    setLiveInput("");
    setLiveOutput("");
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    inputAudioCtxRef.current?.close();
    outputAudioCtxRef.current?.close();
    sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    sourcesRef.current.clear();
  };

  const startLive = async () => {
    try {
      setIsConnecting(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      
      const inCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      inputAudioCtxRef.current = inCtx;
      outputAudioCtxRef.current = outCtx;

      // 🛑 ADVERTENCIA DE SEGURIDAD CRÍTICA 🛑
      // La siguiente línea expone tu clave de API en el frontend.
      // La funcionalidad de voz en tiempo real requiere una conexión persistente (WebSocket)
      // que no se puede securizar fácilmente a través de una API serverless estándar de Vercel.
      // Para una implementación segura en producción, necesitarías un backend dedicado (ej. un servidor Node.js)
      // que gestione la conexión con la API de Gemini y se comunique con tu frontend.
      //
      // La funcionalidad ha sido deshabilitada temporalmente para evitar la exposición de la clave.
      // Para probarla, descomenta la siguiente línea y asegúrate de tener una variable de entorno
      // NEXT_PUBLIC_API_KEY configurada, pero NUNCA despliegues esto a producción.
      
      // const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_API_KEY || "" });
      
      // Lanzamos un error para detener la ejecución y mostrar el problema.
      throw new Error("La funcionalidad de voz en vivo no es segura en esta configuración y ha sido deshabilitada. Revisa los comentarios en AIChat.tsx.");

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: async () => {
            setIsLive(true);
            setIsConnecting(false);
            
            await inCtx.audioWorklet.addModule('/audio-processor.js');
            const workletNode = new AudioWorkletNode(inCtx, 'audio-processor');
            const source = inCtx.createMediaStreamSource(stream);
            source.connect(workletNode);
            workletNode.port.onmessage = (event) => {
              const pcmBlob = { data: encode(new Uint8Array(event.data)), mimeType: 'audio/pcm;rate=16000' };
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              setLiveOutput(prev => prev + message.serverContent!.outputTranscription!.text);
            } else if (message.serverContent?.inputTranscription) {
              setLiveInput(prev => prev + message.serverContent!.inputTranscription!.text);
            }
            if (message.serverContent?.turnComplete) {
              setLiveInput("");
              setLiveOutput("");
            }
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && outCtx) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
              const buffer = await decodeAudioData(decode(audioData), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                const result = handleToolCall(fc);
                sessionPromise.then(s => s.sendToolResponse({
                  functionResponses: [{ id: fc.id, name: fc.name, response: { result } }]
                }));
              }
            }
          },
          onclose: () => stopLive(),
          onerror: () => stopLive()
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: aiConfig.systemInstruction,
          tools: aiConfig.tools,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Error al iniciar el chat de voz:", err);
      stopLive();
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping || isLive) return;
    const userText = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);
    try {
      const apiResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', text: userText }]
        }),
      });

      if (!apiResponse.ok) throw new Error(`Error en la API: ${apiResponse.statusText}`);

      const response = await apiResponse.json();

      if (response.functionCalls) {
        for (const fc of response.functionCalls) handleToolCall(fc);
      }
      setMessages(prev => [...prev, { role: 'model', text: response.text || "Protocolo ejecutado." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Error de enlace neuronal." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[450px] md:min-h-[550px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-all hover:border-[var(--primary)]/30 group">
      
      {/* HEADER DE TELEMETRÍA AVANZADA */}
      <div className="p-3 md:p-4 bg-white/[0.03] border-b border-white/10 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Indicador de Estado Multi-LED */}
            <div className="relative flex items-center justify-center w-6 h-6">
              <div className={`absolute inset-0 rounded-full blur-[6px] opacity-40 transition-colors duration-500 
                ${isLive ? 'bg-red-500' : isConnecting ? 'bg-yellow-500' : isTyping ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
              <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 border border-white/20
                ${isLive ? 'bg-red-500 animate-pulse' : isConnecting ? 'bg-yellow-500 animate-pulse' : isTyping ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500'}`}></div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white mono">
                  {isLive ? 'Live_Neural_Link' : isConnecting ? 'Establishing_Link' : 'Glastor_Agent_Ready'}
                </span>
                <span className="px-1 text-[7px] bg-white/10 rounded-sm text-gray-400 mono font-bold">V4.5</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                 <span className={`text-[8px] mono font-bold ${isLive ? 'text-red-400' : 'text-gray-500'} uppercase`}>
                   Status: {isLive ? 'Encrypted_Vocal' : isConnecting ? 'Handshake' : 'Secure_Idle'}
                 </span>
                 <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                 <span className="text-[8px] mono text-gray-600 font-bold">SIG_STR: {signalStrength.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Heartbeat Monitor Visual */}
          <div className="hidden sm:flex items-center gap-4">
             <div className="flex items-end gap-[1px] h-4 w-12 opacity-30 group-hover:opacity-60 transition-opacity">
                {[1,2,3,4,5,6,7,8].map(i => (
                  <div key={i} className="w-1 bg-blue-500" style={{ height: `${20 + Math.random() * 80}%` }}></div>
                ))}
             </div>
             <button 
               onClick={isLive ? stopLive : startLive}
               className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 border font-bold text-[9px] mono uppercase
                 ${isLive ? 'bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30' : 'bg-white/5 text-gray-500 hover:text-white border-white/10 hover:border-white/30'}`}
             >
               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" 
                   d={isLive ? "M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H10a1 1 0 01-1-1v-4z" : "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"} />
               </svg>
               {isLive ? 'Disconnect' : 'Start_Voz'}
             </button>
          </div>
        </div>
      </div>

      {/* ÁREA DE MENSAJES */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 custom-scrollbar relative">
        {isLive && (
          <div className="flex flex-col items-center justify-center h-full space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="flex gap-1.5 items-end h-24 w-full justify-center">
               {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(i => (
                 <div key={i} className="w-1.5 bg-[var(--primary)] rounded-full animate-pulse shadow-[0_0_10px_var(--primary)]" 
                      style={{ height: `${15 + Math.random() * 85}%`, animationDuration: `${0.3 + Math.random() * 0.7}s` }}></div>
               ))}
            </div>
            <div className="w-full space-y-4 max-w-sm">
               <div className="p-4 bg-white/5 border border-white/10 rounded-2xl relative">
                  <span className="absolute -top-2 left-4 px-2 bg-[#0a0a0a] text-[7px] mono text-blue-500 font-bold uppercase tracking-widest">In_Stream_Transcription</span>
                  <p className="text-xs text-blue-400 mono italic min-h-[1.5rem]">{liveInput || "Captando frecuencias vocales..."}</p>
               </div>
               <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl relative">
                  <span className="absolute -top-2 left-4 px-2 bg-[#0a0a0a] text-[7px] mono text-white font-bold uppercase tracking-widest">Core_Output_Buffer</span>
                  <p className="text-xs text-white leading-relaxed min-h-[1.5rem]">{liveOutput || "Sincronizando respuesta..."}</p>
               </div>
            </div>
          </div>
        )}

        {!isLive && messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`group relative max-w-[90%] md:max-w-[85%] p-4 md:p-5 rounded-2xl md:rounded-3xl text-xs md:text-sm leading-relaxed ${
              m.role === 'user' ? 'bg-[var(--primary)] text-black font-bold rounded-br-none shadow-xl' : 'bg-white/5 text-gray-300 rounded-bl-none border border-white/5 backdrop-blur-sm'
            }`}>
              <div className="whitespace-pre-wrap">{m.text}</div>
              <div className={`absolute bottom-full mb-1 text-[7px] mono uppercase opacity-0 group-hover:opacity-100 transition-opacity font-black tracking-widest ${m.role === 'user' ? 'right-0 text-white/30' : 'left-0 text-blue-500/30'}`}>
                {m.role === 'user' ? 'AUTH_USER_PAYLOAD' : 'KERNEL_RESPONSE_TELEMETRY'}
              </div>
            </div>
          </div>
        ))}
        {isTyping && !isLive && (
          <div className="flex justify-start">
            <div className="bg-white/5 text-blue-400 text-[9px] mono p-4 rounded-2xl animate-pulse border border-blue-500/20 flex items-center gap-3">
              <div className="flex gap-1.5">
                 <div className="w-1 h-3 bg-blue-500/50 rounded-full animate-bounce"></div>
                 <div className="w-1 h-3 bg-blue-500/70 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                 <div className="w-1 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              EJECUTANDO_HEURÍSTICA_NÚCLEO...
            </div>
          </div>
        )}
      </div>

      {/* INPUT DE COMANDOS */}
      <form onSubmit={handleSend} className="p-3 md:p-4 bg-black/40 border-t border-white/10 flex gap-2 md:gap-3 relative">
        <input 
          type="text" 
          value={input}
          disabled={isLive}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isLive ? "Escuchando señal..." : "Ingrese comando o consulta..."}
          className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:px-5 md:py-4 text-base md:text-xs outline-none focus:border-[var(--primary)]/50 transition-all mono text-white disabled:opacity-30 placeholder:text-gray-700"
        />
        <button 
          disabled={isTyping || isLive}
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[var(--primary)] text-black rounded-xl hover:brightness-110 disabled:opacity-30 transition-all shadow-lg active:scale-95"
        >
          <svg className="w-5 h-5 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default AIChat;
