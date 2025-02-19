// Landing page
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import storagePic from '/public/server2.jpg';
import fillerPic from '/public/aiPic.jpg';
import { MoveRight } from 'lucide-react';

export default function Example() {
    // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [opacity, setOpacity] = useState(0.6); // Starting opacity of 0.7 (70%)
    const [isLoaded, setIsLoaded] = useState(false);
    // const fullText = 'AI-Powered File Storage';
    // const [text, setText] = useState('');
    // const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Get scroll position
            const scrollPosition = window.scrollY;
            // Get viewport height
            const windowHeight = window.innerHeight;

            // Calculate new opacity
            // This will transition from 0.7 to 1 over one viewport height of scrolling
            const newOpacity = Math.min(
                0.8,
                0.6 + (scrollPosition / windowHeight) * 0.3
            );

            setOpacity(newOpacity);
        };

        // animate typing:
        // let currentIndex = 0;
        // const typingInterval = setInterval(() => {
        //     if (currentIndex <= fullText.length) {
        //         setText(fullText.slice(0, currentIndex));
        //         ++currentIndex;
        //     } else {
        //         clearInterval(typingInterval);
        //     }
        // }, 100); // Adjust speed 

        // Cursor blinking effect
        // const cursorInterval = setInterval(() => {
        //     setShowCursor((prev) => !prev);
        // }, 500);

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        setIsLoaded(true);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            // clearInterval(typingInterval);
            // clearInterval(cursorInterval);
        };
    }, []);

    // const splitText = () => {
    //     const parts = text.split('AI');
    //     if (parts.length === 1) return parts[0];
    //     return (
    //         <>
    //             {parts[0]}
    //             <span className='text-indigo-600/70'>AI</span>
    //             {parts[1]}
    //         </>
    //     );
    // };

    return (
        <main className='relative w-full h-full'>
            <video
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={() => setIsLoaded(true)}
                className={`fixed top-0 left-0 w-full h-screen object-cover transition-opacity ease-in-out duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                // style={{transitionDuration: '1500ms'}}
            >
                <source
                    src='https://pfgxgvbovzogwfhejjus.supabase.co/storage/v1/object/public/media//aresvidbg.mp4'
                    // src='https://media-hosting.imagekit.io//afef37f7f39e4cff/vidbg.mp4?Expires=1834358126&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Xc2hOdFmC67sfHsRSqdiSSmybSR13iT-4DqGioNiRUwDWf7tVJdfpvcWWskz3M5Z61iWglQCcT5TxBd2dODQxZrFWeakYKXPynk6YPnLH9t7aQBNJ~iAE7I~2o7fhwImuDJ0A-H8hkhicDmJnhnkI6rKUHr9Di7Z8xTGuflIXJFF1lfaDR2Rb8yOR~-TXza6FTikXIgZoaqy6-ZVVIA8Hi62BjVyjIwJtYLEp-GxnQufcd-wZLO~-f5RstHxcCiXtWYgR9t-ZSqGjrWJvqZxqeLr1BUK9Z0Le3zBjwE2u38z4-PGucqHT3MUuK76DXz9g7ZxgI4Tu1CIAiO4CbDDUQ__'
                    type='video/mp4'
                />
            </video>
            {/* Overlay */}
            {/* <div className='fixed top-0 left-0 w-full h-screen bg-white/70' /> */}
            {/* Dynamic Overlay */}
            <div
                className='fixed top-0 left-0 w-full h-screen bg-white transition-opacity duration-100'
                style={{ opacity: opacity }}
            />
            <section className='isolate px-6 lg:px-8 flex flex-col items-center justify-center h-screen'>
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
                <div className='max-w-2xl py-24 flex flex-col gap-4 items-center'>
                    <div className='sm:mb-8 sm:flex sm:justify-center'>
                        <div className='relative rounded-full w-fit px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
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
                        <h1 className='text-balance text-5xl font-semibold tracking-wide sm:text-7xl drop-shadow-md'>
                            <span className='text-indigo-600/70'>AI</span>
                            -Powered File Storage
                        </h1> 
                        {/* <h1 className='text-balance text-5xl font-semibold tracking-wide sm:text-7xl drop-shadow-md'> */}
                            {/* {splitText()} */}
                            {/* <span
                                className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
                            >
                                |
                            </span> */}
                        {/* </h1> */}
                        <p className='mt-8 text-pretty text-lg tracking-wide font-medium text-black sm:text-xl/8'>
                            Make an account today to start managing your files
                            in minutes
                        </p>
                        <div className='mt-10 flex items-center justify-center gap-x-6'>
                            <Link
                                href='/dashboard/files'
                                className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 drop-shadow-md'
                            >
                                Get started
                            </Link>
                            <Link
                                href='#'
                                className='text-sm/6 font-semibold text-gray-900'
                            >
                                Learn more <span aria-hidden='true'>→</span>
                            </Link>
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
            </section>
            <section className='isolate mt-30 px-6 flex flex-col gap-10 sm:flex-row sm:gap-20 justify-between'>
                <div>
                    <h2 className='text-5xl text-black/80'>
                        Secure cloud storage for all your files
                    </h2>
                </div>
                <div className='flex flex-col gap-10 sm:mt-24'>
                    <p className='text-lg text-black/80'>
                        Documents, PDFs, photos and more—keep all your files and
                        folders safe in online cloud storage.{' '}
                        <span className='text-indigo-600 italic'>Ares</span>{' '}
                        offers one central hub for online file storage. Whether
                        you’re at work or on the road, your files are accessible
                        in real time.
                    </p>
                    <Button className='w-fit'>About us</Button>
                </div>
            </section>
            <section className='isolate mx-6 grid sm:grid-cols-6 mt-52 group'>
                <Image
                    src={storagePic}
                    alt='storage'
                    className='col-span-4 w-full h-full'
                    quality={100}
                />
                <div className='bg-indigo-100 col-span-2 p-6 flex flex-col gap-8'>
                    <h2 className='text-sm text-black/80 font-extralight'>
                        STORAGE
                    </h2>
                    <p className='text-2xl'>
                        With 20 GB of total storage, you can store all your
                        files in one place. You can also share files with your
                        team or collaborate with others.
                    </p>
                    <Link
                        href='#'
                        className='text-sm/6 font-semibold text-gray-900'
                    >
                        Learn more
                        <MoveRight
                            // className='inline-block h-4 w-4'
                            className='ml-2 inline-block transition-transform group-hover:translate-x-6 ease-in duration-300'
                        />
                        {/* <span
                            aria-hidden='true'
                            className='ml-1 inline-block transition-transform group-hover:translate-x-6 ease-in duration-300'
                        >
                            →
                        </span> */}
                    </Link>
                </div>
            </section>
            <section className='isolate mx-6 mt-12 h-[350px] relative group'>
                <Image
                    src={fillerPic}
                    alt='filler'
                    className='w-full h-full object-cover absolute'
                    quality={100}
                />
                <div className='absolute flex flex-col p-6 justify-between h-full'>
                    <h2 className='text-black/80 text-sm font-extralight'>
                        AI-POWERED
                    </h2>
                    <div className='text-6xl flex flex-col gap-2 font-extralight'>
                        <h2>Store.</h2>
                        <h2>Query.</h2>
                        <h2>Decide.</h2>
                    </div>
                    <div>
                        <Link href='#' className='text-sm/6'>
                            See our AI models{' '}
                            <MoveRight
                                // className='inline-block h-4 w-4'
                                className='ml-2 inline-block transition-transform group-hover:translate-x-6 ease-in duration-300'
                            />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
