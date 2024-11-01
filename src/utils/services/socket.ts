import { Server, Socket } from 'socket.io'

interface ClientToServerEvents {
  message: (data: { userId: string; content: string }) => void
}

interface ServerToClientEvents {
  broadcast: (data: { userId: string; content: string }) => void
}

export function setupSocket(
  io: Server<ClientToServerEvents, ServerToClientEvents>,
) {
  io.on(
    'connection',
    (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
      // console.log('A user connected', socket.id)

      //Hanldle message from clients
      socket.on('message', (data) => {
        // console.log(`Message received from ${data.userId}: ${data.content}`)
        const payload = {
          first: 'pandya',
          second: 'prathmesh',
        }
        io.emit('broadcast', { ...payload, ...data })
      })

      socket.on('error', (error) => {
        console.error('Connection error:', error)
      })

      //Broadcast the message to all clients
      socket.on('disconnect', () => {
        // console.log('User disconnected:', socket.id)
      })
    },
  )
}
