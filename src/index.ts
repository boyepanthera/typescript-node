import express, { Request, Response } from "express";
import { connect } from "mongoose";
import Organization, { IOrganization } from "./models/organization.model";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req: Request, res: Response): void {
  res.send("Welcome");
});

interface IOrgResponse {
  message: string;
  organization: Partial<IOrganization>;
}

app.post("/organization", async function (req: Request, res: Response): Promise<
  Response<IOrgResponse> | undefined
> {
  try {
    const organization = await Organization.create(req.body);
    return res.status(200).send({
      message: "Organization created",
      organization: organization,
    });
  } catch (err) {
    console.log(err);
  }
});

async function startDb() {
  try {
    await connect("mongodb://127.0.0.1:27017/typescript-test");
    console.log("DB connection established!");
  } catch (err) {
    throw new Error("unable to connect to DB");
  }
}

app.listen(3000, () => {
  console.log("server started");
  try {
    startDb();
  } catch (err) {
    let message;
    if (err instanceof Error) {
      message = err.message;
      console.log(message);
    } else {
      console.log("unable to start DB");
    }
  }
});
