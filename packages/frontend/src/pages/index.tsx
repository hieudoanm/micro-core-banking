import { Divider } from '@qrcode/components/Divider';
import { Navbar } from '@qrcode/components/Navbar';
import { download } from '@qrcode/utils/download';
import { toDataURL } from 'qrcode';
import { FC, useState } from 'react';

const HomePage: FC = () => {
  const [{ dataURL = '', url = 'https://google.com' }, setState] = useState<{
    dataURL: string;
    url: string;
  }>({
    dataURL: '',
    url: 'https://google.com',
  });

  const generate = async () => {
    const dataURL = await toDataURL(url, {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      width: 512,
      margin: 1,
      color: {
        dark: '#F5F5F5', // QR code dots (white)
        light: '#171717', // Background (black)
      },
    });
    setState((previous) => ({ ...previous, dataURL }));
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar & Divider */}
      <Navbar />
      <Divider />

      {/* Hero Section */}
      <header className="py-20">
        <div className="container mx-auto px-4 text-center md:px-8">
          <div className="flex w-full flex-col gap-y-4 md:gap-y-8">
            <h1 className="text-4xl font-bold md:text-5xl">
              QR Code Generator
            </h1>
            <p className="mx-auto max-w-xl text-lg md:text-xl">
              Quickly generate QR codes for any URL with a sleek, customizable
              interface.
            </p>
            <div className="mx-auto flex w-full max-w-xl flex-col gap-y-4 md:gap-y-8">
              <input
                id="url"
                name="url"
                placeholder="Enter URL"
                className="input w-full"
                value={url}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, url: e.target.value }))
                }
              />
              <button
                type="button"
                className="btn-primary btn w-full md:w-auto"
                onClick={generate}>
                Generate
              </button>
            </div>
          </div>
        </div>
      </header>
      <Divider />

      {/* Main QR Generator */}
      {dataURL && (
        <>
          <main className="mx-auto flex w-full max-w-xl flex-col gap-y-4 py-8 md:gap-y-8">
            <div
              className="aspect-square w-full overflow-hidden rounded-2xl border border-neutral-800 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${dataURL})` }}
            />
            <button
              type="button"
              className="btn btn-primary w-full md:w-auto"
              onClick={() => {
                download({
                  content: dataURL,
                  format: 'jpg',
                  filename: 'qrcode',
                }).image();
              }}>
              Download
            </button>
          </main>
          <Divider />
        </>
      )}

      {/* Footer */}
      <footer className="mt-auto py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} QRCode App. All rights reserved.
          </p>
          <p className="mt-1 text-sm">Built with React and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
