import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export const makeDensityDatasets = (directory: string) => {
  const datasetsDir = path.join(directory);
  if (!fs.existsSync(datasetsDir)) fs.mkdirSync(datasetsDir);

  // Utility function to generate an item with schemaDensity
  const generateItem = (schemaDensity: any) => {
    const item = {} as any;
    for (let i = 0; i < schemaDensity; i++) {
      item[`field_${i}`] = `value_${i}`;
    }
    return item;
  };

  // Utility function to generate files with items
  const generateFileContent = (itemsDensity: any, schemaDensity: any) => {
    const items = [];
    for (let i = 0; i < itemsDensity; i++) {
      items.push(generateItem(schemaDensity));
    }
    return items;
  };

  // Generate datasets based on density vectors
  const createDatasets = (fileDensity: any, itemsDensity: any, schemaDensity: any) => {
    const datasetDir = path.join(datasetsDir, `${fileDensity}_${itemsDensity}_${schemaDensity}`);
    if (!fs.existsSync(datasetDir)) fs.mkdirSync(datasetDir);

    for (let i = 0; i < fileDensity; i++) {
      const filePath = path.join(datasetDir, `${i}.json`);
      const content = generateFileContent(itemsDensity, schemaDensity);
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    }
  };

  // Define your density vectors
  const fileDensities = [1, 10, 100]; // Low, medium, high file density
  const itemsDensities = [10, 100, 1000]; // Low, medium, high items density
  const schemaDensities = [5, 50, 500]; // Low, medium, high schema density

  // Generate all combinations of datasets
  fileDensities.forEach(fileDensity => {
    itemsDensities.forEach(itemsDensity => {
      schemaDensities.forEach(schemaDensity => {
        createDatasets(fileDensity, itemsDensity, schemaDensity);
      });
    });
  });
};