import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { api } from '../api/api'
import Card from '../components/Card'

export enum EHomeType {
  random = "random",
  trend = "trend",
  subscribed = "subs",
}

type Props = {
  type: EHomeType
}

const HomeContainer = styled.div`
  width: 85vw;
  margin: 0 auto;
  `

const CardsWrapper = styled.div`
  padding: 2em;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

export type TVideos = {
  _id: string,
  title: string,
  userId: string,
  imgUrl: string,
  videoUrl: string,
  views: number,
  likes: Array<string>,
  dislikes: Array<string>,
  createdAt: Date,
  updatedAt: Date,
}

export type TPayload<T> = {
  status: string,
  message: string,
  payload: T
}

const Home = ({ type }: Props) => {
  // declarations
  const [videos, setVideos] = useState<TVideos[]>([])

  // side-effects
  useEffect(() => {
    // define function
    const fetchHomePageVideos = async (type: EHomeType) => {
      const res: AxiosResponse<TPayload<TVideos[]>> = await api.get(`/videos/${type}`);
      if (res.statusText === "OK") {
        console.log("res status ok");
        setVideos(res.data.payload)
      }
    }

    // call function
    fetchHomePageVideos(type)

    return () => {
      setVideos([])
    }
  }, [type])



  // actual rendering
  return (
    <HomeContainer>
      <CardsWrapper>
        {
          videos.length ?
            videos.map(video => <Card video={video} key={video._id} />)
            :
            "No videos found"
        }
      </CardsWrapper>
    </HomeContainer>
  )
}

export default Home