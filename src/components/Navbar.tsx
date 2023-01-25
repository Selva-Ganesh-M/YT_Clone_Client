import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { getCurrentUser } from "../redux/slices/userSlice";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { signOut } from "../redux/slices/userSlice";
import { useEffect } from "react";


// React styled components
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



// React functional component
type Props = {}

const Navbar = (props: Props) => {
    // delcaration
    const user = useSelector(getCurrentUser)
    const dispatch = useDispatch()

    // functions
    const handleSignOut = () => {
        dispatch(signOut())
    }

    // side-effects 
    useEffect(() => {
        console.log("Navbar sideeffect.");
        console.log(user);
    }, [user])

    // actual rendering
    return (
        <NavbarContainer>
            <Wrapper>
                <div></div>
                <Search>
                    <Input />
                    <SearchOutlinedIcon style={{ cursor: "pointer" }} />
                </Search>
                {
                    user.details ? (
                        <User>
                            <VideoCallOutlinedIcon />
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