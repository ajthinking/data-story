/* eslint-disable @stylistic/quotes */
import * as vscode from 'vscode';
export async function simpleTest() {
  const {Database} = await import('duckdb-async');
  // get path to current workspace
  const workspacePath = vscode.workspace.workspaceFolders![0].uri.fsPath;
  console.log('simpleTest', workspacePath);
  const db = await Database.create(`${workspacePath}/test.db`);
  // create table
  await db.all('create table test (id int, name text)');
  // insert data
  await db.all(`insert into test values (1, 'John Doe')`);
  // query data
  const rows = await db.all('select * from test');
  console.log(rows);
}
