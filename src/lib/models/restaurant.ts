import mongoose from "mongoose";
import { requiredFieldMessage } from "../database/validation";
import { Restaurant } from "../types/restaurant";

type RestaurantModel = Restaurant & mongoose.Document;

const RestaurantSchema = new mongoose.Schema<RestaurantModel>({
  name: {
    type: String,
    required: [true, requiredFieldMessage("name")],
  },
  address: {
    building: {
      type: String,
      required: [true, requiredFieldMessage("building")],
    },
    street: {
      type: String,
      required: [true, requiredFieldMessage("street")],
    },
    city: {
      type: String,
      required: [true, requiredFieldMessage("city")],
    },
    zipcode: {
      type: String,
      required: [true, requiredFieldMessage("zipcode")],
    },
    coord: {
      type: [Number],
      required: [true, requiredFieldMessage("coord")],
    },
  },
});

export default mongoose.models.Restaurant ||
  mongoose.model<RestaurantModel>("restaurants", RestaurantSchema);
