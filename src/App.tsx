import styled, { ThemeProvider } from "styled-components"
import Menu from './components/Menu'
import Navbar from "./components/Navbar"
import { darkTheme, lightTheme } from "./utils/Theme"
import {useState} from "react";


const Container = styled.div`
display: flex;

`
const Main = styled.div`
flex: 7;
background-color: ${({theme})=>theme.bg};
color: ${({theme})=>theme.text};
`
const Content = styled.div`

`

export enum EMode  {
  dark = "dark",
  light = "light"
}


type Props = {}

const App = (props: Props) => {
  const [mode, setMode] = useState<EMode>(EMode.dark)
  return (
    <ThemeProvider theme={mode==EMode.dark ? darkTheme : lightTheme}>

    <Container>
      <Menu mode={mode} setMode={setMode} />
      <Main>
        <Navbar />
        <Content>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
<div>
Video cards
</div>
        </Content>
      </Main>
    </Container>
    </ThemeProvider>
  )
}

export default App