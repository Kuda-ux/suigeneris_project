export const metadata = {
  title: 'Admin Dashboard - Sui Generis Technologies',
  description: 'Admin panel for managing Sui Generis store',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  );
}
