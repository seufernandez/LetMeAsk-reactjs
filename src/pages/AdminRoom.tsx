import { useHistory, useParams } from 'react-router-dom';

import cx from 'classnames';


import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Question } from '../components/Question';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import '../styles/room.scss';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth();

  const history = useHistory();

  const params = useParams<RoomParams>();

  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    if (window.confirm('Are you sure you want to Close this Room?')) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      });
      history.push('/');
    }
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Are you sure you want to delete this Question?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo" />
          <div>
            <RoomCode code={params.id} />
            <Button isOutlinedRed onClick={handleEndRoom}>
              Close Room
            </Button>
            {/* <Link to="rooms/"></Link> */}
          </div>
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>{title}</h1>
          {questions.length > 0 && <span>{questions.length} questions</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                <button
                  className="answer-button-icon"
                  type="button"
                  onClick={() => {
                    handleCheckQuestionAsAnswered(question.id);
                  }}
                >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12.0003" cy="11.9998" r="9.00375"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                </button>
                  {!question.isAnswered && (
                                    <button
                                    className="highlight-button-icon"
                                    type="button"
                                    onClick={() => {
                                      handleHighlightQuestion(question.id);
                                    }}
                                  >
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                  </button>
                  )}
                <button
                className="remove-button-icon"
                  type="button"
                  onClick={() => {
                    handleDeleteQuestion(question.id);
                  }}
                >
                  <img src={deleteImg} alt="Remove Question" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
