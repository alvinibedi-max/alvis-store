import {Link} from '@remix-run/react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="space-y-6">
          <h1 className="text-7xl font-light text-gray-300">404</h1>
          <div className="h-0.5 w-16 bg-gray-200 mx-auto" />
        </div>

        <div className="space-y-3 mt-6">
          <h2 className="text-2xl font-medium text-gray-800">Page Not Found</h2>
          <p className="text-gray-600 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
