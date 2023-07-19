import bcrypt from 'bcrypt';
import User from '@/backend/models/User';
import { NextResponse } from 'next/server';

export async function POST(request:Request) {
    const body = await request.json();

    const {email, username, password} = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        email,
        username,
        hashedPassword,
        arts: []
    });

    return NextResponse.json(user);
}