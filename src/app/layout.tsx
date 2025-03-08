import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ConvexClientProvider } from './ConvexClientProvider';
// import { ClerkProvider } from '@clerk/nextjs';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/footer';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'Ares',
    description: 'AI-Powered File Storage',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ConvexClientProvider>
                    <Toaster />
                    <div className='flex items-center justify-center'>
                        <Header />
                    </div>
                    {children}
                    <Footer />
                </ConvexClientProvider>
            </body>
        </html>
    );
}
