import { QRCodeSVG } from 'qrcode.react';
import { brand } from '../data/presentationContent';

export default function FinalQRCode() {
  return (
    <div className="glass flex h-full flex-col items-center justify-center rounded-[1.5rem] p-6 text-center">
      <div className="rounded-[2rem] bg-white p-5 shadow-soft">
        <QRCodeSVG value={brand.website} size={190} level="H" includeMargin />
      </div>
      <div className="mt-5 text-xs font-black uppercase tracking-[.18em] text-fiducial-deep">Official website</div>
      <div className="mt-1 text-lg font-black text-fiducial-anthracite">fiducial-fpsg.fr</div>
    </div>
  );
}
