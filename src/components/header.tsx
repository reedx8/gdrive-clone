import {
    OrganizationSwitcher,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from '@clerk/nextjs';
import logo from '/public/xflare.png';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
    return (
        <header className='relative z-10 border-b py-2 bg-gray-50'>
            <div className='flex justify-between mx-4'>
                <Link href='/'>
                    <Image src={logo} alt='logo' width={100} />
                </Link>
                <div>
                    <OrganizationSwitcher />
                    <SignedOut>
                        <SignInButton />
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
