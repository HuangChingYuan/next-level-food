"use client";

import { useActionState } from "react";

export default function MealsFormSubmit() {
  const { isPending } = useActionState();

  return (
    <button disabled={isPending}>
      {isPending ? "Submitting..." : "Share Meal"}
    </button>
  );
}
