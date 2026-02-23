import { LoginForm } from '@/components/auth';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <Link href="/" className="inline-block">
            <h1 className="font-serif text-3xl text-gold tracking-widest mb-2">
              ANTONELA BUTUC
            </h1>
          </Link>
          <p className="text-silver text-xs tracking-widest uppercase">
            Hormonal Pattern Tracker
          </p>
        </div>

        <div className="card">
          <h2 className="font-serif text-2xl mb-8 text-center">Welcome Back</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
