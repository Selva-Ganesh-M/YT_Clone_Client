import styled, { ThemeProvider } from "styled-components"
import Menu from './components/Menu'
import Navbar from "./components/Navbar"
import { darkTheme, lightTheme } from "./utils/Theme"
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home, { EHomeType } from "./pages/HomePage";
import Video from "./pages/VideoPage";
import SignIn from "./pages/SignIn";


const Container = styled.div`
display: flex;

`
const Main = styled.div`
flex: 7;
background-color: ${({ theme }) => theme.bg};
color: ${({ theme }) => theme.text};
`
const Content = styled.div`

`

export enum EMode {
  dark = "dark",
  light = "light"
}


type Props = {}

const App = (props: Props) => {
  const [mode, setMode] = useState<EMode>(EMode.dark)
  return (
    <ThemeProvider theme={mode == EMode.dark ? darkTheme : lightTheme}>
      <Container>
        <Router>
          <Menu mode={mode} setMode={setMode} />
          <Main>
            <Navbar />
            {/* Routes */}
            <Routes>
              <Route path="/">
                <Route index element={<Home type={EHomeType.random} />} />
                <Route path="/trend" element={<Home type={EHomeType.trend} />} />
                <Route path="/subscribed" element={<Home type={EHomeType.subscribed} />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="video">
                  <Route index element={<Navigate to="/" />} />
                  <Route path=":id" element={<Video />} />
                </Route>
              </Route>
            </Routes>
          </Main>
        </Router>
      </Container>
    </ThemeProvider>
  )
}

export default App