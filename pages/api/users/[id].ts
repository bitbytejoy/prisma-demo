import type { NextApiRequest, NextApiResponse } from 'next'
import {User} from "@prisma/client";
import prismaClient from "../../../data/prismaClient";
import _ from "lodash";

export default async function usersId (
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  switch (req.method) {
    case 'PUT': {
      const { id } = req.query;
      req.body.id = id;

      if (!_.isString(id)) {
        res.status(400);
        return;
      }

      const user = await prismaClient.user.upsert({
        where: { id },
        update: _.omit(req.body, ['id']),
        create: req.body,
      });

      res.status(201).json(user);

      return;
    }

    case 'DELETE': {
      const { id } = req.query;

      if (!_.isString(id)) {
        res.status(400).end();
        return;
      }

      await prismaClient.user.delete({ where: { id } });

      res.status(204).end();

      return;
    }

    default: {
      res.status(405).end();
    }
  }
}
