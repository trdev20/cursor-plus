export const isString = (value: unknown): value is string => typeof value === "string";

export const isEmptyString = (value: unknown): value is "" => isString(value) && value === "";

export const isEmptyOrWhitespaces = (value: unknown): value is string =>
  isString(value) && value.trim().length === 0;

export const isNonEmptyString = (value: unknown): value is string =>
  isString(value) && value.length > 0;

export const isNumber = (value: unknown): value is number => typeof value === "number";

export const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

export const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && value?.constructor.name === "Object";

export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

export const isFunction = (value: unknown): value is Function => typeof value === "function";

export const isNull = (value: unknown): value is null => value === null;

export const isUndefined = (value: unknown): value is undefined => value === undefined;

export const isOneOf = <T extends unknown[] | readonly unknown[]>(
  value: unknown,
  items: T,
): value is T[number] => items.includes(value as T[number]);

export const upperFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const uniqueArr = <T>(arr: T[]): T[] => [...new Set(arr)];

export const fixObject = (
  obj: Record<string, unknown>,
  { updateValue, updateKey, updateKeyAndValue, deep }: FixObjectUpdate,
): Record<string, unknown> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const newKey = updateKey ? updateKey(key) : updateKeyAndValue ? updateKeyAndValue(key) : key;
      let newValue;

      if (deep && isObject(value)) {
        newValue = fixObject(value, { updateValue, updateKey, updateKeyAndValue, deep });
      } else {
        newValue = updateValue
          ? updateValue(value)
          : updateKeyAndValue
            ? updateKeyAndValue(value)
            : value;
      }

      return [newKey, newValue];
    }),
  );
};
export type FixObjectUpdate = {
  updateKey?: (key: unknown) => unknown;
  updateValue?: (value: unknown) => unknown;
  updateKeyAndValue?: (keyOrValue: unknown) => unknown;
  deep?: boolean;
};
