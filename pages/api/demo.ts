import { NextApiRequest, NextApiResponse } from 'next';

export interface Demo {
  title: string
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const titles = [
    'Kamikaze time',
    'Kaizen time',
    'Chimichanga time',
    'Kangaroo time',
    'Karate time',
    'Karma time',
    'Kaput time'
  ];

  const index = Math.round(Math.random() * (titles.length - 1));
  const response: Demo = { title: titles[index] };

  res.status(200).json(response);
};
