import { Cell, RowModel } from '@tanstack/react-table';
import { VirtualItem } from '@tanstack/react-virtual';

interface VisibleCell {
  rowIndex: number;
  cell: Cell<Record<string, unknown>, unknown>;
  offsetTop: number;
}

export const CELL_WIDTH = 75;
export const CELL_MAX_WIDTH = 150;
export const CELL_MIN_WIDTH = 50;
export const DEFAULT_CHAR_WIDTH = 8;
export const DEFAULT_PADDING = 8;

export interface ColumnWidthOptions {
  charWidth?: number;
  maxWidth?: number;
  minWidth?: number;
  padding?: number;
}

export class CellsMatrix {
  private readonly getRowModel: () => RowModel<Record<string, unknown>>;
  private readonly virtualRows: VirtualItem[];
  private readonly virtualColumns: VirtualItem[];
  private readonly cellsMatrix: VisibleCell[][];
  private columnWidthsMap: Map<number, number> = new Map();

  constructor({
    virtualRows,
    virtualColumns,
    getRowModel,
  }: {
    virtualRows: VirtualItem[];
    virtualColumns: VirtualItem[];
    getRowModel: () => RowModel<Record<string, unknown>>
  }) {
    this.virtualRows = virtualRows;
    this.virtualColumns = virtualColumns;
    this.getRowModel = getRowModel;
    this.cellsMatrix = this.initializeCellsMatrix();
  }

  // Initialize a 2D array representing columns and their cells
  private initializeCellsMatrix(): VisibleCell[][] {
    const matrix: VisibleCell[][] = Array(this.virtualColumns.length)
      .fill(null)
      .map(() => []);

    this.virtualRows.forEach(virtualRow => {
      const row = this.getRowModel().rows[virtualRow.index];
      if (!row) return;

      this.virtualColumns.forEach((virtualCol, colIndex) => {
        const cell = row.getVisibleCells()[virtualCol.index];
        if (!cell) return;

        matrix[colIndex].push({
          rowIndex: virtualRow.index,
          cell,
          offsetTop: virtualRow.start,
        });
      });
    });

    return matrix;
  }

  public getColumnCells(columnIndex: number): VisibleCell[] {
    return this.cellsMatrix[columnIndex];
  }

  // Calculate and cache the optimal width for a column
  public calculateColumnWidth(colIndex: number, options: ColumnWidthOptions = {}): number {
    const {
      charWidth = DEFAULT_CHAR_WIDTH,
      maxWidth = CELL_MAX_WIDTH,
      minWidth = CELL_MIN_WIDTH,
      padding = DEFAULT_PADDING,
    } = options;

    if (this.columnWidthsMap.has(colIndex)) {
      return this.columnWidthsMap.get(colIndex)!;
    }

    const columnCells = this.getColumnCells(colIndex);
    const headerText = columnCells[0]?.cell.column.id || '';

    const maxLength = columnCells.reduce((max, { cell }) => {
      const contentLength = String(cell.getValue() ?? '').length;
      return Math.max(max, contentLength);
    }, headerText.length);

    // Calculate final width: characters * charWidth + padding
    const finalWidth = Math.max(
      minWidth,
      Math.min(maxWidth, maxLength * charWidth + padding),
    );

    this.columnWidthsMap.set(colIndex, finalWidth);

    return finalWidth;
  }
}