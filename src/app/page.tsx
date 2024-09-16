'use client';
import { useState, useEffect } from 'react';
import Footer from 'src/components/Footer';
import WalletWrapper from 'src/components/WalletWrapper';
import { useAccount } from 'wagmi';
import LoginButton from '../components/LoginButton';
import SignupButton from '../components/SignupButton';
import RefundDisplay from '../components/RefundDisplay';
import AddressInput from '../components/AddressInput';

export default function Page() {
  const { address: connectedAddress } = useAccount();
  const [currentAddress, setCurrentAddress] = useState<string | undefined>(connectedAddress);

  useEffect(() => {
    if (connectedAddress) {
      setCurrentAddress(connectedAddress);
    }
  }, [connectedAddress]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col items-center">
        <div className="w-full max-w-[1008px] px-4">
          <nav className="mt-6 mb-6 flex justify-end gap-3">
            {/* <SignupButton /> */}
            <LoginButton />
          </nav>
          <main className="flex flex-col items-center justify-center py-8">
            <RefundDisplay address={currentAddress} />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
