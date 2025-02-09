import {
    OrganizationSwitcher,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from '@clerk/nextjs';
import logo from '/public/filehub.png';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
    return (
        <div className='border-b py-2 bg-gray-50'>
            <div className='flex justify-between mx-4'>
                <Link href='/'>
                    <Image src={logo} alt='filehub logo' width={100} />
                </Link>
                <div>
                    <OrganizationSwitcher />
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
                {/* <UserButton /> */}
            </div>
        </div>
    );
}
