import os
import sys
import math
import subprocess
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

# ==============================================================================
# WELELE MEDIA — CINEMATIC SEAMLESS HERO VIDEO GENERATOR (1080p 30fps LOOP)
# ==============================================================================

FFMPEG_PATH = r"C:\Users\Pixodel Work\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin\ffmpeg.exe"

WIDTH = 1920
HEIGHT = 1080
FPS = 30
DURATION_SEC = 8
TOTAL_FRAMES = FPS * DURATION_SEC # 240 frames

BASE_IMAGE_PATH = "public/images/welele-hero-clean.jpg"
OUTPUT_DIR = "public/videos"
OUTPUT_MP4 = os.path.join(OUTPUT_DIR, "welele-hero-loop.mp4")
OUTPUT_WEBM = os.path.join(OUTPUT_DIR, "welele-hero-loop.webm")

os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Loading master image: {BASE_IMAGE_PATH}...")
base_img = Image.open(BASE_IMAGE_PATH).convert("RGB")

# Crop/scale to 1920x1080 maintaining aspect ratio from center top
aspect_target = WIDTH / HEIGHT # 16:9
img_w, img_h = base_img.size
aspect_current = img_w / img_h

if aspect_current > aspect_target:
    # Wider than 16:9, scale by height
    new_h = HEIGHT
    new_w = int(img_w * (HEIGHT / img_h))
    base_resized = base_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    left = (new_w - WIDTH) // 2
    base_1080 = base_resized.crop((left, 0, left + WIDTH, HEIGHT))
else:
    # Taller, scale by width
    new_w = WIDTH
    new_h = int(img_h * (WIDTH / img_w))
    base_resized = base_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    base_1080 = base_resized.crop((0, 0, WIDTH, HEIGHT))

base_np = np.array(base_1080, dtype=np.float32)

# Define Focal Centers in 1920x1080 coordinates:
SUN_X = int(WIDTH * 0.555)   # 1065
SUN_Y = int(HEIGHT * 0.440)  # 475

STUDIO_X = int(WIDTH * 0.810) # 1555
STUDIO_Y = int(HEIGHT * 0.200) # 216

SEA_X = int(WIDTH * 0.280)    # 537
SEA_Y = int(HEIGHT * 0.820)   # 885

MESH_CENTER_X = int(WIDTH * 0.760) # 1459
MESH_CENTER_Y = int(HEIGHT * 0.680) # 734

# Precompute static coordinate grids for fast radial calculations
Y_GRID, X_GRID = np.ogrid[:HEIGHT, :WIDTH]

# Precompute distance maps
DIST_SUN = np.sqrt((X_GRID - SUN_X)**2 + (Y_GRID - SUN_Y)**2).astype(np.float32)
DIST_STUDIO = np.sqrt((X_GRID - STUDIO_X)**2 + (Y_GRID - STUDIO_Y)**2).astype(np.float32)
DIST_SEA = np.sqrt((X_GRID - SEA_X)**2 + (Y_GRID - SEA_Y)**2).astype(np.float32)
DIST_MESH = np.sqrt((X_GRID - MESH_CENTER_X)**2 + (Y_GRID - MESH_CENTER_Y)**2).astype(np.float32)

# Angle from sun for volumetric rays
ANGLE_SUN = np.arctan2(Y_GRID - SUN_Y, X_GRID - SUN_X).astype(np.float32)

# Seamless golden particle system (40 particles)
np.random.seed(42)
PARTICLE_COUNT = 45
p_base_x = np.random.uniform(WIDTH * 0.35, WIDTH * 0.80, PARTICLE_COUNT)
p_base_y = np.random.uniform(HEIGHT * 0.25, HEIGHT * 0.85, PARTICLE_COUNT)
p_rad = np.random.uniform(1.5, 4.0, PARTICLE_COUNT)
p_speed_y = np.random.uniform(15.0, 35.0, PARTICLE_COUNT)
p_drift_x = np.random.uniform(8.0, 20.0, PARTICLE_COUNT)
p_phase = np.random.uniform(0, 2 * math.pi, PARTICLE_COUNT)

# Seamless digital connection nodes (15 nodes around the holographic head)
NODE_COUNT = 16
node_base_x = MESH_CENTER_X + np.random.uniform(-140, 140, NODE_COUNT)
node_base_y = MESH_CENTER_Y + np.random.uniform(-120, 120, NODE_COUNT)
node_phase = np.random.uniform(0, 2 * math.pi, NODE_COUNT)

print(f"Launching FFmpeg to encode {TOTAL_FRAMES} frames @ {FPS}fps...")

cmd_mp4 = [
    FFMPEG_PATH,
    "-y",
    "-f", "rawvideo",
    "-vcodec", "rawvideo",
    "-s", f"{WIDTH}x{HEIGHT}",
    "-pix_fmt", "rgb24",
    "-r", str(FPS),
    "-i", "-",
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-preset", "medium",
    "-crf", "18",
    "-movflags", "+faststart",
    OUTPUT_MP4
]

pipe = subprocess.Popen(cmd_mp4, stdin=subprocess.PIPE, stderr=subprocess.PIPE)

for f in range(TOTAL_FRAMES):
    # Normalized loop time: t goes 0 -> 1 over 8 seconds
    t = f / TOTAL_FRAMES
    rad = t * 2 * math.pi # 0 -> 2pi for perfect loop

    # 1. Base copy
    frame = base_np.copy()

    # 2. Subtle Slow Ken Burns Camera Breathe (sinusoidal scale & micro-drift, loops at t=1)
    # Scale from 1.0 to 1.035 and back to 1.0
    scale_factor = 1.0 + 0.025 * (0.5 - 0.5 * math.cos(rad))
    # Micro horizontal pan (+/- 12px)
    pan_x = 10.0 * math.sin(rad)
    pan_y = 5.0 * math.sin(rad)

    # 3. Dynamic Sunburst Rays & Pulsing Horizon (Center)
    # Pulsing radius
    sun_pulse = 0.5 + 0.5 * math.sin(rad) # 0 to 1
    sun_glow_rad = 340 + 40 * sun_pulse
    sun_mask = np.clip(1.0 - (DIST_SUN / sun_glow_rad), 0.0, 1.0) ** 2

    # Volumetric rotating light shafts (8 rays)
    # Rotating angle with seamless 2pi / 8 loop
    ray_angle = ANGLE_SUN + rad * (1.0 / 4.0)
    ray_pattern = 0.5 + 0.5 * np.cos(8 * ray_angle)
    ray_mask = np.clip(1.0 - (DIST_SUN / 600.0), 0.0, 1.0) * (ray_pattern ** 3)

    # Apply Warm Sun Light
    frame[:, :, 0] += sun_mask * 45 + ray_mask * 28 # Red
    frame[:, :, 1] += sun_mask * 28 + ray_mask * 18 # Green
    frame[:, :, 2] += sun_mask * 6  + ray_mask * 3  # Blue

    # 4. Studio Rim Lighting Sweep (Top-Right Camera & Studio Rig)
    studio_pulse = 0.5 + 0.5 * math.sin(rad * 2 + 1.2) # Faster secondary rhythm
    studio_rad = 240 + 30 * studio_pulse
    studio_mask = np.clip(1.0 - (DIST_STUDIO / studio_rad), 0.0, 1.0) ** 2.5
    # Cyan-teal & pink dual rim light
    frame[:, :, 1] += studio_mask * 18 * studio_pulse # Cyan
    frame[:, :, 2] += studio_mask * 32 * studio_pulse # Blue
    frame[:, :, 0] += studio_mask * 12 * (1.0 - studio_pulse) # Pink accent

    # 5. Ocean Sunset Water Shimmer (Bottom-Left)
    sea_pulse = 0.5 + 0.5 * math.sin(rad * 3 + 2.5)
    sea_mask = np.clip(1.0 - (DIST_SEA / 180.0), 0.0, 1.0) ** 2
    frame[:, :, 0] += sea_mask * (16 + 10 * sea_pulse)
    frame[:, :, 1] += sea_mask * (10 + 6 * sea_pulse)

    # 6. Digital Connection Nodes & Constellation Lines (Bottom-Right Hologram)
    # Calculate current node positions for this frame
    cur_nodes_x = node_base_x + 8.0 * np.sin(rad + node_phase)
    cur_nodes_y = node_base_y + 8.0 * np.cos(rad + node_phase)

    # Draw connection lines between nearby nodes
    frame_uint = np.clip(frame, 0, 255).astype(np.uint8)
    frame_pil = Image.fromarray(frame_uint)

    # Use PIL ImageDraw for crisp anti-aliased digital connection lines & glowing particles
    from PIL import ImageDraw
    draw = ImageDraw.Draw(frame_pil, "RGBA")

    # Draw digital lines
    for i in range(NODE_COUNT):
        for j in range(i + 1, NODE_COUNT):
            dist = math.hypot(cur_nodes_x[i] - cur_nodes_x[j], cur_nodes_y[i] - cur_nodes_y[j])
            if dist < 85:
                line_alpha = int(180 * (1.0 - dist / 85) * (0.6 + 0.4 * math.sin(rad * 2 + i)))
                draw.line(
                    [(cur_nodes_x[i], cur_nodes_y[i]), (cur_nodes_x[j], cur_nodes_y[j])],
                    fill=(34, 183, 201, line_alpha),
                    width=1
                )

    # Draw digital nodes
    for i in range(NODE_COUNT):
        node_glow = 0.5 + 0.5 * math.sin(rad * 3 + node_phase[i])
        r = 2.0 + node_glow * 1.5
        draw.ellipse(
            [cur_nodes_x[i] - r, cur_nodes_y[i] - r, cur_nodes_x[i] + r, cur_nodes_y[i] + r],
            fill=(34, 183, 201, int(220 * node_glow))
        )

    # Draw floating golden atmospheric embers
    for i in range(PARTICLE_COUNT):
        # Y position wraps seamlessly over total duration
        cur_y = (p_base_y[i] - t * p_speed_y[i] * 4) % HEIGHT
        cur_x = p_base_x[i] + math.sin(rad + p_phase[i]) * p_drift_x[i]
        p_alpha = int(220 * (0.5 + 0.5 * math.sin(rad + p_phase[i])))
        pr = p_rad[i]
        draw.ellipse(
            [cur_x - pr, cur_y - pr, cur_x + pr, cur_y + pr],
            fill=(255, 180, 50, p_alpha)
        )

    # Write RGB bytes to FFmpeg pipe
    final_rgb = frame_pil.convert("RGB").tobytes()
    pipe.stdin.write(final_rgb)

    if (f + 1) % 30 == 0:
        print(f"Rendered {f + 1}/{TOTAL_FRAMES} frames ({(f + 1)/TOTAL_FRAMES*100:.0f}%)...")

pipe.stdin.close()
pipe.wait()
print(f"Successfully generated seamless MP4 video: {OUTPUT_MP4} ({os.path.getsize(OUTPUT_MP4)} bytes)")

# Also encode WebM version for modern browser efficiency
print("Encoding WebM (VP9) version...")
cmd_webm = [
    FFMPEG_PATH,
    "-y",
    "-i", OUTPUT_MP4,
    "-c:v", "libvpx-vp9",
    "-crf", "24",
    "-b:v", "0",
    OUTPUT_WEBM
]
subprocess.run(cmd_webm, check=True)
print(f"Successfully generated seamless WebM video: {OUTPUT_WEBM} ({os.path.getsize(OUTPUT_WEBM)} bytes)")
print("DONE!")
