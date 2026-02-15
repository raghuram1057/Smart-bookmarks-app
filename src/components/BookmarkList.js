'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

// UPDATE: Add onDeleteSuccess to the props
export default function BookmarkList({ onDeleteSuccess }) {
  const supabase = createClient();
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .order('inserted_at', { ascending: false });
    
    if (error) {
      console.error('Fetch error:', error.message);
    } else {
      setBookmarks(data || []);
    }
  };

  useEffect(() => {
    fetchBookmarks();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookmarks' },
        () => fetchBookmarks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const deleteBookmark = async (id) => {
    const { error } = await supabase.from('bookmarks').delete().eq('id', id);
    
    if (error) {
      console.error('Delete error:', error.message);
    } else {
      // UPDATE: Call the refresh function passed from AuthenticatedHome
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    }
  };

  if (bookmarks.length === 0) {
    return <p className="text-center text-gray-500 py-10">No bookmarks yet. Add one above!</p>;
  }

  return (
    <div className="space-y-4">
      {bookmarks.map((bm) => (
        <div key={bm.id} className="flex justify-between items-center p-4 bg-white border rounded-xl hover:shadow-md transition group">
          <div className="overflow-hidden">
            <h3 className="font-bold text-gray-800 truncate">{bm.title}</h3>
            <a href={bm.url} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-500 hover:underline">
              {bm.url}
            </a>
          </div>
          <button
            onClick={() => deleteBookmark(bm.id)}
            className="ml-4 text-gray-300 hover:text-red-500 transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}