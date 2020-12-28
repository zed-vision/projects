let ipfsClient;
async function getClient() {
  if (ipfsClient) {
    return ipfsClient;
  }

  ipfsClient = (await (await new Function(
    `return import("https://ipfs.io/ipfs/Qme7nBm2zRY6NQaCqV1jwAuEKkZwTsnAHgWcEpiDdzfkVR/src/ipfsKV.js")`,
  )()).getIpfsClient());
  return ipfsClient;
}

 const hash = async (data, onlyHash) =>
  (await getClient()).add(data, { onlyHash });

 const getHash = async (cid, timeout) =>
  (await getClient()).get(cid, timeout);
