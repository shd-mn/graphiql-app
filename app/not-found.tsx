import Link from 'next/link';

function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-white">
      <h3>404 Page Not Found</h3>
      <Link href="/">Back to Home </Link>
    </div>
  );
}

export default NotFound;
