import { prop } from '../src';

export const componentName = 'Test';
export const inheritAttrs = false;

export const events = {
  test(test: number) { return test }
} as const;

export const props = {
  testReq: prop<42>()({
    type: Number,
    required: true,
  }),
  testDef: {
    type: Number,
    default: 0,
  },
  testOpt: Number
} as const;
