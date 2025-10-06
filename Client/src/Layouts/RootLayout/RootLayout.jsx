import React from 'react'
import './rootLayout.css'
import { Link, Outlet } from 'react-router-dom'
import { ClerkProvider, SignedIn, UserButton } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ContextProvider from '../../context/ContextProvider';
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
                <h1>Ai Chat Bot</h1>
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