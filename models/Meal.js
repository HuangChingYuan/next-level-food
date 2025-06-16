import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: String,
  summary: String,
  instructions: String,
  creator: String,
  creator_email: String,
});

export default mongoose.models.Meal || mongoose.model("Meal", MealSchema);
