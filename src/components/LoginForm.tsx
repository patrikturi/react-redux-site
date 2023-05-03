import React from 'react';
import styled from 'styled-components';
import { Button, Form, Card, Spinner } from 'react-bootstrap';
import { goToPlayNow } from '../utils/location';
import { getErrorMessages } from '../utils/httpErrors';
import * as http from '../utils/http';
import ErrorAlert from './ErrorAlert';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
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
`;

const LoginForm = ():JSX.Element => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [errorMessages, setErrorMessages] = React.useState([] as string[]);

    React.useEffect(() => {
      if(user && !user.is_guest) {
        navigate('/');
      }
    }, [user, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setErrorMessages([]);

      const data = {username, password};
      const response = await http.login(data);

      if(!response) {
        setErrorMessages([OFFLINE_ERROR_MESSAGE]);
      } else if(!response.ok) {
        // TODO: logged in with the same user
        setErrorMessages(await getErrorMessages(response));
      } else {
        goToPlayNow();
      }
      setLoading(false);
    };

    return (
          <StyledCard>
        <Form onSubmit={handleLogin}>
          <h2 className="mb-3">Log In</h2>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username"
            value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <ButtonWrapper>
        {isLoading ? <Spinner animation="border" variant="primary"></Spinner> :
          (<Button variant="primary" type="submit">
            Log In
          </Button>)
        }
        </ButtonWrapper>
        { errorMessages.length > 0 && (<ErrorAlert messages={errorMessages} />)}
      </Form>
      </StyledCard>);
}

export default LoginForm;
