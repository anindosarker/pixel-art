import { NextResponse } from 'next/server';
import Arts from '@/backend/models/Arts';
import User from '@/backend/models/User';

export async function POST(request: Request, response: Response) {
    const data = await request.json();
    console.log(data);

    const user = await User.findOne({
        email: data.email,
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const isArtExist = await Arts.findOne({
        userArt: data.coloredDivs,
    });
    console.log(isArtExist)
    if (isArtExist) return NextResponse.json({ error: "Art already exist" }, { status: 400 });

    const art = await Arts.create({
        userArt: data.coloredDivs,
        userId: user._id,
        review: 0,
        artImg: data.imageUrl
    });
    console.log(art)
    user.arts.push(art._id);

    await user.save();
    await art.save();

    return NextResponse.json(art);
}
