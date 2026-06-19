const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const path = require("path");

const http = require("http");

const { Server } = require("socket.io");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.set("io", io);

io.on(
  "connection",

  (socket) => {
    console.log("✅ Socket Connected =>", socket.id);

    socket.on(
      "join_chat",

      (conversationId) => {
        socket.join(conversationId);

        console.log("✅ Joined Room =>", conversationId);
      },
    );

    socket.on(
      "send_message",

      async (data) => {
        io.to(data.conversationId).emit(
          "receive_message",

          data,
        );
      },
    );

    socket.on(
      "typing",

      (data) => {
        socket.to(data.conversationId).emit(
          "typing",

          data,
        );
      },
    );

    socket.on("stop_typing", (data) => {
      socket.to(data.conversationId).emit("stop_typing", data);
    });

    socket.on(
      "disconnect",

      () => {
        console.log("❌ Socket Disconnected =>", socket.id);
      },
    );
  },
);
app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(
  "/uploads",

  express.static(path.join(__dirname, "uploads")),
);

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use(
  "/api/doctors",

  require("./routes/doctorRoutes"),
);

app.use(
  "/api/prescriptions",

  require("./routes/prescriptionRoutes"),
);

app.use(
  "/api/appointments",

  require("./routes/appointmentRoutes"),
);

app.use(
  "/api/docside-prescriptions",
  require("./routes/docsidePrescriptionRoutes"),
);

app.use(
  "/api/schedules",

  require("./routes/doctorScheduleRoutes"),
);

app.use(
  "/api/analytics",

  require("./routes/analyticsRoutes"),
);

app.use(
  "/api/chat",

  require("./routes/chatRoutes"),
);
app.use("/api/video-call", require("./routes/videoCallRoutes"));
app.use(
  "/api/report-images",

  require("./routes/reportImageRoutes"),
);
app.use(
  "/api/stories",

  require("./routes/storyRoutes"),
);
const patientCaseRoutes = require("./routes/patientCaseRoutes");

app.use("/api/patient-case", patientCaseRoutes);

const historyRoutes = require("./routes/historyRoutes");

app.use("/api/history", historyRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,

    message: "Route not found",
  });
});

const PORT = process.env.PORT || 7001;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
