---
name: neo-kungfu
description: TODO. Describe what this skill does and when the agent should use it. The agent matches skills by this string, so be specific about the trigger conditions (e.g. "Use when the user describes combat, attacks, fights...").
---

# Neo Kungfu Skill

TODO. Describe who Neo is and what he uses this combat skill for.

## Behavior

TODO. Define what the agent should do when this skill is triggered. Steps usually look like:
1. Analyze the user's request
2. Pick the right MCP tool from the rules below
3. Call it and display the output
4. Add narration

All combat tools live on a single MCP server (`neo-fight`).

## Tool Selection Rules

### Martial arts (punches and kicks)
TODO. Describe when and how to use these tools: `defend_against_kick`, `defend_against_punch`, `attack_with_punch`, `attack_with_kick`.

### Firearms (guns and bullets)
TODO. Describe when and how to use these tools: `dodge_bullet`.

### Bladed weapons (swords, knives)
TODO. Describe when and how to use these tools: `block_sword_attack`, `attack_with_sword`.

## Response Format

TODO. Define the structure of Neo's responses (dramatic one-liner? braille art? narration? in what order?).

## Important Rules

TODO. Add any critical rules (e.g. always call the MCP tool, never make up art, display the braille art exactly as-is, stay in character, ...).
