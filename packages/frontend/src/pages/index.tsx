import { Divider } from '@qrcode/components/Divider';
import { Navbar } from '@qrcode/components/Navbar';
import { download } from '@qrcode/utils/download';
import { toDataURL } from 'qrcode';
import { FC, useState } from 'react';

const QRCode: FC = () => {
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
    <div className="h-screen">
      <div className="relative z-10 flex h-full flex-col">
        <Navbar />
        <Divider />
        <div className="container mx-auto flex w-full grow flex-col items-center justify-center gap-y-8 p-8">
          <div className="flex w-full flex-col justify-center gap-4 md:flex-row md:gap-8">
            <input
              id="url"
              name="url"
              placeholder="URL"
              className="input w-full grow"
              value={url}
            />
            <button
              type="button"
              className="btn-primary btn w-full md:w-auto"
              onClick={() => {
                generate();
              }}>
              Generate
            </button>
            {dataURL && (
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
            )}
          </div>
          {dataURL && (
            <div className="w-full">
              <div
                className="mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-neutral-800 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${dataURL})` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCode;
