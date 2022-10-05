var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
//const bodyParser = require("body-parser");


var indexRouter = require("./routes/reportes");
var usersRouter = require("./routes/users");
var cobranzasRouter = require("./routes/cobranzas");
var vacacionesRouter = require("./routes/vacaciones");
var zsccSQLRouter = require("./routes/zscc");
var pedidosSQLRouter = require("./routes/pedidos");
var reportesGestionSQLRouter = require("./routes/reportesGestionSQL");
var permissionsRouter= require("./routes/permissions");


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors());

app.use("/api/reportes", indexRouter);
app.use("/api", usersRouter);
app.use("/api/cobranzas", cobranzasRouter);
app.use("/api/vacaciones", vacacionesRouter);
app.use("/api/scc", zsccSQLRouter);
app.use("/api/pedidos", pedidosSQLRouter);
app.use("/api/sql/reportes", reportesGestionSQLRouter);
app.use("/api/permissions",permissionsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
