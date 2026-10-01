---
title: Tide Board
type: App
status: In progress
tags: [typescript, azure, side-project]
date: 2026-08-21
summary: A glanceable tide and weather board for Auckland beaches, running on Azure Functions.
cover: ./images/tide-board-cover.png
coverAlt: Tide Board dashboard with tide times for Auckland beaches
---

Tide Board is a single screen that answers one question: is now a good time to go to the beach? It shows the next high and low tide, wind and temperature for a handful of Auckland beaches.

## How it works

- A timer-triggered **Azure Function** fetches tide and weather data on a schedule and caches it.
- A small **TypeScript** front end reads the cached data and renders the board.
- Everything is static except the function, so hosting costs stay close to zero.

## What's next

1. Add more beaches.
2. Highlight the best swim window for the day.
3. Make the layout work on a wall-mounted tablet.
