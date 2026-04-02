# AGI Character Service for Unity WebGL

[![Unity Version](https://img.shields.io/badge/Unity-2022.3%2B-blue.svg)](https://unity.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub Release](https://img.shields.io/github/v/release/yourusername/agi-unity-webgl-service)](https://github.com/yourusername/agi-unity-webgl-service/releases)

**Seamlessly connect website-built AGI characters to your Unity WebGL games.**

Game developers can easily apply personalities, traits, and prompts created on your website directly into their in-game characters — with clean bidirectional communication.

## Features

- One central `AGICharacterBridge` for all character updates
- JSON-based payload for flexible, future-proof data (traits, custom prompts, etc.)
- Event-driven C# API — no SendMessage spaghetti
- Optional Unity → Website callbacks via `.jslib`
- Ready for plain JS or **React** (via `react-unity-webgl`)
- Minimal performance impact on WebGL builds
- Full example scene included

## Quick Start (for Unity Game Devs)

### 1. Add the Package to Your Unity Project

**Recommended (Unity 2022.3+):**
```bash
# In Unity Package Manager → "+" → "Add package from git URL"
https://github.com/yourusername/agi-unity-webgl-service.git?path=Unity/Assets/AGICharacterService