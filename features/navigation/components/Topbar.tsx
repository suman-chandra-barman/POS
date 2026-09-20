'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Sun, Moon, ChevronDown, User, LogOut, Check, Menu, Languages } from 'lucide-react';
import GB from 'country-flag-icons/react/3x2/GB';
import BD from 'country-flag-icons/react/3x2/BD';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// ─── Theme Store helpers for SSR-safe state synchronization ───────────────────
const subscribeTheme = (onStoreChange: () => void) => {
  window.addEventListener('storage', onStoreChange);
  window.addEventListener('theme-change', onStoreChange);
  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener('theme-change', onStoreChange);
  };
};

const getThemeSnapshot = () => {
  return document.documentElement.classList.contains('dark');
};
const getServerThemeSnapshot = () => false;

// ─── Language Config ──────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', label: 'EN', Flag: GB },
  { code: 'bn', name: 'Bangla', nativeName: 'বাংলা', label: 'বাং', Flag: BD },
] as const;

type Locale = (typeof LANGUAGES)[number]['code'];

export default function Topbar() {
  const t = useTranslations('Topbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Component states
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  // Theme subscription for client-side state without cascading renders
  const isDark = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const currentLang = LANGUAGES.find(l => l.code === locale) ?? LANGUAGES[0];

  // Language Change handler
  const handleLanguageChange = (newLocale: Locale) => {
    setLangOpen(false);
    const segments = pathname.split('/');
    if (segments.length > 1) {
      segments[1] = newLocale;
      router.push(segments.join('/'));
    }
  };

  // Dark theme toggler
  const toggleTheme = () => {
    document.documentElement.classList.add('disable-transitions');

    const nextIsDark = !document.documentElement.classList.contains('dark');
    if (nextIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    window.dispatchEvent(new Event('theme-change'));

    // Force style recalculation so color changes apply immediately
    void window.getComputedStyle(document.documentElement).opacity;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('disable-transitions');
      });
    });
  };

  // Synchronize DOM with saved theme on initial mount
  useEffect(() => {
    document.documentElement.classList.add('disable-transitions');
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = storedTheme === 'dark' || (!storedTheme && prefersDark);

    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.dispatchEvent(new Event('theme-change'));

    void window.getComputedStyle(document.documentElement).opacity;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('disable-transitions');
      });
    });
  }, []);

  // Routes with their own dedicated topbar (e.g. Purchase, Employee, and POS routes)
  if (pathname.includes('/purchase') || pathname.includes('/pos') || pathname.includes('/employee')) {
    return null;
  }

  return (
    <header className="h-16 border-b border-border bg-card text-card-foreground flex items-center justify-end px-4 md:px-6 z-20 sticky top-0">

      {/* ── Mobile Hamburger Menu ── */}
      <button
        type="button"
        aria-label="Open menu"
        className="md:hidden p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer mr-2 shrink-0"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* ── Right Section (Controls & Profile) ── */}
      <div className="flex items-center gap-2.5">
        
        {/* Professional Multilanguage Dropdown Switcher */}
        <div className="relative">
          <button
            type="button"
            id="topbar-lang-switcher"
            aria-haspopup="listbox"
            aria-expanded={langOpen}
            onClick={() => setLangOpen(v => !v)}
            className="flex items-center gap-2 hover:bg-muted hover:text-foreground border border-border rounded-full px-2.5 py-1.5 text-[12px] font-medium transition-all cursor-pointer shadow-xs"
          >
            <currentLang.Flag className="w-4.5 h-3 rounded-xs object-cover shrink-0 shadow-xs border border-border/40" />
            <span className="font-semibold text-[11px] tracking-wide text-foreground">
              {currentLang.nativeName}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold bg-muted px-1.5 py-0.5 rounded-sm">
              {currentLang.code}
            </span>
            <ChevronDown className={cn("w-3.5 h-3.5 text-muted-foreground transition-transform duration-200", langOpen && "rotate-180")} />
          </button>

          {langOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
              <ul
                role="listbox"
                aria-labelledby="topbar-lang-switcher"
                className="absolute right-0 top-full mt-1.5 w-48 bg-card rounded-xl shadow-lg border border-border py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-3 py-1.5 mb-1 border-b border-border flex items-center gap-2 text-muted-foreground">
                  <Languages className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider">
                    Select Language
                  </span>
                </div>
                {LANGUAGES.map(lang => {
                  const FlagIcon = lang.Flag;
                  return (
                    <li key={lang.code} role="option" aria-selected={locale === lang.code}>
                      <button
                        type="button"
                        onClick={() => handleLanguageChange(lang.code)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 text-[13px] text-left hover:bg-muted hover:text-foreground transition-colors cursor-pointer",
                          locale === lang.code ? "text-primary font-semibold bg-muted/60" : "text-muted-foreground"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <FlagIcon className="w-5 h-3.5 rounded-xs object-cover shrink-0 shadow-xs border border-border/40" />
                          <div className="flex flex-col">
                            <span className="text-[13px] font-medium leading-tight text-foreground">{lang.nativeName}</span>
                            <span className="text-[10px] text-muted-foreground leading-tight">{lang.name}</span>
                          </div>
                        </div>
                        {locale === lang.code && (
                          <Check className="h-4 w-4 text-primary shrink-0" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>

        {/* Theme Toggle (Light / Dark) */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-1.5 border border-border rounded-full hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Profile Avatar / Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(v => !v)}
            className="flex items-center gap-2 border border-border rounded-full px-2.5 py-1.5 hover:bg-muted text-foreground transition-colors cursor-pointer"
          >
            {/* Custom rounded avatar placeholder */}
            <div className="h-6 w-6 rounded-full bg-brand text-brand-foreground flex items-center justify-center font-bold text-[11px] overflow-hidden">
              SC
            </div>
            <span className="text-[12px] font-bold tracking-tight hidden sm:inline">{t('myAccount')}</span>
            <ChevronDown className={cn("w-3.5 h-3.5 text-muted-foreground transition-transform duration-200", profileOpen && "rotate-180")} />
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 top-full mt-1.5 w-52 bg-card border border-border rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3.5 py-2 border-b border-border mb-1">
                  <p className="text-[13px] font-bold text-foreground leading-none">Suman Chandra</p>
                  <p className="text-[11px] text-muted-foreground truncate mt-1">suman.chandra@example.com</p>
                </div>
                
                <Link
                  href={`/${locale}/settings`}
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <User className="h-4 w-4" />
                  Profile Settings
                </Link>
                
                <div className="border-t border-border my-1" />

                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    console.log('Logging out...');
                    alert('Logout action triggered');
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-[13px] text-destructive hover:bg-destructive/10 transition-colors text-left"
                >
                  <LogOut className="h-4 w-4" />
                  {t('logout')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
