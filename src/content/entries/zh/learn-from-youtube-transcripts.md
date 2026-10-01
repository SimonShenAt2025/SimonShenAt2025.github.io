---
title: 用 YouTube 字幕和 AI 学习
type: Guide
tags: [python, ai, youtube, learning]
date: 2026-09-10
summary: 安装 Python、获取 YouTube 视频字幕，并用 AI 将字幕整理成学习笔记。
language: zh
translationKey: learn-from-youtube-transcripts
cover: ../images/yt-notes-cover.png
coverAlt: 终端输出与 AI 生成的学习笔记并列显示
---

YouTube 上有很多优秀教程，但视频不容易快速浏览，也不便于之后回顾。本指南用几行 Python 获取视频字幕，再交给 AI 助手整理成可搜索、可标注、可随时查阅的学习笔记。

> [!TIP]
> 不需要 YouTube API 密钥。字幕库会读取 YouTube 已为视频提供的字幕。

## 1. 安装 Python

从 [python.org](https://www.python.org/downloads/) 下载最新的 Python 3 安装程序并运行。在 Windows 上，记得在第一个安装界面勾选 **Add python.exe to PATH**。然后打开新的终端并检查版本：

```bash
python --version
```

你应该会看到类似 `Python 3.12.6` 的版本信息。

![终端运行 python --version 并输出 Python 3.12.6](../images/python-version.png "在新的终端窗口中检查 Python 版本。")

## 2. 创建虚拟环境

虚拟环境可以将这个项目使用的 package 与电脑上的其他项目隔离。

1. 创建一个项目文件夹并进入该文件夹。
2. 使用 `python -m venv .venv` 创建环境。
3. 激活环境。此时命令提示符前面应该会出现 `(.venv)`。

```bash
mkdir yt-notes && cd yt-notes
python -m venv .venv
```

### macOS / Linux

```bash
source .venv/bin/activate
```

### Windows（PowerShell）

```powershell
.venv\Scripts\Activate.ps1
```

## 3. 安装字幕库

激活虚拟环境后，安装 [youtube-transcript-api](https://pypi.org/project/youtube-transcript-api/)：

```bash
pip install youtube-transcript-api
```

## 4. 获取字幕

将下面的代码保存为 `get_transcript.py`。它接收视频 URL，获取英文字幕，并将字幕写入以视频 ID 命名的 `.txt` 文件。

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

使用任意视频链接运行脚本：

```bash
python get_transcript.py "https://www.youtube.com/watch?v=VIDEO_ID"
```

![终端显示 get_transcript.py 已将字幕保存到 .txt 文件](../images/script-output.png "脚本会将字幕保存在同一文件夹，并显示单词数。")

> [!WARNING]
> 有些视频关闭了字幕，或只提供其他语言的自动生成字幕。如果看到 `TranscriptsDisabled` 或 `NoTranscriptFound`，请尝试其他视频或修改 `languages` 列表。

## 5. 用 AI 总结

打开 `.txt` 文件，复制其中的内容，再将其粘贴到 AI 助手中，并附上类似这样的提示：

```text
You are helping me study. From the transcript below:
1. Write a five-sentence summary.
2. List the key concepts, each with a one-line explanation.
3. Pull out any commands, tools or code that are mentioned.
4. Suggest three questions to test my understanding.

Transcript:
<paste transcript here>
```

![AI 助手根据字幕生成的摘要、关键概念和复习问题](../images/generated-notes.png "从一段 40 分钟的演讲生成的学习笔记：摘要、关键概念与复习问题。")

## 6. 我的工作流建议

- **先读笔记，再看视频。** 先了解大纲，就能判断哪些部分值得完整观看。
- **按主题保存笔记，而不是按视频保存。** 将内容追加到 `azure-functions.md`，会逐渐形成我愿意再次查阅的参考资料。
- **在同一对话中继续提问。** 字幕仍在上下文里，因此可以接着问“能再解释一下冷启动那部分吗？”
- **核对重要信息。** 摘要可能省略限定条件；细节重要时，应跳到视频对应位置确认。