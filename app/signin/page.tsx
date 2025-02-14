'use client';
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

export default function SignInPage() {
        const { data: session, status } = useSession();
        const router = useRouter();

        useEffect(() => {
                if (session) router.push('/');
        }, [session, router]);

        if (status === "loading") return <div>Loading...</div>;

        return (
                <div className="flex flex-col items-center justify-center h-screen">
                        <Card className="w-full max-w-md text-center">
                                <CardHeader>
                                        <CardTitle className="text-center text-2xl">XYZ Hotel</CardTitle>
                                        <CardDescription className="text-center mt-2">
                                                Welcome to luxury and comfort. Sign in to book your perfect stay with us.
                                                Discover our premium rooms and exclusive amenities.
                                        </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 flex flex-col items-center">
                                        <Button onClick={() => signIn("asgardeo", { callbackUrl: "/" })}>
                                                Sign in with Asgardeo
                                        </Button>
                                </CardContent>
                        </Card>
                </div>
        );
}
