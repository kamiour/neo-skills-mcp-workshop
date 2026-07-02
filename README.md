# Neo Combat Workshop: Starter

> "I know kung fu." (Neo)

Welcome to the workshop. You'll build:
1. A **TypeScript MCP server** (`neo-fight`) with 7 combat tools (~30 min)
2. Agent skills (`neo-kungfu`) that orchestrate those tools (~20–30 min)

**You're on the `starter` branch.** The completed answer key lives on [`main`](../../tree/main). Peek if you get stuck.

## Project Structure

```
neo-skills-mcp-workshop/
├── src/
│   ├── index.ts                              # everything you'll edit (5 tools done, 2 TODOs)
│   └── art.ts                                # 7 braille art constants (read-only data)
├── .agents/skills/neo-kungfu/SKILL.md        # auto-loaded by Codex (TODOs to fill in)
├── .claude/skills/neo-kungfu/SKILL.md        # auto-loaded by Claude Code (TODOs to fill in)
├── .cursor/skills/neo-kungfu/SKILL.md        # auto-loaded by Cursor (TODOs to fill in)
├── .cursor/mcp.json                          # auto-loaded by Cursor
├── .mcp.json                                 # auto-loaded by Claude Code
├── package.json
└── README.md
```

The MCP config and agent skill files ship as project-scoped files. Claude Code and Cursor auto-discover them after `npm install`. Codex auto-loads `.agents/skills/neo-kungfu/SKILL.md`, but its MCP server is configured with one command in the setup steps below.

*Skill and instruction files are duplicated per agent because Claude Code, Cursor, and Codex don't share one discovery convention.*

## What you'll edit

- `src/index.ts` for **all agents** (Part 1: build the MCP server)
- `.agents/skills/neo-kungfu/SKILL.md` for **Codex users only** (Part 2: write the skill)
- `.claude/skills/neo-kungfu/SKILL.md` for **Claude Code users only** (Part 2: write the skill)
- `.cursor/skills/neo-kungfu/SKILL.md` for **Cursor users only** (Part 2: write the skill)

Everything else (`src/art.ts`, `.mcp.json`, `.cursor/mcp.json`, the other agents' instruction files) is auto-loaded or read-only data. Leave it alone.

## Prerequisites

- **Node.js 18+** and **npm** (check with `node --version`)
- **[Claude Code](https://docs.claude.com/en/docs/claude-code)** / **[Cursor](https://cursor.com)** / **[Codex CLI](https://developers.openai.com/codex/cli/)** is installed and logged in
- **Watched [The Matrix](https://en.wikipedia.org/wiki/The_Matrix)** for the vibes

> **Windows users:** **Git Bash** runs every command below as-is. **PowerShell** also supports `$PWD`, but for env vars use `$env:CLIENT_PORT="6275"; npx ...` instead of `CLIENT_PORT=6275 npx ...`. **cmd.exe** needs `%CD%` instead of `$PWD` and `set CLIENT_PORT=6275 && npx ...` for env vars.

## Setup

### 1. Clone & install

```bash
git clone -b starter https://github.com/kamiour/neo-skills-mcp-workshop.git
cd neo-skills-mcp-workshop
npm install
```

No build step. The workshop runs TypeScript directly via [`tsx`](https://github.com/privatenumber/tsx).

### 2. Open the project in your agent

Claude Code and Cursor will prompt to approve the project-scoped MCP server (`neo-fight`) and skill (`neo-kungfu`). Approve both.

Codex users need to register the MCP server once from the repo root:

```bash
codex mcp add neo-fight -- npx tsx "$PWD/src/index.ts"
```

| Agent | Auto-load behavior |
|---|---|
| **Cursor** | Open this folder as a workspace → approve the prompts. Verify in **Settings → MCP** + **Settings → Skills**. |
| **Claude Code** | Run `claude` from the project directory → approve the prompts. Verify with `claude mcp list` and `/skills`. |
| **Codex** | Run `codex mcp add neo-fight -- npx tsx "$PWD/src/index.ts"` once, then run `codex` from the project directory. Verify with `codex mcp list`. |

> The MCP server won't successfully boot until you complete Steps 1 and 2 in Part 1 below. That's expected. The agent will keep retrying.

### 3. Open MCP Inspector (your live debug surface)

Open a separate terminal and run:

```bash
npx @modelcontextprotocol/inspector npx tsx "$PWD/src/index.ts"
```

A session URL prints. Open it in your browser and **keep this tab open as you work**. Inspector is the fastest way to see your MCP server's state:

- Initially shows a **connection error** (the server crashes on Step 2's missing code, as expected)
- After Step 2 → click **Reconnect** in the Inspector UI → see **5 tools** appear
- After each Step 3 TODO → click **Reconnect** → the missing tool appears

Click any tool in the **Tools** tab to invoke it with custom inputs. The braille art response renders right there.

> **Port collision?** Inspector listens on **6274** by default. Override with `CLIENT_PORT=6275 npx @modelcontextprotocol/inspector ...` if it's taken.

---

## Part 1: Build the MCP Server (~30 min)

The whole part happens in `src/index.ts`. Four labeled TODO sections, top to bottom:

```
src/index.ts
├── ▶ Step 1: Add the missing MCP imports     (top of file)
├── ▶ Step 2: Create the MCP server           (just below)
├── ▶ TODO 3a: implement attack_with_kick     (martial arts section)
└── ▶ TODO 3b: implement attack_with_sword    (sword section)
```

**Workflow**: edit code → save → switch to Inspector tab → click **Reconnect** → see the change live.

### Step 1: Add the missing MCP imports (~3 min)

Your editor / TypeScript will complain: *"Cannot find name 'StdioServerTransport'"* (and once you start Step 2, *"Cannot find name 'McpServer'"*).

Look at the top of `src/index.ts`. There's a TODO comment explaining what to add.

### Step 2: Create the MCP server (~3 min)

Create the `server` instance where the Step 2 TODO points. Check the [SDK docs](https://github.com/modelcontextprotocol/typescript-sdk#getting-started) for the exact API. The `main()` function is already implemented and waiting for a `server` to start.

After this step, **Inspector should show 5 tools** when you click Reconnect.

### Step 3: Implement the 2 tool TODOs (~10-15 min)

Two TODO comments are sprinkled across `src/index.ts`. Each tells you the tool name, the art constant to use, and a suggested combat-log line.

Use the **already-implemented tools next to each TODO** as your template. `defend_against_kick` at the top also shows a `zod` enum input via the `kick_type` parameter.

After each TODO is done, **click Reconnect in Inspector** to confirm the new tool appears. By the end, Inspector should show all **7 tools**.

### Test in your agent

Once your server boots successfully, your agent will reconnect automatically. Try a prompt:

> *"Call the dodge_bullet tool from neo-fight MCP"*

The braille art should appear.

---

## Part 2: Build the Skill (~20–30 min)

### Step 1: Fill in the skill scaffold

Open the skill file for your agent:

- **Codex users:** `.agents/skills/neo-kungfu/SKILL.md`
- **Claude Code users:** `.claude/skills/neo-kungfu/SKILL.md`
- **Cursor users:** `.cursor/skills/neo-kungfu/SKILL.md`

(All three files contain the same TODO scaffold. Edit only the one for your agent. You don't need to touch the others.)

Key things the agent cares about:

- **`description` at the top matters**. This is what the agent reads to decide *when* to invoke this skill. Be specific about combat triggers.
- **Tool Selection Rules**: explicit `if attack X → call tool Y` mappings. The clearer, the better.
- **Display the braille art exactly as-is, preserving all line breaks**. Make this an explicit instruction so the agent doesn't summarise or paraphrase the output.

### Step 2: Try it out

Save the file. The skill is auto-loaded, no install step needed. Restart your agent session if you want to be sure (Cursor: reload MCP/Skills in settings; Claude Code: restart `claude`).

Then prompt:

- *"Agent Smith shoots a gun at you"*
- *"Agent Smith throws a punch"*
- *"Agent Smith swings a sword at your head"*
- *"Fight Agent Smith. He starts with a punch, then pulls out a gun"*

If the skill triggers, you'll see Neo respond with dramatic narration + braille art. If it doesn't, refine your `description` and tool rules.

---

## Reference

| Resource | Link |
|---|---|
| Completed answer key | [`main` branch](../../tree/main) |
| MCP Inspector docs | https://modelcontextprotocol.io/docs/tools/inspector |
| Official MCP TypeScript SDK | https://github.com/modelcontextprotocol/typescript-sdk |
| MCP TypeScript quickstart | https://github.com/modelcontextprotocol/quickstart-resources/tree/main/weather-server-typescript |
| Claude Code Skills docs | https://docs.claude.com/en/docs/claude-code/skills |
