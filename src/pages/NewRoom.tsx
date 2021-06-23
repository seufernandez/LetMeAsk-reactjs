// import { useContext } from 'react'
import { FormEvent, useState } from 'react'
import {Link} from 'react-router-dom'
// import { AuthContext } from '../contexts/AuthContext'



import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

import '../styles/auth.scss'


export function NewRoom() {
    const { user } = useAuth()
    
    const [ newRoom, setNewRoom ] = useState('')
    
    async function handleCreateRoom(event:FormEvent) {
        event.preventDefault()

        if (newRoom.trim()==='') {
            return
        }


        const roomRef = database.ref('rooms')
    
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorID: user?.id,

        })
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
                    <h2>Welcome!</h2>
                    <h1>{user?.name}</h1>
                    <h2>Create a new Room</h2>
                    <form onSubmit={handleCreateRoom} >
                        <input 
                        type="text" 
                        placeholder="Choose a nice name to your room" 
                        onChange={ event => setNewRoom(event.target.value) }
                        value={newRoom}
                        />
                        <Button type="submit">
                            Create Room
                        </Button>
                    </form>
                    <p>
                      Already have a Room Pass? <Link to="/">Click here</Link>
                    </p>
                </div>
            </main>
        </div>
    )
} 