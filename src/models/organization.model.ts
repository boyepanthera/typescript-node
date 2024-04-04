import { Schema, Types, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface IOrganization {
  name: string;
  address: string;
  // Use `Types.ObjectId` in document interface...
  users: Types.ObjectId[]; // Array<Types.ObjectId>
}

// 2. Create a Schema corresponding to the document interface.
const organizationSchema = new Schema<IOrganization>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  // And `Schema.Types.ObjectId` in the schema definition.
  users: { type: [Schema.Types.ObjectId], ref: "user" },
});

const Organization = model<IOrganization>("organization", organizationSchema);

export default Organization;
