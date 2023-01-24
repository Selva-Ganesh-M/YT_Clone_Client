import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"
import { getCurrentUser } from "../redux/slices/userSlice";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";


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
justify-content:flex-end;
position: relative;
`;
const Search = styled.div`
padding: 0.3em;
width: 40%;
margin: auto;
position: absolute;
border: 2px solid #333;
left: 0;
right: 0;
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


// React functional component
type Props = {}

const Navbar = (props: Props) => {
    // delcaration
    const user = useSelector(getCurrentUser)

    // actual rendering
    return (
        <NavbarContainer>
            <Wrapper>
                <Search>
                    <Input />
                    <SearchOutlinedIcon style={{ cursor: "pointer" }} />
                </Search>
                <Link to="/signin" style={{ textDecoration: "none", color: "inherit" }}>
                    {
                        user.details ? (
                            <User>
                                <VideoCallOutlinedIcon />
                                <Avatar />
                                {user.details.username}
                            </User>
                        ) : (
                            <Button type="button">
                                <AccountCircleOutlinedIcon />
                                Sign In
                            </Button>
                        )
                    }
                </Link>
            </Wrapper>
        </NavbarContainer>
    )
}

export default Navbar