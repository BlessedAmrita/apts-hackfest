'use client';

import { store } from '@/config/store';
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
