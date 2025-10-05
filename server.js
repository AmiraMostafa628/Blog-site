const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");

const app = jsonServer.create();
const router = jsonServer.router("db.json");

const rules = auth.rewriter({
  users: 644,
  posts: 666,
});

app.db = router.db;

app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);

app.listen(3001, () => {
  console.log("JSON Server with Auth running on http://localhost:3001");
});
