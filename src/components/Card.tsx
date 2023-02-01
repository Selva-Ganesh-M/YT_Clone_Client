import styled from 'styled-components'
import { Link } from "react-router-dom"
import { TPayload, TVideos } from '../pages/HomePage'
import { useEffect, useState } from 'react'
import { api } from '../api/api'
import { format } from 'timeago.js'
import { useDispatch } from 'react-redux'

//#region : styled components

const CardContainer = styled.div<Props>`
    width: ${({ row }) => !row && "290px"};
    flex-basis: 23%;
    margin: 1px;
    margin-bottom: ${({ row }) => row ? "10px" : "45px"};
    cursor: pointer;
    display: ${({ row }) => row && "flex"};
    gap: ${({ row }) => row && "10px"};
    align-items: ${({ row }) => row && "start"};
    &:hover {
        transform: scale(1.05)
    }
`

const Image = styled.img<Props>`
    width: 100%;
    object-fit: cover;
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

//#endregion

export type TChannelUser = {
    _id: string,
    username: string,
    email: string,
    image: string,
    subscribers: number,
    subscribedUsers: Array<string>,
    isGoogleCreated: Boolean,
    createdAt: Date,
    updatedAt: Date,
}

type Props = {
    row?: true;
    video: TVideos;
}

const Card = ({ row, video }: Props) => {
    // declarations
    const dispatch = useDispatch();

    // custom declarations
    const [channelUser, setChannelUser] = useState<TChannelUser>()

    // functions

    // side-effects
    // fetch user
    useEffect(() => {
        (async () => {
            const response = await api.get<TPayload<TChannelUser>>(`/users/${video.userId}`)
            if (response.statusText === "OK") {
                setChannelUser(response.data.payload);
            }
        })()
    }, [])

    // actual response
    return (
        <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
            <CardContainer row={row} video={video} >
                <Image row={row} video={video} src={video.imgUrl} />
                <Details row={row} video={video} >
                    <ChannelImage
                        row={row}
                        video={video}
                        src={channelUser?.image}
                        alt={"hello"}
                    />
                    <Content>
                        <Title>{video.title.length > 40 ? `${video.title}`.substring(0, 40) + "..." : `${video.title}`}</Title>
                        <ChannelName>
                            {channelUser && channelUser.username}
                        </ChannelName>
                        <Info>
                            {video.views} views - {format(video.createdAt)}
                        </Info>
                    </Content>
                </Details>
            </CardContainer>
        </Link>
    )
}

export default Card