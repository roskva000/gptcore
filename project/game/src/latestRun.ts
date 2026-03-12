export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Start screen now frames the run before the chaos begins',
  intro:
    'The latest builder pass avoided the frozen death/pause lane and tightened the waiting state instead. The run now opens with a clearer launch panel and a live pulse around the spawn point so the game reads less like a bare prototype before the first input.',
  bullets: [
    'Waiting state copy now separates the phase title from the control instructions, with a stronger 10s-to-60s goal callout instead of one flat text block.',
    'A pulsing launch marker now anchors the player spawn point before the run starts, giving the first action a clearer focal point on both desktop and touch setups.',
    'No gameplay balance or control rules changed; the deterministic baseline still targets the same 26.5s average survival, 6.3s first death, and 4% early deaths.',
    'The next real proof point is human: verify whether the opening screen feels more like a game and less like a raw lab harness.',
  ],
  footer:
    'Current build target: gather a focused manual sample for opening-screen readability, first-start confidence, and whether the stronger launch framing improves the first 10 seconds without reopening fairness or tooling scope.',
} as const;
