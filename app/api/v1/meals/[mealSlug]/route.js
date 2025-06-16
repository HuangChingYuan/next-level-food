import { connectToDatabase } from "@/lib/mongodb";
import Meal from "@/models/Meal";
import { NextResponse } from "next/server";

export async function GET(req, segmentData) {
  await connectToDatabase();
  const params = await segmentData.params;
  const mealSlug = await params.mealSlug;
  const meal = await Meal.findOne({ slug: mealSlug });
  return NextResponse.json(meal, { status: 200 });
}

export async function PUT(req, segmentData) {
  await connectToDatabase();
  const params = await segmentData.params;
  const mealSlug = await params.mealSlug;
  const data = await req.json();
  const updatedMeal = await Meal.findOneAndUpdate({ slug: mealSlug }, data, {
    new: true,
  });
  return NextResponse.json(updatedMeal, { status: 200 });
}

export async function DELETE(req, segmentData) {
  await connectToDatabase();
  const params = await segmentData.params;
  const mealSlug = await params.mealSlug;
  await Meal.findOneAndDelete({ slug: mealSlug });
  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}
