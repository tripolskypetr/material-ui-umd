
import * as CSSType from '../csstype@2.6.10/index';

declare namespace typestyle {
  /** Sets the target tag where we write the css on style updates */
  const setStylesTarget: (tag: StylesTarget) => void;
  /**
   * Insert `raw` CSS as a string. This is useful for e.g.
   * - third party CSS that you are customizing with template strings
   * - generating raw CSS in JavaScript
   * - reset libraries like normalize.css that you can use without loaders
   */
  const cssRaw: (mustBeValidCSS: string) => void;
  /**
   * Takes CSSProperties and registers it to a global selector (body, html, etc.)
   */
  const cssRule: (selector: string, ...objects: types.NestedCSSProperties[]) => void;
  /**
   * Renders styles to the singleton tag imediately
   * NOTE: You should only call it on initial render to prevent any non CSS flash.
   * After that it is kept sync using `requestAnimationFrame` and we haven't noticed any bad flashes.
   **/
  const forceRenderStyles: () => void;
  /**
   * Utility function to register an @font-face
   */
  const fontFace: (...fontFace: types.FontFace[]) => void;
  /**
   * Allows use to use the stylesheet in a node.js environment
   */
  const getStyles: () => string;
  /**
   * Takes keyframes and returns a generated animationName
   */
  const keyframes: (frames: types.KeyFrames) => string;
  /**
   * Helps with testing. Reinitializes FreeStyle + raw
   */
  const reinit: () => void;
  /**
   * Takes CSSProperties and return a generated className you can use on your component
   */
  const style: {
      (...objects: (types.NestedCSSProperties | undefined)[]): string;
      (...objects: (false | types.NestedCSSProperties | null | undefined)[]): string;
  };
  /**
   * Takes an object where property names are ideal class names and property values are CSSProperties, and
   * returns an object where property names are the same ideal class names and the property values are
   * the actual generated class names using the ideal class name as the $debugName
   */
  const stylesheet: <Classes extends Record<string, types.NestedCSSProperties>>(classes: Classes) => {
      [ClassName in keyof Classes]: string;
  };
  /**
   * Creates a new instance of TypeStyle separate from the default instance.
   *
   * - Use this for creating a different typestyle instance for a shadow dom component.
   * - Use this if you don't want an auto tag generated and you just want to collect the CSS.
   *
   * NOTE: styles aren't shared between different instances.
   */
  function createTypeStyle(target?: {
      textContent: string | null;
  }): TypeStyle;

  namespace types {
      type TLength = number | string;
      interface CSSProperties extends CSSType.StandardPropertiesFallback<TLength>, CSSType.SvgPropertiesFallback<TLength>, CSSType.VendorPropertiesHyphenFallback<TLength>, CSSType.ObsoletePropertiesFallback<TLength> {
          /**
           * Typestyle configuration options
           **/
          /**
           * The generated CSS selector gets its own unique location in the generated CSS (disables deduping).
           * So instead of `.classA,.classB{same properties}`
           * you get `.classA {same properties} .classB {same properties}`
           * This is needed for certain browser edge cases like placeholder styling
           **/
          $unique?: boolean;
      }
      interface FontFace extends CSSType.FontFace {
      }
      type CSSClasses<K extends string> = Record<K, NestedCSSProperties>;
      type CSSClassNames<K extends string> = Record<K, string>;
      interface NestedCSSProperties extends CSSProperties {
          $nest?: NestedCSSSelectors;
          /**
           * A debug only (stripped in process.env.NODE_ENV !== 'production') name
           * Helps you figure out where the class is coming from if you care
           **/
          $debugName?: string;
      }
      type MediaQuery = {
          type?: 'screen' | 'print' | 'all';
          orientation?: 'landscape' | 'portrait';
          minWidth?: number | string;
          maxWidth?: number | string;
          minHeight?: number | string;
          maxHeight?: number | string;
      };
      type NestedCSSSelectors = {
          /** State selector */
          '&:active'?: NestedCSSProperties;
          '&:any'?: NestedCSSProperties;
          '&:checked'?: NestedCSSProperties;
          '&:default'?: NestedCSSProperties;
          '&:disabled'?: NestedCSSProperties;
          '&:empty'?: NestedCSSProperties;
          '&:enabled'?: NestedCSSProperties;
          '&:first'?: NestedCSSProperties;
          '&:first-child'?: NestedCSSProperties;
          '&:first-of-type'?: NestedCSSProperties;
          '&:fullscreen'?: NestedCSSProperties;
          '&:focus'?: NestedCSSProperties;
          '&:hover'?: NestedCSSProperties;
          '&:indeterminate'?: NestedCSSProperties;
          '&:in-range'?: NestedCSSProperties;
          '&:invalid'?: NestedCSSProperties;
          '&:last-child'?: NestedCSSProperties;
          '&:last-of-type'?: NestedCSSProperties;
          '&:left'?: NestedCSSProperties;
          '&:link'?: NestedCSSProperties;
          '&:only-child'?: NestedCSSProperties;
          '&:only-of-type'?: NestedCSSProperties;
          '&:optional'?: NestedCSSProperties;
          '&:out-of-range'?: NestedCSSProperties;
          '&:read-only'?: NestedCSSProperties;
          '&:read-write'?: NestedCSSProperties;
          '&:required'?: NestedCSSProperties;
          '&:right'?: NestedCSSProperties;
          '&:root'?: NestedCSSProperties;
          '&:scope'?: NestedCSSProperties;
          '&:target'?: NestedCSSProperties;
          '&:valid'?: NestedCSSProperties;
          '&:visited'?: NestedCSSProperties;
          /**
           * Pseudo-elements
           * https://developer.mozilla.org/en/docs/Web/CSS/Pseudo-elements
           */
          '&::after'?: NestedCSSProperties;
          '&::before'?: NestedCSSProperties;
          '&::first-letter'?: NestedCSSProperties;
          '&::first-line'?: NestedCSSProperties;
          '&::selection'?: NestedCSSProperties;
          '&::backdrop'?: NestedCSSProperties;
          '&::placeholder'?: NestedCSSProperties;
          '&::marker'?: NestedCSSProperties;
          '&::spelling-error'?: NestedCSSProperties;
          '&::grammar-error'?: NestedCSSProperties;
          /** Children */
          '&>*'?: NestedCSSProperties;
          /**
           * Mobile first media query example
           **/
          '@media screen and (min-width: 700px)'?: NestedCSSProperties;
          /**
           * Desktop first media query example
           **/
          '@media screen and (max-width: 700px)'?: NestedCSSProperties;
          /**
           * Also cater for any other nested query you want
           */
          [selector: string]: NestedCSSProperties | undefined;
      };
      /**
       * For animation keyframe definition
       */
      interface KeyFrames {
          $debugName?: string;
          [
          /** stuff like `from`, `to` or `10%` etc*/
          key: string]: CSSProperties | string | undefined;
      }
  }

  type StylesTarget = {
      textContent: string | null;
  };
  /**
   * Maintains a single stylesheet and keeps it in sync with requested styles
   */
  class TypeStyle {
      private _autoGenerateTag;
      private _freeStyle;
      private _pending;
      private _pendingRawChange;
      private _raw;
      private _tag?;
      /**
       * We have a single stylesheet that we update as components register themselves
       */
      private _lastFreeStyleChangeId;
      constructor({ autoGenerateTag }: {
          autoGenerateTag: boolean;
      });
      /**
       * Only calls cb all sync operations settle
       */
      private _afterAllSync;
      private _getTag;
      /** Checks if the style tag needs updating and if so queues up the change */
      private _styleUpdated;
      /**
       * Insert `raw` CSS as a string. This is useful for e.g.
       * - third party CSS that you are customizing with template strings
       * - generating raw CSS in JavaScript
       * - reset libraries like normalize.css that you can use without loaders
       */
      cssRaw: (mustBeValidCSS: string) => void;
      /**
       * Takes CSSProperties and registers it to a global selector (body, html, etc.)
       */
      cssRule: (selector: string, ...objects: types.NestedCSSProperties[]) => void;
      /**
       * Renders styles to the singleton tag imediately
       * NOTE: You should only call it on initial render to prevent any non CSS flash.
       * After that it is kept sync using `requestAnimationFrame` and we haven't noticed any bad flashes.
       **/
      forceRenderStyles: () => void;
      /**
       * Utility function to register an @font-face
       */
      fontFace: (...fontFace: types.FontFace[]) => void;
      /**
       * Allows use to use the stylesheet in a node.js environment
       */
      getStyles: () => string;
      /**
       * Takes keyframes and returns a generated animationName
       */
      keyframes: (frames: types.KeyFrames) => string;
      /**
       * Helps with testing. Reinitializes FreeStyle + raw
       */
      reinit: () => void;
      /** Sets the target tag where we write the css on style updates */
      setStylesTarget: (tag: StylesTarget) => void;
      /**
       * Takes CSSProperties and return a generated className you can use on your component
       */
      style(...objects: (types.NestedCSSProperties | undefined)[]): string;
      style(...objects: (types.NestedCSSProperties | null | false | undefined)[]): string;
      /**
       * Takes an object where property names are ideal class names and property values are CSSProperties, and
       * returns an object where property names are the same ideal class names and the property values are
       * the actual generated class names using the ideal class name as the $debugName
       */
      stylesheet: <Classes extends Record<string, types.NestedCSSProperties>>(classes: Classes) => {
          [ClassName in keyof Classes]: string;
      };
  }

  /** Raf for node + browser */
  const raf: (cb: () => void) => void;
  /**
   * Utility to join classes conditionally
   */
  function classes(...classes: (string | false | undefined | null | {
      [className: string]: any;
  })[]): string;
  /**
   * Merges various styles into a single style object.
   * Note: if two objects have the same property the last one wins
   */
  function extend(...objects: (types.NestedCSSProperties | undefined | null | false)[]): types.NestedCSSProperties;
  /**
   * Utility to help customize styles with media queries. e.g.
   * ```
   * style(
   *  media({maxWidth:500}, {color:'red'})
   * )
   * ```
   */
  const media: (mediaQuery: types.MediaQuery, ...objects: (false | types.NestedCSSProperties | null | undefined)[]) => types.NestedCSSProperties;
}
