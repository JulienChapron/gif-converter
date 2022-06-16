import { useState } from "react";
import { Grid, Button, LinearProgress } from "@mui/material";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import AutoFixHigh from "@mui/icons-material/AutoFixHigh";

const ffmpeg = createFFmpeg({
  corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
  log: true,
});
function ConvertToGifAndDownload(props) {
  const [loaderGif, setLoaderGif] = useState(false);
  const [gif, setGif] = useState("");
  const convertToGif = async () => {
    setLoaderGif(true)
    await ffmpeg.load();
    ffmpeg.FS("writeFile", "video1.webm", await fetchFile(props.urlVideo));
    await ffmpeg.run("-i", "video1.webm", "-t", "8", "output.gif");
    const data = ffmpeg.FS("readFile", "output.gif");
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );
    setGif(url);
    setLoaderGif(false)
  };
  return (
    <Grid container>
      <Grid sx={{ p: 2 }} item xs={12} sm={12} md={6} xl={6}>
        {!props.loaderVideo ? (
          props.urlVideo ? (
            <>
              <p>Uploaded video</p>
              <video src={props.urlVideo} width="100%" controls></video>
              <Button
                onClick={() => convertToGif()}
                variant="contained"
                sx={{ mx: "auto", mt: 2 }}
              >
                <AutoFixHigh />convert
              </Button>
            </>
          ) : null
        ) : (
          <LinearProgress sx={{ mt: 5, mb: 5 }} />
        )}
      </Grid>
      <Grid sx={{ p: 2 }} item xs={12} sm={12} md={6} xl={6}>
        {!loaderGif ? (
          gif ? (
            <>
              <p>Converted .gif file</p>
              <img alt="gif" src={gif} width="100%"></img>
              <Button
                onClick={() => convertToGif()}
                variant="contained"
                sx={{ mx: "auto", mt: 2 }}
              >
                download
              </Button>
            </>
          ) : null
        ) : (
          <LinearProgress sx={{ mt: 5, mb: 5 }} />
        )}
      </Grid>
    </Grid>
  );
}

export default ConvertToGifAndDownload;
