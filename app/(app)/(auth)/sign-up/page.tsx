import { SignupForm } from "@/features/auth/components/signup-form";
import { redirect } from "next/navigation";
import { caller } from "@/trpc/server";

const Page = async () => {
    const session = await caller.auth.session();
    if (session.user) {
        redirect("/")
    }
    return (
        <div>
            <SignupForm />
        </div>
    );
};

export default Page;