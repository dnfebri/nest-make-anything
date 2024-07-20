export function createLog(module, dataIdentity): string {
  return `create -> ${module} -> ${dataIdentity}`;
}

export function updateLog(module, dataIdentity): string {
  return `update -> ${module} -> ${dataIdentity}`;
}

export function updatePasswordLog(module, dataIdentity): string {
  return `update -> ${module} -> password -> ${dataIdentity}`;
}

export function deleteLog(module, dataIdentity): string {
  return `delete -> ${module} -> ${dataIdentity}`;
}
