import styled from 'styled-components';
import Banner from '../components/Banner';
import WelcomePanel from '../components/WelcomePanel';

const MainContainer = styled.div`
margin-top: 40px;
display: flex;
flex-direction: column;
align-items: center;
vertical-align: center;
`;

const Home = () => {

    return (<div>
        <Banner />
        <MainContainer>
          <WelcomePanel/>
        </MainContainer>
      </div>
  );
};

export default Home;
