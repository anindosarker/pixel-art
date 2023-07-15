import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Arts from '@/backend/models/Arts';

export async function POST(request: Request, response: Response) {
    const data = await request.json();
    console.log(data);
    try {
        const art = data;

        // Check if the art already exists in the collection
        const artExists = await Arts.findOne({
            userArt: {
                $elemMatch: {
                    row: art.row,
                    col: art.col,
                    color: art.color
                }
            }
        });

        if (artExists) {
            return NextResponse.json({ message: "Art already exists" });
        }

        // Create a new art document if it doesn't exist
        const newArt = await Arts.create({
            userArt: art
        });

        console.log(newArt);
        return NextResponse.json({ newArt });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error });
    }
}
