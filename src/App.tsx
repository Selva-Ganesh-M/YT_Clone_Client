import styled from "styled-components"
import Menu from './components/Menu'
import Navbar from "./components/Navbar"
const Container = styled.div`
display: flex;

`
const Main = styled.div`
flex: 7;
`
const Wrapper = styled.div`

`

type Props = {}

const App = (props: Props) => {
  return (
    <Container>
      <Menu />
      <Main>
        <Navbar />
        <Wrapper>
<div>
Video cards
</div>
        </Wrapper>
      </Main>
    </Container>
  )
}

export default App