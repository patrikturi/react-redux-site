import react from 'react';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { goToPlayNow } from '../utils/location';

const MainContainer = styled.div`
margin-top: 40px;
display: flex;
flex-direction: column;
align-items: center;
vertical-align: center;
`;

const PageBase: react.FC = ({children}) => {

    const user = useSelector((state: RootState) => state.user);

    const params = new URLSearchParams(window.location.search);
    const invitationToken = params.get('invitation-token');
    const query = invitationToken ? `?invitation-token=${invitationToken}` : '';

return (<>
    <Nav
    //   activeKey="/login"
    >
    <Nav.Item>
        <Nav.Link href={`/${query}#/`}>Home</Nav.Link>
    </Nav.Item>
    {!user && <Nav.Item>
        <Nav.Link href={`/${query}#/login`}>Login</Nav.Link>
    </Nav.Item>}
    {(!user || user.is_guest) && <Nav.Item>
        <Nav.Link href={`/${query}#/register`}>Register</Nav.Link>
    </Nav.Item>}
    {user && !user.is_guest && (<Nav.Item>
        <Nav.Link href={`/${query}#/logout`}>Logout</Nav.Link>
    </Nav.Item>)}
    {user  && user.is_guest && (<Nav.Item>
        <Nav.Link onClick={() => goToPlayNow()}>Back to Play</Nav.Link>
    </Nav.Item>)}
    </Nav>
    <MainContainer>
        {children}
    </MainContainer></>);
};

export default PageBase;
