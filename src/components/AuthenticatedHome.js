'use client'
import { useState } from 'react'
import AddBookmark from './AddBookmark'
import BookmarkList from './BookmarkList'

export default function AuthenticatedHome({ user, handleSignOut }) {
  const [refreshKey, setRefreshKey] = useState(0)

  const triggerRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-blue-600">My Bookmarks</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 hidden sm:block">{user.email}</span>
          <form action={handleSignOut}>
             <button className="text-sm text-red-500 hover:text-red-700 font-medium bg-red-50 px-3 py-1 rounded-lg cursor-pointer disabled:cursor-not-allowed">
               Sign Out
             </button>
          </form>
        </div>
      </div>

      {/* Added userId prop and onAddSuccess function */}
      <AddBookmark userId={user.id} onAddSuccess={triggerRefresh} />

      {/* The key forces a fresh mount whenever refreshKey changes */}
      <BookmarkList key={refreshKey} />
    </main>
  )
}