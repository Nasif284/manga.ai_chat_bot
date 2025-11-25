import React from 'react'
import './rootLayout.css'
import { Link, Outlet } from 'react-router-dom'
import { ClerkProvider, SignedIn, UserButton } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ContextProvider from '../../context/ContextProvider';
import mango from '../../assets/mango.png'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const RootLayout = () => {
  const queryClient = new QueryClient();
  return (
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <div className="root-layout">
            <header>
              <Link to={"/"}>
                <div className="logo">
                  <img src={mango} alt="" />
                  <h1 className="title">Manga.ai</h1>
                  
                </div>
              </Link>
              <div className="user">
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </header>
            <main>
              <Outlet />
            </main>
          </div>
        </ClerkProvider>
      </QueryClientProvider>
    </ContextProvider>
  );
}

export default RootLayout