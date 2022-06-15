import { useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Header from "./components/Header.tsx";
import Snackbar from "./components/Snackbar.tsx";
import { Box, TextField, LinearProgress, Grid, Button } from "@mui/material";
const ffmpeg = createFFmpeg({
  corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
  log: true,
});

function App() {
  const [fileSize, setFileSize] = useState("");
  const [loader, setLoader] = useState(false);
  const [urlVideo, setUrlVideo] = useState("");
  const [gif, setGif] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    severity: "success",
    message: "top",
  });

  const convertToGif = async () => {
    await ffmpeg.load();
    ffmpeg.FS("writeFile", "video1.webm", await fetchFile(urlVideo));
    await ffmpeg.run("-i", "video1.webm", "-t", "8", "output.gif");
    const data = ffmpeg.FS("readFile", "output.gif");
    console.log(data, "data");
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );
    setGif(url);
  };

  const uploadVideo = async (e) => {
    try {
      setLoader(true);
      const file = e.target.files[0];
      if (
        file.type === "video/webm" ||
        file.type === "video/mp4" ||
        file.type === "video/avi" ||
        file.type === "video/mpeg" ||
        file.type === "video/flv" ||
        file.type === "video/quicktime"
      ) {
        setFileSize((file.size / 1024).toFixed(2));
        setUrlVideo(URL.createObjectURL(file));
        setOpenSnackbar({
          open: true,
          severity: "success",
          message: "video uploaded!",
        });
      } else {
        setOpenSnackbar({
          open: true,
          severity: "error",
          message: "use format: avi, mpeg, webm, mp4, flv, mov",
        });
        setLoader(false);
        return;
      }
      setLoader(false);
    } catch (error) {
      console.log("An error has been occured");
    }
  };
  return (
    <>
      <Header />
      <Snackbar openSnackbar={openSnackbar} />
      <Box
        sx={{
          marginTop: 1,
          padding: 3,
          boxShadow: 5,
          mx: "auto",
        }}
      >
        {loader ? (
          <LinearProgress sx={{ mt: 5, mb: 5 }} />
        ) : urlVideo ? (
          <Grid container>
            <Grid sx={{ p: 2 }} item xs={12} sm={12} md={6} xl={6}>
              <p>video</p>
              <video src={urlVideo} width="100%" controls></video>
              <p>
                Size: {fileSize}
                {" ko"}
              </p>
              <Button
                onClick={() => convertToGif()}
                variant="outlined"
                sx={{ mx: "auto" }}
              >
                convert
              </Button>
            </Grid>
            <Grid sx={{ p: 2 }} item xs={12} sm={12} md={6} xl={6}>
              <p>gif</p>
              <img alt="gif" src={gif} width="100%"></img>
            </Grid>
          </Grid>
        ) : (
          <TextField
            type="file"
            sx={{ mx: "auto" }}
            onChange={(e) => uploadVideo(e)}
          />
        )}
      </Box>
    </>
  );
}

export default App;
