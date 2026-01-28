import { LoginForm } from "@/features/auth/components/login-form";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";
const Page = async () => {
    const session = await caller.auth.session();
    if(session.user) {
        redirect("/")
    }
    return (
        <div>
            <LoginForm />
        </div>
    );
};

export default Page;