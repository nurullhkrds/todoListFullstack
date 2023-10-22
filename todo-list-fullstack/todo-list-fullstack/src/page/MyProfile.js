import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  Modal,
  Radio,
  TextField,
} from "@mui/material";
import { MdEditSquare } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import { getOneByUserId, updateUserAsync, updateUserrAsync } from "../service";

const style = {
  
  position: "absolute",
  top: "50%",
  left: "50%",
  height: 250,
  overflow: "auto",
  transform: "translate(-50%, -50%)",
  width: 220,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  
};

function MyProfile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.userLogin);
  const currentUserStatus = useSelector((state) => state.user.userLoginStatus);

  //getOneUserByUserId
  useEffect(() => {
    if (currentUserStatus === "idle") {
      getCurrentUser();
    }
  }, [currentUserStatus]);

  const getCurrentUser = async () => {
    await dispatch(
      getOneByUserId(parseInt(localStorage.getItem("currentUserId")))
    );
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(updateUserAsync({ avatar: parseInt(selectedValue) }));
  };
  const [selectedValue, setSelectedValue] = useState();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  //updateUser
  const [userNamee, setUserNamee] = React.useState(currentUser?.userName);
  const [emaill, setEmaill] = React.useState(currentUser?.email);

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleSubmit=async()=>{
    await dispatch(updateUserrAsync({userName:userNamee,email:emaill}))
    setOpenEdit(false)
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "25px",
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          image={`/avatars/avatar${
            selectedValue ? selectedValue : currentUser?.avatar
          }.png`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {currentUser?.userName}
          </Typography>
          <Typography gutterBottom variant="p" component="div">
            {currentUser?.email}
          </Typography>
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleOpen} size="small">
            Avatarı Değiştir
          </Button>

          <IconButton onClick={handleOpenEdit}>
            <MdEditSquare />
          </IconButton>
        </CardActions>
      </Card>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <List dense>
                {[1, 2, 3, 4, 5, 6].map((key) => {
                  const labelId = `checkbox-list-secondary-label-${key}`;
                  return (
                    <ListItem key={key} button>
                      <CardMedia
                        style={{ maxWidth: 100 }}
                        component="img"
                        alt={`Avatar n°${key}`}
                        image={`/avatars/avatar${key}.png`}
                        title="User Avatar"
                      />
                      <ListItemSecondaryAction>
                        <Radio
                          edge="end"
                          value={key}
                          onChange={handleChange}
                          checked={"" + selectedValue === "" + key}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </Typography>
          </Box>
        </Modal>
      </div>

      <div>
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Kullanıcı Adı"
                  variant="standard"
                  value={userNamee}
                  onChange={(e) => setUserNamee(e.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  value={emaill}
                  onChange={(e) => setEmaill(e.target.value)}
                />
              </Box>
            </Typography>
            <div>
              <Button onClick={()=>setOpenEdit(false)} variant="red">Vazgeç</Button>
              <Button onClick={handleSubmit}>Güncelle</Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default MyProfile;
