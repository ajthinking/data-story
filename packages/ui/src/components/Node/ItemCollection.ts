import { ItemValue } from '@data-story/core/*'

export class ItemCollection {
  constructor(public items: ItemValue[]) {}

  toTable() {
    let headers: string[] = []
    let rows: ItemValue[] = []

    // Extract headers and remove duplicates
    headers = Array.from(new Set(this.items
      .map((item) => Object.keys(item))
      .flat()));

    // Extract rows
    rows = this.items.map((item) => {
      const row: ItemValue[] = []
      headers.forEach((header) => {
        row.push(item[header])
      })
      return row
    })

    return { headers, rows }
  }
}