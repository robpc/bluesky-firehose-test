import * as dotenv from "dotenv";
dotenv.config();

import { WebSocket } from "ws";
import { byMessage } from "@atproto/xrpc-server";
import pkg from "@atproto/api";
import { WriteOpAction, cborToLexRecord, readCarWithRoot } from "@atproto/repo";
import { Commit } from "@atproto/api/dist/client/types/com/atproto/sync/subscribeRepos.js";
const { BskyAgent, AtUri } = pkg;

const {
  BLUESKY_SERVER: service,
  BLUESKY_USERNAME: identifier,
  BLUESKY_PASSWORD: password,
} = process.env;

const agent = new BskyAgent({ service });

await agent.login({ identifier, password });

const host = service.replace(/^https?:/, "");
const ws = new WebSocket(`wss://${host}/xrpc/com.atproto.sync.subscribeRepos`);

const gen = byMessage(ws);
while (true) {
  const evt = await gen.next();

  if (evt.done || !evt.value) {
    console.log("done");
    await new Promise((r) => setTimeout(r, 1000));
    continue;
  }

  const frame = evt.value;
  if (frame.isError()) {
    console.log("Error:", frame.body.error, frame.body.message);
  } else if (frame.isMessage()) {
    if (frame.type === "#commit") {
      const commit = frame.body as Commit;
      const car = await readCarWithRoot(commit.blocks);

      const ops = [];

      commit.ops.forEach((op) => {
        // This section mostly minics the code in repo.getOps()
        const [collection, rkey] = op.path.split("/");
        if (
          op.action === WriteOpAction.Create ||
          op.action === WriteOpAction.Update
        ) {
          const cid = op.cid;
          const record = car.blocks.get(cid);
          ops.push({
            action: op.action,
            cid: op.cid.toString(),
            record: cborToLexRecord(record),
            blobs: [], // @TODO need to determine how the app-view provides URLs for processed blobs
            uri: AtUri.make(commit.repo, collection, rkey).toString(),
          });
        } else if (op.action === WriteOpAction.Delete) {
          ops.push({
            action: op.action,
            uri: AtUri.make(commit.repo, collection, rkey).toString(),
          });
        } else {
          console.log(`ERROR: Unknown repo op action: ${op.action}`);
        }

        ops.forEach((op) => console.log(JSON.stringify(op, null, 2)));
      });
    }
  }
}
