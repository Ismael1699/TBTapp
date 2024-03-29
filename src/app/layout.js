import './globals.css';
import '/node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { lato } from './fonts';
import Providers from './Provider';

export const metadata = {
  title: 'Welcome!',
  description: 'Generated by Next.js',
  // icons: {
  //   icon: '/favicon.ico',
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='shortcut icon'
          href='/favicon.ico'
        />
      </head>
      <body className={lato.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
