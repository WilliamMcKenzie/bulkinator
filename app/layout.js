import './globals.css'

export const metadata = {
  title: 'Bulkinator',
  description: 'Bulk the right way.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
