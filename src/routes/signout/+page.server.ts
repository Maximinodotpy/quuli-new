import { signOut } from "../../auth"
import type { Actions } from "./$types"
export const actions: Actions = {default: (e) => {
    console.log("signout");
    signOut(e)
}}