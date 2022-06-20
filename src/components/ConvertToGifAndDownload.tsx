import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  LinearProgress,
  Typography,
  TextField,
} from "@mui/material";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import AutoFixHigh from "@mui/icons-material/AutoFixHigh";
import Download from "@mui/icons-material/Download";

const ffmpeg = createFFmpeg({
  corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
  log: true,
});
function ConvertToGifAndDownload(props) {
  const [loaderGif, setLoaderGif] = useState(false);
  const [gif, setGif] = useState("");
  const [duration, setDuration] = useState(0);
  const [nbFrames, setNbFrames] = useState(0);
  const convertToGif = async () => {
    setLoaderGif(true);
    await ffmpeg.load();
    ffmpeg.FS("writeFile", "video1.webm", await fetchFile(props.urlVideo));
    await ffmpeg.run(
      "-i",
      "video1.webm",
      "-t",
      `${duration}`,
      "-vframes",
      `${nbFrames}`,
      "output.gif"
    );
    const data = ffmpeg.FS("readFile", "output.gif");
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );
    setGif(url);
    setLoaderGif(false);
  };
  const getOptionsVideo = () => {
    if (document.getElementById("myvid")) {
      const myvid = document.getElementById("myvid");
      setDuration(Math.floor(myvid.duration));
      setNbFrames(Math.floor(myvid.duration) * 2);
    }
  };
  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };
  const onChangeNbFrames = (e) => {
    setNbFrames(e.target.value);
  };
  useEffect(() => {
    getOptionsVideo();
  }, [document.getElementById("myvid")]);
  return (
    <Grid container>
      <Grid sx={{ p: 2 }} item xs={12} sm={12} md={6} xl={6}>
        {!props.loaderVideo ? (
          props.urlVideo ? (
            <>
              <Typography sx={{ mb: 1 }} variant="h5">
                Uploaded video
              </Typography>
              <video
                id="myvid"
                src={props.urlVideo}
                width="100%"
                controls
              ></video>
              <TextField
                required
                defaultValue={0}
                error={isNaN(duration)}
                helperText={isNaN(duration) ? "Not a number" : " "}
                type="number"
                sx={{ mt: 1, width: "100px" }}
                label="duration in seconds"
                size="small"
                value={duration}
                onChange={(e) => {
                  onChangeDuration(e);
                }}
              />
              <TextField
                required
                defaultValue={0}
                error={isNaN(nbFrames)}
                helperText={isNaN(nbFrames) ? "Not a number" : " "}
                type="number"
                sx={{ ml: 1, mt: 1, width: "100px" }}
                label="number of frames"
                size="small"
                value={nbFrames}
                onChange={(e) => {
                  onChangeNbFrames(e);
                }}
              />
              <Button
                disabled={nbFrames && duration ? false : true}
                onClick={() => convertToGif()}
                variant="contained"
                sx={{ mt: 1, ml: 1 }}
              >
                <AutoFixHigh />
                convert
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
              <Typography sx={{ mb: 1 }} variant="h5">
                Converted .gif file
              </Typography>
              <img alt="gif" src={gif} width="100%"></img>
              <a
                href={gif}
                download={props.fileName + ".gif"}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" sx={{ mx: "auto", mt: 2 }}>
                  <Download />
                  download
                </Button>
              </a>
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
