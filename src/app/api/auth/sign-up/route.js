import { NextResponse } from 'next/server';
import { pool } from '@/database/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { email, password, key } = await req.json();

    if (key !== process.env.NEXT_PUBLIC_KEY_ADMIN) {
      return NextResponse.json(
        { message: 'No tienes acceso administrador' },
        { status: 401 }
      );
    }

    if (!email || email.length < 8) {
      return NextResponse.json(
        { message: 'El correo no puede ser menor a 8 caracteres' },
        { status: 400 }
      );
    }

    if (!password || password.length < 8) {
      return NextResponse.json(
        { message: 'La contraseña no puede ser menos de 8 caracteres' },
        { status: 400 }
      );
    }

    const [userFound] = await pool.query(
      `SELECT * FROM user WHERE email = "${email}"`
    );

    if (userFound.length !== 0) {
      return NextResponse.json(
        { message: 'El usuario ya existe' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    pool.query(
      `INSERT INTO user (email, password) VALUES("${email}","${hashedPassword}")`
    );

    return NextResponse.json({ message: 'Se ha registrado correctamente' });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
