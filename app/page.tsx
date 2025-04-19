"use client";
import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import QRCode from 'qrcode';

interface QRCodeData {
  dataUrl: string;
  uniqueId: string;
}

export default function Home() {
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([]);
  const [quantity, setQuantity] = useState<number>(10);
  const [baseUrl, setBaseUrl] = useState<string>('https://example.com/verify?id=');
  const [lineId, setLineId] = useState<string>('@lineid');
  
  const generateQRCodesType1 = async () => {
    const codes: QRCodeData[] = [];
    for (let i = 0; i < quantity; i++) {
      const uniqueId = Math.random().toString(36).substring(2, 11);
      const url = `https://line.me/R/ti/p/${lineId}`;
      const dataUrl = await QRCode.toDataURL(url);
      codes.push({ dataUrl, uniqueId });
    }
    setQrCodes(codes);
  };

  const generateQRCodesType2 = async () => {
    const codes: QRCodeData[] = [];
    for (let i = 0; i < quantity; i++) {
      const uniqueId = Math.random().toString(36).substring(2, 11);
      const url = `${baseUrl}${uniqueId}`;
      const dataUrl = await QRCode.toDataURL(url);
      codes.push({ dataUrl, uniqueId });
    }
    setQrCodes(codes);
  };

  return (
    <div className="container mx-auto max-w-screen-lg px-4 py-8">
      <div className="mb-12 border-b border-gray-200 pb-4">
        <h1 className="text-4xl font-bold">Barcode Generator</h1>
        <p className="text-gray-500">A demo of the Barcode Generator</p>
      </div>
      <div className="mb-12">
        <h2 className="text-lg font-bold mb-6">
          Step 1: Select the format of barcode
        </h2>
        <div className="grid grid-cols-2 gap-8">
          <button
            className="rounded-lg border border-gray-200 p-4 hover:ring-2 hover:ring-blue-500 cursor-pointer relative"
            onClick={() => setSelectedType(1)}
          >
            {selectedType === 1 && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            <Image src="/type-1.png" alt="QR Code" width={385} height={200} />
          </button>
          <button
            className="rounded-lg border border-gray-200 p-4 hover:ring-2 hover:ring-blue-500 cursor-pointer relative"
            onClick={() => setSelectedType(2)}
          >
            {selectedType === 2 && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            <Image src="/type-2.png" alt="QR Code" width={385} height={200} />
          </button>
        </div>
      </div>
      <div className="mb-12">
        <h2 className="text-lg font-bold mb-6">Step 2: Enter the data</h2>
        {selectedType === 1 && (
          <div className="flex gap-6">
            <Input placeholder="Line ID eg. @lineid" className="w-2/3" value={lineId} onChange={(e) => setLineId(e.target.value)} />
            <div className="w-1/3 relative">
              <p className="text-xs text-gray-500 absolute -bottom-4.5 left-0">
                Demo limited to 10 QR codes
              </p>
              <Input placeholder="Total QR codes" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            </div>
            <Button className="cursor-pointer" onClick={generateQRCodesType1}>Generate</Button>
          </div>
        )}
        {selectedType === 2 && (
          <div className="flex gap-6">
            <div className="w-2/3 relative">
              <Input placeholder="QR Code Verification URL" className="w-full bg-gray-100" disabled value="https://example.com/verify?id={product-code}"/>
            </div>
            <div className="w-1/3 relative">
              <p className="text-xs text-gray-500 absolute -bottom-4.5 left-0">
                Demo limited to 10 QR codes
              </p>
              <Input placeholder="Total QR codes" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            </div>
            <Button className="cursor-pointer" onClick={generateQRCodesType2}>Generate</Button>
          </div>
        )}
      </div>
      <div className="mb-12">
        <h2 className="text-lg font-bold mb-6">Step 3: Download the barcode</h2>
        <div className="grid grid-cols-5 gap-6">
          {qrCodes.map((qrCode, index) => (
            <div key={index} className="w-full relative">
              <Image src={qrCode.dataUrl} alt="QR Code" width={300} height={300} />
              <p className="text-sm text-gray-900 absolute -bottom-4.5 left-0 right-0 text-center">{qrCode.uniqueId}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
