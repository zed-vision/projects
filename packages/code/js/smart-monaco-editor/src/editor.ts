import { getMonaco } from "./monaco.js";
interface StartMonacoProps {
  onChange: (code: string) => void;
  code: string;
  container: HTMLElement;
  language: "html" | "javascript" | "typescript";
  options: {
    gylph: boolean;
  };
}

export default async (
  { onChange, code, language, container, options }: StartMonacoProps,
) => {
  const monaco = await getMonaco();
  const modelUri = monaco.Uri.parse(
    language === "typescript" ? "file:///main.tsx" : "file:///main.html",
  );

  const createModel = () =>
    monaco.editor.createModel(
      code,
      language,
      modelUri,
    );

  const getModel = () => {
    try {
      let model = monaco.editor.getModel(modelUri);
      if (model) return model;
      return createModel();
    } catch {
      return createModel();
    }
  };

  const model = getModel();

  const modules = {
    monaco: monaco,
    editor: monaco.editor.create(
      container,
      {
        formatOnType: false,
        scrollbar: {
          horizontal: "hidden",
          verticalHasArrows: true,
          verticalScrollbarSize: 20,
        },
        minimap: {
          enabled: false,
        },
        folding: false,
        glyphMargin: false,
        wordWrap: "off",
        mouseWheelZoom: false,
        wordWrapColumn: 80,
        useTabStops: false,
        dragAndDrop: false,
        disableLayerHinting: true,
        formatOnPaste: false,
        disableMonospaceOptimizations: true,
        showUnused: true,

        //       glyphMargin: true,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        autoIndent: "full",
        accessibilitySupport: "off",
        autoClosingQuotes: "beforeWhitespace",
        padding: {
          bottom: 300,
        },
        lineNumbers: "on",

        autoClosingBrackets: "beforeWhitespace",

        autoClosingOvertype: "auto",

        suggest: {},
        codeLens: true,
        autoSurround: "languageDefined",
        // acceptSuggestionOnCommitCharacter: true,
        trimAutoWhitespace: false,
        codeActionsOnSaveTimeout: 100,
        model,
        value: code,
        language: language,
        theme: "vs-dark",
        ...options,
      },
    ),
  };

  modules.editor.onDidChangeModelContent(() =>
    onChange(modules.editor.getValue())
  );

  modules.monaco.languages.typescript.typescriptDefaults
    .setDiagnosticsOptions({
      noSuggestionDiagnostics: true,
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

  if (language === "typescript") {
    const importHelper = [
      {
        name: "react",
        url: "@types/react@17.0.0/index.d.ts",
        depend: ["global", "csstype", "react-dom", "prop-types"],
      },
      {
        name: "global",
        url: "@types/react@17.0.0/global.d.ts",
        depend: [],
      },
      {
        name: "prop-types",
        url: "@types/prop-types@15.7.3/index.d.ts",
        depend: [],
      },
      {
        name: "react-dom",
        url: "@types/react-dom@17.0.0/index.d.ts",
        depend: [],
      },
      {
        name: "csstype",
        url: "csstype@3.0.6/index.d.ts",
        depend: [],
      },
      {
        name: "@emotion/styled/base.d.ts",
        url: "@emotion/styled@11.0.0/types/base.d.ts",
        depend: [
          "@emotion/react",
          "@emotion/serialize",
          "react",
        ],
      },
      {
        name: "@emotion/styled/index.d.ts",
        url: "@emotion/styled@11.0.0/types/index.d.ts",
        depend: [
          "@emotion/react",
          "@emotion/serialize",
          "react",
        ],
      },
      {
        name: "@emotion/cache/index.d.ts",
        url: "@emotion/cache@11.0.0/types/index.d.ts",
        depend: ["@emotion/utils"],
      },
      {
        name: "@emotion/react/index.d.ts",
        url: "@emotion/react@11.1.4/types/index.d.ts",
        depend: ["@emotion/cache"],
      },
      {
        name: "@emotion/react/jsx-namespace.d.ts",
        url: "@emotion/react@11.1.4/types/jsx-namespace.d.ts",
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/react/css-prop.d.ts",
        url: "@emotion/react@11.1.4/types/css-prop.d.ts",
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/react/helper.d.ts",
        url: "@emotion/react@11.1.4/types/helper.d.ts",
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/react/theming.d.ts",
        url: "@emotion/react@11.1.4/types/theming.d.ts",
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/serialize/index.d.ts",
        url: "@emotion/serialize@1.0.0/types/index.d.ts",

        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/utils/index.d.ts",
        url: "@emotion/utils@1.0.0/types/index.d.ts",
        depend: [],
      },
      {
        name: "framer-motion",
        url: "@types/framer-motion.d.ts",
        depend: [],
      },
      {
        name: "popmotion",
        url: "popmotion@9.1.0/lib/index.d.ts",
      },
      {
        name: "@zedvision/qrious/index.d.ts",
        url: "@zedvision/qrious@10.12.14/dist/qrious.d.ts",
      },
    ];
    const dts = importHelper.map(({ name, url }) =>
      (async () =>
        modules.monaco.languages.typescript.typescriptDefaults.addExtraLib(
          await (await fetch(`./js/smart-monaco-editor/node_legacy/${url}`))
            .text(),
          name.includes("@")
            ? `file:///node_modules/${name}`
            : `file:///node_modules/@types/${name}/index.d.ts`,
        ))()
    );

    modules.monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
      {
        target: 99,
        allowNonTsExtensions: true,
        allowUmdGlobalAccess: true,
        strict: true,
        allowJs: true,
        noEmitOnError: true,
        allowSyntheticDefaultImports: true,
        moduleResolution: 2, //nodeJS
        module: 99,
        noEmit: true,

        typeRoots: ["node_modules/@types"],
        jsx: "react-jsx",
        esModuleInterop: true,
      },
    );

    await Promise.all(dts);

    modules.monaco.languages.typescript.typescriptDefaults
      .setDiagnosticsOptions({
        noSuggestionDiagnostics: false,
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });
    return modules;
  }
};