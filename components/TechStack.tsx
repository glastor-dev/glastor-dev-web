
import React from 'react';

const TechStack: React.FC = () => {
  const categories = [
    { title: "Backend", skills: ["Python", "FastAPI", "Django", "Deno", "NodeJS"] },
    { title: "Data", skills: ["PostgreSQL", "MongoDB", "Redis", "ElasticSearch"] },
    { title: "DevOps", skills: ["Docker", "GitHub Actions", "AWS", "CI/CD"] },
    { title: "Frontend", skills: ["React", "TypeScript", "Tailwind", "Vite"] },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {categories.map((cat, idx) => (
        <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
          <h4 className="text-blue-400 font-bold text-xs uppercase mb-3 tracking-widest">{cat.title}</h4>
          <div className="flex flex-wrap gap-2">
            {cat.skills.map((skill, sIdx) => (
              <span key={sIdx} className="text-sm text-gray-400 group-hover:text-white transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechStack;
