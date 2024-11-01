import { Request, Response } from 'express'
import { Server } from 'socket.io'

// This function will handle the data from the third-party API and broadcast it via Socket.io
export const handleThirdPartyData = (io: Server) => {
  return (req: Request, res: Response) => {
    const thirdPartyData = { first: 'manishkumar' }

    // Broadcast the data to all connected clients via socket
    io.emit('broadcast', thirdPartyData)

    // Send response to acknowledge the receipt
    res.status(200).send('Data broadcasted to clients')
  }
}
