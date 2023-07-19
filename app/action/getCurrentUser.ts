import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import User from "@/backend/models/User"

export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
    try {
        const session = await getSession()
        if (!session?.user?.email) return null

        const currentUser = await User.findOne({ email: session.user.email })

        if (!currentUser) return null

        return currentUser

    } catch (error: any) {
        return null
    }
}