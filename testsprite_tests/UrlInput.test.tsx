/**
 * @testsprite
 * TestSprite component tests for UrlInput
 * Tests: form rendering, input interaction, submit behavior, loading state
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UrlInput from "../components/UrlInput";

describe("UrlInput Component", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test("renders the URL input field", () => {
    render(<UrlInput onSubmit={mockOnSubmit} isLoading={false} />);
    const input = screen.getByPlaceholderText("Paste Reddit video URL here...");
    expect(input).toBeInTheDocument();
  });

  test("renders the Get Video button", () => {
    render(<UrlInput onSubmit={mockOnSubmit} isLoading={false} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("submit button is disabled when input is empty", () => {
    render(<UrlInput onSubmit={mockOnSubmit} isLoading={false} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  test("submit button enables when URL is typed", async () => {
    render(<UrlInput onSubmit={mockOnSubmit} isLoading={false} />);
    const input = screen.getByPlaceholderText("Paste Reddit video URL here...");
    await userEvent.type(input, "https://reddit.com/r/videos/comments/abc123/test");
    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
  });

  test("calls onSubmit with URL when form is submitted", async () => {
    render(<UrlInput onSubmit={mockOnSubmit} isLoading={false} />);
    const input = screen.getByPlaceholderText("Paste Reddit video URL here...");
    const testUrl = "https://reddit.com/r/videos/comments/abc123/test";
    await userEvent.type(input, testUrl);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockOnSubmit).toHaveBeenCalledWith(testUrl);
  });

  test("disables input and button when isLoading is true", () => {
    render(<UrlInput onSubmit={mockOnSubmit} isLoading={true} />);
    const input = screen.getByPlaceholderText("Paste Reddit video URL here...");
    const button = screen.getByRole("button");
    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  test("shows supported formats hint text", () => {
    render(<UrlInput onSubmit={mockOnSubmit} isLoading={false} />);
    expect(
      screen.getByText(/Supports reddit\.com, v\.redd\.it, and old\.reddit\.com links/i)
    ).toBeInTheDocument();
  });
});
