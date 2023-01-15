import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import styled from 'styled-components'
import Comments from "../components/Comments";

type Props = {}

const VideoContainer = styled.div`
padding:2em;
display: flex;
color: ${({ theme }) => theme.text};
`

const Content = styled.div`
  flex: 5;
`
const Recommendation = styled.div`
  flex: 2;
  padding: 0 1em;
`
const VideoWrapper = styled.div`
  background-color: #333;
  border-radius: 10px;
`
const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin: 10px 0;
`
const Details = styled.div`
  display: flex;
  justify-content: space-between;
font-size: 12px;
align-items: center;
`
const Info = styled.div`
  color: ${({ theme }) => theme.textSoft};
  `
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.textSoft};
  
`
const Button = styled.div`
cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`

const Hr = styled.hr`
  border: 0.5px solid ${({ theme }) => theme.soft};
  margin: 10px 0;
`

const ChannelBanner = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
`

const ChannelTitle = styled.div`
font-size: 18px;
font-weight: 500;
`

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #777;
`
const ChannelDetails = styled.div`
margin-top: 20px;
  flex:1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 5px;
`

const SubscribeButton = styled.button`
  color: white;
  background-color: red;
  padding: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

const Description = styled.div`
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
  `

const Subscribers = styled.div`
color: ${({ theme }) => theme.textSoft};
font-size: 12px;  
margin-bottom: 10px;
`

const Video = (props: Props) => {
  return (
    <VideoContainer>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="500px"
            src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </VideoWrapper>
        <Title>Test Video</Title>
        <Details>
          <Info>7,948,154 views • Jun 22, 2022</Info>
          <Buttons>
            <Button>
              <ThumbUpOutlinedIcon /> 123
            </Button>
            <Button>
              <ThumbDownOffAltOutlinedIcon /> Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <ChannelBanner>
          <ChannelImage />
          <ChannelDetails>
            <ChannelTitle>Selva Dev</ChannelTitle>
            <Subscribers>
              25k subscribers
            </Subscribers>
            <Description>This is a full stack web dev channel. Please subscribe to encourage.</Description>
          </ChannelDetails>
          <SubscribeButton>Subscribe</SubscribeButton>
        </ChannelBanner>
        <Hr />
        <Comments />
      </Content>
      <Recommendation>
        Recomm
      </Recommendation>
    </VideoContainer>
  )
}

export default Video