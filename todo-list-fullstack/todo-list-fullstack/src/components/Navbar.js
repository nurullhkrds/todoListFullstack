import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  IconButton,
 
} from "@mui/material";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { searchFiltred } from "../redux/slice/todoSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));


 function Navbar() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [search, setSearch] = React.useState("");

  const handleHome = () => {
    navigate("/");
    navigate(0);
  };
  const goMyProfile=()=>{
    navigate("/myprofile")
    navigate(0);
  }
  const outAccount=()=>{
    navigate("/login")
    navigate(0);
    localStorage.removeItem("token")
    localStorage.removeItem("currentUserId")
    localStorage.removeItem("currentUserName")
  }




  const handleSubmit =async()=>{
    if(search!==" "){
      await dispatch(searchFiltred(search));

    }
   

  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              onClick={handleHome}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Anasayfa
              </Typography>
            </Link>
          </div>
         <div style={{display:"flex"}}>
         <Search onSubmit={handleSubmit()}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Arama yap..."
                inputProps={{ "aria-label": "search" }}
                value={search}
              />
            </Search>
        

          {localStorage.getItem("token") ? (
            <div>
            
              <IconButton>
                <FaSignOutAlt onClick={()=>outAccount()}/>
              </IconButton>
              <IconButton onClick={()=>goMyProfile()} >
                <FaUserAlt />
              </IconButton>
            </div>
          ) : (
            <div>
              <Link to={"/login"}>
                <Button color="inherit">Login</Button>
              </Link>
            </div>
          )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default memo(Navbar)