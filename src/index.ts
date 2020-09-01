import { SetupContext } from 'vue';

export type TProp<T> = { (): T } | { new(...args: never[]): T & object } | { new(...args: string[]): Function };

export type TPropType<T> = TProp<T> | TProp<T>[];

export interface IPropOptions<T = any> {
  type?: TPropType<T>;
  required?: boolean;
  default?: T | null | undefined | (() => T | null | undefined);
  validator?(value: T): boolean;
}

export type PropValidator<T> = IPropOptions<T> | TPropType<T>;

/**
 * Creates a TS-valid vue prop definition from a simple object
 * @param options simple vue property definition
 */
export const prop = <T>(options: PropValidator<T>) => options;

type LambdaFunction = (...args: any) => any | (new (...args: any) => any);

type VuePropsTemplate = Record<string, IPropOptions>;

type PropsTypesFlat<P extends Record<string, TPropType<any>>> = {
  [key in keyof P]: P[key] extends LambdaFunction
    ? ReturnType<P[key]>
    : {};
};

type PropsTypes<P extends VuePropsTemplate> = {
  [key in keyof P]: P[key] extends LambdaFunction
    ? ReturnType<P[key]>
    : P[key]['type'] extends LambdaFunction
    ? ReturnType<P[key]['type']>
    : {};
};

type FinalPropsTemplate = VuePropsTemplate | Record<string, TPropType<any>>;

type FinalProps<P extends FinalPropsTemplate> = P extends VuePropsTemplate ? PropsTypes<P> : P extends Record<string, TPropType<any>> ? PropsTypesFlat<P> : any;

/**
 * A simple function wrapper that accepts a standard vue props object definition and a setup function and adds props to the setup function definition
 *
 * @param props a props object definition
 * @param setup vue composition api setup function
 * @returns the same setup function
 */
export const withProps = <
  P extends FinalPropsTemplate,
  C extends SetupContext,
  S extends (this: unknown, props: FinalProps<P>, context: C) => any
>(props: P, setup: S): S => {
  (setup as any).props = props;

  return setup;
};
