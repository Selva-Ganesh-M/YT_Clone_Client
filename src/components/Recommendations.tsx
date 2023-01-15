import styled from 'styled-components'
import Card from './Card'

type Props = {}

const RecommContainer = styled.div`
    flex: 2;
    padding: 0 1em;
`

const Recommendations = (props: Props) => {
    return <RecommContainer>
        <Card row={true} />
        <Card row={true} />
        <Card row={true} />
        <Card row={true} />
        <Card row={true} />
        <Card row={true} />
        <Card row={true} />
        <Card row={true} />
        <Card row={true} />
        <Card row={true} />
        <Card row={true} />
        <Card row={true} />
        <Card row={true} />
        <Card row={true} />
        <Card row={true} />
        <Card row={true} />
        <Card row={true} />
    </RecommContainer>

}

export default Recommendations