import { async } from '@firebase/util'
import React, { useState, useEffect } from 'react'
import styled, { ThemeConsumer } from 'styled-components'
import { format } from 'timeago.js'
import { api } from '../api/api'
import { TPayload } from '../pages/HomePage'
import { TChannelUser } from './Card'

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

const LeftSide = styled.div`
    display: flex;
    gap: 10px;
`

const RightSide = styled.div``

const DeleteButton = styled.button`
    background-color: #333;
    padding: 0.5em 1em;
    border-radius: 0.25em;
    color: ${({ theme }) => theme.text};
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
//#endregion

const Comment = ({ comment }: Props) => {
    //#region : declarations

    //#endregion

    //#region : custom-declarations
    const [commentor, setCommentor] = useState<TChannelUser>()

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
                    <Message>
                        {comment?.content}
                    </Message>
                </Content>
            </LeftSide>
            <RightSide>
                <DeleteButton>
                    delete
                </DeleteButton>
            </RightSide>
        </CommentContainer>
    )
}

export default Comment