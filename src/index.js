import DiscordRPC from "discord-rpc";
const RPC = new DiscordRPC.Client({ transport: "ipc" });
import { text, intro, select } from "@clack/prompts";

const clientId = await text({
  message: "Whats your Client ID?",
  validate(value) {
    if (value.length === 0) return `Value is required!`;
  },
});

DiscordRPC.register(clientId);

intro(`DiscordRPC`);
const details = await text({
  message: "Whats the description (Line 1)",
  validate(value) {
    if (value.length === 0) return `Value is required!`;
  },
});
const state = await text({
  message: "Whats the description (Line 2)",
  validate(value) {
    if (value.length === 0) return `Value is required!`;
  },
});
const lImage = await text({
  message: "Whats the name of the small Image?",
  validate(value) {
    if (value.length === 0) return `Value is required!`;
  },
});
const liText = await text({
  message: "Whats the text on the large Image?",
  validate(value) {
    if (value.length === 0) return `Value is required!`;
  },
});
const sImage = await text({
  message: "Whats the name of the large Image?",
  validate(value) {
    if (value.length === 0) return `Value is required!`;
  },
});
const siText = await text({
  message: "Whats the text on the small Image?",
  validate(value) {
    if (value.length === 0) return `Value is required!`;
  },
});

async function setActivity() {
  if (!RPC) return;
  RPC.setActivity({
    details: details,
    state: state,
    startTimestamp: Date.now(),
    largeImageKey: lImage,
    largeImageText: liText,
    smallImageKey: sImage,
    smallImageText: siText,
    instance: false,
  });
}

RPC.on("ready", async () => {
  setActivity();

  setInterval(() => {
    setActivity();
  }, 15 * 1000);
});

RPC.login({ clientId: clientId }).catch((err) => console.error(err));
