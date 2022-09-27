import { ObjectId as objectId } from "mongodb";
import Item from ".";
import client from "../client";
import config from "../config";

const items = client.db(config.db.name).collection("items");

function validate(item) {
  const item2Validate = new Item(
    item.name,
    item.price,
    item.description,
    item.image
  );

  return item2Validate.validate();
}

export default {
  index() {
    return items.find().toArray();
  },

  async create(newItem) {
    const errors = validate(newItem);
    if (errors.length > 0) throw new Error(errors.join("\n"));

    const { insertedId } = await items.insertOne(newItem);

    return insertedId;
  },

  async update(id, updatedItem) {
    const errors = validate(updatedItem);
    if (errors.length > 0) throw new Error(errors.join("\n"));

    await items.updateOne({ _id: objectId(id) }, { $set: updatedItem });

    return id;
  },

  async delete(id) {
    try {
      await items.deleteOne({ _id: objectId(id) });

      return id;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
