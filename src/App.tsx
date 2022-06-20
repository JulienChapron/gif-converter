import { useState } from "react";
import Header from "./components/Header.tsx";
import Snackbar from "./components/Snackbar.tsx";
import ButtonUploadVideo from "./components/ButtonUploadVideo.tsx";
import ConvertToGifAndDownload from "./components/ConvertToGifAndDownload.tsx";
import { Box } from "@mui/material";

function App() {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [loaderVideo, setLoaderVideo] = useState(false);
  const [urlVideo, setUrlVideo] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    severity: "success",
    message: "top",
  });

  return (
    <>
      <Header />
      <Snackbar setOpenSnackbar={setOpenSnackbar} openSnackbar={openSnackbar} />
      <Box
        sx={{
          marginTop: 1,
          padding: 3,
          boxShadow: 5,
          mx: "auto",
        }}
      >
        <ConvertToGifAndDownload
          loaderVideo={loaderVideo}
          urlVideo={urlVideo}
          fileSize={fileSize}
          fileName={fileName}
        />

        {urlVideo ? null : (
          <ButtonUploadVideo
            setFileName={setFileName}
            setFileSize={setFileSize}
            setLoaderVideo={setLoaderVideo}
            setUrlVideo={setUrlVideo}
            setOpenSnackbar={setOpenSnackbar}
          />
        )}
      </Box>
    </>
  );
}

export default App;
