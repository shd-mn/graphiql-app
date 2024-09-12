import Image from 'next/image';
import Link from 'next/link';
import course_logo from '@/public/assets/rss-logo.svg';
function Footer() {
  return (
    <footer className="padding-x z-50 flex h-10 items-center justify-between bg-blue-600 text-sm text-white">
      <ul className="flex gap-3">
        <li>
          <Link href="https://github.com/shd-mn" target="_blank">
            Shadman <span className="hidden sm:inline">Alizada</span>
          </Link>
        </li>
        <li>
          <Link href="https://github.com/olitera" target="_blank">
            Volha <span className="hidden sm:inline">Melayok</span>
          </Link>
        </li>
      </ul>
      <p>2024</p>
      <div>
        <Link href="https://rs.school/" target="_blank" className="flex items-center gap-2">
          <Image src={course_logo} alt="The Rolling Scopes School" quality={100} width={24} height={24} /> RS School
        </Link>
      </div>
    </footer>
  );
}
export default Footer;
