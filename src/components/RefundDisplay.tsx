import { useState, useEffect } from 'react';
import { formatEther } from 'viem';

interface RefundDisplayProps {
  address: string | undefined;
}

async function fetchRefundData(address: string) {
  const response = await fetch('/api/refunds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ address }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch refund data');
  }

  return response.json();
}

export default function RefundDisplay({ address }: RefundDisplayProps) {
  const [refundData, setRefundData] = useState<{
    pending: string;
    received: string;
    maxBlockNumber: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputAddress, setInputAddress] = useState(address || '');

  useEffect(() => {
    if (address) {
      setInputAddress(address);
      fetchRefundData(address)
        .then(setRefundData)
        .catch((err) => setError(err.message));
    }
  }, [address]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputAddress) {
      fetchRefundData(inputAddress)
        .then(setRefundData)
        .catch((err) => setError(err.message));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-full max-w-[800px] overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Flashbots Protect Refunds</h2>
      </div>
      <div className="flex">
        <div className="p-4 flex-grow">
          {!address && (
            <p className="text-gray-600 mb-4 text-sm max-w-[300px] leading-5">
              Connect your wallet or enter an address to view your fee refunds.
            </p>
          )}
          {error && (
            <p className="text-red-600 mb-4 text-sm">Error: {error}</p>
          )}
          {!refundData && address && (
            <p className="text-gray-600 mb-4 text-sm">Loading your fee refund data...</p>
          )}
          {refundData && (
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm">
                <span className="text-gray-600">Pending refunds</span>
                <span className="font-semibold">{formatEther(BigInt(refundData.pending))} ETH</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm">
                <span className="text-gray-600">Received refunds</span>
                <span className="font-semibold">{formatEther(BigInt(refundData.received))} ETH</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm">
                <span className="text-gray-600">Last updated block</span>
                <span className="font-semibold">{parseInt(refundData.maxBlockNumber, 16)}</span>
              </div>
            </div>
          )}
        </div>
        <div className="p-6 border-l border-gray-200 w-[350px]">
          <h2 className="text-lg font-semibold mb-3">Address to check</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputAddress}
              onChange={(e) => setInputAddress(e.target.value)}
              placeholder="Enter Ethereum address"
              className="w-full p-2 border border-gray-300 rounded mb-3 text-sm"
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200 text-sm"
            >
              Check for refunds
            </button>
          </form>
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-50 text-xs text-gray-500">
        Refunds are in alpha mode right now, stay tuned for more soon!
      </div>
    </div>
  );
}