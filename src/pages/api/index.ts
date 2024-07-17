import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    text: "EverQuest Inventory",
    link: {
      endpoint: "/api/upload",
      method: "POST",
    }
  });
}
