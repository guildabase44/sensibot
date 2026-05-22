import React, { useState, useRef, useEffect } from 'react';
import { useSensitivityStore } from '@/store/sensitivityStore';

interface DragDetectorProps {
  onDragComplete: (speed: number) => void;
  isActive: boolean;
}

export const DragDetector: React.FC<DragDetectorProps> = ({ onDragComplete, isActive }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragTrail, setDragTrail] = useState<{ x: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { startDragDetection, updateDragSpeed, stopDragDetection, dragSpeed } = useSensitivityStore();

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isActive) return;

    setIsDragging(true);
    setDragTrail([]);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    startDragDetection(x, y);
    setDragTrail([{ x, y }]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !isActive) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    updateDragSpeed(x, y);
    setDragTrail((prev) => [...prev, { x, y }]);

    drawTrail();
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);
    stopDragDetection();

    if (dragSpeed !== null && dragSpeed > 0) {
      onDragComplete(dragSpeed);
    }

    setTimeout(() => {
      setDragTrail([]);
      drawTrail();
    }, 1000);
  };

  const drawTrail = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    if (dragTrail.length > 1) {
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(dragTrail[0].x, dragTrail[0].y);

      for (let i = 1; i < dragTrail.length; i++) {
        ctx.lineTo(dragTrail[i].x, dragTrail[i].y);
      }
      ctx.stroke();

      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.arc(dragTrail[dragTrail.length - 1].x, dragTrail[dragTrail.length - 1].y, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [isDragging, dragSpeed]);

  useEffect(() => {
    drawTrail();
  }, [dragTrail]);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">🎯 Simulador de Puxada</h3>
        <p className="text-sm text-gray-600">Arraste na mesma velocidade que você puxa no jogo</p>
      </div>

      <canvas
        ref={canvasRef}
        width={500}
        height={300}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        className={`
          w-full border-2 border-orange-300 rounded-lg cursor-crosshair
          ${isActive ? 'bg-white' : 'bg-gray-100 opacity-50 cursor-not-allowed'}
          transition-all duration-200
        `}
      />

      {dragSpeed !== null && (
        <div className="bg-gradient-orange text-white rounded-lg p-4 text-center">
          <p className="text-sm">Velocidade Detectada</p>
          <p className="text-3xl font-bold">{(dragSpeed * 1000).toFixed(2)} px/s</p>
          <p className="text-xs mt-2">Essa velocidade será usada para calibrar sua sensibilidade</p>
        </div>
      )}

      {isDragging && (
        <div className="text-center">
          <div className="animate-pulse text-orange-600 font-semibold">
            🔴 Detectando movimento...
          </div>
        </div>
      )}
    </div>
  );
};