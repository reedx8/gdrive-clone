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
import { CircleUser } from 'lucide-react';

export function Header() {
    return (
        <header className='fixed top-0 w-full z-10 py-2 bg-transparent'>
            <div className='flex justify-between mx-4'>
                <Link href='/'>
                    <Image src={logo} alt='logo' width={100} />
                </Link>
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
