"use client";

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { navbarStyles } from '@/assets/dummyStyles';
import { SignedOut, useAuth } from '@/context/AuthContext';

const Navbar = () => {

    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const { isSignedIn } = useAuth();

    const router = useRouter();
    const profileRef = useRef(null);

    useEffect(() => {
        if (isSignedIn) {
            const pathname = window.location.pathname || "/";
            if (
                pathname === '/login' ||
                pathname === '/signup' ||
                pathname.startsWith('/auth') ||
                pathname === "/"
            ) {
                router.replace("/app/dashboard");
            }
        }
    }, [isSignedIn, router]);

    useEffect(() => {
        function onDocClick(e) {
            if (!profileRef.current) return;
            if (!profileRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        }

        if (profileOpen) {
            document.addEventListener("mousedown", onDocClick);
            document.addEventListener("touchstart", onDocClick);
        }

        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("touchstart", onDocClick);
        };
    }, [profileOpen]);

    function openSignIn() {
        router.push("/login");
    }

    function openSignUp() {
        router.push("/signup");
    }

    return (
        <header className={navbarStyles.header}>
            <div className={navbarStyles.container}>
                <nav className={navbarStyles.nav}>
                    <div className={navbarStyles.logoSection}>
                        <Link href='/' className={navbarStyles.logoLink}>
                            <img src="/logo.png" alt="logo" className={navbarStyles.logoImage} />
                            <span className={navbarStyles.logoText}>
                                PromptToInvoice
                            </span>
                        </Link>

                        <div className={navbarStyles.desktopNav}>
                            <a href='#features' className={navbarStyles.navLink}>
                                Features
                            </a>
                            <a href='#pricing' className={navbarStyles.navLinkInactive}>
                                Pricing
                            </a>
                        </div>
                    </div>

                    <div className='flex items-center gap-4'>
                        <div className={navbarStyles.authSection}>
                            <SignedOut>
                                <button onClick={openSignIn} className={navbarStyles.signInButton} type='button'>
                                    Sign in
                                </button>
                                <button onClick={openSignUp} className={navbarStyles.signUpButton} type='button'>
                                    <div className={navbarStyles.signUpOverlay}></div>
                                    <span className={navbarStyles.signUpText}>Get Started</span>
                                    <svg
                                        className={navbarStyles.signUpIcon}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M5 12h14m-7-7l7 7-7 7" />
                                    </svg>
                                </button>
                            </SignedOut>
                            {isSignedIn && (
                                <Link href="/app/dashboard" className={navbarStyles.signInButton}>
                                    Dashboard
                                </Link>
                            )}
                        </div>

                        <button onClick={() => setOpen(!open)} className={navbarStyles.mobileMenuButton}>
                            <div className={navbarStyles.mobileMenuIcon}>
                                <span className={`${navbarStyles.mobileMenuLine1}${open ? navbarStyles.mobileMenuLine1Open : navbarStyles.mobileMenuLine1Closed}`}></span>
                                <span className={`${navbarStyles.mobileMenuLine2}${open ? navbarStyles.mobileMenuLine2Open : navbarStyles.mobileMenuLine2Closed}`}></span>
                                <span className={`${navbarStyles.mobileMenuLine3}${open ? navbarStyles.mobileMenuLine3Open : navbarStyles.mobileMenuLine3Closed}`}></span>
                            </div>
                        </button>
                    </div>
                </nav>
            </div>

            <div className={`${open ? "block" : "hidden"} ${navbarStyles.mobileMenu}`}>
                <div className={navbarStyles.mobileMenuContainer}>
                    <a href='#features' className={navbarStyles.mobileNavLink}>
                        Features
                    </a>
                    <a href='#pricing' className={navbarStyles.mobileNavLink}>
                        Pricing
                    </a>

                    <div className={navbarStyles.mobileAuthSection}>
                        <SignedOut>
                            <button onClick={openSignIn} className={navbarStyles.mobileSignIn}>
                                Sign in
                            </button>

                            <button onClick={openSignUp} className={navbarStyles.mobileSignIn}>
                                Get Started
                            </button>
                        </SignedOut>
                        {isSignedIn && (
                            <Link href="/app/dashboard" className={navbarStyles.mobileSignIn}>
                                Dashboard
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar;
