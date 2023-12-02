import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { email, username, name, password } = req.body;

    if (!email || !username || !name || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the username is already in use
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      }
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error('Registration Error:', error);
    console.log(error);
    return res.status(400).end();
  }
}
