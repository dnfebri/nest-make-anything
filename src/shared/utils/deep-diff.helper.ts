import * as deepDiff from 'deep-diff';
export function getDeepDiff(
  obj1: Record<string, any>,
  obj2: Record<string, any>,
) {
  const diff: any[] = deepDiff(obj1, obj2);
  if (!diff) return {};

  const meta = diff.map((value) => {
    return { [value.path[0]]: `${value.lhs} -> ${value.rhs}` };
  });
  const combinedMeta = meta.reduce((acc, currentValue) => {
    return { ...acc, ...currentValue };
  }, {});

  return combinedMeta;
}
