import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import styled from 'styled-components'
import Comments from "../components/Comments";
import Recommendations from "../components/Recommendations";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, subs } from "../redux/slices/userSlice";
import { dislike, fetchVideoSuccess, getVideo, like } from "../redux/slices/videoSlice";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import { TPayload, TVideos } from "./HomePage";
import { TChannelUser } from "../components/Card";

type Props = {

}

//#region - styled components
const VideoContainer = styled.div`
padding:2em;
display: flex;
color: ${({ theme }) => theme.text};
`

const Content = styled.div`
  flex: 5;
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

const SubscribeButton = styled.button<{ isSubscribed: Boolean | undefined }>`
  color: white;
  background-color: ${({ isSubscribed }) => isSubscribed ? `#555` : `red`};
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
//#endregion


// React functional component
const Video = (props: Props) => {
  // declarations
  const user = useSelector(getCurrentUser)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  // custom declarations
  const currentVideo = useSelector(getVideo).currVideo
  const [currentChannel, setCurrentChannel] = useState<TChannelUser>()

  //#region : side-effects
  // fetch video and channel
  useEffect(() => {
    const fetchData = async () => {
      const videoRes = await api.get<TPayload<TVideos>>(`/videos/${location.pathname.split("/")[2]}`)
      const channelRes = await api.get<TPayload<TChannelUser>>(`/users/${videoRes.data.payload.userId}`)

      // dispatchs
      dispatch(fetchVideoSuccess(videoRes.data.payload))
      setCurrentChannel(channelRes.data.payload)
      console.log("set current channel ran.");
      console.log("channelRes.payload", channelRes.data);
      console.log("currentChannel:", currentChannel);


    }
    fetchData()
  }, [location])


  useEffect(() => {
    console.log(currentChannel && user.details?.subscribedUsers.includes(currentChannel._id));
  }, [user])

  //#endregion

  //#region - functions
  // handle like
  const handleLike = async () => {
    api.put(`/videos/like/${currentVideo._id}`)
      .then((res) => {
        dispatch(like(user.details!._id))
      })
      .catch(err => null)
  }
  // handle dislike
  const handleDislike = async () => {
    api.put(`/videos/dislike/${currentVideo._id}`)
      .then((res) => {
        dispatch(dislike(user.details!._id))
      })
      .catch(err => null)

  }
  // handle subscription
  const handleSubs = async () => {
    (user.details?.subscribedUsers.includes(currentChannel?._id!)) ?
      await api.patch(`/users/unsubscribe/${currentChannel?._id}`) :
      await api.patch(`/users/subscribe/${currentChannel?._id}`)
    dispatch(subs(currentChannel?._id!))
  }
  //#endregion

  // jsx rendering
  return (
    <VideoContainer>
      {/* video section + recommendations */}
      <Content>
        {/* video wrapper */}
        <VideoWrapper>
          <iframe
            width="100%"
            height="500px"
            src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        {/* Video Details */}
        <Details>
          <Info>{currentVideo.views} views • {currentVideo ? format(currentVideo.createdAt) : null}</Info>
          {/* conditional routing acc to user presence */}
          {user.details ? (
            <Buttons>
              {/* like btn */}
              <Button onClick={handleLike}>
                {/* if user have conditions */}
                {/* if no user just show the subscribe button and redirect user to signup page */}
                {currentVideo.likes.includes(user.details!._id) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOutlinedIcon />
                )} {currentVideo?.likes.length}
              </Button>

              {/* dislike btn */}
              <Button onClick={handleDislike}>
                {currentVideo.dislikes.includes(user.details!._id) ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOffAltOutlinedIcon />
                )}
              </Button>
              <Button>
                <ReplyOutlinedIcon /> Share
              </Button>
              <Button>
                <AddTaskOutlinedIcon /> Save
              </Button>
            </Buttons>
          ) : (
            <Buttons onClick={() => navigate("/signin")}>
              {/* like btn */}
              <Button>
                <ThumbUpOutlinedIcon />
              </Button>

              {/* dislike btn */}
              <Button>
                <ThumbDownOffAltOutlinedIcon />
              </Button>
              <Button>
                <ReplyOutlinedIcon /> Share
              </Button>
              <Button>
                <AddTaskOutlinedIcon /> Save
              </Button>
            </Buttons>
          )}

        </Details>
        <Hr />

        {/* Channel Banner */}
        <ChannelBanner>
          <ChannelImage src={currentChannel?.image} alt="missing imagee" />
          <ChannelDetails>
            <ChannelTitle>{currentChannel?.username}</ChannelTitle>
            <Subscribers>
              {currentChannel?.subscribers}
            </Subscribers>
            <Description>{currentVideo.desc}</Description>
          </ChannelDetails>
          {/* subs btn */}
          {
            // conditional rendering acc to user presence
            !user.details ? (
              <SubscribeButton isSubscribed={false} onClick={() => navigate('/signin')}>
                Subscribe
              </SubscribeButton>
            ) : (
              <SubscribeButton isSubscribed={user.details?.subscribedUsers.includes(currentChannel?._id!)} onClick={handleSubs}>
                {
                  user.details?.subscribedUsers.includes(currentChannel?._id!) ? (
                    "Subscribed"
                  ) : (
                    "Subscribe"
                  )
                }
              </SubscribeButton>
            )
          }
        </ChannelBanner>
        <Hr />
        <Comments />
      </Content>
      <Recommendations />
    </VideoContainer>
  )
}

export default Video