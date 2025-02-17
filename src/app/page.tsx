// Landing page
import Link from 'next/link';

export default function Example() {
    // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className='relative w-full h-full'>
            <video
                autoPlay
                loop
                muted
                playsInline
                className='fixed top-0 left-0 w-full h-screen object-cover'
            >
                <source
                    src='https://pfgxgvbovzogwfhejjus.supabase.co/storage/v1/object/public/media//aresvidbg.mp4'
                    // src='https://media-hosting.imagekit.io//afef37f7f39e4cff/vidbg.mp4?Expires=1834358126&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Xc2hOdFmC67sfHsRSqdiSSmybSR13iT-4DqGioNiRUwDWf7tVJdfpvcWWskz3M5Z61iWglQCcT5TxBd2dODQxZrFWeakYKXPynk6YPnLH9t7aQBNJ~iAE7I~2o7fhwImuDJ0A-H8hkhicDmJnhnkI6rKUHr9Di7Z8xTGuflIXJFF1lfaDR2Rb8yOR~-TXza6FTikXIgZoaqy6-ZVVIA8Hi62BjVyjIwJtYLEp-GxnQufcd-wZLO~-f5RstHxcCiXtWYgR9t-ZSqGjrWJvqZxqeLr1BUK9Z0Le3zBjwE2u38z4-PGucqHT3MUuK76DXz9g7ZxgI4Tu1CIAiO4CbDDUQ__'
                    type='video/mp4'
                />
            </video>
            {/* Overlay */}
            <div className='fixed top-0 left-0 w-full h-screen bg-white/70' />
            <div className='isolate px-6 lg:px-8 flex flex-col items-center'>
                {/* <div className='relative isolate px-6 lg:px-8 flex flex-col items-center'> */}
                <div
                    aria-hidden='true'
                    className='fixed inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
                    />
                </div>
                <div className='max-w-2xl py-24'>
                    <div className='sm:mb-8 sm:flex sm:justify-center'>
                        <div className='relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
                            See what our business is about.{' '}
                            <a
                                href='#'
                                className='font-semibold text-indigo-600'
                            >
                                <span
                                    aria-hidden='true'
                                    className='absolute inset-0'
                                />
                                Read more <span aria-hidden='true'>&rarr;</span>
                            </a>
                        </div>
                    </div>
                    <div className='text-center'>
                        {/* <Image src={logo} alt='logo' width={200} height={200} /> */}
                        <h1 className='text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl'>
                            <span className='text-indigo-600/70'>AI</span>
                            -Powered File Storage
                        </h1>
                        <p className='mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8'>
                            Make an account today to start managing your files
                            in minutes
                        </p>
                        <div className='mt-10 flex items-center justify-center gap-x-6'>
                            <Link
                                href='/dashboard/files'
                                className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            >
                                Get started
                            </Link>
                            <a
                                href='#'
                                className='text-sm/6 font-semibold text-gray-900'
                            >
                                Learn more <span aria-hidden='true'>→</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    aria-hidden='true'
                    className='fixed inset-x-0 -top-70 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-40rem)]'
                    // className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
                    />
                </div>
            </div>
        </div>
    );
}
