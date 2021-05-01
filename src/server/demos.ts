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

export const ScrapingAMapService = DiagramModelBuilder.begin()
	.addNode(CreateGrid)			
	.addNode(Evaluate)
	.addNode(HTTPRequest)
	.addNode(Map)
	.addNode(Flatten)
	.addNode(DownloadJSON).alsoAdd(Inspect)
	.finish()

export const CleanupOldGithubRepos = DiagramModelBuilder.begin()
	.addNode(HTTPRequest)
	.finish()