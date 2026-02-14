import './globals.css'

export const metadata = {
  title: 'Smart Bookmark Manager',
  description: 'Manage your bookmarks in real-time',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}