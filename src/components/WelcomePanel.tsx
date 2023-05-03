import styled from 'styled-components';
import { Alert, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { goToPlayNow, LOGIN_PATH } from '../utils/location';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Container = styled.div`
    display: flex;
`;

const StyledCard = styled(Card)`
    width: 225px;
    height: 175px;
    padding-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
`;

const Note = styled.div`
    margin-top: 8px;
    text-align: center;
`;

const StyledAlert = styled(Alert)`
    margin-top: 10px;
    width: 100%;
    margin-left: 0;
`;

const WelcomePanel = ():JSX.Element => {
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    const handleLogIn = () => {
        navigate(LOGIN_PATH);
    };

    const params = new URLSearchParams(window.location.search);
    const errorMessage = params.get('error');
    const invitationToken = params.get('invitation-token');

    const canPlay = invitationToken || user;

    let playNowText: JSX.Element;

    if(user) {
        playNowText = <span>{user.is_guest ? "Playing" : "Logged in"} as <strong>{user.username}</strong>{user.is_guest && " (guest)"}</span>;
    } else if(canPlay) {
        playNowText = <span>Try the game without registering</span>;
    } else {
        playNowText = <span>You need an invitation token to play as guest (check the URL)</span>;
    }

    return (
        <><Container>
    <StyledCard>
        <Button variant={canPlay ? 'success' : 'secondary'} size='lg' onClick={() => goToPlayNow(!user)} disabled={!canPlay}>Play Now</Button>
        <Note>{playNowText}</Note>
    </StyledCard>
    {(!user || user.is_guest) && <StyledCard>
        <Button variant='primary' size='lg' onClick={handleLogIn}>Log In</Button>
        <Note>Log in if you already have an account</Note>
    </StyledCard>}
    </Container><div>{errorMessage && <StyledAlert variant="warning">{errorMessage}</StyledAlert>}</div></>);
}

export default WelcomePanel;
