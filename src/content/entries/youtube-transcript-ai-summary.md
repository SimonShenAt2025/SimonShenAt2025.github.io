---
title: YouTube Transcript → AI Summary
type: Guide
tags: [python, youtube, transcript, ai, automation, windows]
date: 2026-10-01
summary: Fetch a YouTube transcript with Python, save it to a text file, and copy it to the clipboard for a Claude skill to summarize in Simplified Chinese.
cover: ./images/youtube-transcript-ai-summary-en.webp
coverAlt: PowerShell showing yt.py copied a YouTube transcript to the clipboard and saved B7RBbAlBmXU.txt (30,971 characters)
---

This workflow has two stages: a Python script fetches a video's captions and copies them to the clipboard, then Claude's `youtube-ai-summary` skill turns the transcript into a Simplified Chinese summary and a breakdown of the technologies mentioned.

## Requirements

- Python 3.12, installed with **Add to PATH** enabled.
- The `youtube-transcript-api` and `pyperclip` packages.

Install the packages in PowerShell:

```powershell
python -m pip install youtube-transcript-api pyperclip
```

Using `python -m pip` instead of bare `pip` helps avoid installing packages into a different Python interpreter.

## Fetch the transcript

Save the following as `yt.py`:

```python
import sys, re, pyperclip
from youtube_transcript_api import YouTubeTranscriptApi

# Extract the 11-character video ID from a watch, youtu.be, or Shorts URL.
m = re.search(r"(?:v=|youtu\.be/|shorts/)([\w-]{11})", sys.argv[1])
vid = m.group(1) if m else sys.argv[1]

# Request English captions first, then Simplified Chinese, and join the text.
text = " ".join(s.text for s in YouTubeTranscriptApi().fetch(vid, languages=["en", "zh-Hans"]))

# Save the transcript as <videoID>.txt using UTF-8.
open(f"{vid}.txt", "w", encoding="utf-8").write(text)

# Copy the transcript to the clipboard and print the result.
pyperclip.copy(text)
print(f"Copied to clipboard and saved as {vid}.txt ({len(text)} characters)")
```

Run the script with a full YouTube URL, a `youtu.be` short URL, a Shorts URL, or an 11-character video ID:

```powershell
python yt.py "https://www.youtube.com/watch?v=B7RBbAlBmXU"
python yt.py "B7RBbAlBmXU"
```

The script reads its input from `sys.argv[1]`. It extracts the video ID from a `watch?v=`, `youtu.be/`, or `shorts/` URL; if none of those patterns match, it treats the input as the ID. It requests English or Simplified Chinese captions, joins their text, and saves a UTF-8 backup named `<videoID>.txt` in the current folder. Caption segments include timestamps, but this script does not retain them. It also copies the transcript to the clipboard and prints the filename and character count.

## Summarize with Claude

After the script finishes, paste the transcript into Claude with Ctrl+V. The `youtube-ai-summary` skill is intended to produce a Simplified Chinese summary and itemize the technologies, tools, models, frameworks, and services mentioned in the video.

## Common pitfalls

- Python code cannot run in the browser's F12 console, which runs JavaScript.
- In PowerShell, either enter the Python REPL by running `python` first, or save the code in a `.py` file and run it with Python.
- Do not include `>>>` REPL prompts when copying code.
- `ModuleNotFoundError` means a required package is not installed in the active Python environment.
- Exit the Python REPL with `exit()` or press Ctrl+Z followed by Enter.

## Limitations

- The video must have accessible captions. Creator-provided and auto-generated captions are both acceptable.
- The script has no error handling, so it exits with an error if captions are unavailable or YouTube blocks the request.
- YouTube may block requests from cloud servers, company VPNs, or proxy environments; `RequestBlocked` is one possible error.
- A company network may block pip. The `--trusted-host` option may be a workaround, but the required host values depend on the network and are not specified here.
- The script does not preserve timestamps.

## Use cases

- Quickly digest long AI or technical videos.
- Decide whether a video is worth watching.
- Collect tools mentioned in a video for later research.

## No-code alternative

On YouTube, expand the video description, select **Show transcript**, turn off timestamps, and copy the transcript manually.

## Possible improvements

These are future ideas, not current script features:

- Add error handling.
- Optionally preserve timestamps.

## Compliance

This workflow is for personal learning and summarization. Transcript copyright belongs to the video creator; do not publicly republish full transcripts.