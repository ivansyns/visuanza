#!/usr/bin/env python3
"""
Extract frames from camvid.mp4 into assets/frames/
Run from: /home/aromazla/Desktop/WEB/visuanza/
"""
import os, subprocess

OUT = "/home/aromazla/Desktop/WEB/visuanza/assets/frames"
os.makedirs(OUT, exist_ok=True)

subprocess.run([
    "/usr/bin/ffmpeg",
    "-i", "/home/aromazla/Desktop/WEB/visuanza/assets/camvid.mp4",
    "-vsync", "0",
    "-start_number", "0",
    "-vf", "scale=960:540:flags=lanczos",
    "-q:v", "2",
    "-f", "image2",
    os.path.join(OUT, "frame_%04d.jpg"),
    "-y"
], check=True)

frames = sorted(f for f in os.listdir(OUT) if f.endswith(".jpg"))
print(f"Extracted {len(frames)} frames.")
print(f"First: {frames[0]}  Last: {frames[-1]}")
