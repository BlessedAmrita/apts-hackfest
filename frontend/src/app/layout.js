'use client';
import { store } from '@/config/store'
import '@/styles/globals.css'
import { Provider } from 'react-redux'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Provider store={store}>
        {children}
        </Provider>
        </body>
    </html>
  )
}
