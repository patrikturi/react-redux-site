import React from 'react';
import styled from 'styled-components';
import { Button, Form, Card, Spinner } from 'react-bootstrap';
import * as http from '../utils/http';
import { getErrorMessages } from '../utils/httpErrors';
import ErrorAlert from './ErrorAlert';
import { goToPlayNow } from '../utils/location';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { OFFLINE_ERROR_MESSAGE } from '../const';
import { useNavigate } from 'react-router-dom';


const StyledCard = styled(Card)`
  width: 350px;
  padding: 15px;
`;

const ButtonWrapper = styled.div`
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75px;
  margin-left: 5px;
`;


const RegistrationForm = ():JSX.Element => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [confirmEmail, setConfirmEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);
    const [errorMessages, setErrorMessages] = React.useState([] as string[]);

    const params = new URLSearchParams(window.location.search);
    const invitationToken = params.get('invitation-token');

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if(email !== confirmEmail) {
        setErrorMessages(['"Email" and "Confirm Email" fields do not match!']);
        return;
      }

      setLoading(true);
      setErrorMessages([]);

      const data = {username, email, password, invitationToken};
      const response = await http.register(data);

      if(!response) {
        setErrorMessages([OFFLINE_ERROR_MESSAGE]);
      } else if(!response.ok) {
        setErrorMessages(await getErrorMessages(response));
      } else {
        goToPlayNow();
      }

      setLoading(false);
    };

    React.useEffect(() => {
      if(user && !user.is_guest) {
        navigate('/');
      }
    }, [user, navigate]);

    if(!user && !invitationToken) {
      return (<StyledCard>
        Sorry, you need an invitation token to sign up (check the URL)
      </StyledCard>);
    }

    return (
      <>
          <StyledCard>
        <Form onSubmit={handleSubmit}>
          <h2 className="mb-3">Create account</h2>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username"
            value={username} onChange={(e) => setUsername(e.target.value)} />
          {user && user.is_guest && <small>change your name from {user.username}</small>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email2">
          <Form.Label>Confirm Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"
            value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <ButtonWrapper>
        { isLoading ? <Spinner animation="border" variant="success"></Spinner> :
          <Button variant="success" type="submit">
            Register
          </Button>
        }
        </ButtonWrapper>
        { errorMessages.length > 0 && (<ErrorAlert messages={errorMessages} />)}
      </Form>
      </StyledCard>
      </>
      );
}

export default RegistrationForm;
