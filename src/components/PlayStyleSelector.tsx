import React from 'react';
import { PlayStyle, PlayStyleLabel } from '@/types/sensitivity';

interface PlayStyleSelectorProps {
  value: PlayStyle | null;
  onChange: (style: PlayStyle) => void;
}

const styles: { id: PlayStyle; label: PlayStyleLabel; description: string; icon: string }[] = [
  {
    id: 'light',
    label: 'Leve/Rápida',
    description: 'Rápido, reativo, com flicks precisos',
    icon: '⚡',
  },
  {
    id: 'medium',
    label: 'Média/Controlada',
    description: 'Equilibrado entre velocidade e controle',
    icon: '⚖️',
  },
  {
    id: 'heavy',
    label: 'Pesada/Força',
    description: 'Lento, controlado, ideal para precisão',
    icon: '🛡️',
  },
];

export const PlayStyleSelector: React.FC<PlayStyleSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold text-gray-900">
        🎯 Estilo de Jogo ou Estilo de Puxada
      </label>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onChange(style.id)}
            className={`
              p-4 rounded-lg border-2 transition-all duration-200 text-left
              ${
                value === style.id
                  ? 'border-orange-500 bg-orange-50 shadow-lg shadow-orange-500/20'
                  : 'border-gray-200 hover:border-orange-300 bg-white hover:bg-orange-50/50'
              }
            `}
          >
            <div className="text-2xl mb-2">{style.icon}</div>
            <div className={`font-semibold ${value === style.id ? 'text-orange-600' : 'text-gray-700'}`}>
              {style.label}
            </div>
            <div className="text-xs text-gray-600 mt-1">{style.description}</div>
          </button>
        ))}
      </div>

      {value && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-sm text-purple-800">
          {value === 'light' && (
            '⚡ Sua sensibilidade será aumentada para permitir movimentações rápidas e reativas.'
          )}
          {value === 'medium' && (
            '⚖️ Sensibilidade equilibrada para versatilidade em diferentes situações.'
          )}
          {value === 'heavy' && (
            '🛡️ Sua sensibilidade será reduzida para permitir maior controle e precisão.'
          )}
        </div>
      )}
    </div>
  );
};
