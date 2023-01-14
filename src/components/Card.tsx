import styled from 'styled-components'
import { LogoImg } from './Menu'
import {Link} from "react-router-dom" 

type Props = {}

const CardContainer = styled.div`
    flex-basis: 23%;
    margin: 1px;
    margin-bottom: 45px;
    cursor: pointer;
`

const Image = styled.img`
    width: 100%;
    height: 150px;
    background-color: #999;
    border-radius:  10px;
`
const Details = styled.div`
display: flex;
gap: 12px;
margin-top: 1em;
padding: 2px;
`
const ChannelImage = styled.img`
width: 36px;
height: 35px;
background-color: #999;
border-radius: 50%;
`
const Content = styled.div`
color: #999;
display: flex;
flex-direction: column;
gap: 3px;
`
const ChannelName = styled.div`
color: ${({theme})=>theme.textSoft};
font-size: 14px;
`
const Title = styled.div`
color: ${({theme})=>theme.text};
font-size: 1.1em;
font-weight: 500;
`
const Info = styled.div`
font-size: 14px;
color: ${({theme})=>theme.textSoft};
`


const Card = (props: Props) => {
  return (
      <CardContainer>
        <Link to="/video/test" style={{textDecoration: "none"}}>
        <Image />
        <Details>
            <ChannelImage />
            <Content>
                <Title>Test video</Title>
                <ChannelName>
                    Selva's channel
                </ChannelName>
                <Info>
                    123,199 - 1 day ago
                </Info>
            </Content>
        </Details>
    </Link>
    </CardContainer>
  )
}

export default Card