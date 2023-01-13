import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const NavbarContainer = styled.div`
position: sticky;
top: 0;
background-color: ${({theme})=>theme.bgLighter};
height: 56px;
`;

const Wrapper = styled.div`
height: 100%;
display: flex;
align-items: center;
justify-content:space-between;
`;
const Search = styled.div`
display: flex;
align-items: center;`;
const Input = styled.input``;
const Button = styled.button`
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

type Props = {}

const Navbar = (props: Props) => {
  return (
    <NavbarContainer>
        <Wrapper>
            <Search>
                <Input />
                <SearchOutlinedIcon />
            </Search>
            <Button>
            <AccountCircleOutlinedIcon />
                Sign In
            </Button>
        </Wrapper>
    </NavbarContainer>
  )
}

export default Navbar