import Arts from "@/backend/models/Arts"


export default async function getAllArts() {
    try {
        const arts = await Arts.find({}).populate("userId", "username").sort({ createdAt: -1 })
        
        return arts

    } catch (error: any) {
        return error.message
    }
}