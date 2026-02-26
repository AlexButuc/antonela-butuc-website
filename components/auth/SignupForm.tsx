'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function SignupForm() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName
        }
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <h3 className="text-gold font-serif text-2xl mb-4">Check your email</h3>
        <p className="text-stone">
          We've sent a confirmation link to <span className="text-charcoal font-medium">{email}</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSignup} className="space-y-6">
      <div>
        <label className="block text-xs tracking-widest uppercase text-stone mb-2">
          Name
        </label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="input-field"
          placeholder="Your name"
          required
        />
      </div>

      <div>
        <label className="block text-xs tracking-widest uppercase text-stone mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          placeholder="your@email.com"
          required
        />
      </div>

      <div>
        <label className="block text-xs tracking-widest uppercase text-stone mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          placeholder="Minimum 6 characters"
          required
          minLength={6}
        />
      </div>

      {error && (
        <p className="text-error text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:opacity-50"
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>

      <p className="text-center text-stone text-sm">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-terracotta hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
