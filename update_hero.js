const fs = require('fs');
let content = fs.readFileSync('src/app/components/sections/hero-section.component.ts', 'utf8');

const newSlides = `  slides: Slide[] = [
    {
      id: 'slide-1',
      tag: 'INGENIERÍA DE VANGUARDIA',
      title1: 'ESTÁNDARES',
      title2: 'DE LA INDUSTRIA',
      description: 'Potencia algorítmica y física al servicio de la construcción moderna. Equipos de ultra-alto rendimiento.',
      bgImage: 'assets/logos/h1.webp'
    },
    {
      id: 'slide-2',
      tag: 'ARQUITECTURA LXT',
      title1: 'ALTO',
      title2: 'DESEMPEÑO',
      description: 'El sistema de baterías más versátil del mundo. Una sola batería, infinitas posibilidades para la industria pesada.',
      bgImage: 'assets/logos/h2.webp'
    },
    {
      id: 'slide-3',
      tag: 'PROTOCOLO XGT',
      title1: 'FUERZA',
      title2: 'CINÉTICA',
      description: 'Soluciones de 40V Max diseñadas para aplicaciones de alta demanda. La transición definitiva hacia el futuro inalámbrico.',
      bgImage: 'assets/logos/h3.webp'
    },
    {
      id: 'slide-4',
      tag: 'CALIDAD GLASTOR®',
      title1: 'INTEGRIDAD',
      title2: 'ABSOLUTA',
      description: 'Ingeniería de precisión con motores magnéticos sin escobillas. Mayor vida útil, menor mantenimiento y eficiencia premium.',
      bgImage: 'assets/logos/h4.webp'
    }
  ];`;

content = content.replace(/  slides: Slide\[\] = \[[\s\S]*?  \];/g, newSlides);

const oldCss = `.details > .cta > .discover {
      border: 1px solid #ffffff;
      background-color: transparent;
      height: 36px;
      border-radius: 99px;
      color: #ffffff;
      padding: 4px 24px;
      font-size: 12px;
      margin-left: 16px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: bold;
    }
    .details > .cta > .discover:hover {
      background-color: white;
      color: black;
    }`;

const newCss = `.details > .cta > .discover {
      border: 1px solid #ffffff;
      background-color: transparent;
      height: 36px;
      border-radius: 99px;
      color: #ffffff;
      padding: 4px 24px;
      font-size: 12px;
      margin-left: 16px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      font-weight: bold;
      box-shadow: 0 0 0 rgba(255,255,255,0);
    }
    .details > .cta > .discover:hover {
      background-color: white;
      color: black;
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 10px 20px -10px rgba(255,255,255,0.5);
    }`;

content = content.replace(oldCss, newCss);

fs.writeFileSync('src/app/components/sections/hero-section.component.ts', content);
