const express = require("express");
const mongoose = require("mongoose"); // ✅ Mongoose import added
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import routes
const authRoutes = require("./src/routes/auth.routes");
const galleryRoutes = require("./src/routes/gallery.routes");
const blogRoutes = require("./src/routes/blog.routes");
const travelRoutes = require("./src/routes/travel.routes");
const contentRoutes = require("./src/routes/content.routes");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/travel", travelRoutes);
app.use("/api/content", contentRoutes);

// Welcome route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ThreeDegree API" });
});

// Create initial content.json if it doesn't exist
const contentFilePath = path.join(__dirname, "../public/content.json");
if (!fs.existsSync(contentFilePath)) {
  const defaultContent = {
    popup: {
      title: "UPCOMING RETREAT",
      content: "Join us for a transformative experience in the heart of India.",
      image: "/images/gallery/shakti.png",
    },
    about: {
      title: "ABOUT US",
      paragraph1:
        "Three Degrees East was born from a shared desire to reconnect — with self, with nature, and with India's deep-rooted traditions. We create soulful journeys that honour the sacred and celebrate the simple.",
      paragraph2:
        "Led by women and guided by purpose, our retreats offer more than escape — they invite transformation. With every step, chant, or meal, we hold space for reflection, healing, and the joy of rediscovery.",
    },
    travel: {
      title: "TRAVEL",
      paragraph1:
        "India isn't just a destination — it's a deep exhale for your soul. Beyond the postcard-perfect Taj Mahal and colourful clichés, this is where ancient wisdom meets modern awakening. From Himalayan sunrises that still the mind to temple bells that stir the heart, every corner invites you to slow down, breathe deeper, and reconnect.",
      paragraph2:
        "Here, wellness isn't a trend — it's a way of life passed down through centuries of yoga, Ayurveda, and spiritual practice. Come for the culture, stay for the transformation. India doesn't just change your view — it changes you.",
    },
    hero: {
      image: "/images/gallery/1.jpg",
    },
    overflow: {
      title1: "Music, Wind, Spirit Flow",
      title2: "Sounds Of India",
      description: "Mantra-Ghanta-Kirtan-Drizzle-Conch",
      image: "/images/gallery/6.jpg",
    },
  };

  fs.writeFileSync(contentFilePath, JSON.stringify(defaultContent, null, 2));
  console.log("✅ Created default content.json file");
}

// MongoDB URI and connection
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://rahuldev950408:32caKWjM5A0aorJu@tourtravels.t8c5bbx.mongodb.net/?retryWrites=true&w=majority&appName=tourtravels";
const PORT = process.env.PORT || 5001;

// Connect to MongoDB and start the server
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
