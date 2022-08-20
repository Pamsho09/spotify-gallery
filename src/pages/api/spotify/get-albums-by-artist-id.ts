// eslint-disable-next-line filenames/match-regex
import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseItem } from '../../../service/dto/responseItem'
import { SpotifyService } from '../../../service/spotifyService'

type Data = {
  error: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseItem[] | Data>
) => {
  enum STATUS_CODES {
    // eslint-disable-next-line no-magic-numbers
    OK = 200,
  }
  if (req.headers.authorization) {
    const spotifyService = new SpotifyService(req.headers.authorization)
    switch (req.method) {
      case 'GET':
        const { id } = req.query as { id: string }
        try {
          const data = await spotifyService.getAlbumsByArtistId(id)
          res.status(STATUS_CODES.OK).json(data)
        } catch (error) {
          const { response, message } = error as {
            response: { status: number }
            message: string
          }
          res.status(response.status).json({ error: message })
        }
        break
    }
  } else {
    const error = 'Authorization header is missing'
    const statusCode = 401
    res.status(statusCode).json({ error })
  }
}

export default handler
