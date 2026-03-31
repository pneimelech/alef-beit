import React from 'react';

const Menorah = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V5M12 5L4 13M12 8L6 14M12 11L8 15M12 5L20 13M12 8L18 14M12 11L16 15M7 22H17" />
  </svg>
);

const Luchot = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="4" width="7" height="16" />
    <rect x="12" y="4" width="7" height="16" />
    <path d="M7 8h3M7 12h3M7 16h3M14 8h3M14 12h3M14 16h3" />
  </svg>
);

const Tzitzit = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="6" width="12" height="12" rx="1" />
    <path d="M9 6V4M15 6V4M6 18l-2 2M18 18l2 2M6 6l-2-2M18 6l2-2" />
  </svg>
);

const Candlesticks = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 20V10M16 20V10M6 20h4M14 20h4" />
    <path d="M8 7c.3-1 1-1.5 1-1.5s.2 1-.2 2c-.3 1-1 1.5-1 1.5s-.2-1 .2-2z" fill="currentColor" />
    <path d="M16 7c.3-1 1-1.5 1-1.5s.2 1-.2 2c-.3 1-1 1.5-1 1.5s-.2-1 .2-2z" fill="currentColor" />
  </svg>
);

const Kippah = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 16c0-4.4 3.6-8 8-8s8 3.6 8 8H4z" />
    <path d="M12 8v2M8 10l1 1M16 10l-1 1" />
  </svg>
);

const Challah = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12c0-2 2-4 4-4s4 2 4 4-2 4-4 4-4-2-4-4z" />
    <path d="M12 12c0-2 2-4 4-4s4 2 4 4-2 4-4 4-4-2-4-4z" />
    <path d="M8 8c0-2 2-4 4-4s4 2 4 4M16 8c0-2 2-4 4-4s4 2 4 4" />
  </svg>
);

const Tefillin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="9" width="10" height="7" rx="1" fill="currentColor" />
    <path d="M5 12h2M17 12h2M12 9V7M12 16v2" />
  </svg>
);

const ICONS = [
  { type: 'text', content: 'א' }, { type: 'text', content: 'ב' }, { type: 'text', content: 'ג' },
  { type: 'text', content: 'ד' }, { type: 'text', content: 'ה' }, { type: 'text', content: 'ו' },
  { type: 'text', content: 'ז' }, { type: 'text', content: 'ח' }, { type: 'text', content: 'ט' },
  { type: 'text', content: 'י' }, { type: 'text', content: 'כ' }, { type: 'text', content: 'ל' },
  { type: 'text', content: 'מ' }, { type: 'text', content: 'נ' }, { type: 'text', content: 'ס' },
  { type: 'text', content: 'ע' }, { type: 'text', content: 'פ' }, { type: 'text', content: 'צ' },
  { type: 'text', content: 'ק' }, { type: 'text', content: 'ר' }, { type: 'text', content: 'ש' },
  { type: 'text', content: 'ת' },
  { type: 'component', content: Menorah },
  { type: 'component', content: Luchot },
  { type: 'component', content: Tzitzit },
  { type: 'component', content: Candlesticks },
  { type: 'component', content: Kippah },
  { type: 'component', content: Challah },
  { type: 'component', content: Tefillin },
];

export default function JewishBackground() {
  // Generate a fixed set of positions - much denser for WhatsApp feel
  const items = [];
  const rows = 15;
  const cols = 15;
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const iconIndex = (r * cols + c) % ICONS.length;
      const icon = ICONS[iconIndex];
      const rotation = (r * 25 + c * 35) % 360;
      
      // Add slight randomness to position to avoid rigid grid
      const randomOffsetTop = (Math.sin(r * c) * 2);
      const randomOffsetLeft = (Math.cos(r + c) * 2);
      
      const top = (r * 6.6) + randomOffsetTop + 3;
      const left = (c * 6.6) + randomOffsetLeft + 3;
      
      items.push({ icon, rotation, top, left, id: `${r}-${c}` });
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none opacity-[0.15] overflow-hidden select-none">
      {items.map((item) => (
        <div 
          key={item.id}
          className="absolute text-xl text-orange-900"
          style={{ 
            top: `${item.top}%`, 
            left: `${item.left}%`, 
            transform: `rotate(${item.rotation}deg)` 
          }}
        >
          {item.icon.type === 'text' ? (
            <span className="font-serif font-bold">{(item.icon.content as string)}</span>
          ) : (
            <div className="w-6 h-6">
              {React.createElement(item.icon.content as React.ComponentType)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
