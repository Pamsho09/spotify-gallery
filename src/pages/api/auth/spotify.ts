// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { SpotifyService } from '../../../service/spotifyService'

type Data =
  | {
      token: string
    }
  | {
      error: string
    }

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  enum STATUS_CODES {
    // eslint-disable-next-line no-magic-numbers
    OK = 200,
    // eslint-disable-next-line no-magic-numbers
    BAD_REQUEST = 400,
  }
  const token = await SpotifyService.getToken()
  if (typeof token === 'string') {
    res.status(STATUS_CODES.OK).json({ token })
  } else {
    res.status(STATUS_CODES.BAD_REQUEST).json({
      error: token?.message,
    })
  }
}

export default handler
