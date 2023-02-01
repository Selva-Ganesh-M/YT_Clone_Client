import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { getCurrentUser } from "../redux/slices/userSlice";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { signOut } from "../redux/slices/userSlice";
import { useEffect, useState } from "react";
import { setModal } from "../redux/slices/modalSlice";
import { api } from "../api/api";
import { fetchVideoSuccess } from "../redux/slices/videoSlice";
import { TPayload, TVideos } from "../pages/HomePage";


//#region  React styled components
const NavbarContainer = styled.div`
padding: 0 10px;
position: sticky;
top: 0;
background-color: ${({ theme }) => theme.bgLighter};
height: 56px;
`;

const Wrapper = styled.div`
height: 100%;
display: flex;
align-items: center;
justify-content:space-between;
position: relative;
`;
const Search = styled.div`
padding: 0.3em;
width: 40%;
margin: auto;
border: 2px solid #333;
display: flex;
align-items: center;`;

const Input = styled.input`
background-color: inherit;
color: ${({ theme }) => theme.text};
flex: 1;
border: none;
&:focus {
    outline: none;
}
`;

const Button = styled.button`
align-self: center;
margin-bottom: 10px;
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
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-right: 20px;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const SignOut = styled.button`
border: none;
cursor: pointer;
color: ${({ theme }) => theme.text};
background-color: inherit;
font-weight: 500;
`

const UploadModal = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
`

//#endregion


// React functional component
type Props = {}

const Navbar = (props: Props) => {
    // delcaration
    const user = useSelector(getCurrentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // custom declarations
    const [search, setSearch] = useState<string>("")

    // functions
    const handleSignOut = () => {
        dispatch(signOut())
    }

    // side-effects 
    // const fetchSearchedVids = 

    // actual rendering
    return (
        <NavbarContainer>
            <Wrapper>
                <div></div>
                <Search>
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} />
                    <SearchOutlinedIcon style={{ cursor: "pointer" }} onClick={() => {
                        setSearch("")
                        navigate(`/search?src=${search}`)
                    }} />
                </Search>
                {
                    user.details ? (
                        <User>
                            <VideoCallOutlinedIcon onClick={() => dispatch(setModal())} />
                            <Avatar referrerPolicy="no-referrer" src={user.details.image} />
                            <SignOut onClick={handleSignOut}>
                                {user.details.username}
                            </SignOut>
                        </User>
                    ) : (
                        <Link to="/signin" style={{ textDecoration: "none", color: "inherit" }}>
                            <Button type="button">
                                <AccountCircleOutlinedIcon />
                                Sign In
                            </Button>
                        </Link>
                    )
                }
            </Wrapper>
        </NavbarContainer>
    )
}

export default Navbar