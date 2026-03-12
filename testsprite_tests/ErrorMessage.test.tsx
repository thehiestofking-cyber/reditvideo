/**
 * @testsprite
 * TestSprite integration tests for ErrorMessage component
 * Tests: error display, retry button behavior
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorMessage from "../components/ErrorMessage";

describe("ErrorMessage Component", () => {
  test("displays error message text", () => {
    render(<ErrorMessage message="Something went wrong!" />);
    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });

  test("shows error title", () => {
    render(<ErrorMessage message="Network error" />);
    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
  });

  test("shows retry button when onRetry is provided", () => {
    const mockRetry = jest.fn();
    render(<ErrorMessage message="Error" onRetry={mockRetry} />);
    expect(screen.getByText(/Try Again/i)).toBeInTheDocument();
  });

  test("does not show retry button when onRetry is not provided", () => {
    render(<ErrorMessage message="Error" />);
    expect(screen.queryByText(/Try Again/i)).not.toBeInTheDocument();
  });

  test("calls onRetry when retry button is clicked", () => {
    const mockRetry = jest.fn();
    render(<ErrorMessage message="Error" onRetry={mockRetry} />);
    fireEvent.click(screen.getByText(/Try Again/i));
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });
});

describe("Features Component", () => {
  test("renders all 4 feature cards", async () => {
    const { default: Features } = await import("../components/Features");
    render(<Features />);
    expect(screen.getByText("Lightning Fast")).toBeInTheDocument();
    expect(screen.getByText("No Login Required")).toBeInTheDocument();
    expect(screen.getByText("Works Everywhere")).toBeInTheDocument();
    expect(screen.getByText("Direct Download")).toBeInTheDocument();
  });

  test("renders 'Why Choose Us?' heading", async () => {
    const { default: Features } = await import("../components/Features");
    render(<Features />);
    expect(screen.getByText("Why Choose Us?")).toBeInTheDocument();
  });
});
