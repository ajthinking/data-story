const functionCache = new Map<string, WeakRef<Function>>();
export const createJSTransformFunction = (code: string) => {
  const cachedFn = functionCache.get(code)?.deref();
  if (cachedFn) return cachedFn;

  const fn = new Function('item', `return (${code})(item)`);
  functionCache.set(code, new WeakRef(fn));
  return fn;
};

const expressionCache = new Map<string, WeakRef<Function>>();
export const createJSTransformExpression = (code: string) => {
  const cachedFn = expressionCache.get(code)?.deref();
  if (cachedFn) return cachedFn();

  const fn = new Function(`return ${code}`);
  expressionCache.set(code, new WeakRef(fn));
  return fn();
};