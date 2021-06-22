import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
// import googleIconImg from '../assets/images/google-icon.svg'
import { Button } from '../components/Button'


import '../styles/auth.scss'

export function NewRoom() {
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
                    <h2>Create a new Room</h2>
                    <form>
                        <input 
                        type="text" 
                        placeholder="Choose a nice name to your room" 
                        />
                        <Button type="submit">
                            Create Room
                        </Button>
                    </form>
                    <p>
                      Already have a Room Pass? <a href="#">Click here</a>
                    </p>
                </div>
            </main>
        </div>
    )
} 