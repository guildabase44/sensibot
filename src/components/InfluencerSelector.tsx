import React from 'react';
import { InfluencerProfile } from '@/types/sensitivity';
import { getAllInfluencers } from '@/data/influencers';
import { generateSensitivityConfiguration } from '@/utils/sensitivityCalculator';

interface InfluencerCardProps {
  influencer: InfluencerProfile;
  onSelect: () => void;
  isSelected: boolean;
}

const InfluencerCard: React.FC<InfluencerCardProps> = ({ influencer, onSelect, isSelected }) => {
  const getPlayStyleEmoji = (style: string) => {
    const emojis: Record<string, string> = {
      light: '⚡',
      medium: '⚖️',
      heavy: '🛡️',
    };
    return emojis[style] || '🎮';
  };

  const getWeaponEmoji = (weapon: string) => {
    const emojis: Record<string, string> = {
      sniper: '🎯',
      smg: '🔫',
      ar: '💣',
    };
    return emojis[weapon] || '🔫';
  };

  return (
    <button
      onClick={onSelect}
      className={`
        p-4 rounded-lg border-2 transition-all duration-200 text-left
        ${
          isSelected
            ? 'border-orange-500 bg-gradient-orange text-white shadow-lg shadow-orange-500/30'
            : 'border-gray-200 hover:border-orange-300 bg-white hover:bg-orange-50/50'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <img
          src={influencer.avatar}
          alt={influencer.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
            {influencer.nickname}
          </p>
          <p className={`text-xs ${isSelected ? 'text-orange-100' : 'text-gray-600'}`}>
            {influencer.name}
          </p>
        </div>
      </div>
      <div className={`mt-2 text-sm ${isSelected ? 'text-orange-100' : 'text-gray-600'}`}>
        {getPlayStyleEmoji(influencer.playStyle)} {influencer.playStyle.charAt(0).toUpperCase() + influencer.playStyle.slice(1)}
        {' • '}
        {getWeaponEmoji(influencer.weapon)} {influencer.weapon.toUpperCase()}
      </div>
      <p className={`mt-2 text-xs line-clamp-2 ${isSelected ? 'text-orange-50' : 'text-gray-600'}`}>
        {influencer.description}
      </p>
    </button>
  );
};

interface InfluencerSelectorProps {
  onSelectInfluencer: (influencer: InfluencerProfile) => void;
}

export const InfluencerSelector: React.FC<InfluencerSelectorProps> = ({ onSelectInfluencer }) => {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const influencers = getAllInfluencers();

  const handleSelect = (influencer: InfluencerProfile) => {
    setSelectedId(influencer.id);
    onSelectInfluencer(influencer);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          👑 Gere Sensibilidade de Famosos
        </h2>
        <p className="text-gray-600">
          Escolha um influenciador e receba uma configuração baseada em seu estilo de jogo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {influencers.map((influencer) => (
          <InfluencerCard
            key={influencer.id}
            influencer={influencer}
            onSelect={() => handleSelect(influencer)}
            isSelected={selectedId === influencer.id}
          />
        ))}
      </div>

      {selectedId && (
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
          <p className="text-sm text-green-800 font-semibold">
            ✓ Influenciador selecionado! Sua sensibilidade será gerada com base neste estilo.
          </p>
        </div>
      )}
    </div>
  );
};

export { InfluencerCard };
