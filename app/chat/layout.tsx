export default function SignInLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <main className="flex min-h-screen items-center justify-center">
          {children}
      </main>
    );
  }
  