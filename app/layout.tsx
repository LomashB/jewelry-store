import { Toaster } from 'react-hot-toast';
import { CartProvider } from '@/context/CartContext';
import Navbar from '../components/NavBar';
import './globals.css';
import Footer from '@/components/footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body className='bg-white'>
      <CartProvider>
        <Navbar />
        {children}
        <Footer />
        <Toaster position="top-right" />
      </CartProvider>
    </body>
  </html>
  );
}