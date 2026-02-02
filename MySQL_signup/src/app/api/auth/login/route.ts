import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = body.username?.trim();
    const password = body.password?.trim();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    if (user.lockout_until && new Date(user.lockout_until) > new Date()) {
      const remainingTime = Math.ceil(
        (new Date(user.lockout_until).getTime() - new Date().getTime()) / 60000
      );
      return NextResponse.json(
        { error: `Account locked. Please try again in ${remainingTime} minutes.` },
        { status: 403 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      const newAttempts = (user.login_attempts || 0) + 1;
      
      if (newAttempts >= 3) {
        const lockoutUntil = new Date(Date.now() + 10 * 60 * 1000);
        await pool.query(
          'UPDATE users SET login_attempts = $1, lockout_until = $2 WHERE id = $3',
          [newAttempts, lockoutUntil, user.id]
        );
        return NextResponse.json(
          { error: 'Too many failed attempts. Account locked for 10 minutes.' },
          { status: 403 }
        );
      } else {
        await pool.query(
          'UPDATE users SET login_attempts = $1 WHERE id = $2',
          [newAttempts, user.id]
        );
        return NextResponse.json(
          { error: `Invalid username or password. ${3 - newAttempts} attempts remaining.` },
          { status: 401 }
        );
      }
    }

    await pool.query(
      'UPDATE users SET login_attempts = 0, lockout_until = NULL WHERE id = $1',
      [user.id]
    );

    return NextResponse.json(
      { message: 'Login successful', username: user.username },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const stack = error instanceof Error ? error.stack : '';
    console.error('Login error detail:', message, stack);
    return NextResponse.json(
      { error: 'Internal server error. Please check database connection.' },
      { status: 500 }
    );
  }
}
