// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Kanban Board App',
  description: 'Task management with drag-and-drop and PDF export',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen text-gray-900">
        {/* You can add a navbar/header here if needed */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>

        {/* Global Toast Notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
