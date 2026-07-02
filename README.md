# Neo Combat Workshop: MCP Server + Claude Code/Cursor/Codex Skills

> "I know kung fu." (Neo)

A TypeScript MCP server (`neo-fight`) with seven combat tools, plus agent skills (`neo-kungfu`) that orchestrate them. Built as a hands-on workshop on creating agent behavior that uses MCP tools.

**Looking for the workshop scaffold?** Switch to the [`starter`](../../tree/starter) branch. `main` is the completed answer key.

## Project Structure

```
neo-skills-mcp-workshop/
├── src/
│   ├── index.ts                              # the server (7 tools)
│   └── art.ts                                # 7 braille art constants
├── .agents/skills/neo-kungfu/SKILL.md        # auto-loaded by Codex
├── .claude/skills/neo-kungfu/SKILL.md        # auto-loaded by Claude Code
├── .cursor/skills/neo-kungfu/SKILL.md        # auto-loaded by Cursor
├── .cursor/mcp.json                          # auto-loaded by Cursor
├── .mcp.json                                 # auto-loaded by Claude Code
├── package.json
└── README.md
```

The MCP server config and agent skill files ship as project-scoped files. Claude Code and Cursor auto-discover them after `npm install`. Codex auto-loads `.agents/skills/neo-kungfu/SKILL.md`, but its MCP server is configured with one command in the setup steps below.

*Skill and instruction files are duplicated per agent because Claude Code, Cursor, and Codex don't share one discovery convention.*

## Tools

The `neo-fight` MCP server exposes 7 tools, grouped into 3 combat domains:

| Domain | Tools |
|---|---|
| **martial arts** | `defend_against_kick` (with `kick_type` enum input), `defend_against_punch`, `attack_with_punch`, `attack_with_kick` |
| **firearms** | `dodge_bullet` |
| **sword** | `block_sword_attack`, `attack_with_sword` |

Each tool returns a braille text-art scene of Neo performing the action plus a combat log message.

## Setup

### Prerequisites

- **Node.js 18+** and **npm**
- **[Claude Code](https://docs.claude.com/en/docs/claude-code)** / **[Cursor](https://cursor.com)** / **[Codex CLI](https://developers.openai.com/codex/cli/)** is installed and logged in
- **Watched [The Matrix](https://en.wikipedia.org/wiki/The_Matrix)** for the vibes

> **Windows users:** **Git Bash** runs every command below as-is. **PowerShell** also supports `$PWD`, but for env vars use `$env:CLIENT_PORT="6275"; npx ...` instead of `CLIENT_PORT=6275 npx ...`. **cmd.exe** needs `%CD%` instead of `$PWD` and `set CLIENT_PORT=6275 && npx ...` for env vars.

### Clone, install, open

```bash
git clone https://github.com/kamiour/neo-skills-mcp-workshop.git
cd neo-skills-mcp-workshop
npm install
```

Open the project in your agent. Claude Code and Cursor will show security prompts to approve the MCP server (`neo-fight`) and skill (`neo-kungfu`). Accept both.

Codex users need to register the MCP server once from the repo root:

```bash
codex mcp add neo-fight -- npx tsx "$PWD/src/index.ts"
```

| Agent | Auto-load behavior |
|---|---|
| **Cursor** | Open this folder as a workspace → approve prompts. Verify in **Settings → MCP** + **Settings → Skills**. |
| **Claude Code** | Run `claude` from the project directory → approve prompts. Verify with `claude mcp list` and `/skills`. |
| **Codex** | Run `codex mcp add neo-fight -- npx tsx "$PWD/src/index.ts"` once, then run `codex` from the project directory. Verify with `codex mcp list`. |

### Try it out

Open a chat in your agent and try prompts like:

- "Agent Smith shoots a gun at you"
- "Agent Smith throws a punch"
- "Agent Smith swings a sword at your head"
- "Fight Agent Smith. He starts with a punch, then pulls out a gun"

## Inspect tools in a UI (optional)

Want to see schemas and call tools with custom inputs? Use [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector):

```bash
npx @modelcontextprotocol/inspector npx tsx "$PWD/src/index.ts"
```

A session URL prints in the terminal. Open it in a browser. Try the **Tools** tab → `defend_against_kick` → fill in `kick_type` from the dropdown → click **Run**.

> **Port collision?** Inspector listens on **6274**. Override with `CLIENT_PORT=6275 npx @modelcontextprotocol/inspector ...`.

## Tech Stack

- **TypeScript**: runs directly via [`tsx`](https://github.com/privatenumber/tsx), no build step
- **[`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk)**: official MCP TypeScript SDK
- **[`zod`](https://zod.dev)**: input schemas (used by the `defend_against_kick` reference tool)
- **stdio transport**: simplest for local development
