import React from "react";
import {
  Box, LinearProgress,
  Snackbar,
  Typography
} from "@mui/material";
import Alert from "@mui/material/Alert";

export function Title() {
  return <Typography variant="h4" gutterBottom>
    Patients List
  </Typography>;
}
export function ErrorState({ error }) {
  return <Snackbar
    open={!!error}
    autoHideDuration={4000}
    onClose={() => null}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <Alert severity="error">{(error && error.message) || error}</Alert>
  </Snackbar>;
}
export function Loader({ loading }) {
  return loading && (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
}
