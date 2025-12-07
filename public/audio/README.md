# Audio Files for Demo

This directory should contain the sample audio files used in the application.

For the demo to work properly, add the following MP3 files:
- variation-1.mp3
- variation-2.mp3
- variation-3.mp3

You can use any audio files for demonstration purposes. Each should ideally be around 2 minutes long.

## Quick Setup

If you don't have audio files, you can:
1. Use any royalty-free music samples
2. Generate silent audio files for testing
3. Download sample tracks from sites like freesound.org or incompetech.com

## Generating Silent Audio (macOS/Linux)

If ffmpeg is installed, you can generate silent audio files:

```bash
ffmpeg -f lavfi -i anullsrc=r=44100:cl=stereo -t 118 -q:a 9 -acodec libmp3lame variation-1.mp3
ffmpeg -f lavfi -i anullsrc=r=44100:cl=stereo -t 119 -q:a 9 -acodec libmp3lame variation-2.mp3
ffmpeg -f lavfi -i anullsrc=r=44100:cl=stereo -t 117 -q:a 9 -acodec libmp3lame variation-3.mp3
```
