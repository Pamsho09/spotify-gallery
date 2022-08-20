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

  try {
    const token = await SpotifyService.getToken()
    res.status(STATUS_CODES.OK).json({ token })
  } catch (error) {
    const { response, message } = error as {
      response: { status: number }
      message: string
    }
    res.status(response.status).json({
      error: message,
    })
  }
}

export default handler
