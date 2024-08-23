import Welcome from '@/components/Welcome';

export default function Home() {
  return (
    <main className="flex h-[calc(100vh-8.5rem)] flex-col items-center justify-center p-3">
      <Welcome></Welcome>
    </main>
  );
}
