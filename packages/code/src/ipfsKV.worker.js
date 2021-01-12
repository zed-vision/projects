importScripts("https://unpkg.com/ipfs@$$ipfs$$/dist/index.min.js");
importScripts("https://unpkg.com/comlink@$$comlink$$/dist/umd/comlink.js");

// @ts-ignore
addEventListener("install", () => skipWaiting());
// @ts-ignore
addEventListener("activate", () => clients.claim());

// deno-lint-ignore ban-ts-comment
// @ts-ignore
const IPFS = (() => globalThis.Ipfs)();

/** @type {{ add: (arg0: string, arg1: { onlyHash: boolean; }) => PromiseLike<{ cid: any; }> | { cid: any; }; addAll: (arg0: any) => any; cat: (arg0: string, arg1: { offset?: number | undefined; length?: number | undefined; timeout?: number | undefined; signal?: AbortSignal | undefined; }) => any; get: (arg0: string, arg1: { offset?: number | undefined; length?: number | undefined; timeout?: number | undefined; signal?: AbortSignal | undefined; }) => any; }} */
let ipfsNode;

const ipfsKV = {
  /**
 * @param {string} data
 * @param {{ onlyHash: boolean; }} options
 */
  add: async (data, options) => {
    try {
      ipfsNode = ipfsNode || await IPFS.create({ silent: true });

      // console.log(await ipfsNode.config.getAll())

      const { cid } = await ipfsNode.add(data, options);

      if (
        options && options.onlyHash
      ) {
        return (new IPFS.CID(0, 112, cid.multihash)).toString();
      }

      return cid.string;
    } catch (e) {
      console.info({ e });
    }
  },
  /**
   * 
   * @param {*} files 
   */
  addAll: async (files) => {
    try {
      ipfsNode = ipfsNode || await IPFS.create({ silent: true });
      const res = [];

      for await (const result of ipfsNode.addAll(files)) {
        const { path, cid } = result;
        const CID = cid.string;
        res.push({ path, CID });
      }

      return res;
    } catch (e) {
      return ({ e });
    }
  },

  /**
   * 
   * @param {string} cid 
   * @param {{
    *          offset?: number;
    *          length?: number;
    *          timeout?: 	number;
    *         signal?: 	AbortSignal;
     *        }}  options 
    */
  cat: async (cid, options) => {
    try {
      ipfsNode = ipfsNode || await IPFS.create({ silent: true });
      const res = [];

      for await (const result of ipfsNode.cat(cid, options)) {
        console.log("RES", result);
        res.push(new TextDecoder("utf-8").decode(result));
      }

      return res.join("");
    } catch (e) {
      return (JSON.stringify({ e }));
    }
  },

  /**
   * 
   * @param {string} cid 
   * @param {{
    *          offset?: number;
    *          length?: number;
    *          timeout?: 	number;
    *         signal?: 	AbortSignal;
     *        }}  options 
    */
  getData: async (cid, options) => {
    try {
      ipfsNode = ipfsNode || await IPFS.create({ silent: true });
      const res = [];

      for await (const result of ipfsNode.get(cid, options)) {
        console.log("RES", result);
        res.push(new TextDecoder("utf-8").decode(result));
      }

      return res.join("");
    } catch (e) {
      return (JSON.stringify({ e }));
    }
  },
};
// deno-lint-ignore no-undef
// @ts-ignore
self.addEventListener("connect", (e) => {
  var port = e.ports[0];

  // @ts-ignore
  port.onmessage = function (event) {
    if (event.data.comlinkInit) {
      //@ts
      // @ts-ignore
      Comlink.expose(ipfsKV, event.data.port);
      return;
    }
  };
});

// deno-lint-ignore no-undef
// @ts-ignore
self.addEventListener("message", (event) => {
  if (event.data.comlinkInit) {
    //@ts
    // @ts-ignore
    Comlink.expose(ipfsKV, event.data.port);
    return;
  }
});
