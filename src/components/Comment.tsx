import { async } from '@firebase/util'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { ThemeConsumer } from 'styled-components'
import { format } from 'timeago.js'
import { api } from '../api/api'
import { TPayload } from '../pages/HomePage'
import { TChannelUser } from './Card'
import { deleteComment as deleteCommentReducer } from '../redux/slices/commentSlice'
import { getCurrentUser } from '../redux/slices/userSlice'

export type TComment = {
    _id: string,
    userId: string,
    videoId: string,
    content: string,
    createdAT: Date,
    updatedAT: Date
}

type Props = {
    comment: TComment
}

// #region - styled components
const CommentContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
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
`

const LeftSide = styled.div`
    display: flex;
    gap: 10px;
    /* flex-grow:1; */
    width: 100%;
`

const RightSide = styled.div`
    display: flex;
    gap: 10px;
`

const DeleteButton = styled.button`
    background-color: ${({ theme }) => theme.soft};
    padding: 0.5em 1em;
    border-radius: 0.25em;
    color: ${({ theme }) => theme.text};
    border: none;
    box-shadow: 3px 3px 5px 0 rgba(0,0,0,0.3);
`

const Image = styled.img`
    width: 36px;
    height: 36px;
    background-color: #777;
    border-radius: 50%;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const deleteComment = styled.div`
    background-color: transparent;
`

const NameAndTime = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
`

const Name = styled.div`
font-size: 16px;
color: ${({ theme }) => theme.text};
`

const Time = styled.div`
font-size: 12px;
    color: #777;
`

const Message = styled.div`
color: ${({ theme }) => theme.text};
font-size: 14px;
`

const EditButton = DeleteButton
const UpdateButton = DeleteButton
//#endregion

const Comment = ({ comment }: Props) => {
    //#region : declarations
    const dispatch = useDispatch()
    const user = useSelector(getCurrentUser).details
    //#endregion

    //#region : custom-declarations
    const [commentor, setCommentor] = useState<TChannelUser>()
    const [content, setContent] = useState<string>(comment.content)
    const [isEditing, setIsEditing] = useState<Boolean>(false)
    //#endregion

    //#region : side-effects
    // fetch commentor
    useEffect(() => {
        if (comment) {
            (async () => {
                const res = await api.get<TPayload<TChannelUser>>(`/users/${comment.userId}`)
                if (res.statusText === "OK") {
                    setCommentor(res.data.payload)
                } else {
                    console.log("fetch commentor failed");
                }
            })()
        }

        return () => {
            setCommentor(undefined)
        }
    }, [comment])


    //#endregion

    //#region : functions
    // delete comment function
    const handleDeleteComment = async () => {
        const res = await api.delete(`/comments/${comment._id}`)
        if (res.statusText === "OK") {
            dispatch(deleteCommentReducer({ id: comment._id }))
        }
    }

    // update comment
    const handleUpdateComment = async () => {
        // update functionality
        setIsEditing(prev => !prev)
    }
    //#endregion

    //jsx rendering
    return (
        <CommentContainer>
            <LeftSide>
                <Image src={commentor?.image} alt="no" />
                <Content>
                    <NameAndTime>
                        <Name>
                            {commentor?.username}
                        </Name>
                        <Time>
                            {comment && format(comment.createdAT)}
                        </Time>
                    </NameAndTime>
                    {/* edit input box || comment content */}
                    {
                        isEditing ? (
                            <Input value={content} onChange={(e) => setContent(e.target.value)} placeholder='edit comment here...'>

                            </Input>
                        ) : (
                            <Message>
                                {content}
                            </Message>
                        )
                    }
                </Content>
            </LeftSide>
            {/* show this side only if the user is the owner of this comment */}
            {
                user && comment.userId === user._id && (
                    <RightSide>
                        {
                            isEditing ? (
                                <UpdateButton onClick={handleUpdateComment}>
                                    update
                                </UpdateButton>
                            ) : (
                                <EditButton onClick={() => setIsEditing(prev => !prev)} >
                                    Edit
                                </EditButton>
                            )
                        }
                        <DeleteButton onClick={handleDeleteComment}>
                            delete
                        </DeleteButton>
                    </RightSide>
                )
            }
        </CommentContainer>
    )
}

export default Comment