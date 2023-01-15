import styled from 'styled-components'
import { LogoImg } from './Menu'
import { Link } from "react-router-dom"

type Props = {
    row?: true;
}

const CardContainer = styled.div<Props>`
    width: ${({ row }) => !row && "290px"};
    flex-basis: 23%;
    margin: 1px;
    margin-bottom: ${({ row }) => row ? "10px" : "45px"};
    cursor: pointer;
    display: ${({ row }) => row && "flex"};
    gap: ${({ row }) => row && "10px"};
    align-items: ${({ row }) => row && "start"};
`

const Image = styled.img<Props>`
    width: 100%;
    height: ${({ row }) => row ? "90px" : "150px"};
    background-color: #999;
    border-radius:  10px;
    flex:${({ row }) => row && 1};
    `
const Details = styled.div<Props>`
width: 100%;
flex:${({ row }) => row && 1};
display: flex;
gap: 12px;
margin-top: ${({ row }) => !row && "1em"};
padding: 2px;
`
const ChannelImage = styled.img<Props>`
display: ${(props) => props.row && "none"};
width: 36px;
height: 35px;
background-color: #999;
border-radius: 50%;
`
const Content = styled.div`
width: 100%;
color: #999;
display: flex;
flex-direction: column;
gap: 3px;
`
const ChannelName = styled.div`
color: ${({ theme }) => theme.textSoft};
font-size: 14px;
`
const Title = styled.div`
color: ${({ theme }) => theme.text};
font-size: 1em;
font-weight: 500;
`
const Info = styled.div`
font-size: 14px;
color: ${({ theme }) => theme.textSoft};
`


const Card = ({ row }: Props) => {
    return (
        <Link to="/video/test" style={{ textDecoration: "none" }}>
            <CardContainer row={row}>
                <Image row={row} />
                <Details row={row} >
                    <ChannelImage row={row} />
                    <Content>
                        <Title>{"Test video Name Here which is really big".substring(0, 40) + "..."}</Title>
                        <ChannelName>
                            Selva's channel
                        </ChannelName>
                        <Info>
                            123,199 - 1 day ago
                        </Info>
                    </Content>
                </Details>
            </CardContainer>
        </Link>
    )
}

export default Card