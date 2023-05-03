import styled from 'styled-components';

const Title = styled.div`
    padding-top: 30px;
    padding-bottom: 30px;
    font-size: 28px;
    text-align: center;
`;

const Banner = ():JSX.Element => {
    return (<div className='bg-white'>
        <Title>Welcome</Title>
    </div>);
}

export default Banner;
