import Link from 'next/link';

export function Footer() {
    return (
        <footer className='h-40 mt-32 bg-gray-100 flex flex-col justify-center items-center position-fixed bottom-0 w-full'>
            <div className='flex flex-col gap-4 text-center'>
                <div>XFLARE</div>
                <div className='flex gap-4'>
                    <Link href='/privacy'>Privacy Policy</Link>
                    <Link href='/terms-of-service'>Terms of Service</Link>
                    <Link href='/about'>About</Link>
                </div>
                <div>Copyright © 2025</div>
            </div>
        </footer>
    );
}
