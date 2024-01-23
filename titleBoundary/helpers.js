/**
 * Find each DrawBoundary node in a flow (live or published) and update its' content if not already matching default
 */
const updateDrawBoundaryNodeData = (flowData) => {
  let newFlowData = flowData;
  Object.entries(flowData)
    .filter(([_nodeId, nodeData]) => nodeData["type"] === 10 && nodeData["data"] !== defaultDrawBoundaryNodeData)
    .forEach(([drawBoundaryNodeId, _drawBoundaryNodeData]) => newFlowData[drawBoundaryNodeId]["data"] = defaultDrawBoundaryNodeData);
  return newFlowData;
}

const updatePropertyInformationNodeData = (flowData) => {
  let newFlowData = flowData;
  Object.entries(flowData)
    .filter(([_nodeId, nodeData]) => nodeData["type"] === 12 && nodeData["data"] !== defaultPropertyInformationNodeData)
    .forEach(([propertyInfoNodeId, _propertyInfoNodeData]) => newFlowData[propertyInfoNodeId]["data"] = defaultPropertyInformationNodeData);
  return newFlowData;
}

/**
 * Default DrawBoundary & PropertyInformation content as of 23 Jan 2024
 *   This isn't an ideal way to store or edit HTML. A nicer way to generate and update the content of this file is to:
 *     1. Update the node type directly in the editor using the RichText inputs, make note of its node ID in the URL
 *     2. In the console, run `copy(window.api.getState().flow["{your node id}"].data)`
 *     3. Paste formatted content here
 *     4. Run migration script to bulk update existing nodes across all applicable flows
 */
const defaultDrawBoundaryNodeData = {
  title: "Check or amend the outline of your property and works",
  description:
    "<p>The red line shown below should include:</p><ul><li><p>the outline of your property boundary</p></li><li><p>any works outside the property boundary</p></li><li><p>areas that will be closed off or you&apos;ll need access to during the works</p></li></ul><p>If the red line already includes all these, tap continue. If it does not, tap <em>More information</em> for guidance on how to amend or redraw the outline.</p>",
  dataFieldBoundary: "property.boundary.site",
  dataFieldArea: "property.boundary.area",
  hideFileUpload: false,
  titleForUploading: "Upload a location plan",
  descriptionForUploading:
    "<p>Your location plan must:</p><ul><li><p>be based on an accurate, recognisable map</p></li><li><p>be drawn to a scale, labelled, and/or marked with a scale bar</p></li><li><p>show the site outline in red</p></li><li><p>include a<strong> </strong>north point</p></li></ul>",
  info: "<p>This outline identifies the location of the proposed changes on a map. This information is required for all planning applications. It is sometimes called a &apos;red line drawing&apos; or &apos;location plan&apos;.</p>",
  policyRef:
    '<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.legislation.gov.uk/uksi/2015/595/article/7">The Town and Country Planning (Development Management Procedure) (England) Order 2015</a>,</p><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.gov.uk/government/collections/planning-practice-guidance">Planning Practice Guidance (PPG)</a></p>',
  howMeasured:
    '<p>We have pre-populated the map with a red outline that includes the entire property, using information from Land Registry.</p><p>In some cases, this outline might not include all the works or the areas that will be closed off. This could be the case if you are proposing works to a public highway (such as a dropped kerb), doing works that involve multiple properties, or works to a building that is part of a larger estate.</p><p>In these cases, you should amend the red outline by dragging the edges, or erase it by clicking the 🗑-icon on the map and draw a new outline.</p><p></p><h1>How to draw and amend the outline</h1><ol><li><p>Move the cursor to the corner you want to start with and click or tap once.</p></li><li><p>Move the cursor to the next corner and click or tap.</p></li><li><p>Repeat until you have the shape you need.</p></li><li><p>Click or tap the last corner again to stop drawing.</p></li><li><p>To amend the outline, click or tap on a line and drag it into a new position.</p></li></ol><img src="https://api.editor.planx.uk/file/public/dni98ojg/Draw_Outline_2.gif">',
};

const defaultPropertyInformationNodeData = {
  "title": "About the property",
  "description": "<p>This is the information we currently have about the property, including its title boundary shown in blue from the Land Registry</p>",
  "showPropertyTypeOverride": true
};

module.exports = { updateDrawBoundaryNodeData, updatePropertyInformationNodeData };