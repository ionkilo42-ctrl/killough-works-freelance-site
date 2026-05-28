"use client";

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { BrandedImagePanel } from "@/components/branded-image-panel";

describe("BrandedImagePanel", () => {
  afterEach(() => {
    cleanup();
  });

  it("shows the branded fallback panel when the image path fails to load", async () => {
    render(
      <BrandedImagePanel
        imagePath="/images/field-notes/clarity-is-a-service.jpg"
        title="Clarity is a service."
        category="Field Notes"
      />,
    );

    const image = screen.getByAltText("Clarity is a service.", { selector: "img" });
    fireEvent.error(image);

    await waitFor(() => expect(screen.getByRole("img", { name: "Clarity is a service." })).toBeInTheDocument());
    expect(screen.getByText("Field Notes")).toBeInTheDocument();
  });

  it("renders the real image only after the asset loads successfully", async () => {
    render(
      <BrandedImagePanel
        imagePath="/images/field-notes/clarity-is-a-service.jpg"
        title="Clarity is a service."
        category="Field Notes"
      />,
    );

    const image = screen.getByAltText("Clarity is a service.", { selector: "img" });
    fireEvent.load(image);

    await waitFor(() => {
      expect(screen.getByAltText("Clarity is a service.", { selector: "img.is-visible" })).toBeInTheDocument();
    });
  });
});
