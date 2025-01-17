import type {Middleware, MiddlewareState} from '@floating-ui/dom';

import {injectController} from './controller';
import {ELEMENT_METADATA} from './extension/constants';
import type {FloatingUIMiddlewareData} from './extension/floating-ui';
import type {Metadata, MiddlewareData} from './types';
import {serialize} from './utils/serialize';

/**
 * devtools middleware
 * @public
 */
export const devtools = (
  targetDocument: Document,
  middlewareDataCallback: (
    state: MiddlewareState,
  ) => MiddlewareData = floatingUIMiddlewareDataCallback,
): Middleware => ({
  name: '@floating-ui/devtools',
  fn: (state: MiddlewareState) => {
    injectController(targetDocument);
    const [serializedData, references] = serialize(
      middlewareDataCallback(state),
    );
    Object.assign<HTMLElement, {[ELEMENT_METADATA]: Metadata}>(
      state.elements.floating,
      {
        [ELEMENT_METADATA]: {references, serializedData, type: 'middleware'},
      },
    );
    return {};
  },
});

const floatingUIMiddlewareDataCallback = (
  state: MiddlewareState,
): FloatingUIMiddlewareData => ({
  ...state,
  type: 'FloatingUIMiddleware',
});
