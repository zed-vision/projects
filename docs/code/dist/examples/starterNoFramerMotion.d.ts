export const starter: "import { useState } from \"react\";\nimport { css, Global } from \"@emotion/react\";\n\nconst Slider = () => {\n  const steps = 128;\n  const [sliderValue, setSlider] = useState(steps / 2);\n  return <>\n    <input max={steps}\n      css={`\n        appearance: none;\n        width: 100%;\n        height: 40px; \n        background: rgb(${255 / steps * sliderValue} ${255 / steps * (steps - sliderValue)} 0); \n        outline: none; \n    `} type=\"range\"\n      aria-label=\"font size changer\"\n      value={sliderValue}\n      step=\"1\"\n      onChangeCapture={(e) => setSlider(Number(e.currentTarget.value))}>\n    </input>\n    <p\n      css={css`\n        font-size: ${72 / steps * sliderValue}px\n        `}>\n      Example when the text gets bigger...\n    </p>\n    <p css={css`\n        font-size: ${72 / steps * (steps - sliderValue)}px\n        `}>\n      ...or smaller\n    </p>\n  </>\n}\n\nexport default () => <>\n  <Global styles={css`\n      body{\n          margin: 0;\n          overflow: overlay;\n        }  \n    `} />\n  <Slider />\n</>\n";