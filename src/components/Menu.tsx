import styled from 'styled-components'
import YTLogo from "../assets/logo.png"
export const LogoImg = YTLogo
import { Link, useNavigate } from "react-router-dom"
// Icon Imports
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { EMode } from '../App';
import { useSelector } from "react-redux";
import { getCurrentUser } from '../redux/slices/userSlice';

// styled components
const MenuContainer = styled.div`
    height: 100vh;
    flex:1;
    background-color: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.text};
    position:sticky;
    top: 0;
    overflow: hidden;
    &:hover {
        overflow-y: scroll;
        ::-webkit-scrollbar{
            width: 5px;
            background-color: #333;
        };
        ::-webkit-scrollbar-thumb {
      background: #777;
    }
    }
`

const Wrapper = styled.div`
    padding: 18px 15px;
`

const Logo = styled.div`
    display: flex;
    align-items:center;
    gap: 5px;
    font-weight: bold;
    margin-bottom: 25px;
`
const Img = styled.img`
    height: 25px;
`
const Item = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
    padding: 7.5px 5px;
    &:hover {
      background-color: ${({ theme }) => theme.soft}
    }
`

const Hr = styled.hr`
    margin: 5px 0px;
    border: ${({ theme }) => theme.hrSize} solid ${({ theme }) => theme.soft};
`

const Login = styled.div`
    padding: 5px 0 10px 0;
`

const Title = styled.h2`
margin-top: 15px;
    font-size: 14px;
    font-weight: 500;
    color: #aaaaaa;
    margin-bottom: 10px;
`

export const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 15px;
    border-radius: 3px;
    font-weight:500;
    border: 1px solid #3ea6ff;
    background: transparent;
    color: #3ea6ff;
    margin-top: 10px;
    cursor:pointer;
`

// ts types
type Props = {
  setMode: (value: EMode) => void,
  mode: EMode,
}


// React functional component
const Menu = ({ setMode, mode }: Props) => {
  // declarations
  const user = useSelector(getCurrentUser)
  const navigate = useNavigate()

  // jsx rendering
  return (
    <MenuContainer>
      <Wrapper>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", color: 'inherit' }}>
          <Logo>
            <Img src={YTLogo} alt="YT-clone-logo" />
            <span>YT Clone</span>
          </Logo>
        </Link>

        {/* Items List */}
        <Item onClick={() => {
          if (mode === EMode.dark) {
            setMode(EMode.light)
          } else {
            setMode(EMode.dark)
          }
        }
        }>
          <SettingsBrightnessOutlinedIcon />
          {mode === EMode.dark ? "Light Mode" : "Dark Mode"}
        </Item>
        <Item onClick={() => navigate("/")} >
          <HomeIcon />
          Home
        </Item>
        <Item onClick={() => navigate("/")}  >
          <ExploreOutlinedIcon />
          Explore
        </Item>
        {/* subcribed user videos */}
        <Link to="/subs" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item style={{ color: "#999" }}>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item style={{ color: "#999" }}>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Hr />
        {/* Login Section */}
        {
          !user.details && (<>

            <Link to="/signin" style={{ textDecoration: "none", color: "inherit" }}>
              <Login>
                Sign in to like videos, comment, and subscribe
                <Button>
                  <AccountCircleOutlinedIcon />
                  Sign In
                </Button>
              </Login>
            </Link>
            <Hr /></>
          )
        }
        {/* Title     */}
        <Title>
          Best Of YT Clone
        </Title>
        <Item style={{ color: "#999" }} >
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Item style={{ color: "#999" }}>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        <Item style={{ color: "#999" }}>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item style={{ color: "#999" }}>
          <MovieOutlinedIcon />
          Movies
        </Item>
        <Item style={{ color: "#999" }}>
          <ArticleOutlinedIcon />
          News
        </Item>
        <Item style={{ color: "#999" }}>
          <LiveTvOutlinedIcon />
          Live
        </Item>
        <Hr />

        <Item style={{ color: "#999" }}>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item style={{ color: "#999" }}>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item style={{ color: "#999" }}>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
      </Wrapper>
    </MenuContainer>
  )
}

export default Menu