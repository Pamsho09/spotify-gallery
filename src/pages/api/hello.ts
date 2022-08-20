// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  enum STATUS_CODES {
    // eslint-disable-next-line no-magic-numbers
    OK = 200,
  }
  res.status(STATUS_CODES.OK).json({ name: 'John Doe' })
}

export default handler
