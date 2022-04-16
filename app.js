const express = require("express");
const connect = require("./schemas/index");
connect();
const Article = require("./schemas/articles"); // 테스트용 DB연결
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 3000;

// 라우터 불러오기
// const articleRouter = require("./routers/articles");
// const userRouter = require("./routers/users");

// 접속 로그 남기기
const requestMiddleware = (req, res, next) => {
  console.log(
    "[Ip address]:",
    req.ip,
    "[method]:",
    req.method,
    "Request URL:",
    req.originalUrl,
    " - ",
    new Date()
  );
  next();
};

// 각종 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(requestMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.static("uploads"));

app.post("/test", async (req, res) => {
  await Article.create({
    articleNum: 1,
    articleDesc: "설명",
  });

  res.send("DB설정완료");
});

// 라우터 연결
// app.use("/api", [articleRouter]);
// app.use("/user", [userRouter]);

// 서버 열기
app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌어요!");
});
