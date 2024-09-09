'use client';
import Image from 'next/image';
import loading_svg from '@/public/assets/loading.svg';

function Ellipsis() {
  return (
    <div className="flex h-full w-full items-center justify-center" data-testid="loader">
      <Image src={loading_svg} alt="loader" priority width={60} />
    </div>
  );
}
export default Ellipsis;
