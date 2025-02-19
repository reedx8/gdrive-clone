import Link from 'next/link';

export function Footer() {
    return (
        <footer className='isolate h-40 mt-32 bg-transparent flex flex-col justify-center items-center position-fixed bottom-0 w-full'>
        {/* <footer className='isolate h-40 mt-32 bg-gray-100/70 flex flex-col justify-center items-center position-fixed bottom-0 w-full'> */}
            <div className='flex flex-col gap-4 items-center'>
                <div className='font-semibold'>ares.com</div>
                <div className='flex gap-4 text-xs'>
                    <Link href='#'>Privacy Policy</Link>
                    <Link href='#'>Terms of Service</Link>
                    <Link href='#'>About</Link>
                </div>
                <div className='text-neutral-500'>© 2025 ares.com. All Rights Reserved.</div>
            </div>
        </footer>
    );
}
