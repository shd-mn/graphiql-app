import Link from 'next/link';
import { routes } from '@/constants/routes';
function Header() {
  const isLogin = false;
  return (
    <header className="flex h-20 items-center justify-between bg-blue-600 text-white">
      <div>
        <Link href={routes.home}>Home</Link>
      </div>
      <div>
        <button type="button">EN</button>
        {isLogin ? (
          <div>
            <Link href="/login">Sign In</Link>
          </div>
        ) : (
          <div>
            <button type="button">Sign Out</button>
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;
