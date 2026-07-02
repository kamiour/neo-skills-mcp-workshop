#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  KICK_DEFENSE_ART,
  PUNCH_DEFENSE_ART,
  PUNCH_ATTACK_ART,
  KICK_ATTACK_ART,
  DODGE_BULLET_ART,
  SWORD_BLOCK_ART,
  SWORD_ATTACK_ART,
} from "./art.js";

const server = new McpServer({
  name: "neo-fight",
  version: "1.0.0",
});

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
server.registerTool(
  "attack_with_kick",
  {
    title: "Attack With Kick",
    description:
      "Deliver a powerful kick to the opponent. Use when Neo needs to strike with maximum force. IMPORTANT: You MUST display the returned braille art exactly as-is in your response, preserving all line breaks.",
    inputSchema: {},
  },
  async () => ({
    content: [
      {
        type: "text",
        text: `Neo delivers a spinning roundhouse kick!\n\n${KICK_ATTACK_ART}\n\n[KUNG FU] WHAM! Neo's roundhouse kick connects!`,
      },
    ],
  }),
);

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
server.registerTool(
  "attack_with_sword",
  {
    title: "Attack With Sword",
    description:
      "Strike the opponent with a sword. Use when Neo needs to attack with a blade. IMPORTANT: You MUST display the returned braille art exactly as-is in your response, preserving all line breaks.",
    inputSchema: {},
  },
  async () => ({
    content: [
      {
        type: "text",
        text: `Neo slashes with lethal precision!\n\n${SWORD_ATTACK_ART}\n\n[SWORD] SLASH! Neo's blade cuts through the air with deadly speed!`,
      },
    ],
  }),
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Neo Fight MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
