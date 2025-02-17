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

export function Header() {
    return (
        <header className='fixed top-0 w-full z-10 py-2 bg-transparent'>
            <div className='flex justify-between mx-4'>
                <Link href='/'>
                    <Image src={logo} alt='logo' width={100}/>
                </Link>
                <div>
                    <OrganizationSwitcher />
                    <SignedOut>
                        <SignInButton>
                            <Button size='sm' variant='outline'>Sign In</Button>
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
