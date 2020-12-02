export function renderDraggableEditor() {
  const jsFrame = new JSFrame();
  const frame = jsFrame.create({
    name: `Win`,
    title: ``,
    width: (window.innerWidth / 2) - 40,
    height: 600,
    minWidth: 300,
    minHeight: 300,
    appearanceName: "material",
    appearanceParam: {
      titleBar: {
        color: "white",
        height: 40,
        background: "#1e1e1e",
      },
    },
    style: {
      backgroundColor: "rgba(255,255,255,0.8)",
      overflow: "auto",
    },

    style: {
      backgroundColor: "rgba(0,0,0,0.8)",
      overflow: "hidden",
      width: "100%",
    },

    html: '<div id="container"></div>',
  });
  frame.setPosition(window.innerWidth - 32, 32, "RIGHT_TOP");
  frame.setControl({
    maximizeButton: "maximizeButton",
    demaximizeButton: "restoreButton",
    minimizeButton: "minimizeButton",
    deminimizeButton: "deminimizeButton",
    hideButton: "closeButton",
    animation: true,
    animationDuration: 150,
  });
  frame.control.on("hid", (frame, info) => {
    frame.closeFrame();
  });

  //Callback when calling after mazimization
  frame.control.on("maximized", (frame, info) => {
    jsFrame.showToast({
      text: "Maximized",
    });
  });
  frame.control.on("demaximized", (frame, info) => {
  });
  frame.control.on("minimized", (frame, info) => {
  });
  frame.control.on("dminimized", (frame, info) => {
  });
  frame.show();

  console.log(frame);
}
