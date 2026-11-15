import './globals.css';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cellsprint.vercel.app'),
  title: 'CellSprint | El Reto Diario de Lógica y Agilidad en Excel',
  description: 'Compite cada día en el mismo reto global de hojas de cálculo, resuelve con fórmulas dinámicas en el menor tiempo posible y compara tu percentil en la campana de Gauss.',
  keywords: ['CellSprint', 'Excel', 'juego diario', 'hojas de calculo', 'Wordle Excel', 'fórmulas Excel', 'campana de Gauss'],
  openGraph: {
    title: 'CellSprint | Daily Spreadsheet Speed & Logic Challenge',
    description: 'Resuelve el reto diario de hojas de cálculo con fórmulas reales y descubre en qué percentil global estás hoy.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'CellSprint'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CellSprint | El Reto Diario de Hojas de Cálculo',
    description: 'Compite cada día en el reto global de Excel y compara tu tiempo en la campana de Gauss.'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
