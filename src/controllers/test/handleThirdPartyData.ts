import { Request, Response } from 'express'
import { Server } from 'socket.io'

// This function will handle the data from the third-party API and broadcast it via Socket.io
export const student_attendance_data = (io: Server) => {
  return (req: Request, res: Response) => {
    const {session_id,student_data} = req.body;

    // Broadcast the data to all connected clients via socket
   io.to(session_id).emit('student_attendance', JSON.stringify(student_data));
    // Send a response to the client indicating successful broadcast
   return res.status(200).send('Data received and broadcasted')
  }
}
