import { customAlphabet } from 'nanoid';

/**
 * 129M IDs needed, in order to have a 1% probability of at least one collision.
 * https://zelark.github.io/nano-id-cc/
 */
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10)
export const createDataStoryId = (): string => nanoid();
