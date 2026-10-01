---
title: Learn from YouTube videos with transcripts + AI
type: Guide
tags: [python, ai, youtube, learning]
date: 2026-09-10
summary: Set up Python, pull a YouTube video's transcript, and use AI to turn it into study notes.
cover: ./images/yt-notes-cover.png
coverAlt: Terminal output beside AI-generated study notes
---

YouTube is full of excellent tutorials, but video is slow to skim and hard to review later. This guide pulls the transcript of any video with a few lines of Python, then hands it to an AI assistant to turn it into study notes you can search, highlight and come back to.

> [!TIP]
> You don't need a YouTube API key. The transcript library reads the captions YouTube already publishes for the video.

## 1. Install Python

Download the latest Python 3 installer from [python.org](https://www.python.org/downloads/) and run it. On Windows, tick **Add python.exe to PATH** on the first screen. Then open a new terminal and check the version:

```bash
python --version
```

You should see something like `Python 3.12.6`.

![Terminal showing python --version printing Python 3.12.6](./images/python-version.png "Checking the installed version in a new terminal window.")

## 2. Create a virtual environment

A virtual environment keeps this project's packages separate from everything else on your machine.

1. Make a folder for the project and move into it.
2. Create the environment with `python -m venv .venv`.
3. Activate it. Your prompt should now start with `(.venv)`.

```bash
mkdir yt-notes && cd yt-notes
python -m venv .venv
```

### macOS / Linux

```bash
source .venv/bin/activate
```

### Windows (PowerShell)

```powershell
.venv\Scripts\Activate.ps1
```

## 3. Install the transcript library

With the environment active, install [youtube-transcript-api](https://pypi.org/project/youtube-transcript-api/):

```bash
pip install youtube-transcript-api
```

## 4. Get the transcript

Save this as `get_transcript.py`. It takes a video URL, fetches the English captions and writes them to a `.txt` file named after the video ID.

```python
import sys
from urllib.parse import urlparse, parse_qs
from youtube_transcript_api import YouTubeTranscriptApi

def video_id(url: str) -> str:
    parsed = urlparse(url)
    if parsed.hostname == "youtu.be":
        return parsed.path.lstrip("/")
    return parse_qs(parsed.query)["v"][0]

vid = video_id(sys.argv[1])
transcript = YouTubeTranscriptApi().fetch(vid, languages=["en"])
text = "\n".join(snippet.text for snippet in transcript)

with open(f"{vid}.txt", "w", encoding="utf-8") as f:
    f.write(text)

print(f"Saved {len(text.split())} words to {vid}.txt")
```

Run it with any video link:

```bash
python get_transcript.py "https://www.youtube.com/watch?v=VIDEO_ID"
```

![Terminal output of get_transcript.py saying the transcript was saved to a .txt file](./images/script-output.png "The script saves the transcript next to it and reports the word count.")

> [!WARNING]
> Some videos have captions turned off, or only auto-generated captions in another language. If you see `TranscriptsDisabled` or `NoTranscriptFound`, try another video or change the `languages` list.

## 5. Summarise with AI

Open the `.txt` file, copy its contents and paste it into your AI assistant with a prompt like this:

```text
You are helping me study. From the transcript below:
1. Write a five-sentence summary.
2. List the key concepts, each with a one-line explanation.
3. Pull out any commands, tools or code that are mentioned.
4. Suggest three questions to test my understanding.

Transcript:
<paste transcript here>
```

![AI assistant response with a summary, key concepts and review questions](./images/generated-notes.png "Study notes generated from a 40-minute talk: summary, key concepts and review questions.")

## 6. My workflow tips

- **Read the notes first, then watch.** Knowing the outline tells me which parts of the video deserve full attention.
- **Keep one notes file per topic**, not per video. Appending to `azure-functions.md` builds a reference I actually reopen.
- **Ask follow-up questions in the same chat.** The transcript is still in context, so "explain the part about cold starts again" works well.
- **Check anything you will rely on.** Summaries can drop caveats, so jump to that point in the video when a detail matters.
