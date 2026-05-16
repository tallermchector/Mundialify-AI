
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mundialify AI - Crea tu Cromo del Campeón',
  description: 'Convierte tu foto en un cromo oficial de la selección con IA.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Barlow+Condensed:ital,wght@0,100;0,400;0,700;0,900;1,100;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
