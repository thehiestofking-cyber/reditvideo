/**
 * @testsprite
 * TestSprite component tests for VideoPreview
 * Tests: rendering with video data, download button, external link, metadata display
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import VideoPreview from "../components/VideoPreview";

const mockVideoData = {
  title: "Amazing Reddit Video",
  author: "test_user",
  subreddit: "videos",
  videoUrl: "https://v.redd.it/test123/DASH_720.mp4",
  audioUrl: "https://v.redd.it/test123/DASH_audio.mp4",
  thumbnail: "https://preview.redd.it/thumbnail.jpg",
  duration: "1:23",
  permalink: "/r/videos/comments/abc123/amazing_reddit_video/",
};

describe("VideoPreview Component", () => {
  test("renders video element", () => {
    render(<VideoPreview videoData={mockVideoData} />);
    const video = screen.getByRole("region") ?? document.querySelector("video");
    expect(document.querySelector("video")).toBeInTheDocument();
  });

  test("displays video title", () => {
    render(<VideoPreview videoData={mockVideoData} />);
    expect(screen.getByText("Amazing Reddit Video")).toBeInTheDocument();
  });

  test("displays author username", () => {
    render(<VideoPreview videoData={mockVideoData} />);
    expect(screen.getByText(/u\/test_user/i)).toBeInTheDocument();
  });

  test("displays subreddit name", () => {
    render(<VideoPreview videoData={mockVideoData} />);
    expect(screen.getByText(/r\/videos/i)).toBeInTheDocument();
  });

  test("displays duration", () => {
    render(<VideoPreview videoData={mockVideoData} />);
    expect(screen.getByText("1:23")).toBeInTheDocument();
  });

  test("renders Download MP4 button", () => {
    render(<VideoPreview videoData={mockVideoData} />);
    expect(screen.getByText(/Download MP4/i)).toBeInTheDocument();
  });

  test("renders View on Reddit button", () => {
    render(<VideoPreview videoData={mockVideoData} />);
    expect(screen.getByText(/View on Reddit/i)).toBeInTheDocument();
  });

  test("does not show 'no audio' warning when audioUrl is present", () => {
    render(<VideoPreview videoData={mockVideoData} />);
    expect(screen.queryByText(/Some Reddit videos may not include audio/i)).not.toBeInTheDocument();
  });

  test("shows 'no audio' warning when audioUrl is missing", () => {
    const dataWithoutAudio = { ...mockVideoData, audioUrl: undefined };
    render(<VideoPreview videoData={dataWithoutAudio} />);
    expect(screen.getByText(/Some Reddit videos may not include audio/i)).toBeInTheDocument();
  });
});
