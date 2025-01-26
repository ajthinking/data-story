import { Cell, RowModel } from '@tanstack/react-table';
import { VirtualItem } from '@tanstack/react-virtual';

export interface VisibleCell {
  rowIndex: number;
  cell: Cell<Record<string, unknown>, unknown>;
  offsetTop: number;
}

export interface ColumnWidthOptions {
  charWidth?: number;     // 每个字符的宽度(像素)
  maxWidth?: number;      // 最大宽度
  minWidth?: number;      // 最小宽度
  padding?: number;       // 单元格内边距(左右两边)
}

// todo: dynamic table height and width
// 是否可以将需要滚动中的宽高设置为固定值，但是真正渲染的宽高需要动态计算
/**
 * 需要在虚拟滚动前设置
 * 1. 获取所有可是区域的 table cells and table headers
 * 2. 固定表格的高度 and 宽度
 * 3. 计算出每行and每列的最大高度and 最大宽度
 * 4.将 table cells and headers 传递给 tableBody and tableHeader 渲染
 */
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

  example = () => {
    // 使用示例
    // 获取第一列的所有cells
    const firstColumnCells = this.getColumnCells(0);
    console.log('First column cells:', firstColumnCells.map(item => item.cell.getValue()));

    // 获取所有列的数据
    this.cellsMatrix.forEach((column, columnIndex) => {
      console.log(`Column ${columnIndex} data:`, column.map(item => item.cell.getValue()));
    });
  }

  calculateColumnWidth = (colIndex: number, options: ColumnWidthOptions = {}) => {
    const {
      charWidth = 8,           // 默认每个字符8px
      maxWidth = 150,          // 最大宽度150px
      minWidth = 50,           // 最小宽度50px
      padding = 16            // 默认左右各8px内边距
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
  // 如果需要获取某列特定行的cell
  getCellByPosition = (columnIndex: number, rowIndex: number) => {
    return this.cellsMatrix[columnIndex].find(item => item.rowIndex === rowIndex);
  };
}
