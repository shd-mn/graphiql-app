import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { server } from './__test__/mock/server';

const MockedNextImage = ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />;

vi.mock('next/image', () => ({ default: MockedNextImage }));

beforeAll(() => server.listen());

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => server.close());
