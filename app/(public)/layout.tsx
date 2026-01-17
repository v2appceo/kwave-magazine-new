import { Header } from '@/components/layout/Header';
import '@/app/globals.css';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // We move the global styling here to apply to all pages including articles
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      {children}
    </div>
  );
}