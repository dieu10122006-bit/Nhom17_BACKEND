const express = require("express");
const app = express();
app.use(express.json());




const studentRoutes = require("./routes/studentRoutes");
const tutorRoutes = require("./routes/tutorRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const requestRoutes = require("./routes/requestRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const tutorSubjectRoutes = require("./routes/tutorSubjectRoutes");
const matchRoutes = require("./routes/matchRoutes");
const reportRoutes = require("./routes/reportRoutes");

app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/tutors", tutorRoutes);
app.use("/api/v1/subjects", subjectRoutes);
app.use("/api/v1/requests", requestRoutes);
app.use("/api/v1/assignments", assignmentRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/availability", availabilityRoutes);
app.use("/api/v1/tutor-subjects", tutorSubjectRoutes);
app.use("/api/v1/match", matchRoutes);
app.use("/api/v1/reports", reportRoutes);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});