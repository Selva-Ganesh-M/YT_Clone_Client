import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { api } from '../api/api'
import { TPayload } from '../pages/HomePage'
import { addComment, getComments, removeComments, setComments } from '../redux/slices/commentSlice'
import { getCurrentUser } from '../redux/slices/userSlice'
import { getVideo } from '../redux/slices/videoSlice'
import Comment, { TComment } from './Comment'


// #region : styled-components

const CommentsContainer = styled.div`
margin: 10px 0;
display: flex;
flex-direction: column;
gap: 2em;
`

const NewComment = styled.div`
display: flex;
gap: 15px;
`

const Image = styled.img`
    width: 36px;
    height: 36px;
    background-color: #777;
    border-radius: 50%;
`

const Input = styled.input`
border: none;
border-bottom: 1px solid ${({ theme }) => theme.soft};
outline: none;
background: transparent;
width: 100%;
color: ${({ theme }) => theme.text};
&::placeholder {
    color: #777;
    font-size: 12px;
};
// #endregion
`

type Props = {}

const Comments = ({ }: Props) => {
    //#region : declarations
    const currentVideo = useSelector(getVideo).currVideo
    const comments = useSelector(getComments)
    const dispatch = useDispatch()
    const currentUser = useSelector(getCurrentUser).details
    const navigate = useNavigate()
    //#endregion

    //#region : custom-declarations
    const [content, setContent] = useState<string>("")
    //#endregion

    //#region : side-effects
    // fetch comments
    useEffect(() => {
        (async () => {
            console.log("fetching comments");

            const res = await api.get<TPayload<TComment[]>>(`/comments/${currentVideo._id}`)
            if (res.statusText === "OK") {
                dispatch(setComments(res.data.payload))
            } else {
                console.log("comments fetching failed.");
            }
        })()

        return () => {
            dispatch(removeComments)
        }
    }, [currentVideo])

    //#endregion

    //#region : functions
    // add new comment
    const handleNewComment = async () => {
        // if no user re-direct to signin page
        if (!currentUser) navigate("/signin")
        const res = await api.post<TPayload<TComment>>(`/comments/${currentVideo._id}`, { content })
        if (res.data.status === "success") {
            dispatch(addComment(res.data.payload))
            setContent("")
        }
    }

    //#endregion

    //jsx rendering
    return (
        <CommentsContainer>
            <NewComment>
                <Image src={currentUser?.image} />
                <Input value={content} onChange={(e) => setContent(e.target.value)} placeholder='add new comment here...' />
                <button onClick={handleNewComment}>Comment</button>
            </NewComment>
            {
                comments.map(comment => (
                    <Comment key={comment._id} comment={comment} />
                ))
            }

        </CommentsContainer>
    )
}

export default Comments