import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { api } from '../api/api'
import { TPayload, TVideos } from '../pages/HomePage'
import { fetchVideoSuccess, getVideo } from '../redux/slices/videoSlice'
import Card from './Card'

type Props = {}

const RecommContainer = styled.div`
    flex: 2;
    padding: 0 1em;
`

const Recommendations = (props: Props) => {

    //#region : declarations
    const dispatch = useDispatch()
    const { currVideo } = useSelector(getVideo)
    //#endregion

    //#region : custom-declarations
    const [recommendedVids, setRecommendedVids] = useState<TVideos[]>([])
    //#endregion


    //#region : side-effects
    // get recommended vids
    useEffect(() => {
        currVideo && (
            async () => {
                if (!(currVideo.tags.length > 0)) {
                    return
                }
                const res = await api.get<TPayload<TVideos[]>>(`/videos/filter?tags=${currVideo.tags.join(",")}`)
                if (res.statusText === "OK") {
                    const content = res.data.payload.filter(item => item._id !== currVideo._id)
                    setRecommendedVids(() => {
                        console.log(content.map(item => item.title));
                        return content
                    })
                }
            }
        )()

        return () => {
            setRecommendedVids([])
        }
    }, [currVideo])

    //#endregion
    //#region : functions

    //#endregion

    //jsx rendering
    return <RecommContainer>
        {
            recommendedVids.length > 0 ? recommendedVids.map(video => (
                <Card row={true} video={video} key={video._id} />
            )) : "No Recommendations to show"
        }
    </RecommContainer>

}

export default Recommendations