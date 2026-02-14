'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function AddBookmark({ userId, onAddSuccess }) {
  const supabase = createClient();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase
      .from('bookmarks')
      .insert([{ title, url, user_id: userId }]);

    if (!error) {
      setTitle('');
      setUrl('');
      // Trigger the refresh in the parent component
      if (onAddSuccess) onAddSuccess();
    } else {
      console.error('Insert error:', error.message);
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border mb-8 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Add New Bookmark</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Website Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition cursor-pointer disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Saving...' : 'Save Bookmark'}
      </button>
    </form>
  );
}