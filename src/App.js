import "./App.css";
import {
  Typography,
  Box,
  Grid,
  // TextField,
  Input,
  InputAdornment,
  Button,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import MinimizeIcon from "@mui/icons-material/Minimize";
import SendIcon from "@mui/icons-material/Send";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import CreateIcon from "@mui/icons-material/Create";
import RichEditorExample from "./components/editor";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  boxShadow: ".5px 1px 25px .5px rgba(0, 0, 0, .3)",
};

function App() {
  const [is_FullScreen, setIs_FullScreen] = useState(false);

  const toggleModal = () => {
    setIs_FullScreen(!is_FullScreen);
  };

  const handleClose = () => setIs_FullScreen(false);

  return is_FullScreen ? (
    <div>
      <Modal
        open={is_FullScreen}
        onClose={handleClose}
        sx={{ borderRadius: "10px" }}
      >
        <Box sx={style}>
          <ComposeHeader
            showModal={toggleModal}
            modelView={is_FullScreen}
          />
          <InputArea modelView={is_FullScreen} />
          {/* <RichEditorExample /> */}
          {/* <BottomToolbar /> */}
        </Box>
      </Modal>
    </div>
  ) : (
    <div className="App">
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <ComposeHeader showModal={toggleModal} />
        <InputArea modelView={is_FullScreen} />
        {/* <BottomToolbar /> */}
      </Box>
    </div>
  );
}

export default App;

export const ComposeHeader = (props) => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: "#404040",
        padding: "5px 15px",
        alignItems: "center",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
      }}
    >
      <Grid item>
        <Typography color="white" fontSize="small">
          New Message
        </Typography>
      </Grid>
      <Grid item sx={{ flex: "1" }}></Grid>
      <Grid item>
        <MinimizeIcon
          sx={{
            color: "white",
            paddingBottom: "3px",
            fontSize: "1.6rem",
            cursor: "pointer",
          }}
        />
      </Grid>
      <Grid item>
        {props.modelView ? (
          <CloseFullscreenIcon
            onClick={props.showModal}
            sx={{
              color: "white",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          />
        ) : (
          <OpenInFullIcon
            onClick={props.showModal}
            sx={{
              color: "white",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          />
        )}
      </Grid>
      <Grid item>
        <CloseIcon
          sx={{
            color: "white",
            fontSize: "1.3rem",
            cursor: "pointer",
          }}
        />
      </Grid>
    </Grid>
  );
};

export const InputArea = (props) => {
  return (
    <Grid container direction={"column"}>
      <Grid item sx={{ margin: "1px 15px" }}>
        <Input
          placeholder="To"
          fullWidth={true}
          endAdornment={
            <InputAdornment position="start">
              Cc Bcc
            </InputAdornment>
          }
          sx={{
            fontSize: ".9rem",
            borderBottom: "1px solid #a9a9a9",
          }}
          disableUnderline
        />
      </Grid>
      <Grid item sx={{ margin: "1px 15px" }}>
        <Input
          placeholder="Subject"
          fullWidth={true}
          sx={{
            fontSize: ".9rem",
            borderBottom: "1px solid #a9a9a9",
          }}
          disableUnderline
        />
      </Grid>
      <Grid
        item
        sx={{
          margin: "0px 15px",
          fontSize: ".9rem",
        }}
      >
        <RichEditorExample />
      </Grid>
    </Grid>
  );
};

export const BottomToolbar = () => {
  return (
    <Grid
      container
      sx={{
        padding: "10px 15px",
        alignItems: "center",
      }}
    >
      <Grid item>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          size="small"
          sx={{ margin: "0 2px" }}
        >
          Send
        </Button>
      </Grid>
      <Grid item sx={{ margin: "0px 5px" }}>
        <FormatColorTextIcon
          sx={{
            color: "#72757A",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        />
      </Grid>
      <Grid item sx={{ margin: "0px 5px" }}>
        <AttachFileIcon
          sx={{
            color: "#72757A",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        />
      </Grid>
      {/* <Grid item></Grid> */}
      <Grid item sx={{ margin: "0px 5px" }}>
        <InsertLinkIcon
          sx={{
            color: "#72757A",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        />
      </Grid>
      <Grid item sx={{ margin: "0px 5px" }}>
        <InsertEmoticonIcon
          sx={{
            color: "#72757A",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        />
      </Grid>
      <Grid item sx={{ margin: "0px 5px" }}>
        <AddToDriveIcon
          sx={{
            color: "#72757A",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        />
      </Grid>
      <Grid item sx={{ margin: "0px 5px" }}>
        <InsertPhotoIcon
          sx={{
            color: "#72757A",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        />
      </Grid>
      <Grid item sx={{ margin: "0px 5px" }}>
        <CreateIcon
          sx={{
            color: "#72757A",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        />
      </Grid>
      <Grid item sx={{ flex: "1" }}></Grid>
      <Grid item sx={{ margin: "0px 5px" }}>
        <MoreVertIcon
          sx={{
            color: "#72757A",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        />
      </Grid>
      <Grid item sx={{ margin: "0px 5px" }}>
        <DeleteOutlineIcon
          sx={{
            color: "#72757A",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        />
      </Grid>
    </Grid>
  );
};
