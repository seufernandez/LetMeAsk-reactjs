import { useHistory } from 'react-router-dom';
import { FormEvent } from 'react';
import { useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import { database } from '../services/firebase';

import '../styles/auth.scss';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('This room doesn´t exist ');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Sorry, this Room is already closed :´(');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas " />
        <strong>Create your Q &amp; A room right now!</strong>
        <p>Get your audience questions realtime</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetmeAsk" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Google´Logo" />
            Create your Room using Google
          </button>
          <div className="separator">Join in a room</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Paste here the meeting code"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Join Room</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
