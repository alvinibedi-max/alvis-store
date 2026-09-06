import React from 'react';
import {Link} from '@remix-run/react';
import AlvisLogo from './AlvisLogo';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function AuthLayout({title, subtitle, children}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center gap-2 group">
            <AlvisLogo size={48} />
            <span className="text-gray-900 font-black text-3xl">ALVIS</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h1 className="text-2xl font-black text-gray-900 mb-2 text-center">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-600 text-sm text-center mb-6">
              {subtitle}
            </p>
          )}
          {children}
        </div>

        <div className="mt-6 text-center">
          <Link to="/">
            <a className="text-sm text-gray-600 hover:text-fuchsia-600 transition">
            Back to Alvis
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
