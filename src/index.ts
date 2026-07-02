#!/usr/bin/env node

// ─── Step 1: Add the missing MCP imports ─────────────────────────────────
// This file uses two things from the MCP SDK that aren't imported yet
// (docs: https://github.com/modelcontextprotocol/typescript-sdk#getting-started):
//   • `McpServer`:            used to create the server below
//   • `StdioServerTransport`: used to start the server in main()
//
// Add the import lines here. Your editor (or `tsx`) will keep yelling
// "Cannot find name 'McpServer'..." until you do. That's the hint.

import { z } from "zod";
import {
  KICK_DEFENSE_ART,
  PUNCH_DEFENSE_ART,
  PUNCH_ATTACK_ART,
  DODGE_BULLET_ART,
  SWORD_BLOCK_ART,
} from "./art.js";

// ─── Step 2: Create the MCP server ───────────────────────────────────────
// The tool registrations below assume a `server` variable exists.
// Instantiate the MCP server here and assign it to `const server`.
// Use "neo-fight" as the name. Check the SDK for the exact constructor
// (https://github.com/modelcontextprotocol/typescript-sdk#getting-started).
//
// TS errors will say "Cannot find name 'server'" until you do.

// ─── Martial Arts Tools ─────────────────────────────────────────────────

server.registerTool(
  "defend_against_kick",
  {
    title: "Defend Against Kick",
    description:
      "Block or evade an incoming kick attack. Use when the opponent attacks with any type of kick. IMPORTANT: You MUST display the returned braille art exactly as-is in your response, preserving all line breaks.",
    inputSchema: {
      kick_type: z
        .enum(["low kick", "high kick", "front kick"])
        .optional()
        .describe(
          "The type of kick the opponent threw, if specified. 'low kick' targets the legs, 'high kick' targets the head, 'front kick' is a straight push kick to the torso.",
        ),
    },
  },
  async ({ kick_type }) => {
    const defenseByKick: Record<string, string> = {
      "low kick": "Neo drops his elbow to absorb the impact",
      "high kick": "Neo ducks under the kick at the last second",
      "front kick": "Neo sidesteps and parries the strike",
    };
    const action = kick_type
      ? defenseByKick[kick_type]
      : "Neo blocks the incoming kick with a swift low guard";

    return {
      content: [
        {
          type: "text",
          text: `${action}!\n\n${KICK_DEFENSE_ART}\n\n[KUNG FU] Kick blocked! Neo's forearm absorbs the impact.`,
        },
      ],
    };
  },
);

server.registerTool(
  "defend_against_punch",
  {
    title: "Defend Against Punch",
    description:
      "Block or evade an incoming punch attack. Use when the opponent attacks with any type of punch. IMPORTANT: You MUST display the returned braille art exactly as-is in your response, preserving all line breaks.",
    inputSchema: {},
  },
  async () => ({
    content: [
      {
        type: "text",
        text: `Neo deflects the punch with an open palm redirect!\n\n${PUNCH_DEFENSE_ART}\n\n[KUNG FU] Punch deflected! Neo redirects the fist harmlessly past his face.`,
      },
    ],
  }),
);

server.registerTool(
  "attack_with_punch",
  {
    title: "Attack With Punch",
    description:
      "Throw a devastating punch at the opponent. Use when Neo needs to strike at close range. IMPORTANT: You MUST display the returned braille art exactly as-is in your response, preserving all line breaks.",
    inputSchema: {},
  },
  async () => ({
    content: [
      {
        type: "text",
        text: `Neo throws a lightning-fast straight punch!\n\n${PUNCH_ATTACK_ART}\n\n[KUNG FU] POW! Neo lands a devastating punch!`,
      },
    ],
  }),
);

// TODO 3a: a tool for Neo to deliver a kick to the opponent
//   - name: "attack_with_kick"
//   - art: KICK_ATTACK_ART
//   - suggested combat log: "[KUNG FU] WHAM! Neo's roundhouse kick connects!"
//   - use the implemented tools above (e.g. `attack_with_punch`) as a template

// ─── Firearms Tools ─────────────────────────────────────────────────────

server.registerTool(
  "dodge_bullet",
  {
    title: "Dodge Bullet",
    description:
      "Dodge an incoming bullet with bullet-time reflexes. Use when the opponent fires a gun or shoots at Neo. IMPORTANT: You MUST display the returned braille art exactly as-is in your response, preserving all line breaks.",
    inputSchema: {},
  },
  async () => ({
    content: [
      {
        type: "text",
        text: `Neo bends backwards in bullet-time, dodging the bullet!\n\n${DODGE_BULLET_ART}\n\n[FIREARMS] Bullet dodged! The bullet whizzes past in slow motion. Neo sees the ripple in the air.`,
      },
    ],
  }),
);

// ─── Sword Tools ────────────────────────────────────────────────────────

server.registerTool(
  "block_sword_attack",
  {
    title: "Block Sword Attack",
    description:
      "Block an incoming sword strike with a blade. Use when the opponent attacks with a sword. IMPORTANT: You MUST display the returned braille art exactly as-is in your response, preserving all line breaks.",
    inputSchema: {},
  },
  async () => ({
    content: [
      {
        type: "text",
        text: `Neo catches the blade mid-swing and blocks!\n\n${SWORD_BLOCK_ART}\n\n[SWORD] Blocked! Steel meets steel as Neo parries the blade.`,
      },
    ],
  }),
);

// TODO 3b: a tool for Neo to strike the opponent with a sword
//   - name: "attack_with_sword"
//   - art: SWORD_ATTACK_ART
//   - suggested combat log: "[SWORD] SLASH! Neo's blade cuts through the air with deadly speed!"

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Neo Fight MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
