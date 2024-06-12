import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import "./registration.scss";

// Styled components
const RegistrationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
}));

const RegistrationForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const BackgroundImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  zIndex: -1,
}));

// const Registration = () => {
//   return (
//     <RegistrationContainer>
//       <BackgroundImage src="/path/to/your/image.jpg" alt="Background" />
//       <RegistrationForm>
//         <Typography variant="h5" component="h1" align="center">
//           Registration
//         </Typography>
//         <TextField label="Email" variant="outlined" />
//         <TextField label="Password" type="password" variant="outlined" />
//         <Box display="flex" alignItems="center">
//           <Button variant="contained" color="primary" sx={{ ml: "auto" }}>
//             Registrate
//           </Button>
//         </Box>
//         <Typography variant="body2" align="center">
//           OR
//         </Typography>
//         <Button
//           variant="outlined"
//           startIcon={<img src="/path/to/google-icon.png" alt="Google" />}
//         >
//           Google Login
//         </Button>
//         <Typography variant="body2" align="center">
//           Already have an account? <a href="/login">Login</a>
//         </Typography>
//       </RegistrationForm>
//     </RegistrationContainer>
//   );
// };

// const Registration = () => {
//   return (
//     <div className="container modal">
//       <div>
//         <img />
//       </div>
//       <div className="content">
//         <h2>Registration</h2>
//       </div>
//     </div>
//   );
// };

// export default Registration;
