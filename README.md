# bluesky-firehose-test

Simple test project for [Bluesky](https://blueskyweb.xyz/) "firehose"

## Setup

> NOTE: This setup requires `nodejs@18` to use global fetch

Create a `.env` file with the config parameters

```conf
BLUESKY_SERVER=wss://bsky.social
BLUESKY_USERNAME=<username>
BLUESKY_PASSWORD=<password>
```

## Run

```bash
$ npm run dev
{
  "action": "create",
  "cid": "bafyreic3twfl4x3tc3semcsob3xxrbofrnmpcl3h5wdh3mdanefvdmi4oa",
  "record": {
    "text": "my brother in christ i have seen more nudes posted to my timeline in the last week on bluesky than on the last five years on twitter\n\nbluesky is a horny app it cannot be stopped, i'm simply going with the flow and using it to post the unhinged shit i don't want on twitter",
    "$type": "app.bsky.feed.post",
    "reply": {
      "root": {
        "cid": "bafyreibhj4m2bmhv6kpjbsgvtcrzmbrfu7mcfsfzyqzfyyp7lc4vm3uwea",
        "uri": "at://did:plc:htfa75auysuvvdsub63hkob4/app.bsky.feed.post/3juurw3ey622b"
      },
      "parent": {
        "cid": "bafyreigaou2ni2bswz7j4ipcb222pvqofi5sz6kbpyfiljsnkzmzdbswra",
        "uri": "at://did:plc:zqilevr5xkdpihzprvl6w3bt/app.bsky.feed.post/3juusrs2v3n26"
      }
    },
    "createdAt": "2023-05-04T04:03:04.719Z"
  },
  "blobs": [],
  "uri": "at://did:plc:htfa75auysuvvdsub63hkob4/app.bsky.feed.post/3juuszxpmrt2c"
}
{
  "action": "create",
  "cid": "bafyreifylqt4vujdrllue5pwenmxrpdlemxdpynnebshweu7i34vqx4r6a",
  "record": {
    "$type": "app.bsky.graph.follow",
    "subject": "did:plc:76uvxp22hlgaoq7gfhcs2p7a",
    "createdAt": "2023-05-04T04:03:04.715Z"
  },
  "blobs": [],
  "uri": "at://did:plc:5squev6iy7ddnhjikpt2wkqg/app.bsky.graph.follow/3juuszxrzvc2b"
}
{
  "action": "delete",
  "uri": "at://did:plc:q2pg4zn62kpugsot4zoeeeut/app.bsky.feed.repost/3juusqvjkht2h"
}
{
  "action": "create",
  "cid": "bafyreicmtzbiumdm5zj5kfnz4apdm2bkolmch5gqxr66iczdu6dv2xbjlq",
  "record": {
    "$type": "app.bsky.feed.like",
    "subject": {
      "cid": "bafyreien2j3nwd7h63b6clnbgvmjbjkywjhdk6lvfftvxsyz53zkr2mlku",
      "uri": "at://did:plc:vok247eewjmbmo3kxaizct2i/app.bsky.feed.post/3juurhdh3gc2h"
    },
    "createdAt": "2023-05-04T04:03:06.620Z"
  },
  "blobs": [],
  "uri": "at://did:plc:sw6wkbv2ma4vwgx5t5sl7dyu/app.bsky.feed.like/3juuszy4b2h2n"
}
```
