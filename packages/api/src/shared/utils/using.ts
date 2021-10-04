export async function using<Type extends { start: () => Promise<void> | void; stop: () => Promise<void> | void }>(
  resource: Type,
  func: (resource: Type) => Promise<void> | void,
) {
  try {
    await resource.start();
    await func(resource);
  } finally {
    await resource.stop();
  }
}
