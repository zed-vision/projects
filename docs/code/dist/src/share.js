import { getZkey } from "./data.js";
export const shareItAsHtml = async ({ code, HTML }) => {
    var _a;
    const bodyClass = String((_a = window.document.getElementById("zbody")) === null || _a === void 0 ? void 0 : _a.getAttribute("class"));
    const css = Array.from(window.document.querySelector("head > style[data-emotion=css]").sheet
        .cssRules).map((x) => x.cssText).filter((cssRule) => HTML.includes(cssRule.substring(3, 8))).join("\n  ").replace(`.${bodyClass}`, "body");
    const { getHtml } = await import("./templates.js");
    const linkToCode = await saveToIPFS(code, "application/javascript");
    console.log({
        HTML,
        linkToCode,
        css,
        code,
    });
    const res = await addAll([{ path: "/app/index.html", content: getHtml({ HTML, css }) }, { path: "/app/app.js", content: code }]);
    const appDir = res.find(x => x.path === "app");
    // await saveHtml(
    //   getHtml({ HTML, css, link: linkToCode }),
    // );
    return `https://ipfs.io/ipfs/${appDir.CID}`;
};
function saveHtml(html) {
    return saveToIPFS(html, "text/html");
}
///import("./src/ipfsKV.js").then((mod)=>mod.ipfsKV).then(x=>x.add("diddiwohfqwyie",{onlyHash: true}))
async function saveToIPFS(content, type) {
    const { ipfsKV } = await import("./ipfsKV.js");
    const cid = await ipfsKV.add(content, {});
    return `https://ipfs.io/ipfs/${cid}`;
}
async function addAll(files) {
    const { ipfsKV } = await import("./ipfsKV.js");
    const result = await ipfsKV.addAll(files);
    return result;
}
async function save(content, type) {
    const { sha256 } = await import("https://unpkg.com/@zedvision/sha256@10.12.14/sha256.js");
    const hash = await sha256(content);
    const request = new Request("https://code.zed.vision", {
        body: content,
        method: "POST",
        headers: {
            "Content-Type": type + ";charset=UTF-8",
            "ZKEY": await getZkey(hash),
        },
    });
    await fetch(request);
    return `https://code.zed.vision/${hash}`;
}