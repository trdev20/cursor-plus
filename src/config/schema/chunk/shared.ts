import {
  isArray,
  isBoolean,
  isEmptyString,
  isNonEmptyString,
  isNumber,
  isObject,
  isString,
} from "~/utils/js";
import { z } from "zod";

export const validateString = (value: unknown) => (!isNonEmptyString(value) ? value : undefined);

export const optStrSchema = z.preprocess(
  validateString,
  z.union([z.string().min(1), z.undefined()]),
);

export const reqStrSchema = z.preprocess(validateString, z.string().min(1));

export const genStrSchema = (defaultValue: string) =>
  z.preprocess(validateString, z.string().default(defaultValue));

export const validateBoolean = (value: unknown) => (isBoolean(value) ? value : undefined);

export const trueBoolSchema = z.preprocess(validateBoolean, z.boolean().default(true));
export const falseBoolSchema = z.preprocess(validateBoolean, z.boolean().default(false));

export const validateNumber = (value: unknown) => (isNumber(value) ? value : undefined);

export const numberSchema = z.preprocess(validateNumber, z.number());

export const genNumberSchema = (defaultValue: number) =>
  z.preprocess(validateNumber, z.number().default(defaultValue));

export const validateObject = (value: unknown) => (isObject(value) ? value : undefined);
