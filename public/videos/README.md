# Replaceable cinematic intro

No third-party video is bundled. The intro currently animates original local city artwork as its visual placeholder.

Add your licensed video as `public/videos/intro.mp4`, copy `.env.example` to `.env`, and set `VITE_INTRO_VIDEO_URL=/videos/intro.mp4`. Restart Vite or rebuild after changing VITE variables.

Use a compressed H.264 MP4 with a fast-start index; aim for 4–8 seconds, under 8 MB, with a visually strong final frame. The intro duration follows the video duration, capped at 10 seconds. The four panel instances play the same asset; the browser can reuse the download. Playback is muted and inline; the sound button only enables sound on an explicit click. Use original or properly licensed sound. If loading/playback fails, the illustrated background remains visible. The transition never waits on a failed media request.

The first visit plays once per tab session. The footer links to `/intro` to replay. Skip and Escape open the four curtains immediately. Reduced-motion settings remove the zoom and shorten the reveal.
