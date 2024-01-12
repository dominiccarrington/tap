export function tap<T extends object>(
  object: T,
  callback?: (object: T) => void
): T {
  if (!callback) {
    return new Proxy<T>(object, {
      get(objectTarget, propertyKey, receiver) {
        const property = Reflect.get(objectTarget, propertyKey, receiver);
        if (typeof property !== "function") {
          return property;
        }

        return new Proxy(property, {
          apply(target, thisArg, argArray) {
            target.apply(thisArg, argArray);
            return thisArg;
          },
        });
      },
    });
  }

  callback(object);
  return object;
}
