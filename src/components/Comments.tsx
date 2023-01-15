import React from 'react'
import styled from 'styled-components'
import Comment from './Comment'

type Props = {}

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
`

const Comments = (props: Props) => {
    return (
        <CommentsContainer>
            <NewComment>
                <Image />
                <Input placeholder='add new comment here...' />
            </NewComment>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
        </CommentsContainer>
    )
}

export default Comments