import * as dotenv from "dotenv";
dotenv.config();

import { Subscription } from "@atproto/xrpc-server";
import pkg from "@atproto/api";
import { WriteOpAction, cborToLexRecord, readCarWithRoot } from "@atproto/repo";
import { Commit } from "@atproto/api/dist/client/types/com/atproto/sync/subscribeRepos.js";
const { AtUri } = pkg;

const sub = new Subscription({
  service: process.env.BLUESKY_SERVER,
  method: "com.atproto.sync.subscribeRepos",
  validate: (body) => body,
});

for await (const frameBody of sub) {
  try {
    const commit = frameBody as Commit;
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
  } catch (err) {
    console.error("Unable to process frameBody", frameBody, err);
    // Halt for testing visibility
  }
}
