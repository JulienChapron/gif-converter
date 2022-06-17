import CloudUpload from "@mui/icons-material/CloudUpload";
import { Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

function ButtonUploadVideo(props) {
  const Input = styled("input")({
    display: "none",
  });
  const uploadVideo = async (e) => {
    try {
      props.setLoaderVideo(true);
      const file = e.target.files[0];
      if (file.size > 10000000) {
        props.setOpenSnackbar({
          open: true,
          severity: "error",
          message: "Error: video > 1mo",
        });
        props.setLoaderVideo(false);
        return;
      }
      props.setFileSize((file.size / 1024).toFixed(2));
      props.setUrlVideo(URL.createObjectURL(file));
      props.setOpenSnackbar({
        open: true,
        severity: "success",
        message: "video uploaded!",
      });
      props.setLoaderVideo(false);
    } catch (error) {
      props.setOpenSnackbar({
        open: true,
        severity: "error",
        message: "An error has been occured",
      });
      console.log("An error has been occured");
    }
  };
  return (
    <Container sx={{ textAlign: "center", mb: 5 }}>
      <Typography>Upload a video (maximum: 1mo)</Typography>
      <label htmlFor="contained-button-file">
        <Input
          accept="video/*"
          id="contained-button-file"
          type="file"
          onChange={(e) => uploadVideo(e)}
        />
        <Button
          sx={{ mt: 1 }}
          size="large"
          variant="contained"
          component="span"
        >
          <CloudUpload sx={{ fontSize: 48, mr: 1 }} />
          Upload a video ...
        </Button>
      </label>
    </Container>
  );
}
export default ButtonUploadVideo;
