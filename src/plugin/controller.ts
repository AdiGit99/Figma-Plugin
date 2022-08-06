figma.showUI(__html__, { width: 320, height: 380 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "find-and-replace") {
    //Must have at least one type of node to apply function to
    if (msg.selection.length == 0) {
      figma.ui.postMessage({
        type: "find-and-replace-error",
        message: `Please select at least one type to apply`,
      });
    } else {
      // Finds all nodes with selection type
      const nodes = figma.root.findAllWithCriteria({
        types: msg.selection,
      });
      // Proceed if at least one node is found
      if (nodes.length > 0) {
        /* From filtered list of nodes, find nodes that match find text
               4 cases: case sensitive and exact, case sensitive and contain only
               not case sensitive and exact, not case sensitive and contain only */

        // If case sensitive and exact
        if (msg.caseSensitive && msg.exact) {
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].name === msg.findText) {
              nodes[i].name = msg.replaceText;
            }
          }
        }
        // If case sensitive and contain only
        else if (msg.caseSensitive && !msg.exact) {
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].name.includes(msg.findText)) {
              nodes[i].name = msg.replaceText;
            }
          }
        }
        // If not case sensitive and exact
        else if (!msg.caseSensitive && msg.exact) {
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].name.toLowerCase() === msg.findText.toLowerCase()) {
              nodes[i].name = msg.replaceText;
            }
          }
        }
        // If not case sensitive and contain only
        else if (!msg.caseSensitive && !msg.exact) {
          for (let i = 0; i < nodes.length; i++) {
            if (
              nodes[i].name.toLowerCase().includes(msg.findText.toLowerCase())
            ) {
              nodes[i].name = msg.replaceText;
            }
          }
        }
      }
      //If no nodes found, report for clarity
      else {
        figma.ui.postMessage({
          type: "find-and-replace-error",
          message: `No matching name found`,
        });
      }
    }
    figma.ui.postMessage({
      type: "find-and-replace-confirmed",
      message: `Replacement completed successfully`,
    });
  }
};
