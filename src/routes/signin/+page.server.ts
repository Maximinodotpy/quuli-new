import { redirect } from "@sveltejs/kit";
import { signIn } from "../../auth"
import type { Actions } from "./$types"
export const actions: Actions = { default: e => {
    console.log("signin");
    signIn(e)
    redirect(300, "/profile")

    return {
        success: true,
    }
}}