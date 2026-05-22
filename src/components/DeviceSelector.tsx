import React from 'react';
import { Smartphone, Monitor, Gamepad2 } from 'lucide-react';
import { DeviceType } from '@/types/sensitivity';

interface DeviceSelectorProps {
  value: DeviceType | null;
  onChange: (device: DeviceType) => void;
}

const devices: { id: DeviceType; label: string; description: string; icon: React.ReactNode }[] = [
  {
    id: 'android',
    label: 'Android',
    description: 'Smartphone Android',
    icon: <Smartphone className="w-6 h-6" />,
  },
  {
    id: 'iphone',
    label: 'iPhone',
    description: 'Apple iPhone',
    icon: <Smartphone className="w-6 h-6" />,
  },
  {
    id: 'pc',
    label: 'Computador',
    description: 'PC - Mouse + Teclado',
    icon: <Monitor className="w-6 h-6" />,
  },
  {
    id: 'mobilador',
    label: 'Mobilador',
    description: 'Mobile + Mouse Conectado',
    icon: <Gamepad2 className="w-6 h-6" />,
  },
];

export const DeviceSelector: React.FC<DeviceSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold text-gray-900">
        📱 Selecione seu Dispositivo
      </label>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {devices.map((device) => (
          <button
            key={device.id}
            onClick={() => onChange(device.id)}
            className={`
              p-4 rounded-lg border-2 transition-all duration-200
              flex flex-col items-center justify-center gap-2 text-center
              ${value === device.id
                ? 'border-orange-500 bg-orange-50 shadow-lg shadow-orange-500/20'
                : 'border-gray-200 hover:border-orange-300 bg-white hover:bg-orange-50/50'
              }
            `}
          >
            <span className={value === device.id ? 'text-orange-600' : 'text-gray-600'}>
              {device.icon}
            </span>
            <span className={`text-sm font-semibold ${value === device.id ? 'text-orange-600' : 'text-gray-700'}`}>
              {device.label}
            </span>
            <span className="text-xs text-gray-500">{device.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};