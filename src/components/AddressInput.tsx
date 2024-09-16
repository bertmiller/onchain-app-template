import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface AddressInputProps {
  onCheckRefunds: (address: string) => void;
  initialAddress?: string;
}

export default function AddressInput({ onCheckRefunds, initialAddress }: AddressInputProps) {
  const { address: connectedAddress } = useAccount();
  const [address, setAddress] = useState(initialAddress || connectedAddress || '');

  useEffect(() => {
    if (connectedAddress && !address) {
      setAddress(connectedAddress);
      onCheckRefunds(connectedAddress);
    }
  }, [connectedAddress, address, onCheckRefunds]);

  useEffect(() => {
    if (initialAddress && initialAddress !== address) {
      setAddress(initialAddress);
    }
  }, [initialAddress, address]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      onCheckRefunds(address);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-[350px]">
      <h2 className="text-xl font-semibold mb-4">Address to check</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Ethereum address"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200"
        >
          Check for refunds
        </button>
      </form>
    </div>
  );
}
