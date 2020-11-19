const importScript = async (src)=>document.querySelector(`script[src="${src}"]`) || new Promise(function(resolve, reject) {
        const s = window.document.createElement("script");
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        window.document.head.appendChild(s);
    })
;
const makeDraggable = async ()=>{
    await importScript("https://unpkg.com/jsframe.js@1.6.2/lib/jsframe.min.js");
    return new Promise((resolve)=>{
        setTimeout(()=>{
            const JSFrame = window["JSFrame"];
            const jsFrame = new JSFrame({
                horizontalAlign: "left",
                verticalAlign: "top"
            });
            const frame = jsFrame.create({
                name: `Win2`,
                title: `Z`,
                left: (window.innerWidth - window.innerWidth * 0.7) / 2,
                top: 20,
                width: window.innerWidth * 0.7,
                height: 320,
                minWidth: 300,
                minHeight: 200,
                appearanceName: "material",
                appearanceParam: {
                    border: {
                        shadow: "2px 2px 10px  rgba(0, 0, 0, 0.5)",
                        width: 0,
                        radius: 6
                    },
                    titleBar: {
                        color: "white",
                        background: "#b22",
                        leftMargin: 40,
                        height: 30,
                        fontSize: 20,
                        buttonWidth: 36,
                        buttonHeight: 16,
                        buttonColor: "white",
                        fontWeight: "bolder",
                        buttons: [
                            {
                                fa: "fas fa-times",
                                name: "closeButton",
                                visible: true
                            },
                            {
                                fa: "fas fa-expand-arrows-alt",
                                name: "maximizeButton",
                                visible: true
                            },
                            {
                                fa: "fas fa-compress-arrows-alt",
                                name: "minimizedButton",
                                visible: false
                            }, 
                        ],
                        buttonsOnLeft: [
                            {
                                fa: "fas fa-bars",
                                name: "menu",
                                visible: true,
                                childMenuHTML: '<div class=\"list-group\">' + '  <div name=\"menu1\" class=\"list-group-item list-group-item-action py-2\">Menu Item 01</div>' + '  <div name=\"menu2\" class=\"list-group-item list-group-item-action py-2\">Menu Item 02</div>' + '  <div name=\"menu3\" class=\"list-group-item list-group-item-action py-2\">Menu Item 03</div>' + "</div>",
                                childMenuWidth: 300
                            }, 
                        ]
                    }
                },
                style: {
                    backgroundColor: "rgba(198,198,198,0.8)",
                    fontSize: "1rem",
                    overflow: "hidden",
                    width: "100%"
                },
                html: `<div id="root"></div>`
            }).show();
            frame.setControl({
                maximizeButton: "maximizeButton",
                demaximizeButton: "restoreButton",
                minimizeButton: "minimizeButton",
                deminimizeButton: "deminimizeButton",
                hideButton: "closeButton",
                animation: true,
                animationDuration: 150,
                maximizeWithoutTitleBar: true,
                restoreKey: "Escape"
            });
            frame.control.on("hid", (frame1, info)=>{
                frame1.closeFrame();
            });
            frame.control.on("maximized", (frame1, info)=>{
                jsFrame.showToast({
                    text: 'Press \"ESC\" to minimize.',
                    align: "center"
                });
            });
            frame.control.on("demaximized", (frame1, info)=>{
            });
            frame.on("menu", "click", (_frame, evt, info)=>{
                const name = evt.target.getAttribute("name");
                if (name && name.startsWith("menu")) {
                    alert(name + " clicked");
                }
            });
            resolve();
        });
    });
};
const startMonaco = async ({ onChange , code , language  })=>{
    const container = window.document.getElementById("container");
    if (!container) {
        const el = document.getElementById("container");
        el.id = "container";
        document.body.appendChild(el);
    }
    const modelUri = language === "typescript" ? "file:///main.tsx" : "file:///main.html";
    let aceEditor;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)) {
        const aceEl = window.document.createElement("div");
        aceEl.id = "ace";
        window.document.body.appendChild(aceEl);
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.min.js");
        language === "typescript" ? await loadScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-typescript.min.js") : await loadScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-html.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/theme-monokai.min.js");
        window.document.getElementById("ace").style.setProperty("display", "block");
        container.style.setProperty("display", "none");
        aceEditor = window["ace"].edit("ace");
        aceEditor.getSession().setMode("ace/mode/typescript");
        const setThemeForAce = (wait)=>setTimeout(()=>{
                let aceEditor1 = window["ace"].edit("ace");
                let theme = aceEditor1.getTheme();
                if (theme !== "ace/theme/monokai ") {
                    aceEditor1.setOptions({
                        fontSize: "14pt"
                    });
                    aceEditor1.setTheme("ace/theme/monokai");
                    setThemeForAce(2 * wait);
                }
            }, wait)
        ;
        setThemeForAce(100);
        aceEditor.setValue(code);
        aceEditor.blur();
    }
    if (window["monaco"] === undefined) {
        const vsPath = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs";
        const { require  } = await loadScript(`${"https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs"}/loader.min.js`);
        require.config({
            paths: {
                "vs": "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs"
            }
        });
        await new Promise((resolve)=>require([
                "vs/editor/editor.main"
            ], (monaco)=>{
                resolve(monaco);
            })
        );
    }
    const monaco = window["monaco"];
    const modules = {
        monaco: monaco,
        editor: monaco.editor.create(window.document.getElementById("container"), {
            formatOnType: true,
            scrollbar: {
                horizontal: "hidden",
                verticalHasArrows: true,
                verticalScrollbarSize: 20
            },
            minimap: {
                enabled: false
            },
            folding: false,
            multiCursorModifier: "alt",
            wordWrap: "on",
            wordWrapBreakAfterCharacters: ">([{]))],;}",
            mouseWheelZoom: false,
            wordWrapColumn: 80,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            autoIndent: "brackets",
            autoClosingQuotes: "always",
            padding: {
                bottom: 300
            },
            lineNumbers: "on",
            autoClosingBrackets: "always",
            autoClosingOvertype: "always",
            suggest: {
            },
            codeLens: true,
            autoSurround: "languageDefined",
            trimAutoWhitespace: true,
            codeActionsOnSaveTimeout: 100,
            model: monaco.editor.getModel(modelUri) || monaco.editor.createModel(code, language, monaco.Uri.parse(modelUri)),
            value: code,
            language: language,
            theme: "vs-dark"
        })
    };
    modules.editor.onDidChangeModelContent(()=>onChange(modules.editor.getValue())
    );
    aceEditor && aceEditor.session.on("change", function() {
        const value = aceEditor.getValue();
        modules.editor.setValue(value);
        onChange(value);
    });
    aceEditor && document.getElementById("container").replaceWith(document.getElementById("ace"));
    modules.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSuggestionDiagnostics: true,
        noSemanticValidation: true,
        noSyntaxValidation: true
    });
    if (language === "typescript") {
        const importHelper = [
            {
                name: "react",
                url: "https://unpkg.com/@types/react@16.9.56/index.d.ts",
                depend: [
                    "global",
                    "csstype",
                    "react-dom",
                    "prop-types"
                ]
            },
            {
                name: "global",
                url: "https://unpkg.com/@types/react@16.9.56/global.d.ts",
                depend: []
            },
            {
                name: "prop-types",
                url: "https://unpkg.com/@types/prop-types@15.7.3/index.d.ts",
                depend: []
            },
            {
                name: "react-dom",
                url: "https://unpkg.com/@types/react-dom@16.9.9/index.d.ts",
                depend: []
            },
            {
                name: "csstype",
                url: "https://unpkg.com/csstype@3.0.5/index.d.ts",
                depend: []
            },
            {
                name: "@emotion/styled/base.d.ts",
                url: "https://unpkg.com/@emotion/styled@11.0.0/types/base.d.ts",
                depend: [
                    "@emotion/react",
                    "@emotion/serialize",
                    "react"
                ]
            },
            {
                name: "@emotion/styled/index.d.ts",
                url: "https://unpkg.com/@emotion/styled@11.0.0/types/index.d.ts",
                depend: [
                    "@emotion/react",
                    "@emotion/serialize",
                    "react"
                ]
            },
            {
                name: "@emotion/cache/index.d.ts",
                url: "https://unpkg.com/@emotion/cache@11.0.0/types/index.d.ts",
                depend: [
                    "@emotion/utils"
                ]
            },
            {
                name: "@emotion/react/index.d.ts",
                url: "https://unpkg.com/@emotion/react@11.1.1/types/index.d.ts",
                depend: [
                    "@emotion/cache"
                ]
            },
            {
                name: "@emotion/react/jsx-namespace.d.ts",
                url: "https://unpkg.com/@emotion/react@11.1.1/types/jsx-namespace.d.ts",
                depend: [
                    "@emotion/utils",
                    "csstype"
                ]
            },
            {
                name: "@emotion/react/css-prop.d.ts",
                url: "https://unpkg.com/@emotion/react@11.1.1/types/css-prop.d.ts",
                depend: [
                    "@emotion/utils",
                    "csstype"
                ]
            },
            {
                name: "@emotion/react/helper.d.ts",
                url: "https://unpkg.com/@emotion/react@11.1.1/types/helper.d.ts",
                depend: [
                    "@emotion/utils",
                    "csstype"
                ]
            },
            {
                name: "@emotion/react/theming.d.ts",
                url: "https://unpkg.com/@emotion/react@11.1.1/types/theming.d.ts",
                depend: [
                    "@emotion/utils",
                    "csstype"
                ]
            },
            {
                name: "@emotion/serialize/index.d.ts",
                url: "https://unpkg.com/@emotion/serialize@1.0.0/types/index.d.ts",
                depend: [
                    "@emotion/utils",
                    "csstype"
                ]
            },
            {
                name: "@emotion/utils/index.d.ts",
                url: "https://unpkg.com/@emotion/utils@1.0.0/types/index.d.ts",
                depend: []
            }, 
        ];
        const dts = importHelper.map(({ name , url  })=>(async ()=>modules.monaco.languages.typescript.typescriptDefaults.addExtraLib(await (await fetch(url)).text(), name.includes("@emotion") ? `file:///node_modules/${name}` : `file:///node_modules/@types/${name}/index.d.ts`)
            )()
        );
        modules.monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            target: modules.monaco.languages.typescript.ScriptTarget.ESNext,
            allowNonTsExtensions: true,
            allowUmdGlobalAccess: true,
            strict: true,
            allowJs: true,
            noEmitOnError: true,
            allowSyntheticDefaultImports: true,
            moduleResolution: modules.monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            module: modules.monaco.languages.typescript.ModuleKind.CommonJS,
            noEmit: true,
            typeRoots: [
                "node_modules/@types"
            ],
            jsx: modules.monaco.languages.typescript.JsxEmit.React,
            jsxFactory: "React.createElement",
            jsxFragmentFactory: "React.Fragment",
            esModuleInterop: true
        });
        await Promise.all(dts);
        modules.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSuggestionDiagnostics: false,
            noSemanticValidation: false,
            noSyntaxValidation: false
        });
        return modules;
    }
};
function loadScript(src) {
    return new Promise(function(resolve, reject) {
        var s;
        s = window.document.createElement("script");
        s.src = src;
        s.onload = ()=>resolve(window)
        ;
        s.onerror = reject;
        window.document.head.appendChild(s);
    });
}
const starter = `import React from "react";\nimport ReactDOM from "react-dom";\n/** @jsx jsx */\nimport styled from "@emotion/styled";\n\nconst Counter = () => {\n  const [clicks, setClicks] = React.useState(0);\n\n  return <Container>\n    <Button css={\`background: green\`} onClick={() => setClicks(clicks - 1)}>\n      -\n    </Button>\n    {clicks}\n    <Button css={\`background: red\`} onClick={() => setClicks(clicks + 1)}>\n      +\n    </Button>\n  </Container>;\n};\n\nconst Container = styled.div\`\n  margin: 2em;\n  display: inline-block;\n  min-width: 200px;\n  background: white;\n  border: 4px dotted red;\n  border-radius: 30px;\n  padding: 1rem;\n\`;\n\nconst Button = styled.button\`\n  text-align: center;\n  display: inline-block;\n  border-radius: 6px;\n  padding: 0.5rem 0;\n  margin: 0.5rem 2rem;\n  width: 4rem;\n  color: white;\n  border: none;\n  :focus{\n    outline: none;\n  }\n  \`;\n\nconst elementToRender = document.getElementById("root");\nReactDOM.render(<Counter />, elementToRender);\n\n`;
const document = window.document;
let firstLoad = true;
let busy = 0;
let keystrokeTillNoError = 0;
let latestCode = "";
let errorReported = "";
let latestSavedCode = "";
let latestGoodCode = "";
export async function run() {
    await importScript("https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js");
    await importScript("https://unpkg.com/@emotion/react@11.1.1/dist/emotion-react.umd.min.js");
    await importScript("https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js");
    const workerDomImport = importScript("https://unpkg.com/@ampproject/worker-dom@0.27.4/dist/main.js");
    await makeDraggable();
    await importScript("https://unpkg.com/@babel/standalone@7.12.6/babel.min.js");
    (async ()=>{
        const example = getCodeToLoad();
        latestGoodCode = example;
        const modules = await startMonaco({
            language: "typescript",
            code: example,
            onChange
        });
        function onChange(code) {
            if (!modules) return;
            latestCode = code;
            if (!busy) {
                runner(latestCode);
            } else {
                const myCode = code;
                const cl = setInterval(()=>{
                    if (code !== latestCode || !busy) {
                        clearInterval(cl);
                    }
                    if (!busy) {
                        runner(latestCode);
                    }
                }, 100);
            }
        }
        async function getErrors() {
            if (!modules || !modules.monaco) return;
            const modelUri = modules.monaco.Uri.parse("file:///main.tsx");
            const tsWorker = await modules.monaco.languages.typescript.getTypeScriptWorker();
            const diag = await (await tsWorker(modelUri)).getSemanticDiagnostics("file:///main.tsx");
            const comp = await (await tsWorker(modelUri)).getCompilerOptionsDiagnostics("file:///main.tsx");
            const syntax = await (await tsWorker(modelUri)).getSyntacticDiagnostics("file:///main.tsx");
            return [
                ...diag,
                ...comp,
                ...syntax
            ];
        }
        async function runner(cd) {
            const { diff  } = await import("../dist/diff.min.js");
            if (busy === 1) {
                return;
            }
            try {
                busy = 1;
                const err = await getErrors();
                const errorDiv = document.getElementById("error");
                busy = 0;
                if (cd !== latestCode) {
                    return;
                }
                if (err && err.length) {
                    if (latestCode != cd) {
                        return;
                    }
                    if (errorReported === cd) {
                        return;
                    }
                    document.getElementById("root").classList.add("transparent");
                    const slices = diff(latestGoodCode, cd, 0);
                    if (slices.length <= 3) {
                        modules.monaco.editor.setTheme("hc-black");
                        return;
                    }
                    errorDiv.innerHTML = err[0].messageText.toString();
                    document.getElementById("root").style.setProperty("dispay", "none");
                    errorDiv.style.display = "block";
                    errorReported = cd;
                    modules.monaco.editor.setTheme("vs-light");
                    setTimeout(()=>{
                        modules.monaco.editor.setTheme("hc-black");
                    }, keystrokeTillNoError++);
                    return;
                }
                latestGoodCode = cd;
                errorDiv.style.display = "none";
                modules.monaco.editor.setTheme("vs-dark");
                document.getElementById("root").classList.remove("transparent");
                keystrokeTillNoError = 0;
                busy = 0;
                restartCode(transpileCode(cd));
            } catch (err) {
                busy = 0;
                if (cd !== latestCode) {
                    return;
                }
                modules.monaco.editor.setTheme("vs-light");
                setTimeout(()=>{
                    modules.monaco.editor.setTheme("hc-black");
                }, 10);
                console.error(err);
            }
        }
    })();
    restartCode(transpileCode(getCodeToLoad()));
    document.getElementById("root").setAttribute("style", "display:block");
    await workerDomImport;
    async function restartCode(transpileCode) {
        const searchRegExp = /import/gi;
        const replaceWith = "///";
        const code = transpileCode.replaceAll(/import/gi, "///").replace("export default", "const DefaultElement = ");
        console.log(code);
        const url = createSourceBlob(code);
        console.log(url);
        const restart = ()=>{
            const renderToString = new Function("code", `return function(){  \n        \n        ${code}\n\n        console.log(DefaultElement);\n      }`)();
            renderToString();
            const rootEl = document.getElementById("main-root");
            rootEl.setAttribute("src", url);
            console.log(rootEl);
            MainThread.upgradeElement(rootEl, "https://unpkg.com/@ampproject/worker-dom@0.27.4/dist/worker/worker.js");
        };
        if (!firstLoad) {
            const saveCode = async (latestCode1)=>{
                if (latestCode1 !== latestGoodCode) return;
                if (latestSavedCode === latestCode1) return;
                latestSavedCode = latestCode1;
                const body = {
                    codeTranspiled: transpileCode,
                    code: latestGoodCode
                };
                const stringBody = JSON.stringify(body);
                const request = new Request("https://code.zed.vision", {
                    body: stringBody,
                    method: "POST",
                    headers: {
                        "content-type": "application/json;charset=UTF-8"
                    }
                });
                const response = await fetch(request);
                const { hash  } = await response.json();
                try {
                    const localStorage = window.localStorage;
                    const prevHash = localStorage.getItem("codeBoXHash");
                    if (prevHash !== hash) {
                        localStorage.setItem("codeBoXHash", hash);
                        localStorage.setItem(hash, latestGoodCode);
                        setQueryStringParameter("h", hash);
                    }
                } catch (e) {
                    console.log("no localStorage");
                }
            };
            const codeToSaveForSure = latestCode;
            setTimeout(()=>saveCode(latestCode)
            , 500);
        }
        firstLoad = false;
        restart();
    }
    function getCodeToLoad() {
        const search = new URLSearchParams(window.location.search);
        const h = search.get("h") || localStorage.getItem("codeBoXHash");
        return h && window.localStorage.getItem(h) || window.localStorage.getItem("STARTER") || starter;
    }
    function transpileCode(code) {
        return Babel.transform(code, {
            plugins: [],
            presets: [
                "react",
                [
                    "typescript",
                    {
                        isTSX: true,
                        allExtensions: true
                    }
                ], 
            ]
        }).code;
    }
}
function setQueryStringParameter(name, value) {
    const params = new URLSearchParams(window.location.search);
    params.set(name, value);
    window.history.replaceState({
    }, "", decodeURIComponent(`${window.location.pathname}?${params}`));
}
function createSourceBlob(code) {
    const blob = new Blob([
        code
    ], {
        type: "text/javascript"
    });
    const url = window.URL.createObjectURL(blob);
    return url;
}

