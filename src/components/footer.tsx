import Link from 'next/link';

export function Footer() {
    return (
        <footer className='h-40 mt-32 bg-gray-100/70 flex flex-col justify-center items-center position-fixed bottom-0 w-full'>
            <div className='flex flex-col gap-4 items-center'>
                <div className='font-semibold'>ares.com</div>
                <div className='flex gap-4 text-xs'>
                    <Link href='/privacy'>Privacy Policy</Link>
                    <Link href='/terms-of-service'>Terms of Service</Link>
                    <Link href='/about'>About</Link>
                </div>
                <div className='text-neutral-500'>© 2025 ares.com. All Rights Reserved.</div>
            </div>
        </footer>
    );
}
