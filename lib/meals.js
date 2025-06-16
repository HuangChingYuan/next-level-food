import fs from "fs";

import slugify from "slugify";
import xss from "xss";

export async function getMeals() {
  const res = await fetch("http://localhost:3000/api/v1/meals");
  const result = await res.json();
  return result;
}

export async function getMeal(mealSlug) {
  const res = await fetch("http://localhost:3000/api/v1/meals/" + mealSlug);
  const result = await res.json();
  return result;
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  meal.image = `/images/${fileName}`;

  const res = await fetch("http://localhost:3000/api/v1/meals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meal),
  });
}
