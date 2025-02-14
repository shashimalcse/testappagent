export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow-md">
        {children}
      </div>
    </main>
  );
}
