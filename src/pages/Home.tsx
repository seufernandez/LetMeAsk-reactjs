import { useHistory } from 'react-router-dom'


import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button'


import '../styles/auth.scss'


export function Home() {
    const history = useHistory()
    const { user, signInWithGoogle } = useAuth()


    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle()
        }

       history.push('/rooms/new')
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
                    <form>
                        <input 
                        type="text" 
                        placeholder="Paste the Meeting password" 
                        />
                        <Button type="submit" >
                            Join Room
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
} 