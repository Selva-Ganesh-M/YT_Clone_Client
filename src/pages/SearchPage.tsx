import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { api } from '../api/api'
import Card from '../components/Card'
import { TPayload, TVideos } from './HomePage'
import queryString from 'query-string';

const SearchContainer = styled.div`
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


type Props = {}

const SearchPage = (props: Props) => {
    //#region : declarations
    const location = useLocation()
    //#endregion

    //#region : custom-declarations
    const [videos, setVideos] = useState<TVideos[]>([])
    //#endregion

    //#region : side-effects
    useEffect(() => {
        (
            async () => {
                const res = await api.get<TPayload<TVideos[]>>(`/videos/search${location.search}`)
                if (res.statusText === "OK") {
                    setVideos(res.data.payload)
                }
            }
        )()
    }, [location])
    //#endregion

    //#region : functions

    //#endregion

    //jsx rendering
    return (
        <SearchContainer>
            <CardsWrapper>
                {
                    videos.length > 0 ? (videos.map(video => (
                        <Card video={video} key={video._id} />
                    ))) : ("no videos found")
                }
            </CardsWrapper>
        </SearchContainer>
    )
}

export default SearchPage