import express from "express";
import crypto from "crypto";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3001;

const SECRET_KEY = "a0e9b07e12f144dea93f44d859fe6916";

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  console.log("rye webhook received");
  console.log(req.body);
  // Create a SHA-256 HMAC with the shared secret key
  const hmac = crypto.createHmac("sha256", SECRET_KEY);

  // Update the HMAC with the request body
  // req.body represents the POST body as a string, assuming that it hasn't been parsed to JSON
  // hmac.update(req.body);
  return res.status(200);

  // Compare the base64 HMAC digest against the signature passed in the header
  if (hmac.digest("base64") !== req.headers["rye-hmac-signature-v1"]) {
    // The request is not authentic
    return res.status(401).send("Unauthorized");
  }
});

app.post("/test", (req, res) => {
  console.log("webhook received");
  console.log(req.body);
  return res.send("success");
});

app.post("/vgc-shipping", (req, res) => {
  const shipping_info = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    provinceCode: stateMapping[req.body.province] || null,
    countryCode: countryMapping[req.body.country] || null,
    postalCode: req.body.zip,
  };
  console.log(shipping_info);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
