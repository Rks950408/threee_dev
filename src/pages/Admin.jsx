import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Grid,
  Container,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  IconButton,
  Divider,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import ArticleIcon from "@mui/icons-material/Article";
import FlightIcon from "@mui/icons-material/Flight";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import BrushIcon from "@mui/icons-material/Brush";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

// Admin Component
const Admin = () => {
  // State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Home page content state
  const [popupContent, setPopupContent] = useState({
    title: "UPCOMING RETREAT",
    content: "Join us for a transformative experience in the heart of India.",
    image: "/images/gallery/shakti.png",
  });

  const [aboutSection, setAboutSection] = useState({
    title: "ABOUT US",
    paragraph1:
      "Three Degrees East was born from a shared desire to reconnect — with self, with nature, and with India's deep-rooted traditions. We create soulful journeys that honour the sacred and celebrate the simple.",
    paragraph2:
      "Led by women and guided by purpose, our retreats offer more than escape — they invite transformation. With every step, chant, or meal, we hold space for reflection, healing, and the joy of rediscovery.",
  });

  const [travelSection, setTravelSection] = useState({
    title: "TRAVEL",
    paragraph1:
      "India isn't just a destination — it's a deep exhale for your soul. Beyond the postcard-perfect Taj Mahal and colourful clichés, this is where ancient wisdom meets modern awakening. From Himalayan sunrises that still the mind to temple bells that stir the heart, every corner invites you to slow down, breathe deeper, and reconnect.",
    paragraph2:
      "Here, wellness isn't a trend — it's a way of life passed down through centuries of yoga, Ayurveda, and spiritual practice. Come for the culture, stay for the transformation. India doesn't just change your view — it changes you.",
  });

  const [heroSection, setHeroSection] = useState({
    image: "/images/gallery/1.jpg",
  });

  const [overflowSection, setOverflowSection] = useState({
    title1: "Music, Wind, Spirit Flow",
    title2: "Sounds Of India",
    description: "Mantra-Ghanta-Kirtan-Drizzle-Conch",
    image: "/images/gallery/6.jpg",
  });

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Add a loading state to track when content is being fetched
  const [contentLoaded, setContentLoaded] = useState(false);

  // Check if user is logged in and fetch content on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setIsLoggedIn(true);
      fetchContent();
    }
  }, []);

  // Fetch content from API
  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5001/api/content");
      if (response.data) {
        const content = response.data;
        setPopupContent(
          content.popup || {
            title: "UPCOMING RETREAT",
            content:
              "Join us for a transformative experience in the heart of India.",
            image: "/images/gallery/shakti.png",
          }
        );
        setAboutSection(
          content.about || {
            title: "ABOUT US",
            paragraph1:
              "Three Degrees East was born from a shared desire to reconnect...",
            paragraph2:
              "Led by women and guided by purpose, our retreats offer more than escape...",
          }
        );
        setTravelSection(
          content.travel || {
            title: "TRAVEL",
            paragraph1:
              "India isn't just a destination — it's a deep exhale for your soul...",
            paragraph2:
              "Here, wellness isn't a trend — it's a way of life passed down through centuries...",
          }
        );
        setHeroSection(
          content.hero || {
            image: "/images/gallery/1.jpg",
          }
        );
        setOverflowSection(
          content.overflow || {
            title1: "Music, Wind, Spirit Flow",
            title2: "Sounds Of India",
            description: "Mantra-Ghanta-Kirtan-Drizzle-Conch",
            image: "/images/gallery/6.jpg",
          }
        );
        setContentLoaded(true);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      showAlert("Failed to load content. Please try again.", "error");
      // Set default values if fetch fails
      setContentLoaded(true);
    } finally {
      setLoading(false);
    }
  };

  // Show alert message
  const showAlert = (message, severity = "success") => {
    setAlert({
      open: true,
      message,
      severity,
    });
  };

  // Handle alert close
  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Call the login API
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        { email, password }
      );

      // If login successful, save user to localStorage
      if (response.data.token) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email,
            token: response.data.token,
          })
        );
        setIsLoggedIn(true);
        fetchContent();
      }
    } catch (error) {
      console.error("Login error:", error);
      // For demo purposes - fallback to hardcoded login if API fails
      if (email === "admin@example.com" && password === "password") {
        localStorage.setItem("user", JSON.stringify({ email }));
        setIsLoggedIn(true);
        fetchContent();
      } else {
        showAlert("Login failed: Invalid credentials", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            name,
            email,
            token: response.data.token,
          })
        );
        setIsLoggedIn(true);
        fetchContent(); // optional redirection or data load
      }
    } catch (error) {
      console.error("Registration error:", error);
      showAlert(
        "Registration failed: " +
          (error.response?.data?.message || "Something went wrong"),
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  // Dialog handlers
  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFile(null);
    setPreviewUrl("");
  };

  // Content update handlers
  const handleSavePopup = async () => {
    try {
      setLoading(true);
      await axios.put("http://localhost:5001/api/content/popup", popupContent, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.token || ""
          }`,
        },
      });
      showAlert("Popup content updated successfully!");
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating popup content:", error);
      showAlert("Failed to update popup content", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAbout = async () => {
    try {
      setLoading(true);
      await axios.put("http://localhost:5001/api/content/about", aboutSection, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.token || ""
          }`,
        },
      });
      showAlert("About section updated successfully!");
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating about section:", error);
      showAlert("Failed to update about section", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTravel = async () => {
    try {
      setLoading(true);
      await axios.put(
        "http://localhost:5001/api/content/travel",
        travelSection,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.token || ""
            }`,
          },
        }
      );
      showAlert("Travel section updated successfully!");
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating travel section:", error);
      showAlert("Failed to update travel section", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveHero = async () => {
    try {
      setLoading(true);
      await axios.put("http://localhost:5001/api/content/hero", heroSection, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.token || ""
          }`,
        },
      });
      showAlert("Hero image updated successfully!");
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating hero section:", error);
      showAlert("Failed to update hero image", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveOverflow = async () => {
    try {
      setLoading(true);
      await axios.put(
        "http://localhost:5001/api/content/overflow",
        overflowSection,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.token || ""
            }`,
          },
        }
      );
      showAlert("Sacred Sounds section updated successfully!");
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating overflow section:", error);
      showAlert("Failed to update Sacred Sounds section", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection for image uploads
  const handleFileSelect = (e, sectionType) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target.result);

        // For immediate preview without upload
        if (sectionType === "hero") {
          setHeroSection({ ...heroSection, image: event.target.result });
        } else if (sectionType === "popup") {
          setPopupContent({ ...popupContent, image: event.target.result });
        } else if (sectionType === "overflow") {
          setOverflowSection({
            ...overflowSection,
            image: event.target.result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image uploads to server (commented out since we're using local preview)
  // This will be used when API functionality is implemented
  // eslint-disable-next-line no-unused-vars
  const handleImageUpload = async (sectionType) => {
    if (!selectedFile) return;

    try {
      setLoading(true);

      // Create form data for file upload
      const formData = new FormData();
      formData.append("image", selectedFile);

      // Example API call (currently commented out)
      /*
      const response = await axios.post('http://localhost:5001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token || ''}`
        }
      });
      
      const imageUrl = response.data.url;
      
      // Update the appropriate section with the new image URL
      if (sectionType === 'hero') {
        setHeroSection({...heroSection, image: imageUrl});
      } else if (sectionType === 'popup') {
        setPopupContent({...popupContent, image: imageUrl});
      } else if (sectionType === 'overflow') {
        setOverflowSection({...overflowSection, image: imageUrl});
      }
      */

      // For now, we'll just use the preview URL
      showAlert("Image updated successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      showAlert("Failed to upload image", "error");
    } finally {
      setLoading(false);
    }
  };

  // Login Form
  const renderLoginForm = () => (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        maxWidth: "500px",
        mx: "auto",
        mt: 5,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "white",
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
        Admin Login
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        sx={{ mb: 3 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ py: 1.5 }}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </Box>
  );

  // register
  const renderRegisterForm = () => (
    <Box
      component="form"
      onSubmit={handleRegister}
      sx={{
        maxWidth: "500px",
        mx: "auto",
        mt: 5,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "white",
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
        Register
      </Typography>

      <TextField
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        sx={{ mb: 3 }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ py: 1.5 }}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </Button>
    </Box>
  );

  // Admin Dashboard
  const renderDashboard = () => {
    if (loading && !contentLoaded) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading content...</Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ width: "100%", position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          {/* Admin Console text removed */}
          {/* Logout button removed */}
        </Box>

        {/* Alert for server payload size issue */}
        <Alert severity="info" sx={{ mb: 3 }}>
          Note: When uploading large images, you may encounter "request entity
          too large" errors. Try using compressed images under 1MB.
        </Alert>

        {/* Home Page Content Management */}
        <Typography variant="h5" sx={{ mb: 3, mt: 3, fontWeight: 500 }}>
          Home Page Content Management
        </Typography>

        <Paper sx={{ mb: 4, p: 3, bgcolor: "#FAF3EF" }}>
          <Grid container spacing={3}>
            {/* Popup Management Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={1}
                sx={{
                  bgcolor: "white",
                  borderRadius: "8px",
                  overflow: "hidden",
                  height: 280,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <AnnouncementIcon sx={{ fontSize: 36, color: "#D07850" }} />
                  </Box>
                  <Typography variant="h6" gutterBottom noWrap>
                    Popup Content
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      height: "40px",
                    }}
                  >
                    Edit the popup that appears when visitors first arrive on
                    your website.
                  </Typography>
                  <Box sx={{ mt: "auto" }}>
                    {popupContent && (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle2" sx={{ mr: 1 }}>
                          Current title:
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                          sx={{ maxWidth: "120px" }}
                        >
                          {popupContent.title}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    borderTop: "1px solid #f0f0f0",
                    p: 2,
                    bgcolor: "#fafafa",
                    height: "52px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    size="small"
                    onClick={() => handleOpenDialog("popup")}
                    sx={{
                      color: "#D07850",
                      "&:hover": {
                        bgcolor: "rgba(208, 120, 80, 0.1)",
                      },
                    }}
                    startIcon={<EditIcon />}
                  >
                    Edit Popup
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Hero Section Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={1}
                sx={{
                  bgcolor: "white",
                  borderRadius: "8px",
                  overflow: "hidden",
                  height: 280,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <ImageIcon sx={{ fontSize: 36, color: "#D07850" }} />
                  </Box>
                  <Typography variant="h6" gutterBottom noWrap>
                    Hero Image
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      height: "40px",
                    }}
                  >
                    Change the main hero image that appears at the top of your
                    home page.
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                </Box>
                <Box
                  sx={{
                    borderTop: "1px solid #f0f0f0",
                    p: 2,
                    bgcolor: "#fafafa",
                    height: "52px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    size="small"
                    onClick={() => handleOpenDialog("hero")}
                    sx={{
                      color: "#D07850",
                      "&:hover": {
                        bgcolor: "rgba(208, 120, 80, 0.1)",
                      },
                    }}
                    startIcon={<EditIcon />}
                  >
                    Edit Hero Image
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* About Section Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={1}
                sx={{
                  bgcolor: "white",
                  borderRadius: "8px",
                  overflow: "hidden",
                  height: 280,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <SpeakerNotesIcon sx={{ fontSize: 36, color: "#D07850" }} />
                  </Box>
                  <Typography variant="h6" gutterBottom noWrap>
                    About Section
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      height: "40px",
                    }}
                  >
                    Update the About Us section content displayed on the home
                    page.
                  </Typography>
                  <Box sx={{ mt: "auto" }}>
                    {aboutSection && (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle2" sx={{ mr: 1 }}>
                          Current title:
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                          sx={{ maxWidth: "120px" }}
                        >
                          {aboutSection.title}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    borderTop: "1px solid #f0f0f0",
                    p: 2,
                    bgcolor: "#fafafa",
                    height: "52px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    size="small"
                    onClick={() => handleOpenDialog("about")}
                    sx={{
                      color: "#D07850",
                      "&:hover": {
                        bgcolor: "rgba(208, 120, 80, 0.1)",
                      },
                    }}
                    startIcon={<EditIcon />}
                  >
                    Edit About Section
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Travel Section Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={1}
                sx={{
                  bgcolor: "white",
                  borderRadius: "8px",
                  overflow: "hidden",
                  height: 280,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <FlightIcon sx={{ fontSize: 36, color: "#D07850" }} />
                  </Box>
                  <Typography variant="h6" gutterBottom noWrap>
                    Travel Section
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      height: "40px",
                    }}
                  >
                    Update the Travel section content displayed on the home
                    page.
                  </Typography>
                  <Box sx={{ mt: "auto" }}>
                    {travelSection && (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle2" sx={{ mr: 1 }}>
                          Current title:
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                          sx={{ maxWidth: "120px" }}
                        >
                          {travelSection.title}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    borderTop: "1px solid #f0f0f0",
                    p: 2,
                    bgcolor: "#fafafa",
                    height: "52px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    size="small"
                    onClick={() => handleOpenDialog("travel")}
                    sx={{
                      color: "#D07850",
                      "&:hover": {
                        bgcolor: "rgba(208, 120, 80, 0.1)",
                      },
                    }}
                    startIcon={<EditIcon />}
                  >
                    Edit Travel Section
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Sacred Sounds Section Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={1}
                sx={{
                  bgcolor: "white",
                  borderRadius: "8px",
                  overflow: "hidden",
                  height: 280,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <BrushIcon sx={{ fontSize: 36, color: "#D07850" }} />
                  </Box>
                  <Typography variant="h6" gutterBottom noWrap>
                    Sacred Sounds Section
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      height: "40px",
                    }}
                  >
                    Update the Sacred Sounds overflow section content.
                  </Typography>
                  <Box sx={{ mt: "auto" }}>
                    {overflowSection && (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle2" sx={{ mr: 1 }}>
                          Current title:
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                          sx={{ maxWidth: "120px" }}
                        >
                          {overflowSection.title2}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    borderTop: "1px solid #f0f0f0",
                    p: 2,
                    bgcolor: "#fafafa",
                    height: "52px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    size="small"
                    onClick={() => handleOpenDialog("overflow")}
                    sx={{
                      color: "#D07850",
                      "&:hover": {
                        bgcolor: "rgba(208, 120, 80, 0.1)",
                      },
                    }}
                    startIcon={<EditIcon />}
                  >
                    Edit Sounds Section
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        {/* Content Edit Dialogs */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {dialogType === "popup" && "Edit Popup Content"}
            {dialogType === "hero" && "Change Hero Image"}
            {dialogType === "about" && "Edit About Section"}
            {dialogType === "travel" && "Edit Travel Section"}
            {dialogType === "overflow" && "Edit Sacred Sounds Section"}
          </DialogTitle>
          <DialogContent dividers>
            {/* Popup Content Form */}
            {dialogType === "popup" && popupContent && (
              <Box sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  label="Title"
                  value={popupContent.title || ""}
                  onChange={(e) =>
                    setPopupContent({ ...popupContent, title: e.target.value })
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Content"
                  value={popupContent.content || ""}
                  onChange={(e) =>
                    setPopupContent({
                      ...popupContent,
                      content: e.target.value,
                    })
                  }
                  margin="normal"
                  multiline
                  rows={4}
                />
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Featured Image
                  </Typography>
                  <Box
                    sx={{
                      border: "1px dashed #ccc",
                      borderRadius: 1,
                      py: 2,
                      px: 1,
                      mb: 2,
                      height: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {popupContent.image ? (
                      <img
                        src={popupContent.image}
                        alt="Popup Image"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "180px",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No image selected
                      </Typography>
                    )}
                  </Box>
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      backgroundColor: "#D07850",
                      "&:hover": {
                        backgroundColor: "#a54825",
                      },
                    }}
                  >
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => handleFileSelect(e, "popup")}
                    />
                  </Button>
                </Box>
              </Box>
            )}

            {/* Hero Image Form */}
            {dialogType === "hero" && heroSection && (
              <Box sx={{ pt: 2, textAlign: "center" }}>
                <Box
                  sx={{
                    border: "1px dashed #ccc",
                    borderRadius: 1,
                    py: 2,
                    px: 1,
                    mb: 2,
                    height: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Hero Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "280px",
                        borderRadius: "4px",
                      }}
                    />
                  ) : heroSection.image ? (
                    <img
                      src={heroSection.image}
                      alt="Current Hero"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "280px",
                        borderRadius: "4px",
                      }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No image selected
                    </Typography>
                  )}
                </Box>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    backgroundColor: "#D07850",
                    "&:hover": {
                      backgroundColor: "#a54825",
                    },
                  }}
                >
                  Upload New Hero Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, "hero")}
                  />
                </Button>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 2 }}
                >
                  Recommended size: 1920 x 1080 pixels
                </Typography>
              </Box>
            )}

            {/* About Section Form */}
            {dialogType === "about" && aboutSection && (
              <Box sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  label="Title"
                  value={aboutSection.title || ""}
                  onChange={(e) =>
                    setAboutSection({ ...aboutSection, title: e.target.value })
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="First Paragraph"
                  value={aboutSection.paragraph1 || ""}
                  onChange={(e) =>
                    setAboutSection({
                      ...aboutSection,
                      paragraph1: e.target.value,
                    })
                  }
                  margin="normal"
                  multiline
                  rows={4}
                />
                <TextField
                  fullWidth
                  label="Second Paragraph"
                  value={aboutSection.paragraph2 || ""}
                  onChange={(e) =>
                    setAboutSection({
                      ...aboutSection,
                      paragraph2: e.target.value,
                    })
                  }
                  margin="normal"
                  multiline
                  rows={4}
                />
              </Box>
            )}

            {/* Travel Section Form */}
            {dialogType === "travel" && travelSection && (
              <Box sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  label="Title"
                  value={travelSection.title || ""}
                  onChange={(e) =>
                    setTravelSection({
                      ...travelSection,
                      title: e.target.value,
                    })
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="First Paragraph"
                  value={travelSection.paragraph1 || ""}
                  onChange={(e) =>
                    setTravelSection({
                      ...travelSection,
                      paragraph1: e.target.value,
                    })
                  }
                  margin="normal"
                  multiline
                  rows={4}
                />
                <TextField
                  fullWidth
                  label="Second Paragraph"
                  value={travelSection.paragraph2 || ""}
                  onChange={(e) =>
                    setTravelSection({
                      ...travelSection,
                      paragraph2: e.target.value,
                    })
                  }
                  margin="normal"
                  multiline
                  rows={4}
                />
              </Box>
            )}

            {/* Sacred Sounds Section Form */}
            {dialogType === "overflow" && overflowSection && (
              <Box sx={{ pt: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      label="Title Line 1"
                      value={overflowSection.title1 || ""}
                      onChange={(e) =>
                        setOverflowSection({
                          ...overflowSection,
                          title1: e.target.value,
                        })
                      }
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      label="Title Line 2"
                      value={overflowSection.title2 || ""}
                      onChange={(e) =>
                        setOverflowSection({
                          ...overflowSection,
                          title2: e.target.value,
                        })
                      }
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      label="Description"
                      value={overflowSection.description || ""}
                      onChange={(e) =>
                        setOverflowSection({
                          ...overflowSection,
                          description: e.target.value,
                        })
                      }
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Background Image
                      </Typography>
                      <Box
                        sx={{
                          border: "1px dashed #ccc",
                          borderRadius: 1,
                          py: 2,
                          px: 1,
                          mb: 2,
                          height: "200px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            style={{
                              maxWidth: "100%",
                              maxHeight: "180px",
                              borderRadius: "4px",
                            }}
                          />
                        ) : overflowSection.image ? (
                          <img
                            src={overflowSection.image}
                            alt="Current Image"
                            style={{
                              maxWidth: "100%",
                              maxHeight: "180px",
                              borderRadius: "4px",
                            }}
                          />
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            No image selected
                          </Typography>
                        )}
                      </Box>
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        sx={{
                          backgroundColor: "#D07850",
                          "&:hover": {
                            backgroundColor: "#a54825",
                          },
                        }}
                      >
                        Upload Image
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => handleFileSelect(e, "overflow")}
                        />
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={
                dialogType === "popup"
                  ? handleSavePopup
                  : dialogType === "about"
                  ? handleSaveAbout
                  : dialogType === "travel"
                  ? handleSaveTravel
                  : dialogType === "hero"
                  ? handleSaveHero
                  : handleSaveOverflow
              }
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: "#D07850",
                "&:hover": {
                  backgroundColor: "#a54825",
                },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Save"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Alert Snackbar */}
        <Snackbar
          open={alert.open}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleAlertClose}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>

        {/* Floating Logout Button */}
        {isLoggedIn && (
          <Fab
            color="primary"
            aria-label="logout"
            onClick={handleLogout}
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              bgcolor: "custom.terracotta",
              "&:hover": {
                bgcolor: "custom.red",
              },
            }}
          >
            <LogoutIcon />
          </Fab>
        )}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#FAF3EF",
        py: 4,
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        {isLoggedIn ? renderDashboard() : renderLoginForm()}
      </Container>
    </Box>
  );
};

export default Admin;
