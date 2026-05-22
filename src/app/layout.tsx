import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SensiBot - Gerador de Sensibilidade Free Fire',
  description: 'Gere a sensibilidade perfeita para o Free Fire com base em seu dispositivo, DPI, estilo de jogo e arma favorita. IA integrada para máxima precisão.',
  keywords: 'Free Fire, Sensibilidade, Gerador, DPI, Mobilador, Emulador',
  authors: [{ name: 'SensiBot' }],
  creator: 'guildabase44',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://sensibot.vercel.app',
    title: 'SensiBot - Gerador de Sensibilidade Free Fire',
    description: 'Sua sensibilidade perfeita, calculada com precisão 🎯',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f97316" />
      </head>
      <body className="antialiased bg-white">
        {children}
      </body>
    </html>
  );
}
