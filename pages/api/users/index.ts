import type { NextApiRequest, NextApiResponse } from 'next'
import {User} from "@prisma/client";
import prismaClient from "../../../data/prismaClient";

export default async function usersId (
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  switch (req.method) {
    case 'GET': {
      const users = await prismaClient.user.findMany();
      return res.status(200).json(users);
    }

    default: {
      res.status(405).end();
    }
  }
}
