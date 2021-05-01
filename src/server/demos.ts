import { DiagramModelBuilder } from "./../core/DiagramModelBuilder";
import CreateGrid from "./nodes/CreateGrid";
import CreateJSON from "./nodes/CreateJSON";
import DownloadJSON from "./nodes/DownloadJSON";
import Evaluate from "./nodes/Evaluate";
import Flatten from "./nodes/Flatten";
import HTTPRequest from "./nodes/HTTPRequest";
import Inspect from "./nodes/Inspect";
import Map from "./nodes/Map";

export const WorkingWithJSON = DiagramModelBuilder.begin()
	.addNode(CreateJSON)
	.addNode(HTTPRequest)
	.addNode(Map)
	.addNode(Flatten)
	.addNode(DownloadJSON)
	.finish()



export const CleanupOldGithubRepos = DiagramModelBuilder.begin()
	.addNode(HTTPRequest)
	.finish()

export const ScrapingAMapService = DiagramModelBuilder.begin()
	.addNode(CreateGrid)			
	.addNode(Evaluate)
	.addNode(HTTPRequest)
	.addNode(Map)
	.addNode(Flatten)
	.addNode(DownloadJSON).alsoAdd(Inspect)
	.finish()

	// SÖDERMALM [0], STORSTOCKHOLM [1]
	// {
	// 	"type": "FeatureCollection",
	// 	"features": [
	// 	  {
	// 		"type": "Feature",
	// 		"properties": {},
	// 		"geometry": {
	// 		  "type": "Polygon",
	// 		  "coordinates": [
	// 			[
	// 			  [
	// 				18.01826477050781,
	// 				59.29674702504426
	// 			  ],
	// 			  [
	// 				18.116455078125,
	// 				59.29674702504426
	// 			  ],
	// 			  [
	// 				18.116455078125,
	// 				59.32618430580267
	// 			  ],
	// 			  [
	// 				18.01826477050781,
	// 				59.32618430580267
	// 			  ],
	// 			  [
	// 				18.01826477050781,
	// 				59.29674702504426
	// 			  ]
	// 			]
	// 		  ]
	// 		}
	// 	  },
    // {
	// 	"type": "Feature",
	// 	"properties": {},
	// 	"geometry": {
	// 	  "type": "Polygon",
	// 	  "coordinates": [
	// 		[
	// 		  [
	// 			17.782745361328125,
	// 			59.2163658770415
	// 		  ],
	// 		  [
	// 			18.30665588378906,
	// 			59.2163658770415
	// 		  ],
	// 		  [
	// 			18.30665588378906,
	// 			59.41853568293486
	// 		  ],
	// 		  [
	// 			17.782745361328125,
	// 			59.41853568293486
	// 		  ],
	// 		  [
	// 			17.782745361328125,
	// 			59.2163658770415
	// 		  ]
	// 		]
	// 	  ]
	// 	}
	//   }	
	// 	]
	//   }

