---
title: Tide Board
type: App
status: 进行中
tags: [typescript, azure, side-project]
date: 2026-08-21
summary: 一个一眼就能查看奥克兰海滩潮汐和天气的看板，由 Azure Functions 驱动。
language: zh
translationKey: tide-board
cover: ../images/tide-board-cover.png
coverAlt: Tide Board 显示奥克兰海滩潮汐时间的仪表板
---

Tide Board 是一个单屏应用，只回答一个问题：现在适合去海滩吗？它会显示奥克兰部分海滩的下一次高潮和低潮、风况及气温。

## 工作方式

- 定时触发的 **Azure Function** 按计划获取潮汐和天气数据，并缓存数据。
- 一个小型 **TypeScript** 前端读取缓存数据并渲染看板。
- 除了该函数之外，其他内容都是静态的，因此托管成本接近于零。

## 接下来要做的事

1. 增加更多海滩。
2. 标出当天最适合游泳的时段。
3. 让布局适用于壁挂式平板电脑。