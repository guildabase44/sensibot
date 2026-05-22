import React from 'react';
import { RefreshRate } from '@/types/sensitivity';

interface RefreshRateSelectorProps {
  value: RefreshRate | null;
  onChange: (rate: RefreshRate) => void;
}

const rates: RefreshRate[] = [60, 90, 120, 144];

export const RefreshRateSelector: React.FC<RefreshRateSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold text-gray-900">
        🔄 Taxa de Atualização da Tela (Hertz)
      </label>
      <p className="text-sm text-gray-600">
        Telas com maior refresh rate possuem melhor touch sampling rate
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {rates.map((rate) => (
          <button
            key={rate}
            onClick={() => onChange(rate)}
            className={`
              p-4 rounded-lg border-2 transition-all duration-200 font-semibold
              ${
                value === rate
                  ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-lg shadow-orange-500/20'
                  : 'border-gray-200 hover:border-orange-300 bg-white text-gray-700 hover:bg-orange-50/50'
              }
            `}
          >
            {rate}Hz
          </button>
        ))}
      </div>

      {value && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          {value >= 120 && (
            '✨ Tela de alta taxa! Sua sensibilidade será reduzida em 5-10% para evitar tremores na mira.'
          )}
          {value === 90 && (
            '👍 Boa taxa de atualização com compensação de 2% na sensibilidade.'
          )}
          {value === 60 && (
            '📱 Taxa padrão. Configuração sem compensação de refresh rate.'
          )}
        </div>
      )}
    </div>
  );
};
