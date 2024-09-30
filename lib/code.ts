figma.showUI(__html__, { width: 600, height: 600 });

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'file-selected') {
      const fileData = msg.data;
      // Handle the file data (e.g., add a 3D object to the Figma document)
      console.log('File data:', fileData);
    }
    if (msg.type === 'create-image') {
      const { dataURL } = msg;
  
      // Create an image node
      const image = figma.createImage(new Uint8Array(await (await fetch(dataURL)).arrayBuffer()));
      const imageNode = figma.createRectangle();
      imageNode.fills = [{ type: 'IMAGE', scaleMode: 'FILL', imageHash: image.hash }];
      imageNode.resize(500, 500); // Resize the image node as needed
      figma.currentPage.appendChild(imageNode);
  
      // Zoom in on the newly created image node
      figma.viewport.scrollAndZoomIntoView([imageNode]);

      // Close the plugin
      figma.closePlugin();
    }
  };

