import { Config } from 'bili';

export const config = (file: string): Config => ({
  input: 'src/index.ts',
  output: {
    moduleName: 'vue-functional-props',
    fileName: `${file}.js`,
    format: 'umd-min',
    target: 'browser',
  },
  plugins: {
    typescript2: true,
  },
});
