import { Server, Socket } from 'socket.io'
import { validate_teacher_session } from './session_middleware';

interface ClientToServerEvents {
  message: (data: { userId: string; content: string }) => void
  demo: (data: { userId: string; content: string }) => void
}

interface ServerToClientEvents {
  broadcast: (data: { userId: string; content: string }) => void
  res: (data: { userId: string; content: string }) => void
}

export function setupSocket(
  io: Server<ClientToServerEvents, ServerToClientEvents>,
) {
  io.on(
    'connection',
    async (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {

      const authHeader = socket.handshake.headers.auth;
      // Check if it's an array and take the first element, or convert it to a string if it's a single value
      const token: string | undefined = Array.isArray(authHeader) ? authHeader[0] : authHeader?.toString();
      const session_id: string | undefined = socket.request.url?.split('/')[2];

      // Check that both session_id and token are defined
      if (!token || !session_id) {
        console.log('Missing session ID or token');
        socket.disconnect(true); // Disconnect the socket if either is undefined
        return;
      }

      // Validate the session with the token and session_id
      const res: { status: boolean, message: string } = await validate_teacher_session(token, session_id);
      
      if (!res.status) {
        console.log(`Failed authentication for session ID: ${session_id}`);
        socket.disconnect(true);
        return;
      }

      // Join the socket to a room based on the session ID
      socket.join(session_id);

      console.log(`Socket connected and joined room: ${session_id}`);

      // Handle the 'message' event and emit to users in the same session (room)
      socket.on('message', (data) => {
        console.log(`Message received from ${data.userId}: ${data.content}`);
        
        const payload = {
          first: 'pandya',
          second: 'prathmesh',
        };

        // Emit the message to all sockets in the same session's room
        io.to(session_id).emit('broadcast', { ...payload, ...data });
      });

      // Handle the 'demo' event and emit the response to the same user
      socket.on('demo', (data) => {
        console.log(`Message received from ${data.userId}: ${data.content}`);

        // Emit the response to the specific socket (client)
        socket.emit("res", data);
      });

      // Handle errors in the connection
      socket.on('error', (error) => {
        console.error('Connection error:', error);
      });

      // Handle socket disconnection
      socket.on('disconnect', () => {
        console.log('User disconnected:', res.message);

        // Optionally, remove the user from the room when disconnected
        socket.leave(session_id);
      });
    },
  );
}
