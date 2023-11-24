import mongoose from "mongoose";
import { requiredFieldMessage } from "../database/validation";

export interface Restaurant extends mongoose.Document {
  name: string;
  address: {
    building: string;
    street: string;
    city: string;
    zipcode: string;
    coord: number[];
  };
}

const RestaurantSchema = new mongoose.Schema<Restaurant>({
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
  mongoose.model<Restaurant>("restaurants", RestaurantSchema);
