import { useEffect, useState } from 'react';
import { socket } from '../socket';

function JoinSession({ roomId, userName }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Emit event to join the room
    socket.emit('join-room', roomId, userName);

    // Listen for incoming messages
    socket.on('receive-message', ({ sender, message }) => {
      setMessages(prev => [...prev, { sender, message }]);
    });

    // Optional: Notify when a user joins
    socket.on('user-joined', ({ userName }) => {
      console.log(`${userName} joined the room`);
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off('receive-message');
      socket.off('user-joined');
      socket.disconnect(); // optional if reconnecting later
    };
  }, [roomId, userName]);

  return (
    <div>
      <h2>Chat Room: {roomId}</h2>
      <div>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.sender}:</b> {m.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default JoinSession;
