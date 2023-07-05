export {};

// import { NodeDescription } from '../../server/NodeDescription';
// import { SerializedReactFlow } from './SerializedReactFlow';
// import { ServerClient } from './ServerClient';

// export class WorkerClient implements ServerClient {
//   private worker: Worker;

//   constructor(
//     private setAvailableNodes: (nodes: NodeDescription[]) => void,
//     private updateEdgeCounts: (edgeCounts: Record<string, number>) => void,
//   ) {
//     this.worker = new Worker("./worker.js");
//   }

//   init() {
//     console.log("Hey, I'm the worker client! Im cool!")
//     this.worker.addEventListener("message", (event) => {
//       const parsed = JSON.parse(event.data);

//       if (parsed.type === "DescribeResponse") {
//         console.log("Got describe response: ", parsed)
//         this.setAvailableNodes(parsed.availableNodes);
//         return;
//       }

//       if (parsed.type === "ExecutionUpdate") {
//         this.updateEdgeCounts(parsed.counts);
//         return;
//       }

//       if (parsed.type === "ExecutionResult") {
//         setTimeout(() => alert("Execution complete 💫"), 100);
//         return;
//       }

//       throw new Error("Unknown message type: " + parsed.type);
//     });

//     this.worker.addEventListener("error", (error) => {
//       console.error("Worker error: ", error);
//     });

//     // Ask the worker to describe capabilities
//     this.describe();
//   }

//   describe() {
//     const message = JSON.stringify({
//       type: "describe",
//     });

//     this.worker.postMessage(message);
//   }

//   run(reactFlow: SerializedReactFlow) {
//     const message = JSON.stringify({
//       type: "run",
//       reactFlow: reactFlow,
//     });

//     this.worker.postMessage(message);
//   }
// }