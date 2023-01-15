import React from 'react'
import styled from 'styled-components'

type Props = {}

const CommentContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
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

const Comment = (props: Props) => {
    return (
        <CommentContainer>
            <Image />
            <Content>
                <NameAndTime>
                    <Name>
                        Selva
                    </Name>
                    <Time>
                        1 hour ago
                    </Time>
                </NameAndTime>
                <Message>
                    This is the comment.
                </Message>
            </Content>
        </CommentContainer>
    )
}

export default Comment