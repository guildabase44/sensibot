import React from 'react';
import { SensitivityResult } from '@/types/sensitivity';
import { Download, Image, Copy } from 'lucide-react';
import { exportResultAsPDF, exportResultAsImage, copyConfigToClipboard } from '@/utils/exportUtils';

interface ResultCardProps {
  result: SensitivityResult;
  elementId: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, elementId }) => {
  return (
    <div id={elementId} className="w-full bg-white rounded-lg border-2 border-orange-200 p-8">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-orange-200">
        <h2 className="text-3xl font-bold text-transparent bg-gradient-orange bg-clip-text mb-2">
          🎮 SensiBot
        </h2>
        <p className="text-gray-600">Sua Configuração Perfeita de Sensibilidade</p>
      </div>

      {/* Input Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
        <div>
          <p className="text-xs text-gray-600 font-semibold">DISPOSITIVO</p>
          <p className="text-sm font-bold text-orange-600">{result.input.device.toUpperCase()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 font-semibold">REFRESH RATE</p>
          <p className="text-sm font-bold text-orange-600">{result.input.refreshRate}Hz</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 font-semibold">DPI</p>
          <p className="text-sm font-bold text-orange-600">{result.input.dpi}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 font-semibold">CONFIANÇA</p>
          <p className="text-sm font-bold text-green-600">{result.confidence}%</p>
        </div>
      </div>

      {/* Sensibilidades In-Game */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">⚙️ Configurações In-Game (0-200)</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            { label: 'Geral', value: result.inGame.general },
            { label: 'Ponto Vermelho', value: result.inGame.redDot },
            { label: 'Mira 2x', value: result.inGame.scope2x },
            { label: 'Mira 4x', value: result.inGame.scope4x },
            { label: 'AWM', value: result.inGame.awm },
          ].map((scope) => (
            <div key={scope.label} className="bg-gradient-orange text-white rounded-lg p-4 text-center">
              <p className="text-xs font-semibold opacity-90">{scope.label}</p>
              <p className="text-3xl font-bold mt-2">{scope.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* System Configuration */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">🖥️ Configurações de Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900 font-semibold">DPI Recomendada</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">{result.system.recommendedDpi}</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-900 font-semibold">Velocidade do Ponteiro</p>
            <p className="text-2xl font-bold text-purple-600 mt-2">{result.system.pointerSpeed}%</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-3">{result.system.notes}</p>
      </div>

      {/* Emulator Config (se aplicável) */}
      {result.emulator && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🖱️ Configurações do Emulador</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-900 font-semibold">Sensibilidade X</p>
              <p className="text-2xl font-bold text-red-600 mt-2">{result.emulator.sensitivityX}</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-900 font-semibold">Sensibilidade Y</p>
              <p className="text-2xl font-bold text-red-600 mt-2">{result.emulator.sensitivityY}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-900 font-semibold">DPI Mouse</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{result.emulator.recommendedMouseDpi}</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-900 font-semibold">Número de Ajuste</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">{result.emulator.adjustmentNumber}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">{result.emulator.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="text-center pt-6 border-t-2 border-orange-200 text-xs text-gray-500">
        <p>Gerado por SensiBot - {new Date().toLocaleDateString('pt-BR')}</p>
        <p className="mt-1">Sua sensibilidade perfeita, calculada com precisão 🎯</p>
      </div>
    </div>
  );
};

interface ResultDisplayProps {
  result: SensitivityResult;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const elementId = `result-card-${Date.now()}`;

  const handleExportPDF = async () => {
    try {
      await exportResultAsPDF(result, elementId);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao exportar PDF');
    }
  };

  const handleExportImage = async () => {
    try {
      await exportResultAsImage(elementId);
    } catch (error) {
      console.error('Erro ao exportar imagem:', error);
      alert('Erro ao exportar imagem');
    }
  };

  const handleCopyConfig = async () => {
    try {
      await copyConfigToClipboard(result);
      alert('Configuração copiada para clipboard!');
    } catch (error) {
      console.error('Erro ao copiar:', error);
      alert('Erro ao copiar configuração');
    }
  };

  return (
    <div className="space-y-6">
      <ResultCard result={result} elementId={elementId} />

      {/* Export Buttons */}
      <div className="flex flex-col md:flex-row gap-3 justify-center flex-wrap">
        <button
          onClick={handleExportPDF}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          <Download className="w-5 h-5" />
          Exportar PDF
        </button>

        <button
          onClick={handleExportImage}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          <Image className="w-5 h-5" />
          Exportar Card
        </button>

        <button
          onClick={handleCopyConfig}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          <Copy className="w-5 h-5" />
          Copiar Config
        </button>
      </div>
    </div>
  );
};
