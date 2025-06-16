import { connectToDatabase } from "@/lib/mongodb";
import Meal from "@/models/Meal";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const meals = await Meal.find();
  return NextResponse.json(meals, { status: 200 });
}

export async function POST(req) {
  await connectToDatabase();
  const data = await req.json();
  const newMeal = await Meal.create(data);
  return NextResponse.json(newMeal, { status: 201 });
}
