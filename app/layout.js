import './globals.css';
import Navbar from './(navbar)/navbar';

export const metadata = {
  title: 'Login',
  description: 'Generated by Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <main className='contSec'>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
