"use strict";
(() => {
  // lib/code.ts
  figma.showUI(__html__, { width: 600, height: 600 });
  figma.ui.onmessage = async (msg) => {
    if (msg.type === "file-selected") {
      const fileData = msg.data;
      console.log("File data:", fileData);
    }
    if (msg.type === "create-image") {
      const { dataURL } = msg;
      const image = figma.createImage(new Uint8Array(await (await fetch(dataURL)).arrayBuffer()));
      const imageNode = figma.createRectangle();
      imageNode.fills = [{ type: "IMAGE", scaleMode: "FILL", imageHash: image.hash }];
      imageNode.resize(500, 500);
      figma.currentPage.appendChild(imageNode);
      figma.viewport.scrollAndZoomIntoView([imageNode]);
      figma.closePlugin();
    }
  };
})();
