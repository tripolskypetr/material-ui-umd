(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.mobx = {}));
}(this, (function (exports) { 'use strict';

    var niceErrors = {
      0: "Invalid value for configuration 'enforceActions', expected 'never', 'always' or 'observed'",
      1: function _(prop) {
        return "Cannot decorate undefined property: '" + prop.toString() + "'";
      },
      2: function _(prop) {
        return "invalid decorator for '" + prop.toString() + "'";
      },
      3: function _(prop) {
        return "Cannot decorate '" + prop.toString() + "': action can only be used on properties with a function value.";
      },
      4: function _(prop) {
        return "Cannot decorate '" + prop.toString() + "': computed can only be used on getter properties.";
      },
      5: "'keys()' can only be used on observable objects, arrays, sets and maps",
      6: "'values()' can only be used on observable objects, arrays, sets and maps",
      7: "'entries()' can only be used on observable objects, arrays and maps",
      8: "'set()' can only be used on observable objects, arrays and maps",
      9: "'remove()' can only be used on observable objects, arrays and maps",
      10: "'has()' can only be used on observable objects, arrays and maps",
      11: "'get()' can only be used on observable objects, arrays and maps",
      12: "Invalid annotation",
      13: "Dynamic observable objects cannot be frozen",
      14: "Intercept handlers should return nothing or a change object",
      15: "Observable arrays cannot be frozen",
      16: "Modification exception: the internal structure of an observable array was changed.",
      17: function _(index, length) {
        return "[mobx.array] Index out of bounds, " + index + " is larger than " + length;
      },
      18: "mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js",
      19: function _(other) {
        return "Cannot initialize from classes that inherit from Map: " + other.constructor.name;
      },
      20: function _(other) {
        return "Cannot initialize map from " + other;
      },
      21: function _(dataStructure) {
        return "Cannot convert to map from '" + dataStructure + "'";
      },
      22: "mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js",
      23: "It is not possible to get index atoms from arrays",
      24: function _(thing) {
        return "Cannot obtain administration from " + thing;
      },
      25: function _(property, name) {
        return "the entry '" + property + "' does not exist in the observable map '" + name + "'";
      },
      26: "please specify a property",
      27: function _(property, name) {
        return "no observable property '" + property.toString() + "' found on the observable object '" + name + "'";
      },
      28: function _(thing) {
        return "Cannot obtain atom from " + thing;
      },
      29: "Expecting some object",
      30: "invalid action stack. did you forget to finish an action?",
      31: "missing option for computed: get",
      32: function _(name, derivation) {
        return "Cycle detected in computation " + name + ": " + derivation;
      },
      33: function _(name) {
        return "The setter of computed value '" + name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?";
      },
      34: function _(name) {
        return "[ComputedValue '" + name + "'] It is not possible to assign a new value to a computed value.";
      },
      35: "There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`",
      36: "isolateGlobalState should be called before MobX is running any reactions",
      37: function _(method) {
        return "[mobx] `observableArray." + method + "()` mutates the array in-place, which is not allowed inside a derivation. Use `array.slice()." + method + "()` instead";
      }
    };
    var errors =  niceErrors ;
    function die(error) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      {
        var e = typeof error === "string" ? error : errors[error];
        if (typeof e === "function") e = e.apply(null, args);
        throw new Error("[MobX] " + e);
      }
    }

    var mockGlobal = {};
    function getGlobal() {
      if (typeof window !== "undefined") {
        return window;
      }

      if (typeof global !== "undefined") {
        return global;
      }

      if (typeof self !== "undefined") {
        return self;
      }

      return mockGlobal;
    }

    var assign = Object.assign;
    var getDescriptor = Object.getOwnPropertyDescriptor;
    var defineProperty = Object.defineProperty;
    var objectPrototype = Object.prototype;
    var EMPTY_ARRAY = [];
    Object.freeze(EMPTY_ARRAY);
    var EMPTY_OBJECT = {};
    Object.freeze(EMPTY_OBJECT);
    var hasProxy = typeof Proxy !== "undefined";
    var plainObjectString = /*#__PURE__*/Object.toString();
    function assertProxies() {
      if (!hasProxy) {
        die( "`Proxy` objects are not available in the current environment. Please configure MobX to enable a fallback implementation.`" );
      }
    }
    function warnAboutProxyRequirement(msg) {
      if ( globalState.verifyProxies) {
        die("MobX is currently configured to be able to run in ES5 mode, but in ES5 MobX won't be able to " + msg);
      }
    }
    function getNextId() {
      return ++globalState.mobxGuid;
    }
    /**
     * Makes sure that the provided function is invoked at most once.
     */

    function once(func) {
      var invoked = false;
      return function () {
        if (invoked) return;
        invoked = true;
        return func.apply(this, arguments);
      };
    }
    var noop = function noop() {};
    function isFunction(fn) {
      return typeof fn === "function";
    }
    function isStringish(value) {
      var t = typeof value;

      switch (t) {
        case "string":
        case "symbol":
        case "number":
          return true;
      }

      return false;
    }
    function isObject(value) {
      return value !== null && typeof value === "object";
    }
    function isPlainObject(value) {
      var _proto$constructor;

      if (!isObject(value)) return false;
      var proto = Object.getPrototypeOf(value);
      if (proto == null) return true;
      return ((_proto$constructor = proto.constructor) == null ? void 0 : _proto$constructor.toString()) === plainObjectString;
    } // https://stackoverflow.com/a/37865170

    function isGenerator(obj) {
      var constructor = obj == null ? void 0 : obj.constructor;
      if (!constructor) return false;
      if ("GeneratorFunction" === constructor.name || "GeneratorFunction" === constructor.displayName) return true;
      return false;
    }
    function addHiddenProp(object, propName, value) {
      defineProperty(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
      });
    }
    function addHiddenFinalProp(object, propName, value) {
      defineProperty(object, propName, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: value
      });
    }
    function assertPropertyConfigurable(object, prop) {
      {
        var descriptor = getDescriptor(object, prop);
        if ((descriptor == null ? void 0 : descriptor.configurable) === false || (descriptor == null ? void 0 : descriptor.writable) === false) die("Cannot make property '" + stringifyKey(prop) + "' observable, it is not configurable and writable in the target object");
      }
    }
    function createInstanceofPredicate(name, theClass) {
      var propName = "isMobX" + name;
      theClass.prototype[propName] = true;
      return function (x) {
        return isObject(x) && x[propName] === true;
      };
    }
    function isES6Map(thing) {
      return thing instanceof Map;
    }
    function isES6Set(thing) {
      return thing instanceof Set;
    }
    var hasGetOwnPropertySymbols = typeof Object.getOwnPropertySymbols !== "undefined";
    /**
     * Returns the following: own keys, prototype keys & own symbol keys, if they are enumerable.
     */

    function getPlainObjectKeys(object) {
      var keys = Object.keys(object); // Not supported in IE, so there are not going to be symbol props anyway...

      if (!hasGetOwnPropertySymbols) return keys;
      var symbols = Object.getOwnPropertySymbols(object);
      if (!symbols.length) return keys;
      return [].concat(keys, symbols.filter(function (s) {
        return objectPrototype.propertyIsEnumerable.call(object, s);
      }));
    } // From Immer utils
    // Returns all own keys, including non-enumerable and symbolic

    var ownKeys = typeof Reflect !== "undefined" && Reflect.ownKeys ? Reflect.ownKeys : hasGetOwnPropertySymbols ? function (obj) {
      return Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
    } :
    /* istanbul ignore next */
    Object.getOwnPropertyNames;
    function stringifyKey(key) {
      if (typeof key === "string") return key;
      if (typeof key === "symbol") return key.toString();
      return new String(key).toString();
    }
    function toPrimitive(value) {
      return value === null ? null : typeof value === "object" ? "" + value : value;
    }
    function hasProp(target, prop) {
      return objectPrototype.hasOwnProperty.call(target, prop);
    } // From Immer utils

    var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors(target) {
      // Polyfill needed for Hermes and IE, see https://github.com/facebook/hermes/issues/274
      var res = {}; // Note: without polyfill for ownKeys, symbols won't be picked up

      ownKeys(target).forEach(function (key) {
        res[key] = getDescriptor(target, key);
      });
      return res;
    };

    var mobxDecoratorsSymbol = /*#__PURE__*/Symbol("mobx-decorators");
    var mobxAppliedDecoratorsSymbol = /*#__PURE__*/Symbol("mobx-applied-decorators");
    function createDecorator(type) {
      return assign(function (target, property) {
        if (property === undefined) {
          // @decorator(arg) member
          createDecoratorAndAnnotation(type, target);
        } else {
          // @decorator member
          storeDecorator(target, property, type);
        }
      }, {
        annotationType_: type
      });
    }
    function createDecoratorAndAnnotation(type, arg_) {
      return assign(function (target, property) {
        storeDecorator(target, property, type, arg_);
      }, {
        annotationType_: type,
        arg_: arg_
      });
    }
    function storeDecorator(target, property, type, arg_) {
      var desc = getDescriptor(target, mobxDecoratorsSymbol);
      var map;

      if (desc) {
        map = desc.value;
      } else {
        map = {};
        addHiddenProp(target, mobxDecoratorsSymbol, map);
      }

      map[property] = {
        annotationType_: type,
        arg_: arg_
      };
    }
    function applyDecorators(target) {
      if (target[mobxAppliedDecoratorsSymbol]) return true;
      var current = target; // optimization: this could be cached per prototype!
      // (then we can remove the weird short circuiting as well..)

      var annotations = [];

      while (current && current !== objectPrototype) {
        var desc = getDescriptor(current, mobxDecoratorsSymbol);

        if (desc) {
          if (!annotations.length) {
            for (var key in desc.value) {
              // second conditions is to recognize actions
              if (!hasProp(target, key) && !hasProp(current, key)) {
                // not all fields are defined yet, so we are in the makeObservable call of some super class,
                // short circuit, here, we will do this again in a later makeObservable call
                return true;
              }
            }
          }

          annotations.unshift(desc.value);
        }

        current = Object.getPrototypeOf(current);
      }

      annotations.forEach(function (a) {
        makeObservable(target, a);
      });
      addHiddenProp(target, mobxAppliedDecoratorsSymbol, true);
      return annotations.length > 0;
    }

    var $mobx = /*#__PURE__*/Symbol("mobx administration");
    var Atom = /*#__PURE__*/function () {
      // for effective unobserving. BaseAtom has true, for extra optimization, so its onBecomeUnobserved never gets called, because it's not needed

      /**
       * Create a new atom. For debugging purposes it is recommended to give it a name.
       * The onBecomeObserved and onBecomeUnobserved callbacks can be used for resource management.
       */
      function Atom(name_) {
        if (name_ === void 0) {
          name_ = "Atom@" + getNextId();
        }

        this.name_ = void 0;
        this.isPendingUnobservation_ = false;
        this.isBeingObserved_ = false;
        this.observers_ = new Set();
        this.diffValue_ = 0;
        this.lastAccessedBy_ = 0;
        this.lowestObserverState_ = IDerivationState_.NOT_TRACKING_;
        this.onBOL = void 0;
        this.onBUOL = void 0;
        this.name_ = name_;
      } // onBecomeObservedListeners


      var _proto = Atom.prototype;

      _proto.onBO = function onBO() {
        if (this.onBOL) {
          this.onBOL.forEach(function (listener) {
            return listener();
          });
        }
      };

      _proto.onBUO = function onBUO() {
        if (this.onBUOL) {
          this.onBUOL.forEach(function (listener) {
            return listener();
          });
        }
      }
      /**
       * Invoke this method to notify mobx that your atom has been used somehow.
       * Returns true if there is currently a reactive context.
       */
      ;

      _proto.reportObserved = function reportObserved$1() {
        return reportObserved(this);
      }
      /**
       * Invoke this method _after_ this method has changed to signal mobx that all its observers should invalidate.
       */
      ;

      _proto.reportChanged = function reportChanged() {
        startBatch();
        propagateChanged(this);
        endBatch();
      };

      _proto.toString = function toString() {
        return this.name_;
      };

      return Atom;
    }();
    var isAtom = /*#__PURE__*/createInstanceofPredicate("Atom", Atom);
    function createAtom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
      if (onBecomeObservedHandler === void 0) {
        onBecomeObservedHandler = noop;
      }

      if (onBecomeUnobservedHandler === void 0) {
        onBecomeUnobservedHandler = noop;
      }

      var atom = new Atom(name); // default `noop` listener will not initialize the hook Set

      if (onBecomeObservedHandler !== noop) {
        onBecomeObserved(atom, onBecomeObservedHandler);
      }

      if (onBecomeUnobservedHandler !== noop) {
        onBecomeUnobserved(atom, onBecomeUnobservedHandler);
      }

      return atom;
    }

    function identityComparer(a, b) {
      return a === b;
    }

    function structuralComparer(a, b) {
      return deepEqual(a, b);
    }

    function shallowComparer(a, b) {
      return deepEqual(a, b, 1);
    }

    function defaultComparer(a, b) {
      return Object.is(a, b);
    }

    var comparer = {
      identity: identityComparer,
      structural: structuralComparer,
      "default": defaultComparer,
      shallow: shallowComparer
    };

    function deepEnhancer(v, _, name) {
      // it is an observable already, done
      if (isObservable(v)) return v; // something that can be converted and mutated?

      if (Array.isArray(v)) return observable.array(v, {
        name: name
      });
      if (isPlainObject(v)) return observable.object(v, undefined, {
        name: name
      });
      if (isES6Map(v)) return observable.map(v, {
        name: name
      });
      if (isES6Set(v)) return observable.set(v, {
        name: name
      });
      return v;
    }
    function shallowEnhancer(v, _, name) {
      if (v === undefined || v === null) return v;
      if (isObservableObject(v) || isObservableArray(v) || isObservableMap(v) || isObservableSet(v)) return v;
      if (Array.isArray(v)) return observable.array(v, {
        name: name,
        deep: false
      });
      if (isPlainObject(v)) return observable.object(v, undefined, {
        name: name,
        deep: false
      });
      if (isES6Map(v)) return observable.map(v, {
        name: name,
        deep: false
      });
      if (isES6Set(v)) return observable.set(v, {
        name: name,
        deep: false
      });
      die("The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
    }
    function referenceEnhancer(newValue) {
      // never turn into an observable
      return newValue;
    }
    function refStructEnhancer(v, oldValue) {
      if ( isObservable(v)) die("observable.struct should not be used with observable values");
      if (deepEqual(v, oldValue)) return oldValue;
      return v;
    }

    var _annotationToEnhancer;
    var OBSERVABLE = "observable";
    var OBSERVABLE_REF = "observable.ref";
    var OBSERVABLE_SHALLOW = "observable.shallow";
    var OBSERVABLE_STRUCT = "observable.struct"; // Predefined bags of create observable options, to avoid allocating temporarily option objects
    // in the majority of cases

    var defaultCreateObservableOptions = {
      deep: true,
      name: undefined,
      defaultDecorator: undefined,
      proxy: true
    };
    Object.freeze(defaultCreateObservableOptions);
    function asCreateObservableOptions(thing) {
      return thing || defaultCreateObservableOptions;
    }
    function getEnhancerFromOption(options) {
      return options.deep === true ? deepEnhancer : options.deep === false ? referenceEnhancer : getEnhancerFromAnnotation(options.defaultDecorator);
    }
    var annotationToEnhancer = (_annotationToEnhancer = {}, _annotationToEnhancer[OBSERVABLE] = deepEnhancer, _annotationToEnhancer[OBSERVABLE_REF] = referenceEnhancer, _annotationToEnhancer[OBSERVABLE_SHALLOW] = shallowEnhancer, _annotationToEnhancer[OBSERVABLE_STRUCT] = refStructEnhancer, _annotationToEnhancer);
    function getEnhancerFromAnnotation(annotation) {
      var _annotationToEnhancer2;

      return !annotation ? deepEnhancer : (_annotationToEnhancer2 = annotationToEnhancer[annotation.annotationType_]) != null ? _annotationToEnhancer2 : die(12);
    }
    /**
     * Turns an object, array or function into a reactive structure.
     * @param v the value which should become observable.
     */

    function createObservable(v, arg2, arg3) {
      // @observable someProp;
      if (isStringish(arg2)) {
        storeDecorator(v, arg2, OBSERVABLE);
        return;
      } // it is an observable already, done


      if (isObservable(v)) return v; // something that can be converted and mutated?

      var res = isPlainObject(v) ? observable.object(v, arg2, arg3) : Array.isArray(v) ? observable.array(v, arg2) : isES6Map(v) ? observable.map(v, arg2) : isES6Set(v) ? observable.set(v, arg2) : v; // this value could be converted to a new observable data structure, return it

      if (res !== v) return res;
      return observable.box(v);
    }

    createObservable.annotationType_ = OBSERVABLE;
    var observableFactories = {
      box: function box(value, options) {
        var o = asCreateObservableOptions(options);
        return new ObservableValue(value, getEnhancerFromOption(o), o.name, true, o.equals);
      },
      array: function array(initialValues, options) {
        var o = asCreateObservableOptions(options);
        return (globalState.useProxies === false || o.proxy === false ? createLegacyArray : createObservableArray)(initialValues, getEnhancerFromOption(o), o.name);
      },
      map: function map(initialValues, options) {
        var o = asCreateObservableOptions(options);
        return new ObservableMap(initialValues, getEnhancerFromOption(o), o.name);
      },
      set: function set(initialValues, options) {
        var o = asCreateObservableOptions(options);
        return new ObservableSet(initialValues, getEnhancerFromOption(o), o.name);
      },
      object: function object(props, decorators, options) {
        var o = asCreateObservableOptions(options);
        var base = {};
        asObservableObject(base, options == null ? void 0 : options.name, getEnhancerFromOption(o));
        return extendObservable(globalState.useProxies === false || o.proxy === false ? base : createDynamicObservableObject(base), props, decorators, options);
      },
      ref: /*#__PURE__*/createDecorator(OBSERVABLE_REF),
      shallow: /*#__PURE__*/createDecorator(OBSERVABLE_SHALLOW),
      deep: /*#__PURE__*/createDecorator(OBSERVABLE),
      struct: /*#__PURE__*/createDecorator(OBSERVABLE_STRUCT)
    }; // eslint-disable-next-line

    var observable = /*#__PURE__*/assign(createObservable, observableFactories);

    var COMPUTED = "computed";
    var COMPUTED_STRUCT = "computed.struct";
    /**
     * Decorator for class properties: @computed get value() { return expr; }.
     * For legacy purposes also invokable as ES5 observable created: `computed(() => expr)`;
     */

    var computed = function computed(arg1, arg2, arg3) {
      if (isStringish(arg2)) {
        // @computed
        return storeDecorator(arg1, arg2, COMPUTED);
      }

      if (isPlainObject(arg1)) {
        // @computed({ options })
        return createDecoratorAndAnnotation(COMPUTED, arg1);
      } // computed(expr, options?)


      {
        if (!isFunction(arg1)) die("First argument to `computed` should be an expression.");
        if (isFunction(arg2)) die("A setter as second argument is no longer supported, use `{set: fn }` option instead");
      }

      var opts = isPlainObject(arg2) ? arg2 : {};
      opts.get = arg1;
      opts.name = opts.name || arg1.name || "";
      /* for generated name */

      return new ComputedValue(opts);
    };
    computed.annotationType_ = COMPUTED;
    computed.struct = /*#__PURE__*/assign(function (target, property) {
      storeDecorator(target, property, COMPUTED_STRUCT);
    }, {
      annotationType_: COMPUTED_STRUCT
    });

    var _getDescriptor$config, _getDescriptor;
    // mobx versions

    var currentActionId = 0;
    var nextActionId = 1;
    var isFunctionNameConfigurable = (_getDescriptor$config = (_getDescriptor = /*#__PURE__*/getDescriptor(function () {}, "name")) == null ? void 0 : _getDescriptor.configurable) != null ? _getDescriptor$config : false; // we can safely recycle this object

    var tmpNameDescriptor = {
      value: "action",
      configurable: true,
      writable: false,
      enumerable: false
    };
    function createAction(actionName, fn, autoAction, ref) {
      if (autoAction === void 0) {
        autoAction = false;
      }

      {
        if (!isFunction(fn)) die("`action` can only be invoked on functions");
        if (typeof actionName !== "string" || !actionName) die("actions should have valid names, got: '" + actionName + "'");
      }

      function res() {
        return executeAction(actionName, autoAction, fn, ref || this, arguments);
      }

      res.isMobxAction = true;

      if (isFunctionNameConfigurable) {
        tmpNameDescriptor.value = actionName;
        Object.defineProperty(res, "name", tmpNameDescriptor);
      }

      return res;
    }
    function executeAction(actionName, canRunAsDerivation, fn, scope, args) {
      var runInfo = _startAction(actionName, canRunAsDerivation, scope, args);

      try {
        return fn.apply(scope, args);
      } catch (err) {
        runInfo.error_ = err;
        throw err;
      } finally {
        _endAction(runInfo);
      }
    }
    function _startAction(actionName, canRunAsDerivation, // true for autoAction
    scope, args) {
      var notifySpy_ =  isSpyEnabled() && !!actionName;
      var startTime_ = 0;

      if ( notifySpy_) {
        startTime_ = Date.now();
        var flattenedArgs = args ? Array.from(args) : EMPTY_ARRAY;
        spyReportStart({
          type: ACTION,
          name: actionName,
          object: scope,
          arguments: flattenedArgs
        });
      }

      var prevDerivation_ = globalState.trackingDerivation;
      var runAsAction = !canRunAsDerivation || !prevDerivation_;
      startBatch();
      var prevAllowStateChanges_ = globalState.allowStateChanges; // by default preserve previous allow

      if (runAsAction) {
        untrackedStart();
        prevAllowStateChanges_ = allowStateChangesStart(true);
      }

      var prevAllowStateReads_ = allowStateReadsStart(true);
      var runInfo = {
        runAsAction_: runAsAction,
        prevDerivation_: prevDerivation_,
        prevAllowStateChanges_: prevAllowStateChanges_,
        prevAllowStateReads_: prevAllowStateReads_,
        notifySpy_: notifySpy_,
        startTime_: startTime_,
        actionId_: nextActionId++,
        parentActionId_: currentActionId
      };
      currentActionId = runInfo.actionId_;
      return runInfo;
    }
    function _endAction(runInfo) {
      if (currentActionId !== runInfo.actionId_) {
        die(30);
      }

      currentActionId = runInfo.parentActionId_;

      if (runInfo.error_ !== undefined) {
        globalState.suppressReactionErrors = true;
      }

      allowStateChangesEnd(runInfo.prevAllowStateChanges_);
      allowStateReadsEnd(runInfo.prevAllowStateReads_);
      endBatch();
      if (runInfo.runAsAction_) untrackedEnd(runInfo.prevDerivation_);

      if ( runInfo.notifySpy_) {
        spyReportEnd({
          time: Date.now() - runInfo.startTime_
        });
      }

      globalState.suppressReactionErrors = false;
    }
    function allowStateChanges(allowStateChanges, func) {
      var prev = allowStateChangesStart(allowStateChanges);

      try {
        return func();
      } finally {
        allowStateChangesEnd(prev);
      }
    }
    function allowStateChangesStart(allowStateChanges) {
      var prev = globalState.allowStateChanges;
      globalState.allowStateChanges = allowStateChanges;
      return prev;
    }
    function allowStateChangesEnd(prev) {
      globalState.allowStateChanges = prev;
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    function _extends() {
      _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      return _extends.apply(this, arguments);
    }

    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

      return arr2;
    }

    function _createForOfIteratorHelperLoose(o, allowArrayLike) {
      var it;

      if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it) o = it;
          var i = 0;
          return function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          };
        }

        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      it = o[Symbol.iterator]();
      return it.next.bind(it);
    }

    var _Symbol$toPrimitive;
    var CREATE = "create";
    _Symbol$toPrimitive = Symbol.toPrimitive;
    var ObservableValue = /*#__PURE__*/function (_Atom) {
      _inheritsLoose(ObservableValue, _Atom);

      function ObservableValue(value, enhancer, name_, notifySpy, equals) {
        var _this;

        if (name_ === void 0) {
          name_ = "ObservableValue@" + getNextId();
        }

        if (notifySpy === void 0) {
          notifySpy = true;
        }

        if (equals === void 0) {
          equals = comparer["default"];
        }

        _this = _Atom.call(this, name_) || this;
        _this.enhancer = void 0;
        _this.name_ = void 0;
        _this.equals = void 0;
        _this.hasUnreportedChange_ = false;
        _this.interceptors_ = void 0;
        _this.changeListeners_ = void 0;
        _this.value_ = void 0;
        _this.dehancer = void 0;
        _this.enhancer = enhancer;
        _this.name_ = name_;
        _this.equals = equals;
        _this.value_ = enhancer(value, undefined, name_);

        if ( notifySpy && isSpyEnabled()) {
          // only notify spy if this is a stand-alone observable
          spyReport({
            type: CREATE,
            object: _assertThisInitialized(_this),
            observableKind: "value",
            debugObjectName: _this.name_,
            newValue: "" + _this.value_
          });
        }

        return _this;
      }

      var _proto = ObservableValue.prototype;

      _proto.dehanceValue = function dehanceValue(value) {
        if (this.dehancer !== undefined) return this.dehancer(value);
        return value;
      };

      _proto.set = function set(newValue) {
        var oldValue = this.value_;
        newValue = this.prepareNewValue_(newValue);

        if (newValue !== globalState.UNCHANGED) {
          var notifySpy = isSpyEnabled();

          if ( notifySpy) {
            spyReportStart({
              type: UPDATE,
              object: this,
              observableKind: "value",
              debugObjectName: this.name_,
              newValue: newValue,
              oldValue: oldValue
            });
          }

          this.setNewValue_(newValue);
          if ( notifySpy) spyReportEnd();
        }
      };

      _proto.prepareNewValue_ = function prepareNewValue_(newValue) {
        checkIfStateModificationsAreAllowed(this);

        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            object: this,
            type: UPDATE,
            newValue: newValue
          });
          if (!change) return globalState.UNCHANGED;
          newValue = change.newValue;
        } // apply modifier


        newValue = this.enhancer(newValue, this.value_, this.name_);
        return this.equals(this.value_, newValue) ? globalState.UNCHANGED : newValue;
      };

      _proto.setNewValue_ = function setNewValue_(newValue) {
        var oldValue = this.value_;
        this.value_ = newValue;
        this.reportChanged();

        if (hasListeners(this)) {
          notifyListeners(this, {
            type: UPDATE,
            object: this,
            newValue: newValue,
            oldValue: oldValue
          });
        }
      };

      _proto.get = function get() {
        this.reportObserved();
        return this.dehanceValue(this.value_);
      };

      _proto.intercept_ = function intercept_(handler) {
        return registerInterceptor(this, handler);
      };

      _proto.observe_ = function observe_(listener, fireImmediately) {
        if (fireImmediately) listener({
          observableKind: "value",
          debugObjectName: this.name_,
          object: this,
          type: UPDATE,
          newValue: this.value_,
          oldValue: undefined
        });
        return registerListener(this, listener);
      };

      _proto.raw = function raw() {
        // used by MST ot get undehanced value
        return this.value_;
      };

      _proto.toJSON = function toJSON() {
        return this.get();
      };

      _proto.toString = function toString() {
        return this.name_ + "[" + this.value_ + "]";
      };

      _proto.valueOf = function valueOf() {
        return toPrimitive(this.get());
      };

      _proto[_Symbol$toPrimitive] = function () {
        return this.valueOf();
      };

      return ObservableValue;
    }(Atom);
    var isObservableValue = /*#__PURE__*/createInstanceofPredicate("ObservableValue", ObservableValue);

    var _Symbol$toPrimitive$1;
    /**
     * A node in the state dependency root that observes other nodes, and can be observed itself.
     *
     * ComputedValue will remember the result of the computation for the duration of the batch, or
     * while being observed.
     *
     * During this time it will recompute only when one of its direct dependencies changed,
     * but only when it is being accessed with `ComputedValue.get()`.
     *
     * Implementation description:
     * 1. First time it's being accessed it will compute and remember result
     *    give back remembered result until 2. happens
     * 2. First time any deep dependency change, propagate POSSIBLY_STALE to all observers, wait for 3.
     * 3. When it's being accessed, recompute if any shallow dependency changed.
     *    if result changed: propagate STALE to all observers, that were POSSIBLY_STALE from the last step.
     *    go to step 2. either way
     *
     * If at any point it's outside batch and it isn't observed: reset everything and go to 1.
     */

    _Symbol$toPrimitive$1 = Symbol.toPrimitive;
    var ComputedValue = /*#__PURE__*/function () {
      // nodes we are looking at. Our value depends on these nodes
      // during tracking it's an array with new observed observers
      // to check for cycles
      // N.B: unminified as it is used by MST

      /**
       * Create a new computed value based on a function expression.
       *
       * The `name` property is for debug purposes only.
       *
       * The `equals` property specifies the comparer function to use to determine if a newly produced
       * value differs from the previous value. Two comparers are provided in the library; `defaultComparer`
       * compares based on identity comparison (===), and `structuralComparer` deeply compares the structure.
       * Structural comparison can be convenient if you always produce a new aggregated object and
       * don't want to notify observers if it is structurally the same.
       * This is useful for working with vectors, mouse coordinates etc.
       */
      function ComputedValue(options) {
        this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
        this.observing_ = [];
        this.newObserving_ = null;
        this.isBeingObserved_ = false;
        this.isPendingUnobservation_ = false;
        this.observers_ = new Set();
        this.diffValue_ = 0;
        this.runId_ = 0;
        this.lastAccessedBy_ = 0;
        this.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
        this.unboundDepsCount_ = 0;
        this.mapid_ = "#" + getNextId();
        this.value_ = new CaughtException(null);
        this.name_ = void 0;
        this.triggeredBy_ = void 0;
        this.isComputing_ = false;
        this.isRunningSetter_ = false;
        this.derivation = void 0;
        this.setter_ = void 0;
        this.isTracing_ = TraceMode.NONE;
        this.scope_ = void 0;
        this.equals_ = void 0;
        this.requiresReaction_ = void 0;
        this.keepAlive_ = void 0;
        this.onBOL = void 0;
        this.onBUOL = void 0;
        if (!options.get) die(31);
        this.derivation = options.get;
        this.name_ = options.name || "ComputedValue@" + getNextId();
        if (options.set) this.setter_ = createAction(this.name_ + "-setter", options.set);
        this.equals_ = options.equals || (options.compareStructural || options.struct ? comparer.structural : comparer["default"]);
        this.scope_ = options.context;
        this.requiresReaction_ = !!options.requiresReaction;
        this.keepAlive_ = !!options.keepAlive;
      }

      var _proto = ComputedValue.prototype;

      _proto.onBecomeStale_ = function onBecomeStale_() {
        propagateMaybeChanged(this);
      };

      _proto.onBO = function onBO() {
        if (this.onBOL) {
          this.onBOL.forEach(function (listener) {
            return listener();
          });
        }
      };

      _proto.onBUO = function onBUO() {
        if (this.onBUOL) {
          this.onBUOL.forEach(function (listener) {
            return listener();
          });
        }
      }
      /**
       * Returns the current value of this computed value.
       * Will evaluate its computation first if needed.
       */
      ;

      _proto.get = function get() {
        if (this.isComputing_) die(32, this.name_, this.derivation);

        if (globalState.inBatch === 0 && // !globalState.trackingDerivatpion &&
        this.observers_.size === 0 && !this.keepAlive_) {
          if (shouldCompute(this)) {
            this.warnAboutUntrackedRead_();
            startBatch(); // See perf test 'computed memoization'

            this.value_ = this.computeValue_(false);
            endBatch();
          }
        } else {
          reportObserved(this);

          if (shouldCompute(this)) {
            var prevTrackingContext = globalState.trackingContext;
            if (this.keepAlive_ && !prevTrackingContext) globalState.trackingContext = this;
            if (this.trackAndCompute()) propagateChangeConfirmed(this);
            globalState.trackingContext = prevTrackingContext;
          }
        }

        var result = this.value_;
        if (isCaughtException(result)) throw result.cause;
        return result;
      };

      _proto.set = function set(value) {
        if (this.setter_) {
          if (this.isRunningSetter_) die(33, this.name_);
          this.isRunningSetter_ = true;

          try {
            this.setter_.call(this.scope_, value);
          } finally {
            this.isRunningSetter_ = false;
          }
        } else die(34, this.name_);
      };

      _proto.trackAndCompute = function trackAndCompute() {
        // N.B: unminified as it is used by MST
        var oldValue = this.value_;
        var wasSuspended =
        /* see #1208 */
        this.dependenciesState_ === IDerivationState_.NOT_TRACKING_;
        var newValue = this.computeValue_(true);

        if ( isSpyEnabled()) {
          spyReport({
            observableKind: "computed",
            debugObjectName: this.name_,
            object: this.scope_,
            type: "update",
            oldValue: this.value_,
            newValue: newValue
          });
        }

        var changed = wasSuspended || isCaughtException(oldValue) || isCaughtException(newValue) || !this.equals_(oldValue, newValue);

        if (changed) {
          this.value_ = newValue;
        }

        return changed;
      };

      _proto.computeValue_ = function computeValue_(track) {
        this.isComputing_ = true; // don't allow state changes during computation

        var prev = allowStateChangesStart(false);
        var res;

        if (track) {
          res = trackDerivedFunction(this, this.derivation, this.scope_);
        } else {
          if (globalState.disableErrorBoundaries === true) {
            res = this.derivation.call(this.scope_);
          } else {
            try {
              res = this.derivation.call(this.scope_);
            } catch (e) {
              res = new CaughtException(e);
            }
          }
        }

        allowStateChangesEnd(prev);
        this.isComputing_ = false;
        return res;
      };

      _proto.suspend_ = function suspend_() {
        if (!this.keepAlive_) {
          clearObserving(this);
          this.value_ = undefined; // don't hold on to computed value!
        }
      };

      _proto.observe_ = function observe_(listener, fireImmediately) {
        var _this = this;

        var firstTime = true;
        var prevValue = undefined;
        return autorun(function () {
          // TODO: why is this in a different place than the spyReport() function? in all other observables it's called in the same place
          var newValue = _this.get();

          if (!firstTime || fireImmediately) {
            var prevU = untrackedStart();
            listener({
              observableKind: "computed",
              debugObjectName: _this.name_,
              type: UPDATE,
              object: _this,
              newValue: newValue,
              oldValue: prevValue
            });
            untrackedEnd(prevU);
          }

          firstTime = false;
          prevValue = newValue;
        });
      };

      _proto.warnAboutUntrackedRead_ = function warnAboutUntrackedRead_() {

        if (this.requiresReaction_ === true) {
          die("[mobx] Computed value " + this.name_ + " is read outside a reactive context");
        }

        if (this.isTracing_ !== TraceMode.NONE) {
          console.log("[mobx.trace] '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute");
        }

        if (globalState.computedRequiresReaction) {
          console.warn("[mobx] Computed value " + this.name_ + " is being read outside a reactive context. Doing a full recompute");
        }
      };

      _proto.toString = function toString() {
        return this.name_ + "[" + this.derivation.toString() + "]";
      };

      _proto.valueOf = function valueOf() {
        return toPrimitive(this.get());
      };

      _proto[_Symbol$toPrimitive$1] = function () {
        return this.valueOf();
      };

      return ComputedValue;
    }();
    var isComputedValue = /*#__PURE__*/createInstanceofPredicate("ComputedValue", ComputedValue);

    var IDerivationState_;

    (function (IDerivationState_) {
      // before being run or (outside batch and not being observed)
      // at this point derivation is not holding any data about dependency tree
      IDerivationState_[IDerivationState_["NOT_TRACKING_"] = -1] = "NOT_TRACKING_"; // no shallow dependency changed since last computation
      // won't recalculate derivation
      // this is what makes mobx fast

      IDerivationState_[IDerivationState_["UP_TO_DATE_"] = 0] = "UP_TO_DATE_"; // some deep dependency changed, but don't know if shallow dependency changed
      // will require to check first if UP_TO_DATE or POSSIBLY_STALE
      // currently only ComputedValue will propagate POSSIBLY_STALE
      //
      // having this state is second big optimization:
      // don't have to recompute on every dependency change, but only when it's needed

      IDerivationState_[IDerivationState_["POSSIBLY_STALE_"] = 1] = "POSSIBLY_STALE_"; // A shallow dependency has changed since last computation and the derivation
      // will need to recompute when it's needed next.

      IDerivationState_[IDerivationState_["STALE_"] = 2] = "STALE_";
    })(IDerivationState_ || (IDerivationState_ = {}));

    var TraceMode;

    (function (TraceMode) {
      TraceMode[TraceMode["NONE"] = 0] = "NONE";
      TraceMode[TraceMode["LOG"] = 1] = "LOG";
      TraceMode[TraceMode["BREAK"] = 2] = "BREAK";
    })(TraceMode || (TraceMode = {}));

    var CaughtException = function CaughtException(cause) {
      this.cause = void 0;
      this.cause = cause; // Empty
    };
    function isCaughtException(e) {
      return e instanceof CaughtException;
    }
    /**
     * Finds out whether any dependency of the derivation has actually changed.
     * If dependenciesState is 1 then it will recalculate dependencies,
     * if any dependency changed it will propagate it by changing dependenciesState to 2.
     *
     * By iterating over the dependencies in the same order that they were reported and
     * stopping on the first change, all the recalculations are only called for ComputedValues
     * that will be tracked by derivation. That is because we assume that if the first x
     * dependencies of the derivation doesn't change then the derivation should run the same way
     * up until accessing x-th dependency.
     */

    function shouldCompute(derivation) {
      switch (derivation.dependenciesState_) {
        case IDerivationState_.UP_TO_DATE_:
          return false;

        case IDerivationState_.NOT_TRACKING_:
        case IDerivationState_.STALE_:
          return true;

        case IDerivationState_.POSSIBLY_STALE_:
          {
            // state propagation can occur outside of action/reactive context #2195
            var prevAllowStateReads = allowStateReadsStart(true);
            var prevUntracked = untrackedStart(); // no need for those computeds to be reported, they will be picked up in trackDerivedFunction.

            var obs = derivation.observing_,
                l = obs.length;

            for (var i = 0; i < l; i++) {
              var obj = obs[i];

              if (isComputedValue(obj)) {
                if (globalState.disableErrorBoundaries) {
                  obj.get();
                } else {
                  try {
                    obj.get();
                  } catch (e) {
                    // we are not interested in the value *or* exception at this moment, but if there is one, notify all
                    untrackedEnd(prevUntracked);
                    allowStateReadsEnd(prevAllowStateReads);
                    return true;
                  }
                } // if ComputedValue `obj` actually changed it will be computed and propagated to its observers.
                // and `derivation` is an observer of `obj`
                // invariantShouldCompute(derivation)


                if (derivation.dependenciesState_ === IDerivationState_.STALE_) {
                  untrackedEnd(prevUntracked);
                  allowStateReadsEnd(prevAllowStateReads);
                  return true;
                }
              }
            }

            changeDependenciesStateTo0(derivation);
            untrackedEnd(prevUntracked);
            allowStateReadsEnd(prevAllowStateReads);
            return false;
          }
      }
    }
    function isComputingDerivation() {
      return globalState.trackingDerivation !== null; // filter out actions inside computations
    }
    function checkIfStateModificationsAreAllowed(atom) {

      var hasObservers = atom.observers_.size > 0; // Should not be possible to change observed state outside strict mode, except during initialization, see #563

      if (!globalState.allowStateChanges && (hasObservers || globalState.enforceActions === "always")) console.warn("[MobX] " + (globalState.enforceActions ? "Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: " : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, a computed value or the render function of a React component? You can wrap side effects in 'runInAction' (or decorate functions with 'action') if needed. Tried to modify: ") + atom.name_);
    }
    function checkIfStateReadsAreAllowed(observable) {
      if ( !globalState.allowStateReads && globalState.observableRequiresReaction) {
        console.warn("[mobx] Observable " + observable.name_ + " being read outside a reactive context");
      }
    }
    /**
     * Executes the provided function `f` and tracks which observables are being accessed.
     * The tracking information is stored on the `derivation` object and the derivation is registered
     * as observer of any of the accessed observables.
     */

    function trackDerivedFunction(derivation, f, context) {
      var prevAllowStateReads = allowStateReadsStart(true); // pre allocate array allocation + room for variation in deps
      // array will be trimmed by bindDependencies

      changeDependenciesStateTo0(derivation);
      derivation.newObserving_ = new Array(derivation.observing_.length + 100);
      derivation.unboundDepsCount_ = 0;
      derivation.runId_ = ++globalState.runId;
      var prevTracking = globalState.trackingDerivation;
      globalState.trackingDerivation = derivation;
      globalState.inBatch++;
      var result;

      if (globalState.disableErrorBoundaries === true) {
        result = f.call(context);
      } else {
        try {
          result = f.call(context);
        } catch (e) {
          result = new CaughtException(e);
        }
      }

      globalState.inBatch--;
      globalState.trackingDerivation = prevTracking;
      bindDependencies(derivation);
      warnAboutDerivationWithoutDependencies(derivation);
      allowStateReadsEnd(prevAllowStateReads);
      return result;
    }

    function warnAboutDerivationWithoutDependencies(derivation) {
      if (derivation.observing_.length !== 0) return;

      if (globalState.reactionRequiresObservable || derivation.requiresObservable_) {
        console.warn("[mobx] Derivation " + derivation.name_ + " is created/updated without reading any observable value");
      }
    }
    /**
     * diffs newObserving with observing.
     * update observing to be newObserving with unique observables
     * notify observers that become observed/unobserved
     */


    function bindDependencies(derivation) {
      // invariant(derivation.dependenciesState !== IDerivationState.NOT_TRACKING, "INTERNAL ERROR bindDependencies expects derivation.dependenciesState !== -1");
      var prevObserving = derivation.observing_;
      var observing = derivation.observing_ = derivation.newObserving_;
      var lowestNewObservingDerivationState = IDerivationState_.UP_TO_DATE_; // Go through all new observables and check diffValue: (this list can contain duplicates):
      //   0: first occurrence, change to 1 and keep it
      //   1: extra occurrence, drop it

      var i0 = 0,
          l = derivation.unboundDepsCount_;

      for (var i = 0; i < l; i++) {
        var dep = observing[i];

        if (dep.diffValue_ === 0) {
          dep.diffValue_ = 1;
          if (i0 !== i) observing[i0] = dep;
          i0++;
        } // Upcast is 'safe' here, because if dep is IObservable, `dependenciesState` will be undefined,
        // not hitting the condition


        if (dep.dependenciesState_ > lowestNewObservingDerivationState) {
          lowestNewObservingDerivationState = dep.dependenciesState_;
        }
      }

      observing.length = i0;
      derivation.newObserving_ = null; // newObserving shouldn't be needed outside tracking (statement moved down to work around FF bug, see #614)
      // Go through all old observables and check diffValue: (it is unique after last bindDependencies)
      //   0: it's not in new observables, unobserve it
      //   1: it keeps being observed, don't want to notify it. change to 0

      l = prevObserving.length;

      while (l--) {
        var _dep = prevObserving[l];

        if (_dep.diffValue_ === 0) {
          removeObserver(_dep, derivation);
        }

        _dep.diffValue_ = 0;
      } // Go through all new observables and check diffValue: (now it should be unique)
      //   0: it was set to 0 in last loop. don't need to do anything.
      //   1: it wasn't observed, let's observe it. set back to 0


      while (i0--) {
        var _dep2 = observing[i0];

        if (_dep2.diffValue_ === 1) {
          _dep2.diffValue_ = 0;
          addObserver(_dep2, derivation);
        }
      } // Some new observed derivations may become stale during this derivation computation
      // so they have had no chance to propagate staleness (#916)


      if (lowestNewObservingDerivationState !== IDerivationState_.UP_TO_DATE_) {
        derivation.dependenciesState_ = lowestNewObservingDerivationState;
        derivation.onBecomeStale_();
      }
    }

    function clearObserving(derivation) {
      // invariant(globalState.inBatch > 0, "INTERNAL ERROR clearObserving should be called only inside batch");
      var obs = derivation.observing_;
      derivation.observing_ = [];
      var i = obs.length;

      while (i--) {
        removeObserver(obs[i], derivation);
      }

      derivation.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
    }
    function untracked(action) {
      var prev = untrackedStart();

      try {
        return action();
      } finally {
        untrackedEnd(prev);
      }
    }
    function untrackedStart() {
      var prev = globalState.trackingDerivation;
      globalState.trackingDerivation = null;
      return prev;
    }
    function untrackedEnd(prev) {
      globalState.trackingDerivation = prev;
    }
    function allowStateReadsStart(allowStateReads) {
      var prev = globalState.allowStateReads;
      globalState.allowStateReads = allowStateReads;
      return prev;
    }
    function allowStateReadsEnd(prev) {
      globalState.allowStateReads = prev;
    }
    /**
     * needed to keep `lowestObserverState` correct. when changing from (2 or 1) to 0
     *
     */

    function changeDependenciesStateTo0(derivation) {
      if (derivation.dependenciesState_ === IDerivationState_.UP_TO_DATE_) return;
      derivation.dependenciesState_ = IDerivationState_.UP_TO_DATE_;
      var obs = derivation.observing_;
      var i = obs.length;

      while (i--) {
        obs[i].lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
      }
    }

    /**
     * These values will persist if global state is reset
     */

    var persistentKeys = ["mobxGuid", "spyListeners", "enforceActions", "computedRequiresReaction", "reactionRequiresObservable", "observableRequiresReaction", "allowStateReads", "disableErrorBoundaries", "runId", "UNCHANGED", "useProxies"];
    var MobXGlobals = function MobXGlobals() {
      this.version = 6;
      this.UNCHANGED = {};
      this.trackingDerivation = null;
      this.trackingContext = null;
      this.runId = 0;
      this.mobxGuid = 0;
      this.inBatch = 0;
      this.pendingUnobservations = [];
      this.pendingReactions = [];
      this.isRunningReactions = false;
      this.allowStateChanges = false;
      this.allowStateReads = true;
      this.enforceActions = true;
      this.spyListeners = [];
      this.globalReactionErrorHandlers = [];
      this.computedRequiresReaction = false;
      this.reactionRequiresObservable = false;
      this.observableRequiresReaction = false;
      this.disableErrorBoundaries = false;
      this.suppressReactionErrors = false;
      this.useProxies = true;
      this.verifyProxies = false;
    };
    var canMergeGlobalState = true;
    var isolateCalled = false;
    var globalState = /*#__PURE__*/function () {
      var global = /*#__PURE__*/getGlobal();
      if (global.__mobxInstanceCount > 0 && !global.__mobxGlobals) canMergeGlobalState = false;
      if (global.__mobxGlobals && global.__mobxGlobals.version !== new MobXGlobals().version) canMergeGlobalState = false;

      if (!canMergeGlobalState) {
        setTimeout(function () {
          if (!isolateCalled) {
            die(35);
          }
        }, 1);
        return new MobXGlobals();
      } else if (global.__mobxGlobals) {
        global.__mobxInstanceCount += 1;
        if (!global.__mobxGlobals.UNCHANGED) global.__mobxGlobals.UNCHANGED = {}; // make merge backward compatible

        return global.__mobxGlobals;
      } else {
        global.__mobxInstanceCount = 1;
        return global.__mobxGlobals = /*#__PURE__*/new MobXGlobals();
      }
    }();
    function isolateGlobalState() {
      if (globalState.pendingReactions.length || globalState.inBatch || globalState.isRunningReactions) die(36);
      isolateCalled = true;

      if (canMergeGlobalState) {
        var global = getGlobal();
        if (--global.__mobxInstanceCount === 0) global.__mobxGlobals = undefined;
        globalState = new MobXGlobals();
      }
    }
    function getGlobalState() {
      return globalState;
    }
    /**
     * For testing purposes only; this will break the internal state of existing observables,
     * but can be used to get back at a stable state after throwing errors
     */

    function resetGlobalState() {
      var defaultGlobals = new MobXGlobals();

      for (var key in defaultGlobals) {
        if (persistentKeys.indexOf(key) === -1) globalState[key] = defaultGlobals[key];
      }

      globalState.allowStateChanges = !globalState.enforceActions;
    }

    function hasObservers(observable) {
      return observable.observers_ && observable.observers_.size > 0;
    }
    function getObservers(observable) {
      return observable.observers_;
    } // function invariantObservers(observable: IObservable) {
    //     const list = observable.observers
    //     const map = observable.observersIndexes
    //     const l = list.length
    //     for (let i = 0; i < l; i++) {
    //         const id = list[i].__mapid
    //         if (i) {
    //             invariant(map[id] === i, "INTERNAL ERROR maps derivation.__mapid to index in list") // for performance
    //         } else {
    //             invariant(!(id in map), "INTERNAL ERROR observer on index 0 shouldn't be held in map.") // for performance
    //         }
    //     }
    //     invariant(
    //         list.length === 0 || Object.keys(map).length === list.length - 1,
    //         "INTERNAL ERROR there is no junk in map"
    //     )
    // }

    function addObserver(observable, node) {
      // invariant(node.dependenciesState !== -1, "INTERNAL ERROR, can add only dependenciesState !== -1");
      // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR add already added node");
      // invariantObservers(observable);
      observable.observers_.add(node);
      if (observable.lowestObserverState_ > node.dependenciesState_) observable.lowestObserverState_ = node.dependenciesState_; // invariantObservers(observable);
      // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR didn't add node");
    }
    function removeObserver(observable, node) {
      // invariant(globalState.inBatch > 0, "INTERNAL ERROR, remove should be called only inside batch");
      // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR remove already removed node");
      // invariantObservers(observable);
      observable.observers_["delete"](node);

      if (observable.observers_.size === 0) {
        // deleting last observer
        queueForUnobservation(observable);
      } // invariantObservers(observable);
      // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR remove already removed node2");

    }
    function queueForUnobservation(observable) {
      if (observable.isPendingUnobservation_ === false) {
        // invariant(observable._observers.length === 0, "INTERNAL ERROR, should only queue for unobservation unobserved observables");
        observable.isPendingUnobservation_ = true;
        globalState.pendingUnobservations.push(observable);
      }
    }
    /**
     * Batch starts a transaction, at least for purposes of memoizing ComputedValues when nothing else does.
     * During a batch `onBecomeUnobserved` will be called at most once per observable.
     * Avoids unnecessary recalculations.
     */

    function startBatch() {
      globalState.inBatch++;
    }
    function endBatch() {
      if (--globalState.inBatch === 0) {
        runReactions(); // the batch is actually about to finish, all unobserving should happen here.

        var list = globalState.pendingUnobservations;

        for (var i = 0; i < list.length; i++) {
          var observable = list[i];
          observable.isPendingUnobservation_ = false;

          if (observable.observers_.size === 0) {
            if (observable.isBeingObserved_) {
              // if this observable had reactive observers, trigger the hooks
              observable.isBeingObserved_ = false;
              observable.onBUO();
            }

            if (observable instanceof ComputedValue) {
              // computed values are automatically teared down when the last observer leaves
              // this process happens recursively, this computed might be the last observabe of another, etc..
              observable.suspend_();
            }
          }
        }

        globalState.pendingUnobservations = [];
      }
    }
    function reportObserved(observable) {
      checkIfStateReadsAreAllowed(observable);
      var derivation = globalState.trackingDerivation;

      if (derivation !== null) {
        /**
         * Simple optimization, give each derivation run an unique id (runId)
         * Check if last time this observable was accessed the same runId is used
         * if this is the case, the relation is already known
         */
        if (derivation.runId_ !== observable.lastAccessedBy_) {
          observable.lastAccessedBy_ = derivation.runId_; // Tried storing newObserving, or observing, or both as Set, but performance didn't come close...

          derivation.newObserving_[derivation.unboundDepsCount_++] = observable;

          if (!observable.isBeingObserved_ && globalState.trackingContext) {
            observable.isBeingObserved_ = true;
            observable.onBO();
          }
        }

        return true;
      } else if (observable.observers_.size === 0 && globalState.inBatch > 0) {
        queueForUnobservation(observable);
      }

      return false;
    } // function invariantLOS(observable: IObservable, msg: string) {
    //     // it's expensive so better not run it in produciton. but temporarily helpful for testing
    //     const min = getObservers(observable).reduce((a, b) => Math.min(a, b.dependenciesState), 2)
    //     if (min >= observable.lowestObserverState) return // <- the only assumption about `lowestObserverState`
    //     throw new Error(
    //         "lowestObserverState is wrong for " +
    //             msg +
    //             " because " +
    //             min +
    //             " < " +
    //             observable.lowestObserverState
    //     )
    // }

    /**
     * NOTE: current propagation mechanism will in case of self reruning autoruns behave unexpectedly
     * It will propagate changes to observers from previous run
     * It's hard or maybe impossible (with reasonable perf) to get it right with current approach
     * Hopefully self reruning autoruns aren't a feature people should depend on
     * Also most basic use cases should be ok
     */
    // Called by Atom when its value changes

    function propagateChanged(observable) {
      // invariantLOS(observable, "changed start");
      if (observable.lowestObserverState_ === IDerivationState_.STALE_) return;
      observable.lowestObserverState_ = IDerivationState_.STALE_; // Ideally we use for..of here, but the downcompiled version is really slow...

      observable.observers_.forEach(function (d) {
        if (d.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
          if ( d.isTracing_ !== TraceMode.NONE) {
            logTraceInfo(d, observable);
          }

          d.onBecomeStale_();
        }

        d.dependenciesState_ = IDerivationState_.STALE_;
      }); // invariantLOS(observable, "changed end");
    } // Called by ComputedValue when it recalculate and its value changed

    function propagateChangeConfirmed(observable) {
      // invariantLOS(observable, "confirmed start");
      if (observable.lowestObserverState_ === IDerivationState_.STALE_) return;
      observable.lowestObserverState_ = IDerivationState_.STALE_;
      observable.observers_.forEach(function (d) {
        if (d.dependenciesState_ === IDerivationState_.POSSIBLY_STALE_) d.dependenciesState_ = IDerivationState_.STALE_;else if (d.dependenciesState_ === IDerivationState_.UP_TO_DATE_ // this happens during computing of `d`, just keep lowestObserverState up to date.
        ) observable.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
      }); // invariantLOS(observable, "confirmed end");
    } // Used by computed when its dependency changed, but we don't wan't to immediately recompute.

    function propagateMaybeChanged(observable) {
      // invariantLOS(observable, "maybe start");
      if (observable.lowestObserverState_ !== IDerivationState_.UP_TO_DATE_) return;
      observable.lowestObserverState_ = IDerivationState_.POSSIBLY_STALE_;
      observable.observers_.forEach(function (d) {
        if (d.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
          d.dependenciesState_ = IDerivationState_.POSSIBLY_STALE_;

          if ( d.isTracing_ !== TraceMode.NONE) {
            logTraceInfo(d, observable);
          }

          d.onBecomeStale_();
        }
      }); // invariantLOS(observable, "maybe end");
    }

    function logTraceInfo(derivation, observable) {
      console.log("[mobx.trace] '" + derivation.name_ + "' is invalidated due to a change in: '" + observable.name_ + "'");

      if (derivation.isTracing_ === TraceMode.BREAK) {
        var lines = [];
        printDepTree(getDependencyTree(derivation), lines, 1); // prettier-ignore

        new Function("debugger;\n/*\nTracing '" + derivation.name_ + "'\n\nYou are entering this break point because derivation '" + derivation.name_ + "' is being traced and '" + observable.name_ + "' is now forcing it to update.\nJust follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update\nThe stackframe you are looking for is at least ~6-8 stack-frames up.\n\n" + (derivation instanceof ComputedValue ? derivation.derivation.toString().replace(/[*]\//g, "/") : "") + "\n\nThe dependencies for this derivation are:\n\n" + lines.join("\n") + "\n*/\n    ")();
      }
    }

    function printDepTree(tree, lines, depth) {
      if (lines.length >= 1000) {
        lines.push("(and many more)");
        return;
      }

      lines.push("" + new Array(depth).join("\t") + tree.name); // MWE: not the fastest, but the easiest way :)

      if (tree.dependencies) tree.dependencies.forEach(function (child) {
        return printDepTree(child, lines, depth + 1);
      });
    }

    var Reaction = /*#__PURE__*/function () {
      // nodes we are looking at. Our value depends on these nodes
      function Reaction(name_, onInvalidate_, errorHandler_, requiresObservable_) {
        if (name_ === void 0) {
          name_ = "Reaction@" + getNextId();
        }

        if (requiresObservable_ === void 0) {
          requiresObservable_ = false;
        }

        this.name_ = void 0;
        this.onInvalidate_ = void 0;
        this.errorHandler_ = void 0;
        this.requiresObservable_ = void 0;
        this.observing_ = [];
        this.newObserving_ = [];
        this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
        this.diffValue_ = 0;
        this.runId_ = 0;
        this.unboundDepsCount_ = 0;
        this.mapid_ = "#" + getNextId();
        this.isDisposed_ = false;
        this.isScheduled_ = false;
        this.isTrackPending_ = false;
        this.isRunning_ = false;
        this.isTracing_ = TraceMode.NONE;
        this.name_ = name_;
        this.onInvalidate_ = onInvalidate_;
        this.errorHandler_ = errorHandler_;
        this.requiresObservable_ = requiresObservable_;
      }

      var _proto = Reaction.prototype;

      _proto.onBecomeStale_ = function onBecomeStale_() {
        this.schedule_();
      };

      _proto.schedule_ = function schedule_() {
        if (!this.isScheduled_) {
          this.isScheduled_ = true;
          globalState.pendingReactions.push(this);
          runReactions();
        }
      };

      _proto.isScheduled = function isScheduled() {
        return this.isScheduled_;
      }
      /**
       * internal, use schedule() if you intend to kick off a reaction
       */
      ;

      _proto.runReaction_ = function runReaction_() {
        if (!this.isDisposed_) {
          startBatch();
          this.isScheduled_ = false;

          if (shouldCompute(this)) {
            this.isTrackPending_ = true;

            try {
              this.onInvalidate_();

              if ("development" !== "production" && this.isTrackPending_ && isSpyEnabled()) {
                // onInvalidate didn't trigger track right away..
                spyReport({
                  name: this.name_,
                  type: "scheduled-reaction"
                });
              }
            } catch (e) {
              this.reportExceptionInDerivation_(e);
            }
          }

          endBatch();
        }
      };

      _proto.track = function track(fn) {
        if (this.isDisposed_) {
          return; // console.warn("Reaction already disposed") // Note: Not a warning / error in mobx 4 either
        }

        startBatch();
        var notify = isSpyEnabled();
        var startTime;

        if ( notify) {
          startTime = Date.now();
          spyReportStart({
            name: this.name_,
            type: "reaction"
          });
        }

        this.isRunning_ = true;
        var prevReaction = globalState.trackingContext; // reactions could create reactions...

        globalState.trackingContext = this;
        var result = trackDerivedFunction(this, fn, undefined);
        globalState.trackingContext = prevReaction;
        this.isRunning_ = false;
        this.isTrackPending_ = false;

        if (this.isDisposed_) {
          // disposed during last run. Clean up everything that was bound after the dispose call.
          clearObserving(this);
        }

        if (isCaughtException(result)) this.reportExceptionInDerivation_(result.cause);

        if ( notify) {
          spyReportEnd({
            time: Date.now() - startTime
          });
        }

        endBatch();
      };

      _proto.reportExceptionInDerivation_ = function reportExceptionInDerivation_(error) {
        var _this = this;

        if (this.errorHandler_) {
          this.errorHandler_(error, this);
          return;
        }

        if (globalState.disableErrorBoundaries) throw error;
        var message =  "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'" ;

        if (!globalState.suppressReactionErrors) {
          console.error(message, error);
          /** If debugging brought you here, please, read the above message :-). Tnx! */
        } else console.warn("[mobx] (error in reaction '" + this.name_ + "' suppressed, fix error of causing action below)"); // prettier-ignore


        if ( isSpyEnabled()) {
          spyReport({
            type: "error",
            name: this.name_,
            message: message,
            error: "" + error
          });
        }

        globalState.globalReactionErrorHandlers.forEach(function (f) {
          return f(error, _this);
        });
      };

      _proto.dispose = function dispose() {
        if (!this.isDisposed_) {
          this.isDisposed_ = true;

          if (!this.isRunning_) {
            // if disposed while running, clean up later. Maybe not optimal, but rare case
            startBatch();
            clearObserving(this);
            endBatch();
          }
        }
      };

      _proto.getDisposer_ = function getDisposer_() {
        var r = this.dispose.bind(this);
        r[$mobx] = this;
        return r;
      };

      _proto.toString = function toString() {
        return "Reaction[" + this.name_ + "]";
      };

      _proto.trace = function trace$1(enterBreakPoint) {
        if (enterBreakPoint === void 0) {
          enterBreakPoint = false;
        }

        trace(this, enterBreakPoint);
      };

      return Reaction;
    }();
    function onReactionError(handler) {
      globalState.globalReactionErrorHandlers.push(handler);
      return function () {
        var idx = globalState.globalReactionErrorHandlers.indexOf(handler);
        if (idx >= 0) globalState.globalReactionErrorHandlers.splice(idx, 1);
      };
    }
    /**
     * Magic number alert!
     * Defines within how many times a reaction is allowed to re-trigger itself
     * until it is assumed that this is gonna be a never ending loop...
     */

    var MAX_REACTION_ITERATIONS = 100;

    var reactionScheduler = function reactionScheduler(f) {
      return f();
    };

    function runReactions() {
      // Trampolining, if runReactions are already running, new reactions will be picked up
      if (globalState.inBatch > 0 || globalState.isRunningReactions) return;
      reactionScheduler(runReactionsHelper);
    }

    function runReactionsHelper() {
      globalState.isRunningReactions = true;
      var allReactions = globalState.pendingReactions;
      var iterations = 0; // While running reactions, new reactions might be triggered.
      // Hence we work with two variables and check whether
      // we converge to no remaining reactions after a while.

      while (allReactions.length > 0) {
        if (++iterations === MAX_REACTION_ITERATIONS) {
          console.error( "Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations." + (" Probably there is a cycle in the reactive function: " + allReactions[0]) );
          allReactions.splice(0); // clear reactions
        }

        var remainingReactions = allReactions.splice(0);

        for (var i = 0, l = remainingReactions.length; i < l; i++) {
          remainingReactions[i].runReaction_();
        }
      }

      globalState.isRunningReactions = false;
    }

    var isReaction = /*#__PURE__*/createInstanceofPredicate("Reaction", Reaction);
    function setReactionScheduler(fn) {
      var baseScheduler = reactionScheduler;

      reactionScheduler = function reactionScheduler(f) {
        return fn(function () {
          return baseScheduler(f);
        });
      };
    }

    function isSpyEnabled() {
      return  !!globalState.spyListeners.length;
    }
    function spyReport(event) {

      if (!globalState.spyListeners.length) return;
      var listeners = globalState.spyListeners;

      for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i](event);
      }
    }
    function spyReportStart(event) {

      var change = _extends({}, event, {
        spyReportStart: true
      });

      spyReport(change);
    }
    var END_EVENT = {
      type: "report-end",
      spyReportEnd: true
    };
    function spyReportEnd(change) {
      if (change) spyReport(_extends({}, change, {
        type: "report-end",
        spyReportEnd: true
      }));else spyReport(END_EVENT);
    }
    function spy(listener) {
      {
        globalState.spyListeners.push(listener);
        return once(function () {
          globalState.spyListeners = globalState.spyListeners.filter(function (l) {
            return l !== listener;
          });
        });
      }
    }

    var ACTION = "action";
    var ACTION_BOUND = "action.bound";
    var AUTOACTION = "autoAction";
    var AUTOACTION_BOUND = "autoAction.bound";
    var ACTION_UNNAMED = "<unnamed action>";

    function createActionFactory(autoAction, annotation) {
      var res = function action(arg1, arg2) {
        // action(fn() {})
        if (isFunction(arg1)) return createAction(arg1.name || ACTION_UNNAMED, arg1, autoAction); // action("name", fn() {})

        if (isFunction(arg2)) return createAction(arg1, arg2, autoAction); // @action

        if (isStringish(arg2)) {
          return storeDecorator(arg1, arg2, annotation);
        } // Annation: action("name") & @action("name")


        if (isStringish(arg1)) {
          return createDecoratorAndAnnotation(annotation, arg1);
        }

        die("Invalid arguments for `action`");
      };

      res.annotationType_ = annotation;
      return res;
    }

    var action = /*#__PURE__*/createActionFactory(false, ACTION);
    var autoAction = /*#__PURE__*/createActionFactory(true, AUTOACTION);
    action.bound = /*#__PURE__*/createDecorator(ACTION_BOUND);
    autoAction.bound = /*#__PURE__*/createDecorator(AUTOACTION_BOUND);
    function runInAction(fn) {
      return executeAction(fn.name || ACTION_UNNAMED, false, fn, this, undefined);
    }
    function isAction(thing) {
      return isFunction(thing) && thing.isMobxAction === true;
    }

    /**
     * Creates a named reactive view and keeps it alive, so that the view is always
     * updated if one of the dependencies changes, even when the view is not further used by something else.
     * @param view The reactive view
     * @returns disposer function, which can be used to stop the view from being updated in the future.
     */

    function autorun(view, opts) {
      if (opts === void 0) {
        opts = EMPTY_OBJECT;
      }

      {
        if (!isFunction(view)) die("Autorun expects a function as first argument");
        if (isAction(view)) die("Autorun does not accept actions since actions are untrackable");
      }

      var name = opts && opts.name || view.name || "Autorun@" + getNextId();
      var runSync = !opts.scheduler && !opts.delay;
      var reaction;

      if (runSync) {
        // normal autorun
        reaction = new Reaction(name, function () {
          this.track(reactionRunner);
        }, opts.onError, opts.requiresObservable);
      } else {
        var scheduler = createSchedulerFromOptions(opts); // debounced autorun

        var isScheduled = false;
        reaction = new Reaction(name, function () {
          if (!isScheduled) {
            isScheduled = true;
            scheduler(function () {
              isScheduled = false;
              if (!reaction.isDisposed_) reaction.track(reactionRunner);
            });
          }
        }, opts.onError, opts.requiresObservable);
      }

      function reactionRunner() {
        view(reaction);
      }

      reaction.schedule_();
      return reaction.getDisposer_();
    }

    var run = function run(f) {
      return f();
    };

    function createSchedulerFromOptions(opts) {
      return opts.scheduler ? opts.scheduler : opts.delay ? function (f) {
        return setTimeout(f, opts.delay);
      } : run;
    }

    function reaction(expression, effect, opts) {
      if (opts === void 0) {
        opts = EMPTY_OBJECT;
      }

      {
        if (!isFunction(expression) || !isFunction(effect)) die("First and second argument to reaction should be functions");
        if (!isPlainObject(opts)) die("Third argument of reactions should be an object");
      }

      var name = opts.name || "Reaction@" + getNextId();
      var effectAction = action(name, opts.onError ? wrapErrorHandler(opts.onError, effect) : effect);
      var runSync = !opts.scheduler && !opts.delay;
      var scheduler = createSchedulerFromOptions(opts);
      var firstTime = true;
      var isScheduled = false;
      var value;
      var oldValue = undefined; // only an issue with fireImmediately

      var equals = opts.compareStructural ? comparer.structural : opts.equals || comparer["default"];
      var r = new Reaction(name, function () {
        if (firstTime || runSync) {
          reactionRunner();
        } else if (!isScheduled) {
          isScheduled = true;
          scheduler(reactionRunner);
        }
      }, opts.onError, opts.requiresObservable);

      function reactionRunner() {
        isScheduled = false;
        if (r.isDisposed_) return;
        var changed = false;
        r.track(function () {
          var nextValue = allowStateChanges(false, function () {
            return expression(r);
          });
          changed = firstTime || !equals(value, nextValue);
          oldValue = value;
          value = nextValue;
        });
        if (firstTime && opts.fireImmediately) effectAction(value, oldValue, r);else if (!firstTime && changed) effectAction(value, oldValue, r);
        firstTime = false;
      }

      r.schedule_();
      return r.getDisposer_();
    }

    function wrapErrorHandler(errorHandler, baseFn) {
      return function () {
        try {
          return baseFn.apply(this, arguments);
        } catch (e) {
          errorHandler.call(this, e);
        }
      };
    }

    var ON_BECOME_OBSERVED = "onBO";
    var ON_BECOME_UNOBSERVED = "onBUO";
    function onBecomeObserved(thing, arg2, arg3) {
      return interceptHook(ON_BECOME_OBSERVED, thing, arg2, arg3);
    }
    function onBecomeUnobserved(thing, arg2, arg3) {
      return interceptHook(ON_BECOME_UNOBSERVED, thing, arg2, arg3);
    }

    function interceptHook(hook, thing, arg2, arg3) {
      var atom = typeof arg3 === "function" ? getAtom(thing, arg2) : getAtom(thing);
      var cb = isFunction(arg3) ? arg3 : arg2;
      var listenersKey = hook + "L";

      if (atom[listenersKey]) {
        atom[listenersKey].add(cb);
      } else {
        atom[listenersKey] = new Set([cb]);
      }

      return function () {
        var hookListeners = atom[listenersKey];

        if (hookListeners) {
          hookListeners["delete"](cb);

          if (hookListeners.size === 0) {
            delete atom[listenersKey];
          }
        }
      };
    }

    var NEVER = "never";
    var ALWAYS = "always";
    var OBSERVED = "observed"; // const IF_AVAILABLE = "ifavailable"

    function configure(options) {
      if (options.isolateGlobalState === true) {
        isolateGlobalState();
      }

      var useProxies = options.useProxies,
          enforceActions = options.enforceActions;

      if (useProxies !== undefined) {
        globalState.useProxies = useProxies === ALWAYS ? true : useProxies === NEVER ? false : typeof Proxy !== "undefined";
      }

      if (useProxies === "ifavailable") globalState.verifyProxies = true;

      if (enforceActions !== undefined) {
        var ea = enforceActions === ALWAYS ? ALWAYS : enforceActions === OBSERVED;
        globalState.enforceActions = ea;
        globalState.allowStateChanges = ea === true || ea === ALWAYS ? false : true;
      }
      ["computedRequiresReaction", "reactionRequiresObservable", "observableRequiresReaction", "disableErrorBoundaries"].forEach(function (key) {
        if (key in options) globalState[key] = !!options[key];
      });
      globalState.allowStateReads = !globalState.observableRequiresReaction;

      if ( globalState.disableErrorBoundaries === true) {
        console.warn("WARNING: Debug feature only. MobX will NOT recover from errors when `disableErrorBoundaries` is enabled.");
      }

      if (options.reactionScheduler) {
        setReactionScheduler(options.reactionScheduler);
      }
    }

    function extendObservable(target, properties, annotations, options) {
      {
        if (arguments.length > 4) die("'extendObservable' expected 2-4 arguments");
        if (typeof target !== "object") die("'extendObservable' expects an object as first argument");
        if (isObservableMap(target)) die("'extendObservable' should not be used on maps, use map.merge instead");
        if (!isPlainObject(properties)) die("'extendObservabe' only accepts plain objects as second argument");
        if (isObservable(properties) || isObservable(annotations)) die("Extending an object with another observable (object) is not supported");
      }

      var o = asCreateObservableOptions(options);
      var adm = asObservableObject(target, o.name, getEnhancerFromOption(o));
      startBatch();

      try {
        var descs = getOwnPropertyDescriptors(properties);
        getPlainObjectKeys(descs).forEach(function (key) {
          makeProperty(adm, target, key, descs[key], !annotations ? true : key in annotations ? annotations[key] : true, true, !!(options == null ? void 0 : options.autoBind));
        });
      } finally {
        endBatch();
      }

      return target;
    }

    function getDependencyTree(thing, property) {
      return nodeToDependencyTree(getAtom(thing, property));
    }

    function nodeToDependencyTree(node) {
      var result = {
        name: node.name_
      };
      if (node.observing_ && node.observing_.length > 0) result.dependencies = unique(node.observing_).map(nodeToDependencyTree);
      return result;
    }

    function getObserverTree(thing, property) {
      return nodeToObserverTree(getAtom(thing, property));
    }

    function nodeToObserverTree(node) {
      var result = {
        name: node.name_
      };
      if (hasObservers(node)) result.observers = Array.from(getObservers(node)).map(nodeToObserverTree);
      return result;
    }

    function unique(list) {
      return Array.from(new Set(list));
    }

    var FLOW = "flow";
    var generatorId = 0;
    function FlowCancellationError() {
      this.message = "FLOW_CANCELLED";
    }
    FlowCancellationError.prototype = /*#__PURE__*/Object.create(Error.prototype);
    function isFlowCancellationError(error) {
      return error instanceof FlowCancellationError;
    }
    var flow = /*#__PURE__*/Object.assign(function flow(arg1, arg2) {
      // @flow
      if (isStringish(arg2)) {
        return storeDecorator(arg1, arg2, "flow");
      } // flow(fn)


      if ( arguments.length !== 1) die("Flow expects 1 argument and cannot be used as decorator");
      var generator = arg1;
      var name = generator.name || "<unnamed flow>"; // Implementation based on https://github.com/tj/co/blob/master/index.js

      var res = function res() {
        var ctx = this;
        var args = arguments;
        var runId = ++generatorId;
        var gen = action(name + " - runid: " + runId + " - init", generator).apply(ctx, args);
        var rejector;
        var pendingPromise = undefined;
        var promise = new Promise(function (resolve, reject) {
          var stepId = 0;
          rejector = reject;

          function onFulfilled(res) {
            pendingPromise = undefined;
            var ret;

            try {
              ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen.next).call(gen, res);
            } catch (e) {
              return reject(e);
            }

            next(ret);
          }

          function onRejected(err) {
            pendingPromise = undefined;
            var ret;

            try {
              ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen["throw"]).call(gen, err);
            } catch (e) {
              return reject(e);
            }

            next(ret);
          }

          function next(ret) {
            if (isFunction(ret == null ? void 0 : ret.then)) {
              // an async iterator
              ret.then(next, reject);
              return;
            }

            if (ret.done) return resolve(ret.value);
            pendingPromise = Promise.resolve(ret.value);
            return pendingPromise.then(onFulfilled, onRejected);
          }

          onFulfilled(undefined); // kick off the process
        });
        promise.cancel = action(name + " - runid: " + runId + " - cancel", function () {
          try {
            if (pendingPromise) cancelPromise(pendingPromise); // Finally block can return (or yield) stuff..

            var _res = gen["return"](undefined); // eat anything that promise would do, it's cancelled!


            var yieldedPromise = Promise.resolve(_res.value);
            yieldedPromise.then(noop, noop);
            cancelPromise(yieldedPromise); // maybe it can be cancelled :)
            // reject our original promise

            rejector(new FlowCancellationError());
          } catch (e) {
            rejector(e); // there could be a throwing finally block
          }
        });
        return promise;
      };

      res.isMobXFlow = true;
      return res;
    }, {
      annotationType_: "flow"
    });

    function cancelPromise(promise) {
      if (isFunction(promise.cancel)) promise.cancel();
    }

    function flowResult(result) {
      return result; // just tricking TypeScript :)
    }
    function isFlow(fn) {
      return (fn == null ? void 0 : fn.isMobXFlow) === true;
    }

    function interceptReads(thing, propOrHandler, handler) {
      var target;

      if (isObservableMap(thing) || isObservableArray(thing) || isObservableValue(thing)) {
        target = getAdministration(thing);
      } else if (isObservableObject(thing)) {
        if ( !isStringish(propOrHandler)) return die("InterceptReads can only be used with a specific property, not with an object in general");
        target = getAdministration(thing, propOrHandler);
      } else {
        return die("Expected observable map, object or array as first array");
      }

      if ( target.dehancer !== undefined) return die("An intercept reader was already established");
      target.dehancer = typeof propOrHandler === "function" ? propOrHandler : handler;
      return function () {
        target.dehancer = undefined;
      };
    }

    function intercept(thing, propOrHandler, handler) {
      if (isFunction(handler)) return interceptProperty(thing, propOrHandler, handler);else return interceptInterceptable(thing, propOrHandler);
    }

    function interceptInterceptable(thing, handler) {
      return getAdministration(thing).intercept_(handler);
    }

    function interceptProperty(thing, property, handler) {
      return getAdministration(thing, property).intercept_(handler);
    }

    function _isComputed(value, property) {
      if (property !== undefined) {
        if (isObservableObject(value) === false) return false;
        if (!value[$mobx].values_.has(property)) return false;
        var atom = getAtom(value, property);
        return isComputedValue(atom);
      }

      return isComputedValue(value);
    }
    function isComputed(value) {
      if ( arguments.length > 1) return die("isComputed expects only 1 argument. Use isComputedProp to inspect the observability of a property");
      return _isComputed(value);
    }
    function isComputedProp(value, propName) {
      if ( !isStringish(propName)) return die("isComputed expected a property name as second argument");
      return _isComputed(value, propName);
    }

    function _isObservable(value, property) {
      if (!value) return false;

      if (property !== undefined) {
        if ( (isObservableMap(value) || isObservableArray(value))) return die("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");

        if (isObservableObject(value)) {
          return value[$mobx].values_.has(property);
        }

        return false;
      } // For first check, see #701


      return isObservableObject(value) || !!value[$mobx] || isAtom(value) || isReaction(value) || isComputedValue(value);
    }

    function isObservable(value) {
      if ( arguments.length !== 1) die("isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property");
      return _isObservable(value);
    }
    function isObservableProp(value, propName) {
      if ( !isStringish(propName)) return die("expected a property name as second argument");
      return _isObservable(value, propName);
    }

    function keys(obj) {
      if (isObservableObject(obj)) {
        return obj[$mobx].getKeys_();
      }

      if (isObservableMap(obj) || isObservableSet(obj)) {
        return Array.from(obj.keys());
      }

      if (isObservableArray(obj)) {
        return obj.map(function (_, index) {
          return index;
        });
      }

      die(5);
    }
    function values(obj) {
      if (isObservableObject(obj)) {
        return keys(obj).map(function (key) {
          return obj[key];
        });
      }

      if (isObservableMap(obj)) {
        return keys(obj).map(function (key) {
          return obj.get(key);
        });
      }

      if (isObservableSet(obj)) {
        return Array.from(obj.values());
      }

      if (isObservableArray(obj)) {
        return obj.slice();
      }

      die(6);
    }
    function entries(obj) {
      if (isObservableObject(obj)) {
        return keys(obj).map(function (key) {
          return [key, obj[key]];
        });
      }

      if (isObservableMap(obj)) {
        return keys(obj).map(function (key) {
          return [key, obj.get(key)];
        });
      }

      if (isObservableSet(obj)) {
        return Array.from(obj.entries());
      }

      if (isObservableArray(obj)) {
        return obj.map(function (key, index) {
          return [index, key];
        });
      }

      die(7);
    }
    function set(obj, key, value) {
      if (arguments.length === 2 && !isObservableSet(obj)) {
        startBatch();
        var _values = key;

        try {
          for (var _key in _values) {
            set(obj, _key, _values[_key]);
          }
        } finally {
          endBatch();
        }

        return;
      }

      if (isObservableObject(obj)) {
        var adm = obj[$mobx];
        var existingObservable = adm.values_.get(key);

        if (existingObservable) {
          adm.write_(key, value);
        } else {
          adm.addObservableProp_(key, value, adm.defaultEnhancer_);
        }
      } else if (isObservableMap(obj)) {
        obj.set(key, value);
      } else if (isObservableSet(obj)) {
        obj.add(key);
      } else if (isObservableArray(obj)) {
        if (typeof key !== "number") key = parseInt(key, 10);
        if (key < 0) die("Invalid index: '" + key + "'");
        startBatch();
        if (key >= obj.length) obj.length = key + 1;
        obj[key] = value;
        endBatch();
      } else die(8);
    }
    function remove(obj, key) {
      if (isObservableObject(obj)) {
        obj[$mobx].remove_(key);
      } else if (isObservableMap(obj)) {
        obj["delete"](key);
      } else if (isObservableSet(obj)) {
        obj["delete"](key);
      } else if (isObservableArray(obj)) {
        if (typeof key !== "number") key = parseInt(key, 10);
        obj.splice(key, 1);
      } else {
        die(9);
      }
    }
    function has(obj, key) {
      if (isObservableObject(obj)) {
        // return keys(obj).indexOf(key) >= 0
        return getAdministration(obj).has_(key);
      } else if (isObservableMap(obj)) {
        return obj.has(key);
      } else if (isObservableSet(obj)) {
        return obj.has(key);
      } else if (isObservableArray(obj)) {
        return key >= 0 && key < obj.length;
      }

      die(10);
    }
    function get(obj, key) {
      if (!has(obj, key)) return undefined;

      if (isObservableObject(obj)) {
        return obj[key];
      } else if (isObservableMap(obj)) {
        return obj.get(key);
      } else if (isObservableArray(obj)) {
        return obj[key];
      }

      die(11);
    }

    function observe(thing, propOrCb, cbOrFire, fireImmediately) {
      if (isFunction(cbOrFire)) return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);else return observeObservable(thing, propOrCb, cbOrFire);
    }

    function observeObservable(thing, listener, fireImmediately) {
      return getAdministration(thing).observe_(listener, fireImmediately);
    }

    function observeObservableProperty(thing, property, listener, fireImmediately) {
      return getAdministration(thing, property).observe_(listener, fireImmediately);
    }

    function cache(map, key, value) {
      map.set(key, value);
      return value;
    }

    function toJSHelper(source, __alreadySeen) {
      if (source == null || typeof source !== "object" || source instanceof Date || !isObservable(source)) return source;
      if (isObservableValue(source)) return toJSHelper(source.get(), __alreadySeen);

      if (__alreadySeen.has(source)) {
        return __alreadySeen.get(source);
      }

      if (isObservableArray(source)) {
        var res = cache(__alreadySeen, source, new Array(source.length));
        source.forEach(function (value, idx) {
          res[idx] = toJSHelper(value, __alreadySeen);
        });
        return res;
      }

      if (isObservableSet(source)) {
        var _res = cache(__alreadySeen, source, new Set());

        source.forEach(function (value) {
          _res.add(toJSHelper(value, __alreadySeen));
        });
        return _res;
      }

      if (isObservableMap(source)) {
        var _res2 = cache(__alreadySeen, source, new Map());

        source.forEach(function (value, key) {
          _res2.set(key, toJSHelper(value, __alreadySeen));
        });
        return _res2;
      } else {
        // must be observable object
        keys(source); // make sure keys are observed

        var _res3 = cache(__alreadySeen, source, {});

        getPlainObjectKeys(source).forEach(function (key) {
          _res3[key] = toJSHelper(source[key], __alreadySeen);
        });
        return _res3;
      }
    }
    /**
     * Basically, a deep clone, so that no reactive property will exist anymore.
     */


    function toJS(source, options) {
      if ( options) die("toJS no longer supports options");
      return toJSHelper(source, new Map());
    }

    function trace() {
      var enterBreakPoint = false;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (typeof args[args.length - 1] === "boolean") enterBreakPoint = args.pop();
      var derivation = getAtomFromArgs(args);

      if (!derivation) {
        return die("'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
      }

      if (derivation.isTracing_ === TraceMode.NONE) {
        console.log("[mobx.trace] '" + derivation.name_ + "' tracing enabled");
      }

      derivation.isTracing_ = enterBreakPoint ? TraceMode.BREAK : TraceMode.LOG;
    }

    function getAtomFromArgs(args) {
      switch (args.length) {
        case 0:
          return globalState.trackingDerivation;

        case 1:
          return getAtom(args[0]);

        case 2:
          return getAtom(args[0], args[1]);
      }
    }

    /**
     * During a transaction no views are updated until the end of the transaction.
     * The transaction will be run synchronously nonetheless.
     *
     * @param action a function that updates some reactive state
     * @returns any value that was returned by the 'action' parameter.
     */

    function transaction(action, thisArg) {
      if (thisArg === void 0) {
        thisArg = undefined;
      }

      startBatch();

      try {
        return action.apply(thisArg);
      } finally {
        endBatch();
      }
    }

    function when(predicate, arg1, arg2) {
      if (arguments.length === 1 || arg1 && typeof arg1 === "object") return whenPromise(predicate, arg1);
      return _when(predicate, arg1, arg2 || {});
    }

    function _when(predicate, effect, opts) {
      var timeoutHandle;

      if (typeof opts.timeout === "number") {
        timeoutHandle = setTimeout(function () {
          if (!disposer[$mobx].isDisposed_) {
            disposer();
            var error = new Error("WHEN_TIMEOUT");
            if (opts.onError) opts.onError(error);else throw error;
          }
        }, opts.timeout);
      }

      opts.name = opts.name || "When@" + getNextId();
      var effectAction = createAction(opts.name + "-effect", effect); // eslint-disable-next-line

      var disposer = autorun(function (r) {
        // predicate should not change state
        var cond = allowStateChanges(false, predicate);

        if (cond) {
          r.dispose();
          if (timeoutHandle) clearTimeout(timeoutHandle);
          effectAction();
        }
      }, opts);
      return disposer;
    }

    function whenPromise(predicate, opts) {
      if ( opts && opts.onError) return die("the options 'onError' and 'promise' cannot be combined");
      var cancel;
      var res = new Promise(function (resolve, reject) {
        var disposer = _when(predicate, resolve, _extends({}, opts, {
          onError: reject
        }));

        cancel = function cancel() {
          disposer();
          reject("WHEN_CANCELLED");
        };
      });
      res.cancel = cancel;
      return res;
    }

    function getAdm(target) {
      return target[$mobx];
    } // Optimization: we don't need the intermediate objects and could have a completely custom administration for DynamicObjects,
    // and skip either the internal values map, or the base object with its property descriptors!


    var objectProxyTraps = {
      has: function has(target, name) {
        if (name === $mobx || name === "constructor") return true;
        if ( globalState.trackingDerivation) warnAboutProxyRequirement("detect new properties using the 'in' operator. Use 'has' from 'mobx' instead.");
        var adm = getAdm(target); // MWE: should `in` operator be reactive? If not, below code path will be faster / more memory efficient
        // check performance stats!
        // if (adm.values.get(name as string)) return true

        if (isStringish(name)) return adm.has_(name);
        return name in target;
      },
      get: function get(target, name) {
        if (name === $mobx || name === "constructor") return target[name];
        var adm = getAdm(target);
        var observable = adm.values_.get(name);

        if (observable instanceof Atom) {
          var result = observable.get();

          if (result === undefined) {
            // This fixes #1796, because deleting a prop that has an
            // undefined value won't retrigger a observer (no visible effect),
            // the autorun wouldn't subscribe to future key changes (see also next comment)
            adm.has_(name);
          }

          return result;
        } // make sure we start listening to future keys
        // note that we only do this here for optimization


        if (isStringish(name)) adm.has_(name);
        return target[name];
      },
      set: function set$1(target, name, value) {
        if (!isStringish(name)) return false;

        if ( !getAdm(target).values_.has(name)) {
          warnAboutProxyRequirement("add a new observable property through direct assignment. Use 'set' from 'mobx' instead.");
        }

        set(target, name, value);

        return true;
      },
      deleteProperty: function deleteProperty(target, name) {
        warnAboutProxyRequirement("delete properties from an observable object. Use 'remove' from 'mobx' instead.");
        if (!isStringish(name)) return false;
        var adm = getAdm(target);
        adm.remove_(name);
        return true;
      },
      ownKeys: function ownKeys(target) {
        if ( globalState.trackingDerivation) warnAboutProxyRequirement("iterate keys to detect added / removed properties. Use `keys` from 'mobx' instead.");
        var adm = getAdm(target);
        adm.keysAtom_.reportObserved();
        return Reflect.ownKeys(target);
      },
      preventExtensions: function preventExtensions(target) {
        die(13);
      }
    };
    function createDynamicObservableObject(base) {
      assertProxies();
      var proxy = new Proxy(base, objectProxyTraps);
      base[$mobx].proxy_ = proxy;
      return proxy;
    }

    function hasInterceptors(interceptable) {
      return interceptable.interceptors_ !== undefined && interceptable.interceptors_.length > 0;
    }
    function registerInterceptor(interceptable, handler) {
      var interceptors = interceptable.interceptors_ || (interceptable.interceptors_ = []);
      interceptors.push(handler);
      return once(function () {
        var idx = interceptors.indexOf(handler);
        if (idx !== -1) interceptors.splice(idx, 1);
      });
    }
    function interceptChange(interceptable, change) {
      var prevU = untrackedStart();

      try {
        // Interceptor can modify the array, copy it to avoid concurrent modification, see #1950
        var interceptors = [].concat(interceptable.interceptors_ || []);

        for (var i = 0, l = interceptors.length; i < l; i++) {
          change = interceptors[i](change);
          if (change && !change.type) die(14);
          if (!change) break;
        }

        return change;
      } finally {
        untrackedEnd(prevU);
      }
    }

    function hasListeners(listenable) {
      return listenable.changeListeners_ !== undefined && listenable.changeListeners_.length > 0;
    }
    function registerListener(listenable, handler) {
      var listeners = listenable.changeListeners_ || (listenable.changeListeners_ = []);
      listeners.push(handler);
      return once(function () {
        var idx = listeners.indexOf(handler);
        if (idx !== -1) listeners.splice(idx, 1);
      });
    }
    function notifyListeners(listenable, change) {
      var prevU = untrackedStart();
      var listeners = listenable.changeListeners_;
      if (!listeners) return;
      listeners = listeners.slice();

      for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i](change);
      }

      untrackedEnd(prevU);
    }

    var CACHED_ANNOTATIONS = /*#__PURE__*/Symbol("mobx-cached-annotations");

    function makeAction(target, key, name, fn, asAutoAction) {
      addHiddenProp(target, key, asAutoAction ? autoAction(name || key, fn) : action(name || key, fn));
    }

    function getInferredAnnotation(desc, defaultAnnotation, autoBind) {
      if (desc.get) return computed;
      if (desc.set) return false; // ignore pure setters
      // if already wrapped in action, don't do that another time, but assume it is already set up properly

      if (isFunction(desc.value)) return isGenerator(desc.value) ? flow : isAction(desc.value) ? false : autoBind ? autoAction.bound : autoAction; // if (!desc.configurable || !desc.writable) return false

      return defaultAnnotation != null ? defaultAnnotation : observable.deep;
    }

    function getDescriptorInChain(target, prop) {
      var current = target;

      while (current && current !== objectPrototype) {
        // Optimization: cache meta data, especially for members from prototypes?
        var desc = getDescriptor(current, prop);

        if (desc) {
          return [desc, current];
        }

        current = Object.getPrototypeOf(current);
      }

      die(1, prop);
    }

    function makeProperty(adm, owner, key, descriptor, annotation, forceCopy, // extend observable will copy even unannotated properties
    autoBind) {
      var _annotation$annotatio;

      var target = adm.target_;
      var defaultAnnotation = observable; // ideally grap this from adm's defaultEnahncer instead!

      var originAnnotation = annotation;

      if (annotation === true) {
        annotation = getInferredAnnotation(descriptor, defaultAnnotation, autoBind);
      }

      if (annotation === false) {
        if (forceCopy) {
          defineProperty(target, key, descriptor);
        }

        return;
      }

      if (!annotation || annotation === true || !annotation.annotationType_) {
        return die(2, key);
      }

      var type = annotation.annotationType_;

      switch (type) {
        case AUTOACTION:
        case ACTION:
          {
            var fn = descriptor.value;
            if (!isFunction(fn)) die(3, key);

            if (owner !== target && !forceCopy) {
              if (!isAction(owner[key])) makeAction(owner, key, annotation.arg_, fn, type === AUTOACTION);
            } else {
              makeAction(target, key, annotation.arg_, fn, type === AUTOACTION);
            }

            break;
          }

        case AUTOACTION_BOUND:
        case ACTION_BOUND:
          {
            var _fn = descriptor.value;
            if (!isFunction(_fn)) die(3, key);
            makeAction(target, key, annotation.arg_, _fn.bind(adm.proxy_ || target), type === AUTOACTION_BOUND);
            break;
          }

        case FLOW:
          {
            if (owner !== target && !forceCopy) {
              if (!isFlow(owner[key])) addHiddenProp(owner, key, flow(descriptor.value));
            } else {
              addHiddenProp(target, key, flow(descriptor.value));
            }

            break;
          }

        case COMPUTED:
        case COMPUTED_STRUCT:
          {
            if (!descriptor.get) die(4, key);
            adm.addComputedProp_(target, key, _extends({
              get: descriptor.get,
              set: descriptor.set,
              compareStructural: annotation.annotationType_ === COMPUTED_STRUCT
            }, annotation.arg_));
            break;
          }

        case OBSERVABLE:
        case OBSERVABLE_REF:
        case OBSERVABLE_SHALLOW:
        case OBSERVABLE_STRUCT:
          {
            if ( isObservableProp(target, key)) die("Cannot decorate '" + key.toString() + "': the property is already decorated as observable.");
            if ( !("value" in descriptor)) die("Cannot decorate '" + key.toString() + "': observable cannot be used on setter / getter properties."); // if the originAnnotation was true, preferred the adm's default enhancer over the inferred one

            var enhancer = originAnnotation === true ? adm.defaultEnhancer_ : getEnhancerFromAnnotation(annotation);
            adm.addObservableProp_(key, descriptor.value, enhancer);
            break;
          }

        default:
          die("invalid decorator '" + ((_annotation$annotatio = annotation.annotationType_) != null ? _annotation$annotatio : annotation) + "' for '" + key.toString() + "'");
      }
    }
    function makeObservable(target, annotations, options) {
      var autoBind = !!(options == null ? void 0 : options.autoBind);
      var adm = asObservableObject(target, options == null ? void 0 : options.name, getEnhancerFromAnnotation(options == null ? void 0 : options.defaultDecorator));
      startBatch();

      try {
        if (!annotations) {
          var didDecorate = applyDecorators(target);
          if ("development" !== "production" && !didDecorate) die("No annotations were passed to makeObservable, but no decorator members have been found either");
          return target;
        }

        var make = function make(key) {
          var annotation = annotations[key];

          var _getDescriptorInChain = getDescriptorInChain(target, key),
              desc = _getDescriptorInChain[0],
              owner = _getDescriptorInChain[1];

          makeProperty(adm, owner, key, desc, annotation, false, autoBind);
        };

        ownKeys(annotations).forEach(make);
      } finally {
        endBatch();
      }

      return target;
    }
    function makeAutoObservable(target, overrides, options) {
      var proto = Object.getPrototypeOf(target);
      var isPlain = proto == null || proto === objectPrototype;

      {
        if (!isPlain && !isPlainObject(proto)) die("'makeAutoObservable' can only be used for classes that don't have a superclass");
        if (isObservableObject(target)) die("makeAutoObservable can only be used on objects not already made observable");
      }

      var annotations;

      if (!isPlain && hasProp(proto, CACHED_ANNOTATIONS)) {
        // shortcut, reuse inferred annotations for this type from the previous time
        annotations = proto[CACHED_ANNOTATIONS];
      } else {
        annotations = _extends({}, overrides);
        extractAnnotationsFromObject(target, annotations, options);

        if (!isPlain) {
          extractAnnotationsFromProto(proto, annotations, options);
          addHiddenProp(proto, CACHED_ANNOTATIONS, annotations);
        }
      }

      makeObservable(target, annotations, options);
      return target;
    }

    function extractAnnotationsFromObject(target, collector, options) {
      var _options$defaultDecor;

      var autoBind = !!(options == null ? void 0 : options.autoBind);
      var defaultAnnotation = (options == null ? void 0 : options.deep) === undefined ? (_options$defaultDecor = options == null ? void 0 : options.defaultDecorator) != null ? _options$defaultDecor : observable.deep : (options == null ? void 0 : options.deep) ? observable.deep : observable.ref;
      Object.entries(getOwnPropertyDescriptors(target)).forEach(function (_ref) {
        var key = _ref[0],
            descriptor = _ref[1];
        if (key in collector || key === "constructor") return;
        collector[key] = getInferredAnnotation(descriptor, defaultAnnotation, autoBind);
      });
    }

    function extractAnnotationsFromProto(proto, collector, options) {
      Object.entries(getOwnPropertyDescriptors(proto)).forEach(function (_ref2) {
        var key = _ref2[0],
            prop = _ref2[1];
        if (key in collector || key === "constructor") return;

        if (prop.get) {
          collector[key] = computed;
        } else if (isFunction(prop.value)) {
          collector[key] = isGenerator(prop.value) ? flow : (options == null ? void 0 : options.autoBind) ? autoAction.bound : autoAction;
        }
      });
    }

    var SPLICE = "splice";
    var UPDATE = "update";
    var MAX_SPLICE_SIZE = 10000; // See e.g. https://github.com/mobxjs/mobx/issues/859

    var arrayTraps = {
      get: function get(target, name) {
        var adm = target[$mobx];
        if (name === $mobx) return adm;
        if (name === "length") return adm.getArrayLength_();

        if (typeof name === "string" && !isNaN(name)) {
          return adm.get_(parseInt(name));
        }

        if (hasProp(arrayExtensions, name)) {
          return arrayExtensions[name];
        }

        return target[name];
      },
      set: function set(target, name, value) {
        var adm = target[$mobx];

        if (name === "length") {
          adm.setArrayLength_(value);
        }

        if (typeof name === "symbol" || isNaN(name)) {
          target[name] = value;
        } else {
          // numeric string
          adm.set_(parseInt(name), value);
        }

        return true;
      },
      preventExtensions: function preventExtensions() {
        die(15);
      }
    };
    var ObservableArrayAdministration = /*#__PURE__*/function () {
      // this is the prop that gets proxied, so can't replace it!
      function ObservableArrayAdministration(name, enhancer, owned_, legacyMode_) {
        this.owned_ = void 0;
        this.legacyMode_ = void 0;
        this.atom_ = void 0;
        this.values_ = [];
        this.interceptors_ = void 0;
        this.changeListeners_ = void 0;
        this.enhancer_ = void 0;
        this.dehancer = void 0;
        this.proxy_ = void 0;
        this.lastKnownLength_ = 0;
        this.owned_ = owned_;
        this.legacyMode_ = legacyMode_;
        this.atom_ = new Atom(name || "ObservableArray@" + getNextId());

        this.enhancer_ = function (newV, oldV) {
          return enhancer(newV, oldV, name + "[..]");
        };
      }

      var _proto = ObservableArrayAdministration.prototype;

      _proto.dehanceValue_ = function dehanceValue_(value) {
        if (this.dehancer !== undefined) return this.dehancer(value);
        return value;
      };

      _proto.dehanceValues_ = function dehanceValues_(values) {
        if (this.dehancer !== undefined && values.length > 0) return values.map(this.dehancer);
        return values;
      };

      _proto.intercept_ = function intercept_(handler) {
        return registerInterceptor(this, handler);
      };

      _proto.observe_ = function observe_(listener, fireImmediately) {
        if (fireImmediately === void 0) {
          fireImmediately = false;
        }

        if (fireImmediately) {
          listener({
            observableKind: "array",
            object: this.proxy_,
            debugObjectName: this.atom_.name_,
            type: "splice",
            index: 0,
            added: this.values_.slice(),
            addedCount: this.values_.length,
            removed: [],
            removedCount: 0
          });
        }

        return registerListener(this, listener);
      };

      _proto.getArrayLength_ = function getArrayLength_() {
        this.atom_.reportObserved();
        return this.values_.length;
      };

      _proto.setArrayLength_ = function setArrayLength_(newLength) {
        if (typeof newLength !== "number" || newLength < 0) die("Out of range: " + newLength);
        var currentLength = this.values_.length;
        if (newLength === currentLength) return;else if (newLength > currentLength) {
          var newItems = new Array(newLength - currentLength);

          for (var i = 0; i < newLength - currentLength; i++) {
            newItems[i] = undefined;
          } // No Array.fill everywhere...


          this.spliceWithArray_(currentLength, 0, newItems);
        } else this.spliceWithArray_(newLength, currentLength - newLength);
      };

      _proto.updateArrayLength_ = function updateArrayLength_(oldLength, delta) {
        if (oldLength !== this.lastKnownLength_) die(16);
        this.lastKnownLength_ += delta;
        if (this.legacyMode_ && delta > 0) reserveArrayBuffer(oldLength + delta + 1);
      };

      _proto.spliceWithArray_ = function spliceWithArray_(index, deleteCount, newItems) {
        var _this = this;

        checkIfStateModificationsAreAllowed(this.atom_);
        var length = this.values_.length;
        if (index === undefined) index = 0;else if (index > length) index = length;else if (index < 0) index = Math.max(0, length + index);
        if (arguments.length === 1) deleteCount = length - index;else if (deleteCount === undefined || deleteCount === null) deleteCount = 0;else deleteCount = Math.max(0, Math.min(deleteCount, length - index));
        if (newItems === undefined) newItems = EMPTY_ARRAY;

        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            object: this.proxy_,
            type: SPLICE,
            index: index,
            removedCount: deleteCount,
            added: newItems
          });
          if (!change) return EMPTY_ARRAY;
          deleteCount = change.removedCount;
          newItems = change.added;
        }

        newItems = newItems.length === 0 ? newItems : newItems.map(function (v) {
          return _this.enhancer_(v, undefined);
        });

        if (this.legacyMode_ || "development" !== "production") {
          var lengthDelta = newItems.length - deleteCount;
          this.updateArrayLength_(length, lengthDelta); // checks if internal array wasn't modified
        }

        var res = this.spliceItemsIntoValues_(index, deleteCount, newItems);
        if (deleteCount !== 0 || newItems.length !== 0) this.notifyArraySplice_(index, newItems, res);
        return this.dehanceValues_(res);
      };

      _proto.spliceItemsIntoValues_ = function spliceItemsIntoValues_(index, deleteCount, newItems) {
        if (newItems.length < MAX_SPLICE_SIZE) {
          var _this$values_;

          return (_this$values_ = this.values_).splice.apply(_this$values_, [index, deleteCount].concat(newItems));
        } else {
          var res = this.values_.slice(index, index + deleteCount);
          var oldItems = this.values_.slice(index + deleteCount);
          this.values_.length = index + newItems.length - deleteCount;

          for (var i = 0; i < newItems.length; i++) {
            this.values_[index + i] = newItems[i];
          }

          for (var _i = 0; _i < oldItems.length; _i++) {
            this.values_[index + newItems.length + _i] = oldItems[_i];
          }

          return res;
        }
      };

      _proto.notifyArrayChildUpdate_ = function notifyArrayChildUpdate_(index, newValue, oldValue) {
        var notifySpy = !this.owned_ && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
          observableKind: "array",
          object: this.proxy_,
          type: UPDATE,
          debugObjectName: this.atom_.name_,
          index: index,
          newValue: newValue,
          oldValue: oldValue
        } : null; // The reason why this is on right hand side here (and not above), is this way the uglifier will drop it, but it won't
        // cause any runtime overhead in development mode without NODE_ENV set, unless spying is enabled

        if ( notifySpy) spyReportStart(change);
        this.atom_.reportChanged();
        if (notify) notifyListeners(this, change);
        if ( notifySpy) spyReportEnd();
      };

      _proto.notifyArraySplice_ = function notifyArraySplice_(index, added, removed) {
        var notifySpy = !this.owned_ && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
          observableKind: "array",
          object: this.proxy_,
          debugObjectName: this.atom_.name_,
          type: SPLICE,
          index: index,
          removed: removed,
          added: added,
          removedCount: removed.length,
          addedCount: added.length
        } : null;
        if ( notifySpy) spyReportStart(change);
        this.atom_.reportChanged(); // conform: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/observe

        if (notify) notifyListeners(this, change);
        if ( notifySpy) spyReportEnd();
      };

      _proto.get_ = function get_(index) {
        if (index < this.values_.length) {
          this.atom_.reportObserved();
          return this.dehanceValue_(this.values_[index]);
        }

        console.warn( "[mobx] Out of bounds read: " + index );
      };

      _proto.set_ = function set_(index, newValue) {
        var values = this.values_;

        if (index < values.length) {
          // update at index in range
          checkIfStateModificationsAreAllowed(this.atom_);
          var oldValue = values[index];

          if (hasInterceptors(this)) {
            var change = interceptChange(this, {
              type: UPDATE,
              object: this.proxy_,
              index: index,
              newValue: newValue
            });
            if (!change) return;
            newValue = change.newValue;
          }

          newValue = this.enhancer_(newValue, oldValue);
          var changed = newValue !== oldValue;

          if (changed) {
            values[index] = newValue;
            this.notifyArrayChildUpdate_(index, newValue, oldValue);
          }
        } else if (index === values.length) {
          // add a new item
          this.spliceWithArray_(index, 0, [newValue]);
        } else {
          // out of bounds
          die(17, index, values.length);
        }
      };

      return ObservableArrayAdministration;
    }();
    function createObservableArray(initialValues, enhancer, name, owned) {
      if (name === void 0) {
        name = "ObservableArray@" + getNextId();
      }

      if (owned === void 0) {
        owned = false;
      }

      assertProxies();
      var adm = new ObservableArrayAdministration(name, enhancer, owned, false);
      addHiddenFinalProp(adm.values_, $mobx, adm);
      var proxy = new Proxy(adm.values_, arrayTraps);
      adm.proxy_ = proxy;

      if (initialValues && initialValues.length) {
        var prev = allowStateChangesStart(true);
        adm.spliceWithArray_(0, 0, initialValues);
        allowStateChangesEnd(prev);
      }

      return proxy;
    } // eslint-disable-next-line

    var arrayExtensions = {
      clear: function clear() {
        return this.splice(0);
      },
      replace: function replace(newItems) {
        var adm = this[$mobx];
        return adm.spliceWithArray_(0, adm.values_.length, newItems);
      },
      // Used by JSON.stringify
      toJSON: function toJSON() {
        return this.slice();
      },

      /*
       * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
       * since these functions alter the inner structure of the array, the have side effects.
       * Because the have side effects, they should not be used in computed function,
       * and for that reason the do not call dependencyState.notifyObserved
       */
      splice: function splice(index, deleteCount) {
        for (var _len = arguments.length, newItems = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          newItems[_key - 2] = arguments[_key];
        }

        var adm = this[$mobx];

        switch (arguments.length) {
          case 0:
            return [];

          case 1:
            return adm.spliceWithArray_(index);

          case 2:
            return adm.spliceWithArray_(index, deleteCount);
        }

        return adm.spliceWithArray_(index, deleteCount, newItems);
      },
      spliceWithArray: function spliceWithArray(index, deleteCount, newItems) {
        return this[$mobx].spliceWithArray_(index, deleteCount, newItems);
      },
      push: function push() {
        var adm = this[$mobx];

        for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          items[_key2] = arguments[_key2];
        }

        adm.spliceWithArray_(adm.values_.length, 0, items);
        return adm.values_.length;
      },
      pop: function pop() {
        return this.splice(Math.max(this[$mobx].values_.length - 1, 0), 1)[0];
      },
      shift: function shift() {
        return this.splice(0, 1)[0];
      },
      unshift: function unshift() {
        var adm = this[$mobx];

        for (var _len3 = arguments.length, items = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          items[_key3] = arguments[_key3];
        }

        adm.spliceWithArray_(0, 0, items);
        return adm.values_.length;
      },
      reverse: function reverse() {
        // reverse by default mutates in place before returning the result
        // which makes it both a 'derivation' and a 'mutation'.
        if (globalState.trackingDerivation) {
          die(37, "reverse");
        }

        this.replace(this.slice().reverse());
        return this;
      },
      sort: function sort() {
        // sort by default mutates in place before returning the result
        // which goes against all good practices. Let's not change the array in place!
        if (globalState.trackingDerivation) {
          die(37, "sort");
        }

        var copy = this.slice();
        copy.sort.apply(copy, arguments);
        this.replace(copy);
        return this;
      },
      remove: function remove(value) {
        var adm = this[$mobx];
        var idx = adm.dehanceValues_(adm.values_).indexOf(value);

        if (idx > -1) {
          this.splice(idx, 1);
          return true;
        }

        return false;
      }
    };
    /**
     * Wrap function from prototype
     * Without this, everything works as well, but this works
     * faster as everything works on unproxied values
     */

    addArrayExtension("concat", simpleFunc);
    addArrayExtension("flat", simpleFunc);
    addArrayExtension("includes", simpleFunc);
    addArrayExtension("indexOf", simpleFunc);
    addArrayExtension("join", simpleFunc);
    addArrayExtension("lastIndexOf", simpleFunc);
    addArrayExtension("slice", simpleFunc);
    addArrayExtension("toString", simpleFunc);
    addArrayExtension("toLocaleString", simpleFunc); // map

    addArrayExtension("every", mapLikeFunc);
    addArrayExtension("filter", mapLikeFunc);
    addArrayExtension("find", mapLikeFunc);
    addArrayExtension("findIndex", mapLikeFunc);
    addArrayExtension("flatMap", mapLikeFunc);
    addArrayExtension("forEach", mapLikeFunc);
    addArrayExtension("map", mapLikeFunc);
    addArrayExtension("some", mapLikeFunc); // reduce

    addArrayExtension("reduce", reduceLikeFunc);
    addArrayExtension("reduceRight", reduceLikeFunc);

    function addArrayExtension(funcName, funcFactory) {
      if (typeof Array.prototype[funcName] === "function") {
        arrayExtensions[funcName] = funcFactory(funcName);
      }
    } // Report and delegate to dehanced array


    function simpleFunc(funcName) {
      return function () {
        var adm = this[$mobx];
        adm.atom_.reportObserved();
        var dehancedValues = adm.dehanceValues_(adm.values_);
        return dehancedValues[funcName].apply(dehancedValues, arguments);
      };
    } // Make sure callbacks recieve correct array arg #2326


    function mapLikeFunc(funcName) {
      return function (callback, thisArg) {
        var _this2 = this;

        var adm = this[$mobx];
        adm.atom_.reportObserved();
        var dehancedValues = adm.dehanceValues_(adm.values_);
        return dehancedValues[funcName](function (element, index) {
          return callback.call(thisArg, element, index, _this2);
        });
      };
    } // Make sure callbacks recieve correct array arg #2326


    function reduceLikeFunc(funcName) {
      return function () {
        var _this3 = this;

        var adm = this[$mobx];
        adm.atom_.reportObserved();
        var dehancedValues = adm.dehanceValues_(adm.values_); // #2432 - reduce behavior depends on arguments.length

        var callback = arguments[0];

        arguments[0] = function (accumulator, currentValue, index) {
          return callback(accumulator, currentValue, index, _this3);
        };

        return dehancedValues[funcName].apply(dehancedValues, arguments);
      };
    }

    var isObservableArrayAdministration = /*#__PURE__*/createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
    function isObservableArray(thing) {
      return isObject(thing) && isObservableArrayAdministration(thing[$mobx]);
    }

    var _Symbol$iterator, _Symbol$toStringTag;
    var ObservableMapMarker = {};
    var ADD = "add";
    var DELETE = "delete"; // just extend Map? See also https://gist.github.com/nestharus/13b4d74f2ef4a2f4357dbd3fc23c1e54
    // But: https://github.com/mobxjs/mobx/issues/1556

    _Symbol$iterator = Symbol.iterator;
    _Symbol$toStringTag = Symbol.toStringTag;
    var ObservableMap = /*#__PURE__*/function () {
      // hasMap, not hashMap >-).
      function ObservableMap(initialData, enhancer_, name_) {
        if (enhancer_ === void 0) {
          enhancer_ = deepEnhancer;
        }

        if (name_ === void 0) {
          name_ = "ObservableMap@" + getNextId();
        }

        this.enhancer_ = void 0;
        this.name_ = void 0;
        this[$mobx] = ObservableMapMarker;
        this.data_ = void 0;
        this.hasMap_ = void 0;
        this.keysAtom_ = void 0;
        this.interceptors_ = void 0;
        this.changeListeners_ = void 0;
        this.dehancer = void 0;
        this.enhancer_ = enhancer_;
        this.name_ = name_;

        if (!isFunction(Map)) {
          die(18);
        }

        this.keysAtom_ = createAtom(this.name_ + ".keys()");
        this.data_ = new Map();
        this.hasMap_ = new Map();
        this.merge(initialData);
      }

      var _proto = ObservableMap.prototype;

      _proto.has_ = function has_(key) {
        return this.data_.has(key);
      };

      _proto.has = function has(key) {
        var _this = this;

        if (!globalState.trackingDerivation) return this.has_(key);
        var entry = this.hasMap_.get(key);

        if (!entry) {
          var newEntry = entry = new ObservableValue(this.has_(key), referenceEnhancer, this.name_ + "." + stringifyKey(key) + "?", false);
          this.hasMap_.set(key, newEntry);
          onBecomeUnobserved(newEntry, function () {
            return _this.hasMap_["delete"](key);
          });
        }

        return entry.get();
      };

      _proto.set = function set(key, value) {
        var hasKey = this.has_(key);

        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            type: hasKey ? UPDATE : ADD,
            object: this,
            newValue: value,
            name: key
          });
          if (!change) return this;
          value = change.newValue;
        }

        if (hasKey) {
          this.updateValue_(key, value);
        } else {
          this.addValue_(key, value);
        }

        return this;
      };

      _proto["delete"] = function _delete(key) {
        var _this2 = this;

        checkIfStateModificationsAreAllowed(this.keysAtom_);

        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            type: DELETE,
            object: this,
            name: key
          });
          if (!change) return false;
        }

        if (this.has_(key)) {
          var notifySpy = isSpyEnabled();
          var notify = hasListeners(this);

          var _change = notify || notifySpy ? {
            observableKind: "map",
            debugObjectName: this.name_,
            type: DELETE,
            object: this,
            oldValue: this.data_.get(key).value_,
            name: key
          } : null;

          if ( notifySpy) spyReportStart(_change);
          transaction(function () {
            _this2.keysAtom_.reportChanged();

            _this2.updateHasMapEntry_(key, false);

            var observable = _this2.data_.get(key);

            observable.setNewValue_(undefined);

            _this2.data_["delete"](key);
          });
          if (notify) notifyListeners(this, _change);
          if ( notifySpy) spyReportEnd();
          return true;
        }

        return false;
      };

      _proto.updateHasMapEntry_ = function updateHasMapEntry_(key, value) {
        var entry = this.hasMap_.get(key);

        if (entry) {
          entry.setNewValue_(value);
        }
      };

      _proto.updateValue_ = function updateValue_(key, newValue) {
        var observable = this.data_.get(key);
        newValue = observable.prepareNewValue_(newValue);

        if (newValue !== globalState.UNCHANGED) {
          var notifySpy = isSpyEnabled();
          var notify = hasListeners(this);
          var change = notify || notifySpy ? {
            observableKind: "map",
            debugObjectName: this.name_,
            type: UPDATE,
            object: this,
            oldValue: observable.value_,
            name: key,
            newValue: newValue
          } : null;
          if ( notifySpy) spyReportStart(change);
          observable.setNewValue_(newValue);
          if (notify) notifyListeners(this, change);
          if ( notifySpy) spyReportEnd();
        }
      };

      _proto.addValue_ = function addValue_(key, newValue) {
        var _this3 = this;

        checkIfStateModificationsAreAllowed(this.keysAtom_);
        transaction(function () {
          var observable = new ObservableValue(newValue, _this3.enhancer_, _this3.name_ + "." + stringifyKey(key), false);

          _this3.data_.set(key, observable);

          newValue = observable.value_; // value might have been changed

          _this3.updateHasMapEntry_(key, true);

          _this3.keysAtom_.reportChanged();
        });
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
          observableKind: "map",
          debugObjectName: this.name_,
          type: ADD,
          object: this,
          name: key,
          newValue: newValue
        } : null;
        if ( notifySpy) spyReportStart(change);
        if (notify) notifyListeners(this, change);
        if ( notifySpy) spyReportEnd();
      };

      _proto.get = function get(key) {
        if (this.has(key)) return this.dehanceValue_(this.data_.get(key).get());
        return this.dehanceValue_(undefined);
      };

      _proto.dehanceValue_ = function dehanceValue_(value) {
        if (this.dehancer !== undefined) {
          return this.dehancer(value);
        }

        return value;
      };

      _proto.keys = function keys() {
        this.keysAtom_.reportObserved();
        return this.data_.keys();
      };

      _proto.values = function values() {
        var self = this;
        var keys = this.keys();
        return makeIterable({
          next: function next() {
            var _keys$next = keys.next(),
                done = _keys$next.done,
                value = _keys$next.value;

            return {
              done: done,
              value: done ? undefined : self.get(value)
            };
          }
        });
      };

      _proto.entries = function entries() {
        var self = this;
        var keys = this.keys();
        return makeIterable({
          next: function next() {
            var _keys$next2 = keys.next(),
                done = _keys$next2.done,
                value = _keys$next2.value;

            return {
              done: done,
              value: done ? undefined : [value, self.get(value)]
            };
          }
        });
      };

      _proto[_Symbol$iterator] = function () {
        return this.entries();
      };

      _proto.forEach = function forEach(callback, thisArg) {
        for (var _iterator = _createForOfIteratorHelperLoose(this), _step; !(_step = _iterator()).done;) {
          var _step$value = _step.value,
              key = _step$value[0],
              value = _step$value[1];
          callback.call(thisArg, value, key, this);
        }
      }
      /** Merge another object into this object, returns this. */
      ;

      _proto.merge = function merge(other) {
        var _this4 = this;

        if (isObservableMap(other)) {
          other = new Map(other);
        }

        transaction(function () {
          if (isPlainObject(other)) getPlainObjectKeys(other).forEach(function (key) {
            return _this4.set(key, other[key]);
          });else if (Array.isArray(other)) other.forEach(function (_ref) {
            var key = _ref[0],
                value = _ref[1];
            return _this4.set(key, value);
          });else if (isES6Map(other)) {
            if (other.constructor !== Map) die(19, other);
            other.forEach(function (value, key) {
              return _this4.set(key, value);
            });
          } else if (other !== null && other !== undefined) die(20, other);
        });
        return this;
      };

      _proto.clear = function clear() {
        var _this5 = this;

        transaction(function () {
          untracked(function () {
            for (var _iterator2 = _createForOfIteratorHelperLoose(_this5.keys()), _step2; !(_step2 = _iterator2()).done;) {
              var key = _step2.value;

              _this5["delete"](key);
            }
          });
        });
      };

      _proto.replace = function replace(values) {
        var _this6 = this;

        // Implementation requirements:
        // - respect ordering of replacement map
        // - allow interceptors to run and potentially prevent individual operations
        // - don't recreate observables that already exist in original map (so we don't destroy existing subscriptions)
        // - don't _keysAtom.reportChanged if the keys of resulting map are indentical (order matters!)
        // - note that result map may differ from replacement map due to the interceptors
        transaction(function () {
          // Convert to map so we can do quick key lookups
          var replacementMap = convertToMap(values);
          var orderedData = new Map(); // Used for optimization

          var keysReportChangedCalled = false; // Delete keys that don't exist in replacement map
          // if the key deletion is prevented by interceptor
          // add entry at the beginning of the result map

          for (var _iterator3 = _createForOfIteratorHelperLoose(_this6.data_.keys()), _step3; !(_step3 = _iterator3()).done;) {
            var key = _step3.value;

            // Concurrently iterating/deleting keys
            // iterator should handle this correctly
            if (!replacementMap.has(key)) {
              var deleted = _this6["delete"](key); // Was the key removed?


              if (deleted) {
                // _keysAtom.reportChanged() was already called
                keysReportChangedCalled = true;
              } else {
                // Delete prevented by interceptor
                var value = _this6.data_.get(key);

                orderedData.set(key, value);
              }
            }
          } // Merge entries


          for (var _iterator4 = _createForOfIteratorHelperLoose(replacementMap.entries()), _step4; !(_step4 = _iterator4()).done;) {
            var _step4$value = _step4.value,
                _key = _step4$value[0],
                _value = _step4$value[1];

            // We will want to know whether a new key is added
            var keyExisted = _this6.data_.has(_key); // Add or update value


            _this6.set(_key, _value); // The addition could have been prevent by interceptor


            if (_this6.data_.has(_key)) {
              // The update could have been prevented by interceptor
              // and also we want to preserve existing values
              // so use value from _data map (instead of replacement map)
              var _value2 = _this6.data_.get(_key);

              orderedData.set(_key, _value2); // Was a new key added?

              if (!keyExisted) {
                // _keysAtom.reportChanged() was already called
                keysReportChangedCalled = true;
              }
            }
          } // Check for possible key order change


          if (!keysReportChangedCalled) {
            if (_this6.data_.size !== orderedData.size) {
              // If size differs, keys are definitely modified
              _this6.keysAtom_.reportChanged();
            } else {
              var iter1 = _this6.data_.keys();

              var iter2 = orderedData.keys();
              var next1 = iter1.next();
              var next2 = iter2.next();

              while (!next1.done) {
                if (next1.value !== next2.value) {
                  _this6.keysAtom_.reportChanged();

                  break;
                }

                next1 = iter1.next();
                next2 = iter2.next();
              }
            }
          } // Use correctly ordered map


          _this6.data_ = orderedData;
        });
        return this;
      };

      _proto.toString = function toString() {
        return "[object ObservableMap]";
      };

      _proto.toJSON = function toJSON() {
        return Array.from(this);
      };

      /**
       * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
       * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
       * for callback details
       */
      _proto.observe_ = function observe_(listener, fireImmediately) {
        if ( fireImmediately === true) die("`observe` doesn't support fireImmediately=true in combination with maps.");
        return registerListener(this, listener);
      };

      _proto.intercept_ = function intercept_(handler) {
        return registerInterceptor(this, handler);
      };

      _createClass(ObservableMap, [{
        key: "size",
        get: function get() {
          this.keysAtom_.reportObserved();
          return this.data_.size;
        }
      }, {
        key: _Symbol$toStringTag,
        get: function get() {
          return "Map";
        }
      }]);

      return ObservableMap;
    }(); // eslint-disable-next-line

    var isObservableMap = /*#__PURE__*/createInstanceofPredicate("ObservableMap", ObservableMap);

    function convertToMap(dataStructure) {
      if (isES6Map(dataStructure) || isObservableMap(dataStructure)) {
        return dataStructure;
      } else if (Array.isArray(dataStructure)) {
        return new Map(dataStructure);
      } else if (isPlainObject(dataStructure)) {
        var map = new Map();

        for (var key in dataStructure) {
          map.set(key, dataStructure[key]);
        }

        return map;
      } else {
        return die(21, dataStructure);
      }
    }

    var _Symbol$iterator$1, _Symbol$toStringTag$1;
    var ObservableSetMarker = {};
    _Symbol$iterator$1 = Symbol.iterator;
    _Symbol$toStringTag$1 = Symbol.toStringTag;
    var ObservableSet = /*#__PURE__*/function () {
      function ObservableSet(initialData, enhancer, name_) {
        if (enhancer === void 0) {
          enhancer = deepEnhancer;
        }

        if (name_ === void 0) {
          name_ = "ObservableSet@" + getNextId();
        }

        this.name_ = void 0;
        this[$mobx] = ObservableSetMarker;
        this.data_ = new Set();
        this.atom_ = void 0;
        this.changeListeners_ = void 0;
        this.interceptors_ = void 0;
        this.dehancer = void 0;
        this.enhancer_ = void 0;
        this.name_ = name_;

        if (!isFunction(Set)) {
          die(22);
        }

        this.atom_ = createAtom(this.name_);

        this.enhancer_ = function (newV, oldV) {
          return enhancer(newV, oldV, name_);
        };

        if (initialData) {
          this.replace(initialData);
        }
      }

      var _proto = ObservableSet.prototype;

      _proto.dehanceValue_ = function dehanceValue_(value) {
        if (this.dehancer !== undefined) {
          return this.dehancer(value);
        }

        return value;
      };

      _proto.clear = function clear() {
        var _this = this;

        transaction(function () {
          untracked(function () {
            for (var _iterator = _createForOfIteratorHelperLoose(_this.data_.values()), _step; !(_step = _iterator()).done;) {
              var value = _step.value;

              _this["delete"](value);
            }
          });
        });
      };

      _proto.forEach = function forEach(callbackFn, thisArg) {
        for (var _iterator2 = _createForOfIteratorHelperLoose(this), _step2; !(_step2 = _iterator2()).done;) {
          var value = _step2.value;
          callbackFn.call(thisArg, value, value, this);
        }
      };

      _proto.add = function add(value) {
        var _this2 = this;

        checkIfStateModificationsAreAllowed(this.atom_);

        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            type: ADD,
            object: this,
            newValue: value
          });
          if (!change) return this; // ideally, value = change.value would be done here, so that values can be
          // changed by interceptor. Same applies for other Set and Map api's.
        }

        if (!this.has(value)) {
          transaction(function () {
            _this2.data_.add(_this2.enhancer_(value, undefined));

            _this2.atom_.reportChanged();
          });
          var notifySpy =  isSpyEnabled();
          var notify = hasListeners(this);

          var _change = notify || notifySpy ? {
            observableKind: "set",
            debugObjectName: this.name_,
            type: ADD,
            object: this,
            newValue: value
          } : null;

          if (notifySpy && "development" !== "production") spyReportStart(_change);
          if (notify) notifyListeners(this, _change);
          if (notifySpy && "development" !== "production") spyReportEnd();
        }

        return this;
      };

      _proto["delete"] = function _delete(value) {
        var _this3 = this;

        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            type: DELETE,
            object: this,
            oldValue: value
          });
          if (!change) return false;
        }

        if (this.has(value)) {
          var notifySpy =  isSpyEnabled();
          var notify = hasListeners(this);

          var _change2 = notify || notifySpy ? {
            observableKind: "set",
            debugObjectName: this.name_,
            type: DELETE,
            object: this,
            oldValue: value
          } : null;

          if (notifySpy && "development" !== "production") spyReportStart(_change2);
          transaction(function () {
            _this3.atom_.reportChanged();

            _this3.data_["delete"](value);
          });
          if (notify) notifyListeners(this, _change2);
          if (notifySpy && "development" !== "production") spyReportEnd();
          return true;
        }

        return false;
      };

      _proto.has = function has(value) {
        this.atom_.reportObserved();
        return this.data_.has(this.dehanceValue_(value));
      };

      _proto.entries = function entries() {
        var nextIndex = 0;
        var keys = Array.from(this.keys());
        var values = Array.from(this.values());
        return makeIterable({
          next: function next() {
            var index = nextIndex;
            nextIndex += 1;
            return index < values.length ? {
              value: [keys[index], values[index]],
              done: false
            } : {
              done: true
            };
          }
        });
      };

      _proto.keys = function keys() {
        return this.values();
      };

      _proto.values = function values() {
        this.atom_.reportObserved();
        var self = this;
        var nextIndex = 0;
        var observableValues = Array.from(this.data_.values());
        return makeIterable({
          next: function next() {
            return nextIndex < observableValues.length ? {
              value: self.dehanceValue_(observableValues[nextIndex++]),
              done: false
            } : {
              done: true
            };
          }
        });
      };

      _proto.replace = function replace(other) {
        var _this4 = this;

        if (isObservableSet(other)) {
          other = new Set(other);
        }

        transaction(function () {
          if (Array.isArray(other)) {
            _this4.clear();

            other.forEach(function (value) {
              return _this4.add(value);
            });
          } else if (isES6Set(other)) {
            _this4.clear();

            other.forEach(function (value) {
              return _this4.add(value);
            });
          } else if (other !== null && other !== undefined) {
            die("Cannot initialize set from " + other);
          }
        });
        return this;
      };

      _proto.observe_ = function observe_(listener, fireImmediately) {
        // ... 'fireImmediately' could also be true?
        if ( fireImmediately === true) die("`observe` doesn't support fireImmediately=true in combination with sets.");
        return registerListener(this, listener);
      };

      _proto.intercept_ = function intercept_(handler) {
        return registerInterceptor(this, handler);
      };

      _proto.toJSON = function toJSON() {
        return Array.from(this);
      };

      _proto.toString = function toString() {
        return "[object ObservableSet]";
      };

      _proto[_Symbol$iterator$1] = function () {
        return this.values();
      };

      _createClass(ObservableSet, [{
        key: "size",
        get: function get() {
          this.atom_.reportObserved();
          return this.data_.size;
        }
      }, {
        key: _Symbol$toStringTag$1,
        get: function get() {
          return "Set";
        }
      }]);

      return ObservableSet;
    }(); // eslint-disable-next-line

    var isObservableSet = /*#__PURE__*/createInstanceofPredicate("ObservableSet", ObservableSet);

    var REMOVE = "remove";
    var ObservableObjectAdministration = /*#__PURE__*/function () {
      function ObservableObjectAdministration(target_, values_, name_, defaultEnhancer_) {
        if (values_ === void 0) {
          values_ = new Map();
        }

        this.target_ = void 0;
        this.values_ = void 0;
        this.name_ = void 0;
        this.defaultEnhancer_ = void 0;
        this.keysAtom_ = void 0;
        this.changeListeners_ = void 0;
        this.interceptors_ = void 0;
        this.proxy_ = void 0;
        this.pendingKeys_ = void 0;
        this.keysValue_ = [];
        this.isStaledKeysValue_ = true;
        this.target_ = target_;
        this.values_ = values_;
        this.name_ = name_;
        this.defaultEnhancer_ = defaultEnhancer_;
        this.keysAtom_ = new Atom(name_ + ".keys");
      }

      var _proto = ObservableObjectAdministration.prototype;

      _proto.read_ = function read_(key) {
        return this.values_.get(key).get();
      };

      _proto.write_ = function write_(key, newValue) {
        var instance = this.target_;
        var observable = this.values_.get(key);

        if (observable instanceof ComputedValue) {
          observable.set(newValue);
          return;
        } // intercept


        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            type: UPDATE,
            object: this.proxy_ || instance,
            name: key,
            newValue: newValue
          });
          if (!change) return;
          newValue = change.newValue;
        }

        newValue = observable.prepareNewValue_(newValue); // notify spy & observers

        if (newValue !== globalState.UNCHANGED) {
          var notify = hasListeners(this);
          var notifySpy =  isSpyEnabled();

          var _change = notify || notifySpy ? {
            type: UPDATE,
            observableKind: "object",
            debugObjectName: this.name_,
            object: this.proxy_ || instance,
            oldValue: observable.value_,
            name: key,
            newValue: newValue
          } : null;

          if ( notifySpy) spyReportStart(_change);
          observable.setNewValue_(newValue);
          if (notify) notifyListeners(this, _change);
          if ( notifySpy) spyReportEnd();
        }
      };

      _proto.has_ = function has_(key) {
        var map = this.pendingKeys_ || (this.pendingKeys_ = new Map());
        var entry = map.get(key);
        if (entry) return entry.get();else {
          var exists = !!this.values_.get(key); // Possible optimization: Don't have a separate map for non existing keys,
          // but store them in the values map instead, using a special symbol to denote "not existing"

          entry = new ObservableValue(exists, referenceEnhancer, this.name_ + "." + stringifyKey(key) + "?", false);
          map.set(key, entry);
          return entry.get(); // read to subscribe
        }
      };

      _proto.addObservableProp_ = function addObservableProp_(propName, newValue, enhancer) {
        if (enhancer === void 0) {
          enhancer = this.defaultEnhancer_;
        }

        var target = this.target_;
        assertPropertyConfigurable(target, propName);

        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            object: this.proxy_ || target,
            name: propName,
            type: ADD,
            newValue: newValue
          });
          if (!change) return;
          newValue = change.newValue;
        }

        var observable = new ObservableValue(newValue, enhancer, this.name_ + "." + stringifyKey(propName), false);
        this.values_.set(propName, observable);
        newValue = observable.value_; // observableValue might have changed it

        defineProperty(target, propName, generateObservablePropConfig(propName));
        this.notifyPropertyAddition_(propName, newValue);
      };

      _proto.addComputedProp_ = function addComputedProp_(propertyOwner, // where is the property declared?
      propName, options) {
        var target = this.target_;
        options.name = options.name || this.name_ + "." + stringifyKey(propName);
        options.context = this.proxy_ || target;
        this.values_.set(propName, new ComputedValue(options)); // Doesn't seem we need this condition:
        // if (propertyOwner === target || isPropertyConfigurable(propertyOwner, propName))

        defineProperty(propertyOwner, propName, generateComputedPropConfig(propName));
      };

      _proto.remove_ = function remove_(key) {
        if (!this.values_.has(key)) return;
        var target = this.target_;

        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            object: this.proxy_ || target,
            name: key,
            type: REMOVE
          });
          if (!change) return;
        }

        try {
          startBatch();
          var notify = hasListeners(this);
          var notifySpy = "development" !== "production" && isSpyEnabled();
          var oldObservable = this.values_.get(key);
          var oldValue = oldObservable && oldObservable.get();
          oldObservable && oldObservable.set(undefined); // notify key and keyset listeners

          this.reportKeysChanged();
          this.values_["delete"](key);

          if (this.pendingKeys_) {
            var entry = this.pendingKeys_.get(key);
            if (entry) entry.set(false);
          } // delete the prop


          delete this.target_[key];

          var _change2 = notify || notifySpy ? {
            type: REMOVE,
            observableKind: "object",
            object: this.proxy_ || target,
            debugObjectName: this.name_,
            oldValue: oldValue,
            name: key
          } : null;

          if ("development" !== "production" && notifySpy) spyReportStart(_change2);
          if (notify) notifyListeners(this, _change2);
          if ("development" !== "production" && notifySpy) spyReportEnd();
        } finally {
          endBatch();
        }
      }
      /**
       * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
       * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
       * for callback details
       */
      ;

      _proto.observe_ = function observe_(callback, fireImmediately) {
        if ( fireImmediately === true) die("`observe` doesn't support the fire immediately property for observable objects.");
        return registerListener(this, callback);
      };

      _proto.intercept_ = function intercept_(handler) {
        return registerInterceptor(this, handler);
      };

      _proto.notifyPropertyAddition_ = function notifyPropertyAddition_(key, newValue) {
        var notify = hasListeners(this);
        var notifySpy =  isSpyEnabled();
        var change = notify || notifySpy ? {
          type: ADD,
          observableKind: "object",
          debugObjectName: this.name_,
          object: this.proxy_ || this.target_,
          name: key,
          newValue: newValue
        } : null;
        if ( notifySpy) spyReportStart(change);
        if (notify) notifyListeners(this, change);
        if ( notifySpy) spyReportEnd();

        if (this.pendingKeys_) {
          var entry = this.pendingKeys_.get(key);
          if (entry) entry.set(true);
        }

        this.reportKeysChanged();
      };

      _proto.getKeys_ = function getKeys_() {
        this.keysAtom_.reportObserved();

        if (!this.isStaledKeysValue_) {
          return this.keysValue_;
        } // return Reflect.ownKeys(this.values) as any


        this.keysValue_ = [];

        for (var _iterator = _createForOfIteratorHelperLoose(this.values_), _step; !(_step = _iterator()).done;) {
          var _step$value = _step.value,
              key = _step$value[0],
              value = _step$value[1];
          if (value instanceof ObservableValue) this.keysValue_.push(key);
        }

        Object.freeze(this.keysValue_);
        this.isStaledKeysValue_ = false;
        return this.keysValue_;
      };

      _proto.reportKeysChanged = function reportKeysChanged() {
        this.isStaledKeysValue_ = true;
        this.keysAtom_.reportChanged();
      };

      return ObservableObjectAdministration;
    }();
    function asObservableObject(target, name, defaultEnhancer) {
      if (name === void 0) {
        name = "";
      }

      if (defaultEnhancer === void 0) {
        defaultEnhancer = deepEnhancer;
      }

      if (hasProp(target, $mobx)) return target[$mobx];
      if ( !Object.isExtensible(target)) die("Cannot make the designated object observable; it is not extensible");

      if (!name) {
        if (isPlainObject(target)) {
          name = "ObservableObject@" + getNextId();
        } else {
          name = (target.constructor.name || "ObservableObject") + "@" + getNextId();
        }
      }

      var adm = new ObservableObjectAdministration(target, new Map(), stringifyKey(name), defaultEnhancer);
      addHiddenProp(target, $mobx, adm);
      return adm;
    }
    var observablePropertyConfigs = /*#__PURE__*/Object.create(null);
    var computedPropertyConfigs = /*#__PURE__*/Object.create(null);
    function generateObservablePropConfig(propName) {
      return observablePropertyConfigs[propName] || (observablePropertyConfigs[propName] = {
        configurable: true,
        enumerable: true,
        get: function get() {
          return this[$mobx].read_(propName);
        },
        set: function set(v) {
          this[$mobx].write_(propName, v);
        }
      });
    }
    function generateComputedPropConfig(propName) {
      return computedPropertyConfigs[propName] || (computedPropertyConfigs[propName] = {
        configurable: true,
        enumerable: false,
        get: function get() {
          return this[$mobx].read_(propName);
        },
        set: function set(v) {
          this[$mobx].write_(propName, v);
        }
      });
    }
    var isObservableObjectAdministration = /*#__PURE__*/createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);
    function isObservableObject(thing) {
      if (isObject(thing)) {
        return isObservableObjectAdministration(thing[$mobx]);
      }

      return false;
    }

    /**
     * This array buffer contains two lists of properties, so that all arrays
     * can recycle their property definitions, which significantly improves performance of creating
     * properties on the fly.
     */

    var OBSERVABLE_ARRAY_BUFFER_SIZE = 0; // Typescript workaround to make sure ObservableArray extends Array

    var StubArray = function StubArray() {};

    function inherit(ctor, proto) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(ctor.prototype, proto);
      } else if (ctor.prototype.__proto__ !== undefined) {
        ctor.prototype.__proto__ = proto;
      } else {
        ctor.prototype = proto;
      }
    }

    inherit(StubArray, Array.prototype); // Weex proto freeze protection was here,
    // but it is unclear why the hack is need as MobX never changed the prototype
    // anyway, so removed it in V6

    var LegacyObservableArray = /*#__PURE__*/function (_StubArray) {
      _inheritsLoose(LegacyObservableArray, _StubArray);

      function LegacyObservableArray(initialValues, enhancer, name, owned) {
        var _this;

        if (name === void 0) {
          name = "ObservableArray@" + getNextId();
        }

        if (owned === void 0) {
          owned = false;
        }

        _this = _StubArray.call(this) || this;
        var adm = new ObservableArrayAdministration(name, enhancer, owned, true);
        adm.proxy_ = _assertThisInitialized(_this);
        addHiddenFinalProp(_assertThisInitialized(_this), $mobx, adm);

        if (initialValues && initialValues.length) {
          var prev = allowStateChangesStart(true); // @ts-ignore

          _this.spliceWithArray(0, 0, initialValues);

          allowStateChangesEnd(prev);
        }

        return _this;
      }

      var _proto = LegacyObservableArray.prototype;

      _proto.concat = function concat() {
        this[$mobx].atom_.reportObserved();

        for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
          arrays[_key] = arguments[_key];
        }

        return Array.prototype.concat.apply(this.slice(), //@ts-ignore
        arrays.map(function (a) {
          return isObservableArray(a) ? a.slice() : a;
        }));
      };

      _proto[Symbol.iterator] = function () {
        var self = this;
        var nextIndex = 0;
        return makeIterable({
          next: function next() {
            // @ts-ignore
            return nextIndex < self.length ? {
              value: self[nextIndex++],
              done: false
            } : {
              done: true,
              value: undefined
            };
          }
        });
      };

      _createClass(LegacyObservableArray, [{
        key: "length",
        get: function get() {
          return this[$mobx].getArrayLength_();
        },
        set: function set(newLength) {
          this[$mobx].setArrayLength_(newLength);
        }
      }, {
        key: Symbol.toStringTag,
        get: function get() {
          return "Array";
        }
      }]);

      return LegacyObservableArray;
    }(StubArray);

    Object.entries(arrayExtensions).forEach(function (_ref) {
      var prop = _ref[0],
          fn = _ref[1];
      if (prop !== "concat") addHiddenProp(LegacyObservableArray.prototype, prop, fn);
    });

    function createArrayEntryDescriptor(index) {
      return {
        enumerable: false,
        configurable: true,
        get: function get() {
          return this[$mobx].get_(index);
        },
        set: function set(value) {
          this[$mobx].set_(index, value);
        }
      };
    }

    function createArrayBufferItem(index) {
      defineProperty(LegacyObservableArray.prototype, "" + index, createArrayEntryDescriptor(index));
    }

    function reserveArrayBuffer(max) {
      if (max > OBSERVABLE_ARRAY_BUFFER_SIZE) {
        for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max + 100; index++) {
          createArrayBufferItem(index);
        }

        OBSERVABLE_ARRAY_BUFFER_SIZE = max;
      }
    }
    reserveArrayBuffer(1000);
    function createLegacyArray(initialValues, enhancer, name) {
      return new LegacyObservableArray(initialValues, enhancer, name);
    }

    function getAtom(thing, property) {
      if (typeof thing === "object" && thing !== null) {
        if (isObservableArray(thing)) {
          if (property !== undefined) die(23);
          return thing[$mobx].atom_;
        }

        if (isObservableSet(thing)) {
          return thing[$mobx];
        }

        if (isObservableMap(thing)) {
          if (property === undefined) return thing.keysAtom_;
          var observable = thing.data_.get(property) || thing.hasMap_.get(property);
          if (!observable) die(25, property, getDebugName(thing));
          return observable;
        }

        if (isObservableObject(thing)) {
          if (!property) return die(26);

          var _observable = thing[$mobx].values_.get(property);

          if (!_observable) die(27, property, getDebugName(thing));
          return _observable;
        }

        if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
          return thing;
        }
      } else if (isFunction(thing)) {
        if (isReaction(thing[$mobx])) {
          // disposer function
          return thing[$mobx];
        }
      }

      die(28);
    }
    function getAdministration(thing, property) {
      if (!thing) die(29);
      if (property !== undefined) return getAdministration(getAtom(thing, property));
      if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) return thing;
      if (isObservableMap(thing) || isObservableSet(thing)) return thing;
      if (thing[$mobx]) return thing[$mobx];
      die(24, thing);
    }
    function getDebugName(thing, property) {
      var named;
      if (property !== undefined) named = getAtom(thing, property);else if (isObservableObject(thing) || isObservableMap(thing) || isObservableSet(thing)) named = getAdministration(thing);else named = getAtom(thing); // valid for arrays as well

      return named.name_;
    }

    var toString = objectPrototype.toString;
    function deepEqual(a, b, depth) {
      if (depth === void 0) {
        depth = -1;
      }

      return eq(a, b, depth);
    } // Copied from https://github.com/jashkenas/underscore/blob/5c237a7c682fb68fd5378203f0bf22dce1624854/underscore.js#L1186-L1289
    // Internal recursive comparison function for `isEqual`.

    function eq(a, b, depth, aStack, bStack) {
      // Identical objects are equal. `0 === -0`, but they aren't identical.
      // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
      if (a === b) return a !== 0 || 1 / a === 1 / b; // `null` or `undefined` only equal to itself (strict comparison).

      if (a == null || b == null) return false; // `NaN`s are equivalent, but non-reflexive.

      if (a !== a) return b !== b; // Exhaust primitive checks

      var type = typeof a;
      if (!isFunction(type) && type !== "object" && typeof b != "object") return false; // Compare `[[Class]]` names.

      var className = toString.call(a);
      if (className !== toString.call(b)) return false;

      switch (className) {
        // Strings, numbers, regular expressions, dates, and booleans are compared by value.
        case "[object RegExp]": // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')

        case "[object String]":
          // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
          // equivalent to `new String("5")`.
          return "" + a === "" + b;

        case "[object Number]":
          // `NaN`s are equivalent, but non-reflexive.
          // Object(NaN) is equivalent to NaN.
          if (+a !== +a) return +b !== +b; // An `egal` comparison is performed for other numeric values.

          return +a === 0 ? 1 / +a === 1 / b : +a === +b;

        case "[object Date]":
        case "[object Boolean]":
          // Coerce dates and booleans to numeric primitive values. Dates are compared by their
          // millisecond representations. Note that invalid dates with millisecond representations
          // of `NaN` are not equivalent.
          return +a === +b;

        case "[object Symbol]":
          return typeof Symbol !== "undefined" && Symbol.valueOf.call(a) === Symbol.valueOf.call(b);

        case "[object Map]":
        case "[object Set]":
          // Maps and Sets are unwrapped to arrays of entry-pairs, adding an incidental level.
          // Hide this extra level by increasing the depth.
          if (depth >= 0) {
            depth++;
          }

          break;
      } // Unwrap any wrapped objects.


      a = unwrap(a);
      b = unwrap(b);
      var areArrays = className === "[object Array]";

      if (!areArrays) {
        if (typeof a != "object" || typeof b != "object") return false; // Objects with different constructors are not equivalent, but `Object`s or `Array`s
        // from different frames are.

        var aCtor = a.constructor,
            bCtor = b.constructor;

        if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && "constructor" in a && "constructor" in b) {
          return false;
        }
      }

      if (depth === 0) {
        return false;
      } else if (depth < 0) {
        depth = -1;
      } // Assume equality for cyclic structures. The algorithm for detecting cyclic
      // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
      // Initializing stack of traversed objects.
      // It's done here since we only need them for objects and arrays comparison.


      aStack = aStack || [];
      bStack = bStack || [];
      var length = aStack.length;

      while (length--) {
        // Linear search. Performance is inversely proportional to the number of
        // unique nested structures.
        if (aStack[length] === a) return bStack[length] === b;
      } // Add the first object to the stack of traversed objects.


      aStack.push(a);
      bStack.push(b); // Recursively compare objects and arrays.

      if (areArrays) {
        // Compare array lengths to determine if a deep comparison is necessary.
        length = a.length;
        if (length !== b.length) return false; // Deep compare the contents, ignoring non-numeric properties.

        while (length--) {
          if (!eq(a[length], b[length], depth - 1, aStack, bStack)) return false;
        }
      } else {
        // Deep compare objects.
        var keys = Object.keys(a);
        var key;
        length = keys.length; // Ensure that both objects contain the same number of properties before comparing deep equality.

        if (Object.keys(b).length !== length) return false;

        while (length--) {
          // Deep compare each member
          key = keys[length];
          if (!(hasProp(b, key) && eq(a[key], b[key], depth - 1, aStack, bStack))) return false;
        }
      } // Remove the first object from the stack of traversed objects.


      aStack.pop();
      bStack.pop();
      return true;
    }

    function unwrap(a) {
      if (isObservableArray(a)) return a.slice();
      if (isES6Map(a) || isObservableMap(a)) return Array.from(a.entries());
      if (isES6Set(a) || isObservableSet(a)) return Array.from(a.entries());
      return a;
    }

    function makeIterable(iterator) {
      iterator[Symbol.iterator] = getSelf;
      return iterator;
    }

    function getSelf() {
      return this;
    }

    /**
     * (c) Michel Weststrate 2015 - 2020
     * MIT Licensed
     *
     * Welcome to the mobx sources! To get an global overview of how MobX internally works,
     * this is a good place to start:
     * https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.xvbh6qd74
     *
     * Source folders:
     * ===============
     *
     * - api/     Most of the public static methods exposed by the module can be found here.
     * - core/    Implementation of the MobX algorithm; atoms, derivations, reactions, dependency trees, optimizations. Cool stuff can be found here.
     * - types/   All the magic that is need to have observable objects, arrays and values is in this folder. Including the modifiers like `asFlat`.
     * - utils/   Utility stuff.
     *
     */
    ["Symbol", "Map", "Set", "Symbol"].forEach(function (m) {
      var g = getGlobal();

      if (typeof g[m] === "undefined") {
        die("MobX requires global '" + m + "' to be available or polyfilled");
      }
    });

    if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
      // See: https://github.com/andykog/mobx-devtools/
      __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
        spy: spy,
        extras: {
          getDebugName: getDebugName
        },
        $mobx: $mobx
      });
    }

    exports.$mobx = $mobx;
    exports.FlowCancellationError = FlowCancellationError;
    exports.ObservableMap = ObservableMap;
    exports.ObservableSet = ObservableSet;
    exports.Reaction = Reaction;
    exports._allowStateChanges = allowStateChanges;
    exports._allowStateChangesInsideComputed = runInAction;
    exports._allowStateReadsEnd = allowStateReadsEnd;
    exports._allowStateReadsStart = allowStateReadsStart;
    exports._autoAction = autoAction;
    exports._endAction = _endAction;
    exports._getAdministration = getAdministration;
    exports._getGlobalState = getGlobalState;
    exports._interceptReads = interceptReads;
    exports._isComputingDerivation = isComputingDerivation;
    exports._resetGlobalState = resetGlobalState;
    exports._startAction = _startAction;
    exports.action = action;
    exports.autorun = autorun;
    exports.comparer = comparer;
    exports.computed = computed;
    exports.configure = configure;
    exports.createAtom = createAtom;
    exports.entries = entries;
    exports.extendObservable = extendObservable;
    exports.flow = flow;
    exports.flowResult = flowResult;
    exports.get = get;
    exports.getAtom = getAtom;
    exports.getDebugName = getDebugName;
    exports.getDependencyTree = getDependencyTree;
    exports.getObserverTree = getObserverTree;
    exports.has = has;
    exports.intercept = intercept;
    exports.isAction = isAction;
    exports.isBoxedObservable = isObservableValue;
    exports.isComputed = isComputed;
    exports.isComputedProp = isComputedProp;
    exports.isFlowCancellationError = isFlowCancellationError;
    exports.isObservable = isObservable;
    exports.isObservableArray = isObservableArray;
    exports.isObservableMap = isObservableMap;
    exports.isObservableObject = isObservableObject;
    exports.isObservableProp = isObservableProp;
    exports.isObservableSet = isObservableSet;
    exports.keys = keys;
    exports.makeAutoObservable = makeAutoObservable;
    exports.makeObservable = makeObservable;
    exports.observable = observable;
    exports.observe = observe;
    exports.onBecomeObserved = onBecomeObserved;
    exports.onBecomeUnobserved = onBecomeUnobserved;
    exports.onReactionError = onReactionError;
    exports.reaction = reaction;
    exports.remove = remove;
    exports.runInAction = runInAction;
    exports.set = set;
    exports.spy = spy;
    exports.toJS = toJS;
    exports.trace = trace;
    exports.transaction = transaction;
    exports.untracked = untracked;
    exports.values = values;
    exports.when = when;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mobx.umd.development.js.map
