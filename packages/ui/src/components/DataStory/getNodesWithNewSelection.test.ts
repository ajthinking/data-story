import { it, expect } from 'vitest';
import { getNodesWithNewSelection } from './getNodesWithNewSelection'
import { ReactFlowNode } from '../Node/ReactFlowNode';

it('returns empty array when no nodes are passed', () => {
  expect(getNodesWithNewSelection('up', [])).toBeUndefined()
  expect(getNodesWithNewSelection('down', [])).toBeUndefined()
  expect(getNodesWithNewSelection('left', [])).toBeUndefined()
  expect(getNodesWithNewSelection('right', [])).toBeUndefined()
})

it('selects the first node when no node is selected', () => {
  const nodes = [
    { id: '1', position: { x: 1, y: 1 }, selected: false },
    { id: '2', position: { x: 2, y: 2 }, selected: false },
    { id: '3', position: { x: 3, y: 3 }, selected: false },
  ] as ReactFlowNode[]

  expect(getNodesWithNewSelection('up', nodes)).toMatchObject(
    { id: '1', position: { x: 1, y: 1 }, selected: true },
  )
})

it('selects the same node if it is uttermost in direction', () => {
  const nodes = [
    { id: '1', position: { x: 1, y: 1 }, selected: true },
    { id: '2', position: { x: 2, y: 2 }, selected: false },
    { id: '3', position: { x: 3, y: 3 }, selected: false },
  ] as ReactFlowNode[]

  expect(getNodesWithNewSelection('left', nodes)).toMatchObject(
    { id: '1', position: { x: 1, y: 1 }, selected: true }
  )
})

it('selects new closest node in up direction', () => {
  const nodes = [
    { id: '1', position: { x: 1, y: 1 }, selected: false },
    { id: '2', position: { x: 2, y: 2 }, selected: true },
    { id: '3', position: { x: 3, y: 3 }, selected: false },
  ] as ReactFlowNode[]

  expect(getNodesWithNewSelection('up', nodes)).toMatchObject(
    { id: '1', position: { x: 1, y: 1 }, selected: true }
  )
})

it('selects new closest node in down direction', () => {
  const nodes = [
    { id: '1', position: { x: 1, y: 1 }, selected: false },
    { id: '2', position: { x: 2, y: 2 }, selected: true },
    { id: '3', position: { x: 3, y: 3 }, selected: false },
  ] as ReactFlowNode[]

  expect(getNodesWithNewSelection('down', nodes)).toMatchObject(
    { id: '3', position: { x: 3, y: 3 }, selected: true }
  )
})

it('selects new closest node in left direction', () => {
  const nodes = [
    { id: '1', position: { x: 1, y: 1 }, selected: false },
    { id: '2', position: { x: 2, y: 2 }, selected: true },
    { id: '3', position: { x: 3, y: 3 }, selected: false },
  ] as ReactFlowNode[]

  expect(getNodesWithNewSelection('left', nodes)).toMatchObject(
    { id: '1', position: { x: 1, y: 1 }, selected: true }
  )
})

it('selects new closest node in right direction', () => {
  const nodes = [
    { id: '1', position: { x: 1, y: 1 }, selected: false },
    { id: '2', position: { x: 2, y: 2 }, selected: true },
    { id: '3', position: { x: 3, y: 3 }, selected: false },
  ] as ReactFlowNode[]

  expect(getNodesWithNewSelection('right', nodes)).toMatchObject(
    { id: '3', position: { x: 3, y: 3 }, selected: true }
  )
})
