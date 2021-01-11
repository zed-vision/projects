"use strict";
import { __asyncValues } from "tslib";
importScripts("https://unpkg.com/ipfs@$$ipfs$$/dist/index.min.js");
importScripts("https://unpkg.com/comlink@$$comlink$$/dist/umd/comlink.js");
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
            if (options && options.onlyHash) {
                return (new IPFS.CID(0, 112, cid.multihash)).toString();
            }
            return cid.string;
        }
        catch (e) {
            console.info({ e });
        }
    },
    /**
     *
     * @param {*} files
     */
    addAll: async (files) => {
        var e_1, _a;
        try {
            ipfsNode = ipfsNode || await IPFS.create({ silent: true });
            const res = [];
            try {
                for (var _b = __asyncValues(ipfsNode.addAll(files)), _c; _c = await _b.next(), !_c.done;) {
                    const result = _c.value;
                    const { path, cid } = result;
                    const CID = cid.string;
                    res.push({ path, CID });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return res;
        }
        catch (e) {
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
        var e_2, _a;
        try {
            ipfsNode = ipfsNode || await IPFS.create({ silent: true });
            const res = [];
            console.log("GET DATA");
            try {
                for (var _b = __asyncValues(ipfsNode.cat(cid, options)), _c; _c = await _b.next(), !_c.done;) {
                    const result = _c.value;
                    console.log("RES", result);
                    res.push(new TextDecoder("utf-8").decode(result));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            console.log("CAT CAT", res);
            return res.join("");
        }
        catch (e) {
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
        var e_3, _a;
        try {
            ipfsNode = ipfsNode || await IPFS.create({ silent: true });
            const res = [];
            console.log("GET DATA");
            try {
                for (var _b = __asyncValues(ipfsNode.get(cid, options)), _c; _c = await _b.next(), !_c.done;) {
                    const result = _c.value;
                    console.log("RES", result);
                    res.push(new TextDecoder("utf-8").decode(result));
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            console.log("CAT CAT", res);
            return res.join("");
        }
        catch (e) {
            return (JSON.stringify({ e }));
        }
    },
};
// deno-lint-ignore ban-ts-comment
// @ts-ignore
// deno-lint-ignore no-undef
Comlink.expose(ipfsKV);
