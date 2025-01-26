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

export interface ColumnWidthOptions {
  charWidth?: number;     // 每个字符的宽度(像素)
  maxWidth?: number;      // 最大宽度
  minWidth?: number;      // 最小宽度
  padding?: number;       // 单元格内边距(左右两边)
}

export class CellsMatrix {
  private getRowModel: () => RowModel<Record<string, unknown>>;
  private virtualRows: VirtualItem[];
  private virtualColumns: VirtualItem[];
  private cellsMatrix: VisibleCell[][];
  private columnWidthsMap: Map<number, number> = new Map();

  constructor({
    virtualRows,
    virtualColumns,
    getRowModel
  }: {
    virtualRows: VirtualItem[];
    virtualColumns: VirtualItem[];
    getRowModel: () => RowModel<Record<string, unknown>>
  }) {
    this.virtualRows = virtualRows;
    this.virtualColumns = virtualColumns;
    this.getRowModel = getRowModel;
    this.cellsMatrix = [];
  }

  getVisibleCellsMatrix = () => {
    // 创建一个二维数组,外层数组代表列,内层数组代表每列中的cells
    const cellsMatrix: VisibleCell[][] = Array(this.virtualColumns.length).fill(null).map(() => []);

    this.virtualRows.forEach(virtualRow => {
      const row = this.getRowModel().rows[virtualRow.index];
      if (!row) return;

      this.virtualColumns.forEach((virtualCol, colIndex) => {
        const cell = row.getVisibleCells()[virtualCol.index];
        if (!cell) return;

        cellsMatrix[colIndex].push({
          rowIndex: virtualRow.index,
          cell,
          offsetTop: virtualRow.start
        });
      });
    });

    this.cellsMatrix = cellsMatrix;
    return cellsMatrix;
  };

  // 获取特定列的所有cells
  getColumnCells = (columnIndex: number) => {
    return this.cellsMatrix[columnIndex];
  };

  calculateColumnWidth = (colIndex: number, options: ColumnWidthOptions = {}) => {
    const {
      charWidth = 8,           // 默认每个字符8px
      maxWidth = CELL_MAX_WIDTH,          // 最大宽度150px
      minWidth = CELL_MIN_WIDTH,           // 最小宽度50px
      padding = 8            // 默认左右各8px内边距
    } = options;

    if (this.columnWidthsMap.has(colIndex)) {
      return this.columnWidthsMap.get(colIndex)!;
    }
    // 获取当前列的所有cells
    const columnCells = this.getColumnCells(colIndex);

    // 获取列头文本
    const headerText = columnCells[0]?.cell.column.id || '';

    // 计算列头文本宽度
    let maxLength = headerText.length;

    // 计算所有cell的内容长度
    columnCells.forEach(({ cell }) => {
      const value = cell.getValue();
      // 将值转换为字符串并计算长度
      const contentLength = String(value ?? '').length;
      maxLength = Math.max(maxLength, contentLength);
    });

    // 计算最终宽度 = 字符数 * 每个字符宽度 + 内边距
    let finalWidth = maxLength * charWidth + padding;

    // 确保宽度在最小值和最大值之间
    finalWidth = Math.max(minWidth, Math.min(maxWidth, finalWidth));

    // 将最终宽度存储在Map中
    this.columnWidthsMap.set(colIndex, finalWidth);

    return finalWidth;
  };
}
