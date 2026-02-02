import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const existingUsers = await pool.query(
      'SELECT id FROM users WHERE username = $1',
      [username]
    );

    if (existingUsers.rows.length > 0) {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (username, password, login_attempts) VALUES ($1, $2, 0)',
      [username, hashedPassword]
    );

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error detail:', error.message, error.stack);
    return NextResponse.json(
      { error: 'Internal server error. Please check database connection.' },
      { status: 500 }
    );
  }
}
