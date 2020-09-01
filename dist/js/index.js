"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withProps = exports.prop = void 0;
exports.prop = (options) => options;
exports.withProps = (props, setup) => {
    setup.props = props;
    return setup;
};
//# sourceMappingURL=index.js.map