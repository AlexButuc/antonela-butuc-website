'use client';

import { useAuth } from '@/app/providers';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { 
  Home, 
  PlusCircle, 
  Calendar, 
  Sparkles,
  LogOut,
  Menu,
  X,
  Crown
} from 'lucide-react';

const navItems = [
  { href: '/tracker', label: 'Dashboard', icon: Home },
  { href: '/tracker/log', label: 'Log Today', icon: PlusCircle },
  { href: '/tracker/history', label: 'History', icon: Calendar },
  { href: '/tracker/insights', label: 'Insights', icon: Sparkles },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('demo_user');
    localStorage.removeItem('hormonal_tracker_logs');
    localStorage.removeItem('hormonal_tracker_profile');
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-stone">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone mb-4">Please log in to continue</p>
          <Link href="/auth/login" className="btn-outline">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-ivory/[0.96] backdrop-blur-md border-b border-gold/15 shadow-[0_1px_0_rgba(201,169,98,0.12),0_4px_24px_rgba(28,26,23,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/tracker" className="flex items-center gap-3">
              <span className="font-serif text-xl text-gold tracking-wider">AB</span>
              <span className="hidden sm:block text-xs text-stone tracking-widest uppercase">
                Pattern Tracker
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-gold/10 text-gold'
                        : 'text-stone hover:text-charcoal hover:bg-blush/50'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <Link
                href="/tracker/premium"
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase text-terracotta border border-terracotta/30 rounded-lg hover:bg-terracotta/10 transition-colors"
              >
                <Crown size={14} />
                Premium
              </Link>
              
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-stone hover:text-charcoal transition-colors"
              >
                <LogOut size={18} />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gold"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-ivory border-t border-gold/15">
            <nav className="px-4 py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                      isActive
                        ? 'bg-gold/10 text-gold'
                        : 'text-stone hover:bg-blush/50'
                    }`}
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/tracker/premium"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-terracotta"
              >
                <Crown size={20} />
                Premium
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-3 px-4 py-3 w-full text-stone hover:text-charcoal"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Demo mode banner */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-terra-light/60 border-b border-terracotta/15 py-2 text-center">
        <p className="text-xs text-terracotta">
          Demo Mode — Data is stored locally in your browser. 
          <Link href="/" className="ml-2 underline hover:no-underline">
            Clear data on exit
          </Link>
        </p>
      </div>

      {/* Main content */}
      <main className="flex-1 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
