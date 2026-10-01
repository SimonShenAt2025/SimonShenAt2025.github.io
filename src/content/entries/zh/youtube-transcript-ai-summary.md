---
title: YouTube 字幕转 AI 总结
type: Guide
tags: [python, youtube, transcript, ai, automation, windows]
date: 2026-10-01
summary: 用 Python 获取 YouTube 字幕、保存为文本并复制到剪贴板，再交给 Claude skill 生成简体中文总结和技术拆解。
language: zh
translationKey: youtube-transcript-ai-summary
---

这个流程分为两步：先用 Python 脚本获取视频字幕并复制到剪贴板，再将字幕粘贴到 Claude，由 `youtube-ai-summary` skill 生成简体中文总结，并梳理视频中提到的技术、工具、模型、框架和服务。

## 环境要求

- Python 3.12，安装时启用 **Add to PATH**。
- `youtube-transcript-api` 和 `pyperclip` 两个 package。

在 PowerShell 中安装：

```powershell
python -m pip install youtube-transcript-api pyperclip
```

使用 `python -m pip` 而不是单独运行 `pip`，可以降低 package 被安装到另一个 Python 解释器环境中的可能性。

## 获取字幕

将以下代码保存为 `yt.py`：

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

脚本从 `sys.argv[1]` 读取参数，从 `watch?v=`、`youtu.be/` 或 `shorts/` URL 中提取视频 ID；如果没有匹配到这些格式，就将输入直接当作 ID。它会请求英文或简体中文字幕，将字幕文本拼接起来，并以 UTF-8 编码保存到当前文件夹中的 `<视频ID>.txt`。字幕片段本身也包含时间戳，但脚本不会保留它们。最后，脚本会将字幕复制到剪贴板，并打印文件名和字符数。

可以传入完整 YouTube URL、`youtu.be` 短链接、Shorts URL，或 11 位视频 ID：

```powershell
python yt.py "https://www.youtube.com/watch?v=B7RBbAlBmXU"
python yt.py "B7RBbAlBmXU"
```

## 在 Claude 中总结

脚本运行后，在 Claude 中按 Ctrl+V 粘贴字幕。`youtube-ai-summary` skill 旨在生成简体中文摘要，并逐项整理视频中提到的技术、工具、模型、框架和服务。

## 常见问题

- Python 代码不能在浏览器的 F12 控制台中运行，因为那里运行的是 JavaScript。
- 在 PowerShell 中，可以先运行 `python` 进入 Python 交互模式再输入 Python 代码；也可以将代码保存为 `.py` 文件后运行。
- 复制代码时不要带上 `>>>` 交互模式提示符。
- `ModuleNotFoundError` 表示当前 Python 环境中没有安装所需 package。
- 退出 Python 交互模式可输入 `exit()`，或按 Ctrl+Z 后回车。

## 限制

- 视频必须有可访问的字幕；创作者上传的字幕和自动生成的字幕均可。
- 脚本没有错误处理。如果视频没有可用字幕，或 YouTube 拦截请求，脚本会报错退出。
- YouTube 可能会拦截来自云服务器、公司 VPN 或代理环境的请求；`RequestBlocked` 是一种可能出现的错误。
- 公司网络可能会拦截 pip。`--trusted-host` 参数可能是一种解决方法，但所需的主机值取决于具体网络，此处不提供未经确认的命令。
- 脚本不会保留时间戳。

## 使用场景

- 快速了解较长的 AI 或技术视频。
- 先判断一个视频是否值得观看。
- 整理视频中提到的工具，留待后续研究。

## 不写代码的替代方法

在 YouTube 页面展开视频说明，选择 **Show transcript**，关闭时间戳后手动复制字幕。

## 后续可改进方向

以下是未来想法，并非脚本目前已有的功能：

- 增加错误处理。
- 提供保留时间戳的选项。

## 合规说明

此流程仅用于个人学习和总结。字幕版权属于视频作者，不要公开转载完整字幕。