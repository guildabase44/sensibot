'use client';

import React, { useState } from 'react';
import { ConfigForm } from '@/components/ConfigForm';
import { ResultDisplay } from '@/components/ResultDisplay';
import { InfluencerSelector } from '@/components/InfluencerSelector';
import { SensitivityResult } from '@/types/sensitivity';
import { InfluencerProfile } from '@/types/sensitivity';
import { generateSensitivityConfiguration } from '@/utils/sensitivityCalculator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

export default function Home() {
  const [currentResult, setCurrentResult] = useState<SensitivityResult | null>(null);
  const [activeTab, setActiveTab] = useState('generator');

  const handleGenerateConfig = (config: SensitivityResult) => {
    setCurrentResult(config);
    setActiveTab('result');
  };

  const handleSelectInfluencer = (influencer: InfluencerProfile) => {
    const input = {
      device: influencer.device as any,
      refreshRate: 120 as const,
      dpi: influencer.device === 'pc' || influencer.device === 'mobilador' ? 800 : 411,
      playStyle: influencer.playStyle,
      weapon: influencer.weapon,
    };

    const result = generateSensitivityConfiguration(input);
    setCurrentResult(result);
    setActiveTab('result');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-orange-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-orange bg-clip-text whitespace-nowrap">
                🎮 SensiBot
              </h1>
              <p className="text-xs md:text-sm text-gray-600 hidden md:block truncate">
                Gerador Inteligente de Sensibilidade Free Fire
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-gray-500">v1.0.0</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 md:px-4 py-6 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-6 md:mb-8 flex justify-center">
            <TabsList className="grid grid-cols-3 gap-1 md:gap-2 w-full md:w-auto">
              <TabsTrigger value="generator">🎯 Gerador</TabsTrigger>
              <TabsTrigger value="influencers">👑 Famosos</TabsTrigger>
              <TabsTrigger value="result" disabled={!currentResult}>
                📊 Resultado
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab 1: Generator */}
          <TabsContent value="generator" className="space-y-6 md:space-y-8">
            <div className="bg-white rounded-lg border-2 border-orange-200 p-4 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ⚙️ Gere Sua Configuração
              </h2>
              <p className="text-gray-600 mb-6 md:mb-8">
                Preencha os dados abaixo e receba uma sensibilidade otimizada para seu estilo de jogo
              </p>
              <ConfigForm onGenerateConfig={handleGenerateConfig} />
            </div>
          </TabsContent>

          {/* Tab 2: Influencers */}
          <TabsContent value="influencers" className="space-y-6 md:space-y-8">
            <div className="bg-white rounded-lg border-2 border-orange-200 p-4 md:p-8">
              <InfluencerSelector onSelectInfluencer={handleSelectInfluencer} />
            </div>
          </TabsContent>

          {/* Tab 3: Result */}
          {currentResult && (
            <TabsContent value="result" className="space-y-6 md:space-y-8">
              <div className="bg-white rounded-lg border-2 border-orange-200 p-4 md:p-8">
                <ResultDisplay result={currentResult} />
              </div>
            </TabsContent>
          )}
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="mt-12 md:mt-16 bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-2">🎮 SensiBot</h3>
              <p className="text-sm text-gray-400">
                Seu gerador inteligente de sensibilidade para Free Fire
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Recursos</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>✓ Cálculo Avançado</li>
                <li>✓ Múltiplos Dispositivos</li>
                <li>✓ IA Integrada</li>
                <li>✓ Exportação PDF/Imagem</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Sobre</h4>
              <p className="text-sm text-gray-400 mb-3">
                SensiBot © 2026 - Todos os direitos reservados
              </p>
              <p className="text-xs text-gray-500">
                Feito com ❤️ para a comunidade Free Fire Brasil
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
            <p>Sua sensibilidade perfeita, calculada com precisão 🎯</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
