import { NextApiRequest, NextApiResponse } from 'next';

export interface Demo {
  title: string
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const response: Demo = { title: 'Kamikaze time' };

  res.status(200).json(response);
};
