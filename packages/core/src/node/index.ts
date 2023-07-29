import { promises as fs } from 'fs'

export const someFsStuff = async () => {
  return fs.readdir('./')
}