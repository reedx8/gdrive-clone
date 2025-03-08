'use client';
import {
    OrganizationSwitcher,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from '@clerk/nextjs';
import logo from '/public/ares.png';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { CircleUser, Sparkles } from 'lucide-react';
import { ChatWindow, AiChatWindow } from './chatwindow';

export function Header() {
    return (
        <header className='fixed top-0 w-full z-10 py-2 bg-transparent'>
        {/* <header className='fixed top-5 w-[80vw] z-10 py-2 bg-white rounded-full shadow-md items-center'> */}
            <div className='flex justify-between mx-4'>
                <Link href='/'>
                    <Image src={logo} alt='logo' width={100} />
                </Link>
                <SignedIn>
                    <div className='relative rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px] inline-block'>
                        <AiChatWindow
                            name='Ares AI'
                            infoMessage='Type a message...'
                            welcomeMessage='Hey there, what can I answer about your business?'
                            renderTrigger={(onClick) => (
                                <Button onClick={onClick} size='sm'><Sparkles /> Ask AI</Button>
                            )}
                        />
                        {/* <ConvexAiChat
                            convexUrl={
                                process.env.NEXT_PUBLIC_CONVEX_URL as string
                            }
                            infoMessage='Type a message...'
                            name='AI Assistant'
                            welcomeMessage='Hey there, what can I answer about your business?'
                            renderTrigger={(onClick) => (
                                <Button
                                    onClick={onClick}
                                    size='sm'
                                    variant='outline'
                                    className='border-0 bg-indigo-100 m-0'
                                    // className='bg-gradient-to-b from-indigo-500/80 to-indigo-500/50 text-white'
                                    // className='bg-indigo-500/80 text-white'
                                >
                                    <Sparkles /> Ask AI
                                </Button>
                            )}
                        /> */}
                    </div>
                </SignedIn>
                <div>
                    <OrganizationSwitcher />
                    <SignedOut>
                        <SignInButton>
                            <Button
                                size='sm'
                                variant='outline'
                                className='bg-transparent border-black/70 text-black/70'
                            >
                                <CircleUser /> Sign in
                            </Button>
                        </SignInButton>
                        {/* <RedirectToSignIn signInFallbackRedirectUrl={'/dashboard'} /> */}
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                        {/* <RedirectToSignIn signInFallbackRedirectUrl={'/dashboard'} /> */}
                    </SignedIn>
                </div>
                {/* <UserButton /> */}
            </div>
        </header>
    );
}
