import { Prop, FunctionalComponent, ExtractPropTypes } from 'vue';

/**
 * Creates a TS-valid vue prop definition from a simple object
 * @param options simple vue property definition
 */
export const prop = <T>(options: Prop<T>) => options;

type ObjectPropsTemplate = Readonly<Record<string, Prop<any>>>;

type ArrayPropsTemplate = Readonly<Array<string>>;

type ExtractArrayPropTypes<P extends ArrayPropsTemplate> = {
  [idx in Extract<keyof P, number>]: Record<P[idx], any>;
}[number];

// type FinalProps<P extends FinalPropsTemplate> = P extends VuePropsTemplate ? PropsTypes<P> : P extends Record<string, TPropType<any>> ? PropsTypesFlat<P> : any;

/**
 * A simple function wrapper that accepts a standard vue props object definition and a setup function and adds props to the setup function definition
 *
 * @param props a props object definition
 * @param setup vue composition api setup function
 * @returns the same setup function
 */
export const withProps: {
  <
    P extends ObjectPropsTemplate,
    S extends FunctionalComponent<ExtractPropTypes<P>>
  >(props: P, setup: S): S;

  <
    P extends Readonly<Array<string>>,
    S extends FunctionalComponent<ExtractArrayPropTypes<P>>
  >(props: P, setup: S): S
} = <
  P extends Readonly<ObjectPropsTemplate>,
  S extends FunctionalComponent<ExtractPropTypes<P>>
>(props: P, setup: S): S => {
  (setup as any).props = props;

  return setup;
};
