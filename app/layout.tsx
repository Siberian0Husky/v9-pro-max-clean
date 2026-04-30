import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'GlobNexis | Industrial Connector Manufacturer & Exporter',
  description: 'China-based manufacturer of M12, M8 industrial connectors, automation cables and industrial plugs. Factory-direct pricing, global shipping, fast RFQ.',
  keywords: 'M12 connector supplier, M8 connector factory china, industrial plug wholesale, automation cable manufacturer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
