import {
    OrganizationSwitcher,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from '@clerk/nextjs';

export function Header() {
    return (
        <div className='border-b py-2 bg-gray-50'>
            <div className='flex justify-between mx-4'>
                <p>File Storage App</p>
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
