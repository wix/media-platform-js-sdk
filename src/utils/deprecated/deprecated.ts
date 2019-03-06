type FunctionDeclaration = (...args) => any;

export const logDeprecated = (message: string): void => {
  console.warn(`DEPRECATED: ${message}`);
};

export const deprecatedFn = (message?: string) => (
  fn: FunctionDeclaration,
): FunctionDeclaration => {
  return (...args) => {
    const deprecationMessage =
      message !== undefined
        ? `"${fn.name}" function is deprecated with message "${message}"`
        : `"${fn.name}" function is deprecated`;
    logDeprecated(deprecationMessage);
    return fn(...args);
  };
};
