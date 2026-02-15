import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AuthenticatedHome from '@/components/AuthenticatedHome'

export default async function Home() {
  const supabase = await createClient()

  // 1. Get the current user session from the server
  const { data: { user } } = await supabase.auth.getUser()

  // 2. Server Action to handle Logout
  async function handleSignOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  // 3. Server Action to handle Login
  // 3. Server Action to handle Login
  async function handleLogin() {
  'use server'
  const supabase = await createClient()
  
  // Use a built-in Next.js check for the environment
  const isProd = process.env.NODE_ENV === 'production'
  
  // Choose the base URL based on where the app is running
  const baseUrl = isProd 
    ? `https://smart-bookmarks-app-amber.vercel.app` // Use your actual live link
    : 'http://localhost:3000'                      // Use your local port

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { 
      redirectTo: `${baseUrl}/auth/callback` 
    }
  })

  if (data?.url) redirect(data.url)
}
  // 4. Conditional Rendering based on Auth State
  if (!user) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white shadow-xl rounded-2xl text-center border border-gray-100">
          <h1 className="text-4xl font-extrabold mb-2 text-gray-900">Smart Bookmark App</h1>
          <h1 className="text-4xl font-extrabold mb-2 text-gray-900">Keep</h1>
          <p className="text-gray-500 mb-8 italic text-sm">Save what matters, instantly.</p>
          <form action={handleLogin} className="flex justify-center w-full">
            <button className="flex items-center gap-3 px-8 py-4 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-all shadow-sm hover:shadow-md font-semibold text-gray-700 cursor-pointer disabled:cursor-not-allowed">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
          </form>
        </div>
      </main>
    )
  }

  // 5. If logged in, show the Authenticated Dashboard
  return (
    <AuthenticatedHome 
      user={user} 
      handleSignOut={handleSignOut} 
    />
  )
}