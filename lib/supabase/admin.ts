import { createClient } from '@supabase/supabase-js';

let adminClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseAdmin() {
  if (!adminClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error('Missing Supabase environment variables');
    }
    
    adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  }
  return adminClient;
}

export const supabaseAdmin = {
  get instance() {
    return getSupabaseAdmin();
  },
  from(table: string) {
    return getSupabaseAdmin().from(table);
  },
  auth: {
    getUser: (token: string) => getSupabaseAdmin().auth.getUser(token),
    admin: {
      listUsers: () => getSupabaseAdmin().auth.admin.listUsers(),
    }
  }
};
