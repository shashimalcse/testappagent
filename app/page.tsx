import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  
  if (!session) {
    redirect('/signin');
  } else {
    redirect('/chat');
  }

  return (
    <main className="container mx-auto">
    </main>
  );
}
