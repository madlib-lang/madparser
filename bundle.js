(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('util')) :
  typeof define === 'function' && define.amd ? define(['exports', 'util'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.exe = {}, global.util));
}(this, (function (exports, util) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var util__default = /*#__PURE__*/_interopDefaultLegacy(util);

  window.$ = '__$__';
  const PLACEHOLDER = '__$__';
  window.__curry__ = fn => {
    const test = x => x === PLACEHOLDER;
    return function curried() {
      const argLength = arguments.length;
      let args = new Array(argLength);

      for (let i = 0; i < argLength; ++i) {
        args[i] = arguments[i];
      }
      const countNonPlaceholders = toCount => {
        let count = toCount.length;
        while (!test(toCount[count])) {
          count--;
        }
        return count;
      };
      const length = as => (as.some(test) ? countNonPlaceholders(as) : as.length);
      function saucy() {
        const arg2Length = arguments.length;
        const args2 = new Array(arg2Length);
        for (let j = 0; j < arg2Length; ++j) {
          args2[j] = arguments[j];
        }

        return curried.apply(
          this,
          args
            .map(y =>
              test(y) && args2[0]
                ? args2.shift()
                : y
            )
            .concat(args2)
        );
      }

      if (length(args) >= fn.length) {
        const currentArgs = args.slice(0, fn.length);
        const result = fn.apply(this, currentArgs);
        const nextArgs = args.slice(fn.length);

        if (typeof result === "function" && length(nextArgs) > 0) {
          return result.apply(this, nextArgs);
        } else {
          return result;
        }
      } else {
        return saucy;
      }
    };
  };

  window.__eq__ = (l, r) => {
    if (l === r) {
      return true;
    }
    if (typeof l !== typeof r) {
      return false;
    }
    if (typeof l === `object`) {
      if (Array.isArray(l)) {
        return l.reduce((res, _, i) => res && __eq__(l[i], r[i]), true);
      }
      const keysL = Object.keys(l);
      const keysR = Object.keys(r);
      return keysL.length === keysR.length && keysL.reduce((res, k) => res && __eq__(l[k], r[k]), true);
    }
    return l === r;
  };

  const __applyMany__ = (f, params) => params.reduce((_f, param) => _f(param), f);
  window.__apMtdDicts__ = (dict, dicts) =>
    Object.keys(dict).reduce((o, k) => ({ ...o, [k]: __applyMany__(dict[k], dicts) }), {});

  window.__once__ = (fn, context) => {

      var result;

      return function() {

          if (fn) {

              result = fn.apply(context || this, arguments);

              fn = null;

          }

          return result;

      };

  };

  // file: /opt/hostedtoolcache/node/14.16.1/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Show.mad
  window.Show = {};

  // file: /opt/hostedtoolcache/node/14.16.1/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Function.mad
  let complement = __curry__((fn, x) => !(fn(x)));
  let always = __curry__((a, b) => a);
  let identity = __curry__((a) => a);
  let equals = __curry__((val, a) => __eq__(val, a));
  let notEquals = __curry__((val, a) => !__eq__(val, a));
  let ifElse = __curry__((predicate, truthy, falsy, value) => (predicate(value) ? truthy(value) : falsy(value)));
  let when = __curry__((predicate, truthy, value) => ifElse(predicate, truthy, always(value), value));
  let not = __curry__((b) => !(b));
  let flip = __curry__((f, b, a) => f(a, b));
  const nativeMemoize = (fn) => {
    let cache = {};
    return (a) => {
      const key = JSON.stringify(a);
      if (!cache[key]) {
        cache[key] = fn.apply(undefined, [a]);
      }
      return cache[key]
    }
  };
  let memoize = __curry__((fn) => nativeMemoize(fn));
  const nativeMemoize2 = (fn) => {
    let cache = {};
    return __curry__((a, b) => {
      const key = JSON.stringify([a, b]);
      if (!cache[key]) {
        cache[key] = fn.apply(undefined, [a, b]);
      }
      return cache[key]
    })
  };
  let memoize2 = __curry__((fn) => nativeMemoize2(fn));
  const nativeMemoize3 = (fn) => {
    let cache = {};
    return __curry__((a, b, c) => {
      const key = JSON.stringify([a, b, c]);
      if (!cache[key]) {
        cache[key] = fn.apply(undefined, [a, b, c]);
      }
      return cache[key]
    })
  };
  let memoize3 = __curry__((fn) => nativeMemoize3(fn));
  var Fun = { complement, always, identity, equals, notEquals, ifElse, when, not, flip, memoize, memoize2, memoize3 };

  // file: /opt/hostedtoolcache/node/14.16.1/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Functor.mad

  window.Functor = {};
  __once__(() => __curry__((_P_) => Functor_t97.map(always(_P_))));

  // file: /opt/hostedtoolcache/node/14.16.1/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Applicative.mad

  window.Applicative = {};
  __once__(() => __curry__((a, b) => Applicative_h111.ap(Functor_h111.map(always, a), b)));

  // file: /opt/hostedtoolcache/node/14.16.1/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Monad.mad

  window.Monad = {};
  __once__(() => __curry__((b, a) => Monad_b131.chain(__curry__((_) => b), a)));

  // file: /opt/hostedtoolcache/node/14.16.1/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Maybe.mad

  let Just = __curry__((a) => ({ __constructor: "Just", __args: [ a ] }));
  let Nothing = ({ __constructor: "Nothing", __args: [  ] });
  Functor['Maybe'] = {};
  Functor['Maybe']['map'] = __curry__((f, __x__) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let x = __x__.__args[0];
      return Just(f(x));
    }
    else if (__x__.__constructor === "Nothing") {
      return Nothing;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  Applicative['Maybe'] = {};
  Applicative['Maybe']['ap'] = __curry__((mf, mx) => ((__x__) => {
    if (__x__.length === 2 && __x__[0].__constructor === "Just" && true && __x__[1].__constructor === "Just" && true) {
      let [{ __args: [f]},{ __args: [x]}] = __x__;
      return Applicative.Maybe.pure(f(x));
    }
    else {
      return Nothing;
    }
  })(([mf, mx])));
  Applicative['Maybe']['pure'] = Just;
  Monad['Maybe'] = {};
  Monad['Maybe']['chain'] = __curry__((f, m) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let x = __x__.__args[0];
      return f(x);
    }
    else if (__x__.__constructor === "Nothing") {
      return Nothing;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(m));
  Monad['Maybe']['of'] = Applicative.Maybe.pure;
  Show['Maybe'] = {};
  let __ShowMaybeshow = __once__(() => __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let a = __x__.__args[0];
      return "Just " + Show_c210.show(a);
    }
    else if (__x__.__constructor === "Nothing") {
      return "Nothing";
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(__x__)));
  Show['Maybe']['show'] = (Show_c210) => {
    window.Show_c210 = Show_c210;
    return __ShowMaybeshow();
  };
  let fromMaybe = __curry__((or, __x__) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let a = __x__.__args[0];
      return a;
    }
    else if (__x__.__constructor === "Nothing") {
      return or;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      return true;
    }
    else if (__x__.__constructor === "Nothing") {
      return false;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));

  // file: /opt/hostedtoolcache/node/14.16.1/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Read.mad

  window.Read = {};

  // file: /opt/hostedtoolcache/node/14.16.1/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Number.mad

  Show['Number'] = {};
  Show['Number']['show'] = __curry__((x) => new Number(x).toString());
  Read['Number'] = {};
  Read['Number']['read'] = __curry__((x) => {
      const result = parseFloat(x);
      return isNaN(result) ? Nothing : Just(result)
    });
  __curry__((str) => {
    const n = parseFloat(str);
    return isNaN(n) ? Nothing : Just(n)
  });
  __curry__((a, x) => {
    const n = x.toFixed(a);
    return isNaN(n) ? "0" : n
  });
  __curry__((a, b) => {
    const out = [];
    let x = a;
    while (x < b) {
      out.push(x);
      x += 1;
    }
    return out
  });

  // file: /opt/hostedtoolcache/node/14.16.1/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Semigroup.mad
  window.Semigroup = {};

  // file: /opt/hostedtoolcache/node/14.16.1/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Monoid.mad

  window.Monoid = {};

  // file: /opt/hostedtoolcache/node/14.16.1/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/String.mad

  Semigroup['String'] = {};
  Semigroup['String']['assoc'] = __curry__((a, b) => a + b);
  Monoid['String'] = {};
  Monoid['String']['mappend'] = __curry__((a, b) => a + b);
  Monoid['String']['mempty'] = "";
  Show['String'] = {};
  Show['String']['show'] = __curry__((a) => a);
  __curry__((regex, replacing, input) => input.replace(new RegExp(regex), replacing));
  let split = __curry__((separator, str) => str.split(separator));
  let lines = split("\n");
  __curry__((f, s) => s.split("").map(f).join(""));
  __curry__((s) => !s);
  let nthChar = __curry__((n, s) => {
    const c = s[n];
    return !!c ? Just(c) : Nothing
  });
  nthChar(0);
  __curry__((n, s) => s.substr(n));
  __curry__((s) => {
    if (s.length !== 1) {
      return false
    }

    return RegExp(/^\p{L}/,'u').test(s)
  });
  let len$2 = __curry__((s) => s.length);
  __curry__((s) => (!__eq__(len$2(s), 1) ? false : __eq__(s, "0") || __eq__(s, "1") || __eq__(s, "2") || __eq__(s, "3") || __eq__(s, "4") || __eq__(s, "5") || __eq__(s, "6") || __eq__(s, "7") || __eq__(s, "8") || __eq__(s, "9")));

  // file: /opt/hostedtoolcache/node/14.16.1/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Compare.mad
  window.Comparable = {};
  Comparable['Number'] = {};
  Comparable['Number']['compare'] = __curry__((a, b) => (a > b ? MORE : (__eq__(a, b) ? EQUAL : LESS)));
  Comparable['String'] = {};
  Comparable['String']['compare'] = __curry__((a, b) => a > b ? MORE : a == b ? EQUAL : LESS);
  Comparable['Boolean'] = {};
  Comparable['Boolean']['compare'] = __curry__((a, b) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] === true && __x__[1] === false) {
      return MORE;
    }
    else if (__x__.length === 2 && __x__[0] === false && __x__[1] === true) {
      return LESS;
    }
    else {
      return EQUAL;
    }
  })(([a, b])));
  let MORE = 1;
  let LESS = -1;
  let EQUAL = 1;

  // file: /opt/hostedtoolcache/node/14.16.1/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/List.mad

  Functor['List'] = {};
  Functor['List']['map'] = __curry__((f, xs) => xs.map((x) => f(x)));
  Applicative['List'] = {};
  Applicative['List']['ap'] = __curry__((mf, ma) => __curry__((_P_) => flatten(Functor.List.map(__curry__((f) => Functor.List.map(f, ma)))(_P_)))(mf));
  Applicative['List']['pure'] = __curry__((x) => ([x]));
  Monad['List'] = {};
  Monad['List']['chain'] = __curry__((f, xs) => __curry__((_P_) => flatten(Functor.List.map(f)(_P_)))(xs));
  Monad['List']['of'] = Applicative.List.pure;
  Semigroup['List'] = {};
  Semigroup['List']['assoc'] = __curry__((xs1, xs2) => xs1.concat(xs2));
  Monoid['List'] = {};
  Monoid['List']['mappend'] = Semigroup.List.assoc;
  Monoid['List']['mempty'] = ([]);
  Show['List'] = {};
  let __ShowListshow = __once__(() => __curry__((_P_) => __curry__((x) => `[${x}]`)(reduceL(Monoid.String.mappend, "")(intercalate(", ")(Functor.List.map(Show_a468.show)(_P_))))));
  Show['List']['show'] = (Show_a468) => {
    window.Show_a468 = Show_a468;
    return __ShowListshow();
  };
  let singleton = Applicative.List.pure;
  let unlines = __curry__((_P_) => reduce(Monoid.String.mappend, "")(intercalate("\n")(_P_)));
  let intercalate = __curry__((a, xs) => ((__x__) => {
    if (__x__.length === 0) {
      return ([]);
    }
    else if (__x__.length === 1 && true) {
      let [one] = __x__;
      return ([one]);
    }
    else if (__x__.length === 2 && true && true) {
      let [one,two] = __x__;
      return ([one, a, two]);
    }
    else if (__x__.length >= 2 && true && true) {
      let [one,...rest] = __x__;
      return ([one, a,  ...intercalate(a, rest)]);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(xs));
  let join = (Show_p509) => (Show_o508) => {
    window.Show_o508 = Show_o508;
    window.Show_p509 = Show_p509;

    return join__ND__()
  };
  let join__ND__ = __once__(() => __curry__((a, xs) => __curry__((_P_) => reduce(Monoid.String.mappend, "")(intercalate(Show_o508.show(a))(Functor.List.map(Show_p509.show)(_P_))))(xs)));
  let mapWithIndex = __curry__((f, xs) => xs.map(f));
  let concat = __curry__((xs1, xs2) => xs1.concat(xs2));
  let append = __curry__((v, xs) => [...xs, v]);
  let last = __curry__((xs) => {
    const item = xs.slice(-1)[0];
    return item ? Just(item) : Nothing;
  });
  let first = __curry__((xs) => {
    const item = xs[0];
    return item ? Just(item) : Nothing;
  });
  let init$1 = __curry__((xs) => xs.slice(0, -1));
  let tail = __curry__((xs) => xs.slice(1));
  let nth = __curry__((i, xs) => {
    const x = xs[i];
    return x === undefined
      ? Nothing
      : Just(x);
  });
  let reduceR = __curry__((f, initial, xs) => xs.reduceRight(f, initial));
  let reduceL = __curry__((f, initial, xs) => xs.reduce(f, initial));
  let reduce = reduceL;
  let filter = __curry__((predicate, xs) => xs.filter(predicate));
  let reject = __curry__((predicate, xs) => xs.filter(Fun.complement(predicate)));
  let find = __curry__((predicate, xs) => {
    const found = xs.find(predicate);
    if (found === undefined) {
      return Nothing
    }
    else {
      return Just(found)
    }
  });
  let len$1 = __curry__((xs) => xs.length);
  let slice = __curry__((start, end, xs) => xs.slice(start, end));
  let isEmpty = __curry__((xs) => __eq__(len$1(xs), 0));
  let uniqueBy = __curry__((f) => reduce(__curry__((result, elem) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      return result;
    }
    else if (__x__.__constructor === "Nothing") {
      return ([ ...result, elem]);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(find(f(elem), result))), ([])));
  let sortBy = __curry__((fn, xs) => xs.sort(fn));
  let sort$1 = (Comparable_e654) => {
    window.Comparable_e654 = Comparable_e654;

    return sort__ND__()
  };
  let sort__ND__ = __once__(() => sortBy(Comparable_e654.compare));
  let sortAsc = (Comparable_j659) => {
    window.Comparable_j659 = Comparable_j659;

    return sortAsc__ND__()
  };
  let sortAsc__ND__ = __once__(() => sort$1(Comparable_j659));
  let sortDesc = (Comparable_m662) => {
    window.Comparable_m662 = Comparable_m662;

    return sortDesc__ND__()
  };
  let sortDesc__ND__ = __once__(() => sortBy(__curry__((a, b) => Comparable_m662.compare(a, b) * -1)));
  let flatten = reduceL(concat, ([]));
  let zip = __curry__((as, bs) => ((__x__) => {
    if (__x__.length === 2 && __x__[0].length >= 2 && true && true && __x__[1].length >= 2 && true && true) {
      let [[a, ...aa],[b, ...bb]] = __x__;
      return Monoid.List.mappend(([([a, b])]), zip(aa, bb));
    }
    else if (__x__.length === 2 && __x__[0].length === 1 && true && __x__[1].length === 1 && true) {
      let [[a],[b]] = __x__;
      return ([([a, b])]);
    }
    else if (__x__.length === 2 && __x__[0].length === 0 && __x__[1].length === 0) {
      return ([]);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(([as, bs])));
  let includes = __curry__((x, xs) => xs.includes(x));
  let drop = __curry__((amount, xs) => slice(amount, len$1(xs) - amount - 1, xs));
  let dropLast = __curry__((amount, xs) => slice(0, len$1(xs) - amount - 1, xs));
  let dropWhile = __curry__((pred, xs) => {
    const n = xs.length;
    let i = 0;

    for (; i < n; i++) {
        if (!pred(xs[i])) {
            break
        }
    }

    return xs.slice(i)
  });
  var L = { singleton, unlines, intercalate, join, mapWithIndex, concat, append, last, first, init: init$1, tail, nth, reduceR, reduceL, reduce, filter, reject, find, len: len$1, slice, isEmpty, uniqueBy, sortBy, sort: sort$1, sortAsc, sortDesc, flatten, zip, includes, drop, dropLast, dropWhile };

  // file: /opt/hostedtoolcache/node/14.16.1/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Wish.mad

  let Wish = __curry__((a) => ({ __constructor: "Wish", __args: [ a ] }));
  Functor['Wish'] = {};
  Functor['Wish']['map'] = __curry__((f, m) => Wish(__curry__((badCB, goodCB) => ((__x__) => {
    if (__x__.__constructor === "Wish" && true) {
      let run = __x__.__args[0];
      return run(badCB, __curry__((x) => goodCB(f(x))));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(m))));
  Applicative['Wish'] = {};
  Applicative['Wish']['ap'] = __curry__((mf, m) => Wish(__curry__((badCB, goodCB) => ((__x__) => {
    if (__x__.length === 2 && __x__[0].__constructor === "Wish" && true && __x__[1].__constructor === "Wish" && true) {
      let [{ __args: [runMF]},{ __args: [runM]}] = __x__;
      return runM(badCB, __curry__((x) => runMF(badCB, __curry__((f) => goodCB(f(x))))));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(([mf, m])))));
  Applicative['Wish']['pure'] = __curry__((a) => Wish(__curry__((_, goodCB) => goodCB(a))));
  Monad['Wish'] = {};
  Monad['Wish']['chain'] = __curry__((f, m) => Wish(__curry__((badCB, goodCB) => ((__x__) => {
    if (__x__.__constructor === "Wish" && true) {
      let run = __x__.__args[0];
      return run(badCB, __curry__((x) => ((__x__) => {
    if (__x__.__constructor === "Wish" && true) {
      let r = __x__.__args[0];
      return r(badCB, goodCB);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(f(x))));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(m))));
  Monad['Wish']['of'] = Applicative.Wish.pure;
  __curry__((f, m) => Wish(__curry__((badCB, goodCB) => ((__x__) => {
    if (__x__.__constructor === "Wish" && true) {
      let run = __x__.__args[0];
      return run(__curry__((x) => badCB(f(x))), goodCB);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(m))));
  __curry__((f, m) => Wish(__curry__((badCB, goodCB) => ((__x__) => {
    if (__x__.__constructor === "Wish" && true) {
      let run = __x__.__args[0];
      return run(__curry__((x) => ((__x__) => {
    if (__x__.__constructor === "Wish" && true) {
      let r = __x__.__args[0];
      return r(badCB, goodCB);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(f(x))), goodCB);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(m))));
  __curry__((a) => Wish(__curry__((_, goodCB) => goodCB(a))));
  __curry__((e) => Wish(__curry__((badCB, _) => badCB(e))));
  let getWishFn = __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "Wish" && true) {
      let run = __x__.__args[0];
      return run;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  __curry__((wishes) => Wish(__curry__((badCB, goodCB) => {
      const l = wishes.length;
      let ko = false;
      let ok = 0;
      const out = new Array(l);
      const next = j => (j === l && goodCB(out));
      const fork = (w, j) => (getWishFn(w)(
        e => ko || (badCB(e), ko = true),
        x => ko || (out[j] = x, next(++ok))
      ));
      wishes.forEach(fork);

      if (l === 0) {
        goodCB([]);
      }
    })));
  let fulfill = __curry__((badCB, goodCB, m) => {
      ((__x__) => {
    if (__x__.__constructor === "Wish" && true) {
      let run = __x__.__args[0];
      return setTimeout(() => run(badCB, goodCB), 0);  }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(m);
      return ({ __constructor: "Unit", __args: [] });
  });
  __curry__((time, a) => Wish(__curry__((_, goodCB) => {
    setTimeout(() => goodCB(a), time);
  })));

  // file: /opt/hostedtoolcache/node/14.16.1/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Tuple.mad

  Show['Tuple_2'] = {};
  let __ShowTuple_2show = __once__(() => __curry__((__x__) => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [a,b] = __x__;
      return "<" + Show_g1020.show(a) + ", " + Show_h1021.show(b) + ">";
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(__x__)));
  Show['Tuple_2']['show'] = (Show_h1021) => (Show_g1020) => {
    window.Show_g1020 = Show_g1020;
    window.Show_h1021 = Show_h1021;
    return __ShowTuple_2show();
  };
  Show['Tuple_3'] = {};
  let __ShowTuple_3show = __once__(() => __curry__((__x__) => ((__x__) => {
    if (__x__.length === 3 && true && true && true) {
      let [a,b,c] = __x__;
      return "<" + Show_z1039.show(a) + ", " + Show_a1040.show(b) + ", " + Show_b1041.show(c) + ">";
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(__x__)));
  Show['Tuple_3']['show'] = (Show_b1041) => (Show_a1040) => (Show_z1039) => {
    window.Show_z1039 = Show_z1039;
    window.Show_a1040 = Show_a1040;
    window.Show_b1041 = Show_b1041;
    return __ShowTuple_3show();
  };
  Show['Tuple_4'] = {};
  let __ShowTuple_4show = __once__(() => __curry__((__x__) => ((__x__) => {
    if (__x__.length === 4 && true && true && true && true) {
      let [a,b,c,d] = __x__;
      return "<" + Show_a1066.show(a) + ", " + Show_b1067.show(b) + ", " + Show_c1068.show(c) + ", " + Show_d1069.show(d) + ">";
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(__x__)));
  Show['Tuple_4']['show'] = (Show_d1069) => (Show_c1068) => (Show_b1067) => (Show_a1066) => {
    window.Show_a1066 = Show_a1066;
    window.Show_b1067 = Show_b1067;
    window.Show_c1068 = Show_c1068;
    window.Show_d1069 = Show_d1069;
    return __ShowTuple_4show();
  };
  let fst = __curry__((tuple) => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [a,] = __x__;
      return a;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(tuple));
  let snd = __curry__((tuple) => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [,b] = __x__;
      return b;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(tuple));
  var T = { fst, snd };

  // file: /opt/hostedtoolcache/node/14.16.1/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/IO.mad
  __curry__((a) => { console.log(a); return a; });
  __curry__((v, a) => { console.log(v, a); return a; });
  __curry__((e) => { console.log(e); return e; });
  __curry__((w) => { console.warn(w); return w; });
  __curry__((a) => { console.log(util__default['default'].inspect(a, {showHidden: false, depth: null})); return a; });
  const stringify = (x) => {
    if (typeof x === "object") {
      if (Array.isArray(x)) {
        const items = x.map(stringify).reduce((acc, xx) => acc + ",\n    " + xx);
        return items.length < 80
          ? `[${items.replace("\n    ", " ")}]`
          : `[\n    ${items}\n]`
      }
      else {
        if (x.__constructor) {
          return x.__constructor + " " + x.__args.map(stringify).reduce((acc, xx) => acc + " " + xx, "")
        }
        else {
          const items = Object
            .keys(x)
            .map((k) => k + ": " + x[k])
            .reduce((acc, xx) => acc + ",\n    " + xx, "");

          return `{\n  ${items}\n}`
        }
      }
    } else return JSON.stringify(x)
  };
  __curry__((a) => {
    console.log(stringify(a));
    return a
  });
  __curry__((rows, a) => {
    const xSpaces = x => new Array(x).fill(' ').join('');

    const longestId = rows.map(x => x.id.length).reduce((a, b) => Math.max(a, b), 0);

    const readyRows = rows
      .map(x => ({ ...x, id: x.id + xSpaces(longestId - x.id.length) }))
      .reduce((rows, row) => {
        return {
          ...rows,
          [row.id]: row.cols.reduce((o, [colName, colValue]) => { o[colName] = colValue; return o; }, {})
        }
      }, {});
    console.table(readyRows);
    return a
  });

  // file: /opt/hostedtoolcache/node/14.16.1/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Either.mad

  let Left = __curry__((a) => ({ __constructor: "Left", __args: [ a ] }));
  let Right = __curry__((a) => ({ __constructor: "Right", __args: [ a ] }));
  Functor['Either'] = {};
  Functor['Either']['map'] = __curry__((f, __x__) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return Right(f(a));
    }
    else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return Left(e);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  Applicative['Either'] = {};
  Applicative['Either']['ap'] = __curry__((mf, m) => ((__x__) => {
    if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return Left(e);
    }
    else if (__x__.__constructor === "Right" && true) {
      let f = __x__.__args[0];
      return Functor.Either.map(f, m);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(mf));
  Applicative['Either']['pure'] = Right;
  Monad['Either'] = {};
  Monad['Either']['chain'] = __curry__((f, __x__) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return f(a);
    }
    else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return Left(e);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  Monad['Either']['of'] = Applicative.Either.pure;
  Show['Either'] = {};
  let __ShowEithershow = __once__(() => __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return "Right " + Show_q1238.show(a);
    }
    else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return "Left " + Show_t1241.show(e);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(__x__)));
  Show['Either']['show'] = (Show_q1238) => (Show_t1241) => {
    window.Show_t1241 = Show_t1241;
    window.Show_q1238 = Show_q1238;
    return __ShowEithershow();
  };
  let mapRight = Functor.Either.map;
  __curry__((f, m) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return Right(a);
    }
    else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return Left(f(e));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(m));
  let isLeft = __curry__((either) => ((__x__) => {
    if (__x__.__constructor === "Left" && true) {
      return true;
    }
    else {
      return false;
    }
  })(either));
  __curry__((either) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      return true;
    }
    else {
      return false;
    }
  })(either));
  let fromRight = __curry__((a, either) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let x = __x__.__args[0];
      return x;
    }
    else {
      return a;
    }
  })(either));

  // file: /opt/hostedtoolcache/node/14.16.1/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Dictionary.mad

  let Dictionary = __curry__((a) => ({ __constructor: "Dictionary", __args: [ a ] }));
  Functor['Dictionary'] = {};
  Functor['Dictionary']['map'] = __curry__((fn, __x__) => ((__x__) => {
    if (__x__.__constructor === "Dictionary" && true) {
      let items = __x__.__args[0];
      return fromList(Functor.List.map(__curry__((i) => ([T.fst(i), fn(T.snd(i))])), items));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  let fromList = __curry__((_P_) => Dictionary(L.uniqueBy(__curry__((a, b) => __eq__(T.fst(a), T.fst(b))))(_P_)));
  let empty = fromList(([]));
  let insert = __curry__((k, v, m) => ((__x__) => {
    if (__x__.__constructor === "Dictionary" && true) {
      let items = __x__.__args[0];
      return Dictionary(L.append(([k, v]))(L.reject(__curry__((item) => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [kk,] = __x__;
      return __eq__(kk, k);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(item)), items)));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(m));
  let get = __curry__((k, __x__) => ((__x__) => {
    if (__x__.__constructor === "Dictionary" && true) {
      let items = __x__.__args[0];
      return __curry__((_P_) => Functor.Maybe.map(T.snd)(L.find(__curry__((item) => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [kk,] = __x__;
      return __eq__(k, kk);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(item)))(_P_)))(items);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  let keys = __curry__((m) => ((__x__) => {
    if (__x__.__constructor === "Dictionary" && true) {
      let items = __x__.__args[0];
      return Functor.List.map(T.fst, items);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(m));
  let values = __curry__((m) => ((__x__) => {
    if (__x__.__constructor === "Dictionary" && true) {
      let items = __x__.__args[0];
      return Functor.List.map(T.snd, items);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(m));
  let len = __curry__((m) => L.len(keys(m)));
  let mapWithKey = __curry__((fn, __x__) => ((__x__) => {
    if (__x__.__constructor === "Dictionary" && true) {
      let items = __x__.__args[0];
      return fromList(Functor.List.map(__curry__((i) => ([T.fst(i), fn(T.fst(i), T.snd(i))])), items));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  let merge = __curry__((a, b) => ((__x__) => {
    if (__x__.length === 2 && __x__[0].__constructor === "Dictionary" && true && __x__[1].__constructor === "Dictionary" && true) {
      let [{ __args: [itemsA]},{ __args: [itemsB]}] = __x__;
      return fromList(L.concat(itemsA, itemsB));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(([a, b])));
  var D = { fromList, empty, insert, get, keys, values, len, mapWithKey, merge, Dictionary };

  // file: /opt/hostedtoolcache/node/14.16.1/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Json.mad

  let string = __curry__((input) => typeof input === "string"
      ? Right(input)
      : Left(`${input} is not a string`));
  let number = __curry__((input) => typeof input === "number"
      ? Right(input)
      : Left(`${input} is not a number`));
  let boolean = __curry__((input) => typeof input === "boolean"
      ? Right(input)
      : Left(`${input} is not a boolean`));
  let dict = __curry__((parser, input) => {
    try {
      const keys = Object.keys(input);
      let result = D.empty;
      keys.forEach((k) => {
        const parsed = parser(input[k]);
        if (isLeft(parsed)) {
          throw parsed;
        } else {
          result = D.insert(k, fromRight("", parsed), result);
        }
      });

      return Right(result);
    } catch(e) {
      return Left("Mapping failed!");
    }
  });
  let list = __curry__((parser, input) => {
    try {
      let result = [];
      input.forEach((a) => {
        const parsed = parser(a);
        if (isLeft(parsed)) {
          throw parsed;
        } else {
          result.push(fromRight("", parsed));
        }
      });
      return Right(result);
    } catch(e) {
      return Left("Mapping failed!");
    }
  });
  let map1 = __curry__((fn, parser, input) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return Right(fn(a));
    }
    else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return Left(e);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(parser(input)));
  let map2 = __curry__((fn, parserA, parserB, input) => ((__x__) => {
    if (__x__.length === 2 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]}] = __x__;
      return Right(fn(a, b));
    }
    else if (__x__.length === 2 && __x__[0].__constructor === "Left" && true && true) {
      let [{ __args: [e]},] = __x__;
      return Left(e);
    }
    else if (__x__.length === 2 && true && __x__[1].__constructor === "Left" && true) {
      let [,{ __args: [e]}] = __x__;
      return Left(e);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input)])));
  let map3 = __curry__((fn, parserA, parserB, parserC, input) => ((__x__) => {
    if (__x__.length === 3 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]},{ __args: [c]}] = __x__;
      return Right(fn(a, b, c));
    }
    else if (__x__.length === 3 && __x__[0].__constructor === "Left" && true && true && true) {
      let [{ __args: [e]},,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 3 && true && __x__[1].__constructor === "Left" && true && true) {
      let [,{ __args: [e]},] = __x__;
      return Left(e);
    }
    else if (__x__.length === 3 && true && true && __x__[2].__constructor === "Left" && true) {
      let [,,{ __args: [e]}] = __x__;
      return Left(e);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input), parserC(input)])));
  let map4 = __curry__((fn, parserA, parserB, parserC, parserD, input) => ((__x__) => {
    if (__x__.length === 4 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]},{ __args: [c]},{ __args: [d]}] = __x__;
      return Right(fn(a, b, c, d));
    }
    else if (__x__.length === 4 && __x__[0].__constructor === "Left" && true && true && true && true) {
      let [{ __args: [e]},,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 4 && true && __x__[1].__constructor === "Left" && true && true && true) {
      let [,{ __args: [e]},,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 4 && true && true && __x__[2].__constructor === "Left" && true && true) {
      let [,,{ __args: [e]},] = __x__;
      return Left(e);
    }
    else if (__x__.length === 4 && true && true && true && __x__[3].__constructor === "Left" && true) {
      let [,,,{ __args: [e]}] = __x__;
      return Left(e);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input), parserC(input), parserD(input)])));
  let map5 = __curry__((fn, parserA, parserB, parserC, parserD, parserE, input) => ((__x__) => {
    if (__x__.length === 5 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true && __x__[4].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]},{ __args: [c]},{ __args: [d]},{ __args: [e]}] = __x__;
      return Right(fn(a, b, c, d, e));
    }
    else if (__x__.length === 5 && __x__[0].__constructor === "Left" && true && true && true && true && true) {
      let [{ __args: [e]},,,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 5 && true && __x__[1].__constructor === "Left" && true && true && true && true) {
      let [,{ __args: [e]},,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 5 && true && true && __x__[2].__constructor === "Left" && true && true && true) {
      let [,,{ __args: [e]},,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 5 && true && true && true && __x__[3].__constructor === "Left" && true && true) {
      let [,,,{ __args: [e]},] = __x__;
      return Left(e);
    }
    else if (__x__.length === 5 && true && true && true && true && __x__[4].__constructor === "Left" && true) {
      let [,,,,{ __args: [e]}] = __x__;
      return Left(e);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input), parserC(input), parserD(input), parserE(input)])));
  let map6 = __curry__((fn, parserA, parserB, parserC, parserD, parserE, parserF, input) => ((__x__) => {
    if (__x__.length === 6 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true && __x__[4].__constructor === "Right" && true && __x__[5].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]},{ __args: [c]},{ __args: [d]},{ __args: [e]},{ __args: [f]}] = __x__;
      return Right(fn(a, b, c, d, e, f));
    }
    else if (__x__.length === 6 && __x__[0].__constructor === "Left" && true && true && true && true && true && true) {
      let [{ __args: [e]},,,,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 6 && true && __x__[1].__constructor === "Left" && true && true && true && true && true) {
      let [,{ __args: [e]},,,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 6 && true && true && __x__[2].__constructor === "Left" && true && true && true && true) {
      let [,,{ __args: [e]},,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 6 && true && true && true && __x__[3].__constructor === "Left" && true && true && true) {
      let [,,,{ __args: [e]},,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 6 && true && true && true && true && __x__[4].__constructor === "Left" && true && true) {
      let [,,,,{ __args: [e]},] = __x__;
      return Left(e);
    }
    else if (__x__.length === 6 && true && true && true && true && true && __x__[5].__constructor === "Left" && true) {
      let [,,,,,{ __args: [e]}] = __x__;
      return Left(e);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input), parserC(input), parserD(input), parserE(input), parserF(input)])));
  let map7 = __curry__((fn, parserA, parserB, parserC, parserD, parserE, parserF, parserG, input) => ((__x__) => {
    if (__x__.length === 7 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true && __x__[4].__constructor === "Right" && true && __x__[5].__constructor === "Right" && true && __x__[6].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]},{ __args: [c]},{ __args: [d]},{ __args: [e]},{ __args: [f]},{ __args: [g]}] = __x__;
      return Right(fn(a, b, c, d, e, f, g));
    }
    else if (__x__.length === 7 && __x__[0].__constructor === "Left" && true && true && true && true && true && true && true) {
      let [{ __args: [e]},,,,,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 7 && true && __x__[1].__constructor === "Left" && true && true && true && true && true && true) {
      let [,{ __args: [e]},,,,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 7 && true && true && __x__[2].__constructor === "Left" && true && true && true && true && true) {
      let [,,{ __args: [e]},,,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 7 && true && true && true && __x__[3].__constructor === "Left" && true && true && true && true) {
      let [,,,{ __args: [e]},,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 7 && true && true && true && true && __x__[4].__constructor === "Left" && true && true && true) {
      let [,,,,{ __args: [e]},,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 7 && true && true && true && true && true && __x__[5].__constructor === "Left" && true && true) {
      let [,,,,,{ __args: [e]},] = __x__;
      return Left(e);
    }
    else if (__x__.length === 7 && true && true && true && true && true && true && __x__[6].__constructor === "Left" && true) {
      let [,,,,,,{ __args: [e]}] = __x__;
      return Left(e);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input), parserC(input), parserD(input), parserE(input), parserF(input), parserG(input)])));
  let maybe = __curry__((parser, input) => {
    if (input) {
      let parsed = parser(input);
      if (isLeft(parsed)) {
        return Right(Nothing);
      }
      return mapRight(Just, parsed);
    } else {
      return Right(Nothing)
    }
  });
  let lazy = __curry__((wrapped, input) => wrapped(({ __constructor: "Unit", __args: [] }), input));
  let field = __curry__((fieldName, parser, input) => parser(input[fieldName]));
  let parse = __curry__((parser, input) => {
    try {
      return parser(JSON.parse(input))
    } catch(e) {
      console.log(e);
      return Left("Parsing error!\nInvalid input you might have called parse on an already parsed input or the given JSON is invalid.")
    }
  });
  var J = { string, number, boolean, dict, list, map1, map2, map3, map4, map5, map6, map7, maybe, lazy, field, parse };

  function vnode(sel, data, children, text, elm) {
      const key = data === undefined ? undefined : data.key;
      return { sel, data, children, text, elm, key };
  }

  const array = Array.isArray;
  function primitive(s) {
      return typeof s === 'string' || typeof s === 'number';
  }

  function createElement(tagName) {
      return document.createElement(tagName);
  }
  function createElementNS(namespaceURI, qualifiedName) {
      return document.createElementNS(namespaceURI, qualifiedName);
  }
  function createTextNode(text) {
      return document.createTextNode(text);
  }
  function createComment(text) {
      return document.createComment(text);
  }
  function insertBefore(parentNode, newNode, referenceNode) {
      parentNode.insertBefore(newNode, referenceNode);
  }
  function removeChild(node, child) {
      node.removeChild(child);
  }
  function appendChild(node, child) {
      node.appendChild(child);
  }
  function parentNode(node) {
      return node.parentNode;
  }
  function nextSibling(node) {
      return node.nextSibling;
  }
  function tagName(elm) {
      return elm.tagName;
  }
  function setTextContent(node, text) {
      node.textContent = text;
  }
  function getTextContent(node) {
      return node.textContent;
  }
  function isElement(node) {
      return node.nodeType === 1;
  }
  function isText(node) {
      return node.nodeType === 3;
  }
  function isComment(node) {
      return node.nodeType === 8;
  }
  const htmlDomApi = {
      createElement,
      createElementNS,
      createTextNode,
      createComment,
      insertBefore,
      removeChild,
      appendChild,
      parentNode,
      nextSibling,
      tagName,
      setTextContent,
      getTextContent,
      isElement,
      isText,
      isComment,
  };

  function isUndef(s) {
      return s === undefined;
  }
  function isDef(s) {
      return s !== undefined;
  }
  const emptyNode = vnode('', {}, [], undefined, undefined);
  function sameVnode(vnode1, vnode2) {
      return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
  }
  function isVnode(vnode) {
      return vnode.sel !== undefined;
  }
  function createKeyToOldIdx(children, beginIdx, endIdx) {
      var _a;
      const map = {};
      for (let i = beginIdx; i <= endIdx; ++i) {
          const key = (_a = children[i]) === null || _a === void 0 ? void 0 : _a.key;
          if (key !== undefined) {
              map[key] = i;
          }
      }
      return map;
  }
  const hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
  function init(modules, domApi) {
      let i;
      let j;
      const cbs = {
          create: [],
          update: [],
          remove: [],
          destroy: [],
          pre: [],
          post: []
      };
      const api = domApi !== undefined ? domApi : htmlDomApi;
      for (i = 0; i < hooks.length; ++i) {
          cbs[hooks[i]] = [];
          for (j = 0; j < modules.length; ++j) {
              const hook = modules[j][hooks[i]];
              if (hook !== undefined) {
                  cbs[hooks[i]].push(hook);
              }
          }
      }
      function emptyNodeAt(elm) {
          const id = elm.id ? '#' + elm.id : '';
          const c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
          return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
      }
      function createRmCb(childElm, listeners) {
          return function rmCb() {
              if (--listeners === 0) {
                  const parent = api.parentNode(childElm);
                  api.removeChild(parent, childElm);
              }
          };
      }
      function createElm(vnode, insertedVnodeQueue) {
          var _a, _b;
          let i;
          let data = vnode.data;
          if (data !== undefined) {
              const init = (_a = data.hook) === null || _a === void 0 ? void 0 : _a.init;
              if (isDef(init)) {
                  init(vnode);
                  data = vnode.data;
              }
          }
          const children = vnode.children;
          const sel = vnode.sel;
          if (sel === '!') {
              if (isUndef(vnode.text)) {
                  vnode.text = '';
              }
              vnode.elm = api.createComment(vnode.text);
          }
          else if (sel !== undefined) {
              // Parse selector
              const hashIdx = sel.indexOf('#');
              const dotIdx = sel.indexOf('.', hashIdx);
              const hash = hashIdx > 0 ? hashIdx : sel.length;
              const dot = dotIdx > 0 ? dotIdx : sel.length;
              const tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
              const elm = vnode.elm = isDef(data) && isDef(i = data.ns)
                  ? api.createElementNS(i, tag)
                  : api.createElement(tag);
              if (hash < dot)
                  elm.setAttribute('id', sel.slice(hash + 1, dot));
              if (dotIdx > 0)
                  elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '));
              for (i = 0; i < cbs.create.length; ++i)
                  cbs.create[i](emptyNode, vnode);
              if (array(children)) {
                  for (i = 0; i < children.length; ++i) {
                      const ch = children[i];
                      if (ch != null) {
                          api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                      }
                  }
              }
              else if (primitive(vnode.text)) {
                  api.appendChild(elm, api.createTextNode(vnode.text));
              }
              const hook = vnode.data.hook;
              if (isDef(hook)) {
                  (_b = hook.create) === null || _b === void 0 ? void 0 : _b.call(hook, emptyNode, vnode);
                  if (hook.insert) {
                      insertedVnodeQueue.push(vnode);
                  }
              }
          }
          else {
              vnode.elm = api.createTextNode(vnode.text);
          }
          return vnode.elm;
      }
      function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
          for (; startIdx <= endIdx; ++startIdx) {
              const ch = vnodes[startIdx];
              if (ch != null) {
                  api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
              }
          }
      }
      function invokeDestroyHook(vnode) {
          var _a, _b;
          const data = vnode.data;
          if (data !== undefined) {
              (_b = (_a = data === null || data === void 0 ? void 0 : data.hook) === null || _a === void 0 ? void 0 : _a.destroy) === null || _b === void 0 ? void 0 : _b.call(_a, vnode);
              for (let i = 0; i < cbs.destroy.length; ++i)
                  cbs.destroy[i](vnode);
              if (vnode.children !== undefined) {
                  for (let j = 0; j < vnode.children.length; ++j) {
                      const child = vnode.children[j];
                      if (child != null && typeof child !== 'string') {
                          invokeDestroyHook(child);
                      }
                  }
              }
          }
      }
      function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
          var _a, _b;
          for (; startIdx <= endIdx; ++startIdx) {
              let listeners;
              let rm;
              const ch = vnodes[startIdx];
              if (ch != null) {
                  if (isDef(ch.sel)) {
                      invokeDestroyHook(ch);
                      listeners = cbs.remove.length + 1;
                      rm = createRmCb(ch.elm, listeners);
                      for (let i = 0; i < cbs.remove.length; ++i)
                          cbs.remove[i](ch, rm);
                      const removeHook = (_b = (_a = ch === null || ch === void 0 ? void 0 : ch.data) === null || _a === void 0 ? void 0 : _a.hook) === null || _b === void 0 ? void 0 : _b.remove;
                      if (isDef(removeHook)) {
                          removeHook(ch, rm);
                      }
                      else {
                          rm();
                      }
                  }
                  else { // Text node
                      api.removeChild(parentElm, ch.elm);
                  }
              }
          }
      }
      function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
          let oldStartIdx = 0;
          let newStartIdx = 0;
          let oldEndIdx = oldCh.length - 1;
          let oldStartVnode = oldCh[0];
          let oldEndVnode = oldCh[oldEndIdx];
          let newEndIdx = newCh.length - 1;
          let newStartVnode = newCh[0];
          let newEndVnode = newCh[newEndIdx];
          let oldKeyToIdx;
          let idxInOld;
          let elmToMove;
          let before;
          while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
              if (oldStartVnode == null) {
                  oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
              }
              else if (oldEndVnode == null) {
                  oldEndVnode = oldCh[--oldEndIdx];
              }
              else if (newStartVnode == null) {
                  newStartVnode = newCh[++newStartIdx];
              }
              else if (newEndVnode == null) {
                  newEndVnode = newCh[--newEndIdx];
              }
              else if (sameVnode(oldStartVnode, newStartVnode)) {
                  patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                  oldStartVnode = oldCh[++oldStartIdx];
                  newStartVnode = newCh[++newStartIdx];
              }
              else if (sameVnode(oldEndVnode, newEndVnode)) {
                  patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                  oldEndVnode = oldCh[--oldEndIdx];
                  newEndVnode = newCh[--newEndIdx];
              }
              else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
                  patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                  api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                  oldStartVnode = oldCh[++oldStartIdx];
                  newEndVnode = newCh[--newEndIdx];
              }
              else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
                  patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                  api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                  oldEndVnode = oldCh[--oldEndIdx];
                  newStartVnode = newCh[++newStartIdx];
              }
              else {
                  if (oldKeyToIdx === undefined) {
                      oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                  }
                  idxInOld = oldKeyToIdx[newStartVnode.key];
                  if (isUndef(idxInOld)) { // New element
                      api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                  }
                  else {
                      elmToMove = oldCh[idxInOld];
                      if (elmToMove.sel !== newStartVnode.sel) {
                          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                      }
                      else {
                          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                          oldCh[idxInOld] = undefined;
                          api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                      }
                  }
                  newStartVnode = newCh[++newStartIdx];
              }
          }
          if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
              if (oldStartIdx > oldEndIdx) {
                  before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
                  addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
              }
              else {
                  removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
              }
          }
      }
      function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
          var _a, _b, _c, _d, _e;
          const hook = (_a = vnode.data) === null || _a === void 0 ? void 0 : _a.hook;
          (_b = hook === null || hook === void 0 ? void 0 : hook.prepatch) === null || _b === void 0 ? void 0 : _b.call(hook, oldVnode, vnode);
          const elm = vnode.elm = oldVnode.elm;
          const oldCh = oldVnode.children;
          const ch = vnode.children;
          if (oldVnode === vnode)
              return;
          if (vnode.data !== undefined) {
              for (let i = 0; i < cbs.update.length; ++i)
                  cbs.update[i](oldVnode, vnode);
              (_d = (_c = vnode.data.hook) === null || _c === void 0 ? void 0 : _c.update) === null || _d === void 0 ? void 0 : _d.call(_c, oldVnode, vnode);
          }
          if (isUndef(vnode.text)) {
              if (isDef(oldCh) && isDef(ch)) {
                  if (oldCh !== ch)
                      updateChildren(elm, oldCh, ch, insertedVnodeQueue);
              }
              else if (isDef(ch)) {
                  if (isDef(oldVnode.text))
                      api.setTextContent(elm, '');
                  addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
              }
              else if (isDef(oldCh)) {
                  removeVnodes(elm, oldCh, 0, oldCh.length - 1);
              }
              else if (isDef(oldVnode.text)) {
                  api.setTextContent(elm, '');
              }
          }
          else if (oldVnode.text !== vnode.text) {
              if (isDef(oldCh)) {
                  removeVnodes(elm, oldCh, 0, oldCh.length - 1);
              }
              api.setTextContent(elm, vnode.text);
          }
          (_e = hook === null || hook === void 0 ? void 0 : hook.postpatch) === null || _e === void 0 ? void 0 : _e.call(hook, oldVnode, vnode);
      }
      return function patch(oldVnode, vnode) {
          let i, elm, parent;
          const insertedVnodeQueue = [];
          for (i = 0; i < cbs.pre.length; ++i)
              cbs.pre[i]();
          if (!isVnode(oldVnode)) {
              oldVnode = emptyNodeAt(oldVnode);
          }
          if (sameVnode(oldVnode, vnode)) {
              patchVnode(oldVnode, vnode, insertedVnodeQueue);
          }
          else {
              elm = oldVnode.elm;
              parent = api.parentNode(elm);
              createElm(vnode, insertedVnodeQueue);
              if (parent !== null) {
                  api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
                  removeVnodes(parent, [oldVnode], 0, 0);
              }
          }
          for (i = 0; i < insertedVnodeQueue.length; ++i) {
              insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
          }
          for (i = 0; i < cbs.post.length; ++i)
              cbs.post[i]();
          return vnode;
      };
  }

  function addNS(data, children, sel) {
      data.ns = 'http://www.w3.org/2000/svg';
      if (sel !== 'foreignObject' && children !== undefined) {
          for (let i = 0; i < children.length; ++i) {
              const childData = children[i].data;
              if (childData !== undefined) {
                  addNS(childData, children[i].children, children[i].sel);
              }
          }
      }
  }
  function h(sel, b, c) {
      var data = {};
      var children;
      var text;
      var i;
      if (c !== undefined) {
          if (b !== null) {
              data = b;
          }
          if (array(c)) {
              children = c;
          }
          else if (primitive(c)) {
              text = c;
          }
          else if (c && c.sel) {
              children = [c];
          }
      }
      else if (b !== undefined && b !== null) {
          if (array(b)) {
              children = b;
          }
          else if (primitive(b)) {
              text = b;
          }
          else if (b && b.sel) {
              children = [b];
          }
          else {
              data = b;
          }
      }
      if (children !== undefined) {
          for (i = 0; i < children.length; ++i) {
              if (primitive(children[i]))
                  children[i] = vnode(undefined, undefined, undefined, children[i], undefined);
          }
      }
      if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
          (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
          addNS(data, children, sel);
      }
      return vnode(sel, data, children, text, undefined);
  }

  const xlinkNS = 'http://www.w3.org/1999/xlink';
  const xmlNS = 'http://www.w3.org/XML/1998/namespace';
  const colonChar = 58;
  const xChar = 120;
  function updateAttrs(oldVnode, vnode) {
      var key;
      var elm = vnode.elm;
      var oldAttrs = oldVnode.data.attrs;
      var attrs = vnode.data.attrs;
      if (!oldAttrs && !attrs)
          return;
      if (oldAttrs === attrs)
          return;
      oldAttrs = oldAttrs || {};
      attrs = attrs || {};
      // update modified attributes, add new attributes
      for (key in attrs) {
          const cur = attrs[key];
          const old = oldAttrs[key];
          if (old !== cur) {
              if (cur === true) {
                  elm.setAttribute(key, '');
              }
              else if (cur === false) {
                  elm.removeAttribute(key);
              }
              else {
                  if (key.charCodeAt(0) !== xChar) {
                      elm.setAttribute(key, cur);
                  }
                  else if (key.charCodeAt(3) === colonChar) {
                      // Assume xml namespace
                      elm.setAttributeNS(xmlNS, key, cur);
                  }
                  else if (key.charCodeAt(5) === colonChar) {
                      // Assume xlink namespace
                      elm.setAttributeNS(xlinkNS, key, cur);
                  }
                  else {
                      elm.setAttribute(key, cur);
                  }
              }
          }
      }
      // remove removed attributes
      // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
      // the other option is to remove all attributes with value == undefined
      for (key in oldAttrs) {
          if (!(key in attrs)) {
              elm.removeAttribute(key);
          }
      }
  }
  const attributesModule = { create: updateAttrs, update: updateAttrs };

  function updateProps(oldVnode, vnode) {
      var key;
      var cur;
      var old;
      var elm = vnode.elm;
      var oldProps = oldVnode.data.props;
      var props = vnode.data.props;
      if (!oldProps && !props)
          return;
      if (oldProps === props)
          return;
      oldProps = oldProps || {};
      props = props || {};
      for (key in props) {
          cur = props[key];
          old = oldProps[key];
          if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
              elm[key] = cur;
          }
      }
  }
  const propsModule = { create: updateProps, update: updateProps };

  function invokeHandler(handler, vnode, event) {
      if (typeof handler === 'function') {
          // call function handler
          handler.call(vnode, event, vnode);
      }
      else if (typeof handler === 'object') {
          // call multiple handlers
          for (var i = 0; i < handler.length; i++) {
              invokeHandler(handler[i], vnode, event);
          }
      }
  }
  function handleEvent(event, vnode) {
      var name = event.type;
      var on = vnode.data.on;
      // call event handler(s) if exists
      if (on && on[name]) {
          invokeHandler(on[name], vnode, event);
      }
  }
  function createListener() {
      return function handler(event) {
          handleEvent(event, handler.vnode);
      };
  }
  function updateEventListeners(oldVnode, vnode) {
      var oldOn = oldVnode.data.on;
      var oldListener = oldVnode.listener;
      var oldElm = oldVnode.elm;
      var on = vnode && vnode.data.on;
      var elm = (vnode && vnode.elm);
      var name;
      // optimization for reused immutable handlers
      if (oldOn === on) {
          return;
      }
      // remove existing listeners which no longer used
      if (oldOn && oldListener) {
          // if element changed or deleted we remove all existing listeners unconditionally
          if (!on) {
              for (name in oldOn) {
                  // remove listener if element was changed or existing listeners removed
                  oldElm.removeEventListener(name, oldListener, false);
              }
          }
          else {
              for (name in oldOn) {
                  // remove listener if existing listener removed
                  if (!on[name]) {
                      oldElm.removeEventListener(name, oldListener, false);
                  }
              }
          }
      }
      // add new listeners which has not already attached
      if (on) {
          // reuse existing listener or create new
          var listener = vnode.listener = oldVnode.listener || createListener();
          // update vnode for listener
          listener.vnode = vnode;
          // if element changed or added we add all needed listeners unconditionally
          if (!oldOn) {
              for (name in on) {
                  // add listener if element was changed or new listeners added
                  elm.addEventListener(name, listener, false);
              }
          }
          else {
              for (name in on) {
                  // add listener if new listener added
                  if (!oldOn[name]) {
                      elm.addEventListener(name, listener, false);
                  }
              }
          }
      }
  }
  const eventListenersModule = {
      create: updateEventListeners,
      update: updateEventListeners,
      destroy: updateEventListeners
  };

  // file: /home/runner/work/madparser/madparser/madlib_modules/https___github_com_madlib_lang_madui_archive_master_zip/src/Main.mad
  let KEY_ENTER = ({ __constructor: "KEY_ENTER", __args: [  ] });
  let KEY_BACKSPACE = ({ __constructor: "KEY_BACKSPACE", __args: [  ] });
  let KEY_ANY = ({ __constructor: "KEY_ANY", __args: [  ] });
  let AbstractEvent = __curry__((a) => ({ __constructor: "AbstractEvent", __args: [ a ] }));
  let ClickEvent = __curry__((a) => ({ __constructor: "ClickEvent", __args: [ a ] }));
  let InputEvent = __curry__((a) => ({ __constructor: "InputEvent", __args: [ a ] }));
  let KeyPressEvent = __curry__((a) => ({ __constructor: "KeyPressEvent", __args: [ a ] }));
  let UrlEvent = __curry__((a) => ({ __constructor: "UrlEvent", __args: [ a ] }));
  __curry__((a) => ({ __constructor: "AttributeId", __args: [ a ] }));
  let AttributeClass = __curry__((a) => ({ __constructor: "AttributeClass", __args: [ a ] }));
  __curry__((a) => ({ __constructor: "AttributeValue", __args: [ a ] }));
  let AttributePlaceholder = __curry__((a) => ({ __constructor: "AttributePlaceholder", __args: [ a ] }));
  let AttributeType = __curry__((a) => ({ __constructor: "AttributeType", __args: [ a ] }));
  __curry__((a) => ({ __constructor: "AttributeKey", __args: [ a ] }));
  __curry__((a) => ({ __constructor: "AttributeHref", __args: [ a ] }));
  __curry__((a) => ({ __constructor: "AttributeSrc", __args: [ a ] }));
  __curry__((a) => ({ __constructor: "AttributeTitle", __args: [ a ] }));
  __curry__((a) => ({ __constructor: "AttributeAlt", __args: [ a ] }));
  __curry__((a) => ({ __constructor: "AttributeTo", __args: [ a ] }));
  __curry__((a) => ({ __constructor: "AttributeOnClick", __args: [ a ] }));
  __curry__((a) => ({ __constructor: "AttributeOnMouseOver", __args: [ a ] }));
  __curry__((a) => ({ __constructor: "AttributeOnMouseOut", __args: [ a ] }));
  __curry__((a) => ({ __constructor: "AttributeOnChange", __args: [ a ] }));
  let AttributeOnInput = __curry__((a) => ({ __constructor: "AttributeOnInput", __args: [ a ] }));
  __curry__((a) => ({ __constructor: "AttributeOnKeyPress", __args: [ a ] }));

  const AppEnv = {
    patch: null,
    currentElement: null,
    currentState: null,
    rootView: null,
    onUrlChangedAction: null,
  };
  let KEY_CODE_MAPPINGS = fromList(([([13, KEY_ENTER]), ([8, KEY_BACKSPACE])]));
  let getKeyFromCode = __curry__((keyCode) => fromMaybe(KEY_ANY, get(keyCode, KEY_CODE_MAPPINGS)));
  const buildKeyPressEvent = event => {
    const key = getKeyFromCode(event.keyCode, KEY_CODE_MAPPINGS);

    return KeyPressEvent({ ...event, key })
  };

  const EventConstructors = Object.freeze({
    mouseout: AbstractEvent,
    mouseover: AbstractEvent,
    change: AbstractEvent,
    click: ClickEvent,
    input: InputEvent,
    keypress: buildKeyPressEvent
  });
  const getCurrentState = () => AppEnv.currentState;

  const runAction = updater => {
    AppEnv.currentState = updater(getCurrentState());
    const newElement = AppEnv.rootView(AppEnv.currentState);
    AppEnv.patch(AppEnv.currentElement, newElement);
    AppEnv.currentElement = newElement;
  };

  const wrapEventHandler = (ctor, handler) => {
    return event => {
      event.eventType = event.type;
      // So now calling an event handler gives us a list of wishes
      const wishes = handler(AppEnv.currentState)(ctor(event));
      wishes.forEach(fulfill(runAction)(runAction));
    }
  };

  const getAttributeTuple = attr =>
    [attr.__constructor.substr(9).toLowerCase(), attr.__args[0]];

  const ATTR_NAMES = [
    "id",
    "class",
    "placeholder",
    "type",
    "href",
    "src",
    "alt",
    "title"
  ];
  const PROP_NAMES = [
    "value"
  ];

  const objectifyAttrs = attrs => attrs.reduce((obj, attr) => {
    const [attrName, attrValue] = getAttributeTuple(attr);
    if (attrName === "key") {
      return { ...obj, key: attrValue }
    } else if (ATTR_NAMES.includes(attrName)) {
      return { ...obj, attrs: { ...obj.attrs, [attrName]: attrValue }}
    } else if (PROP_NAMES.includes(attrName)) {
      return { ...obj, props: { ...obj.props, [attrName]: attrValue }}
    } else if (attrName.substr(0, 2) === "on") {
      const eventName = attrName.substr(2);
      const ctor = EventConstructors[eventName];
      return { ...obj, on: { ...obj.on, [eventName]: wrapEventHandler(ctor, attrValue) }}
    } else {
      return { ...obj, [attrName]: attrValue };
    }
  }, {});
  let className = AttributeClass;
  let placeholder = AttributePlaceholder;
  let inputType = AttributeType;
  let onInput = AttributeOnInput;
  let text = __curry__((content) => content);
  let div = __curry__((attrs, children) => h("div", objectifyAttrs(attrs), children));
  let span = __curry__((attrs, children) => h("span", objectifyAttrs(attrs), children));
  __curry__((attrs, children) => h("strong", objectifyAttrs(attrs), children));
  __curry__((attrs, children) => h("i", objectifyAttrs(attrs), children));
  __curry__((attrs, children) => h("br", objectifyAttrs(attrs), children));
  __curry__((attrs, children) => h("h1", objectifyAttrs(attrs), children));
  let h2 = __curry__((attrs, children) => h("h2", objectifyAttrs(attrs), children));
  __curry__((attrs, children) => h("h3", objectifyAttrs(attrs), children));
  __curry__((attrs, children) => h("h4", objectifyAttrs(attrs), children));
  __curry__((attrs, children) => h("h5", objectifyAttrs(attrs), children));
  __curry__((attrs, children) => h("h6", objectifyAttrs(attrs), children));
  let p = __curry__((attrs, children) => h("p", objectifyAttrs(attrs), children));
  __curry__((attrs, children) => h("blockquote", objectifyAttrs(attrs), children));
  __curry__((attrs, children) => h("code", objectifyAttrs(attrs), children));
  let ul = __curry__((attrs, children) => h("ul", objectifyAttrs(attrs), children));
  __curry__((attrs, children) => h("ol", objectifyAttrs(attrs), children));
  let li = __curry__((attrs, children) => h("li", objectifyAttrs(attrs), children));
  let header = __curry__((attrs, children) => h("header", objectifyAttrs(attrs), children));
  let main = __curry__((attrs, children) => h("main", objectifyAttrs(attrs), children));
  __curry__((attrs, children) => h("section", objectifyAttrs(attrs), children));
  __curry__((attrs, children) => h("aside", objectifyAttrs(attrs), children));
  __curry__((attrs, children) => null);
  let input = __curry__((attrs, children) => h("input", objectifyAttrs(attrs), children));
  __curry__((attrs, children) => h("button", objectifyAttrs(attrs), children));
  __curry__((attrs, children) => h("form", objectifyAttrs(attrs), children));
  __curry__((attrs, children) => h("img", objectifyAttrs(attrs), children));
  __curry__((attrs, children) => h("a", objectifyAttrs(attrs), children));
  __curry__((attrs, children) => {
    const objAttrs = objectifyAttrs(attrs);
    const clickHandler = (event) => {
      event.preventDefault();

      if (objAttrs.to) {
        const builtUrl = document.location.origin + document.location.pathname + '\#' + objAttrs.to;

        history.pushState({}, '', builtUrl);

        if (AppEnv.onUrlChangedAction) {
          const wishes = AppEnv.onUrlChangedAction(getCurrentState())(UrlEvent({ url: objAttrs.to }));
          wishes.forEach(fulfill(runAction)(runAction));
        }
      }
    };

    return h("a", { ...objAttrs, on: { click: clickHandler }}, children);
  });
  __curry__((action) => {
    AppEnv.onUrlChangedAction = action;

    window.onpopstate = function(event) {
      const path = document.location.hash.substr(1) || "/";
      const wishes = AppEnv.onUrlChangedAction(getCurrentState())(UrlEvent({ url: path }));
      wishes.forEach(fulfill(runAction)(runAction));
      console.log(document.location);
      // alert(`location: ${document.location}, state: ${JSON.stringify(event.state)}`)
    };
  });
  __curry__((stateUpdate, state, event) => ([Monad.Wish.of(__curry__((_) => stateUpdate(state, event)))]));
  let render = __curry__((view, initialState, containerId) => {
      let initialElement = view(initialState);
      const patch = init([attributesModule, propsModule, eventListenersModule]);
    patch(document.getElementById(containerId), initialElement);

    AppEnv.patch = patch;
    AppEnv.currentElement = initialElement;
    AppEnv.rootView = view;
    AppEnv.currentState = initialState;
      return ({ __constructor: "Unit", __args: [] });
  });

  // file: /home/runner/work/madparser/madparser/madlib_modules/https___github_com_madlib_lang_maddoc_archive_refs_heads_master_zip/src/Main.mad

  let Definition = __curry__((a, b, c, d, e) => ({ __constructor: "Definition", __args: [ a, b, c, d, e ] }));
  let TypeDefinition = __curry__((a, b, c) => ({ __constructor: "TypeDefinition", __args: [ a, b, c ] }));
  let AliasDefinition = __curry__((a, b, c) => ({ __constructor: "AliasDefinition", __args: [ a, b, c ] }));
  let InterfaceDefinition = __curry__((a, b, c, d) => ({ __constructor: "InterfaceDefinition", __args: [ a, b, c, d ] }));
  let InstanceDefinition = __curry__((a, b) => ({ __constructor: "InstanceDefinition", __args: [ a, b ] }));
  let ModuleDocumentation = __curry__((a, b, c, d, e, f, g) => ({ __constructor: "ModuleDocumentation", __args: [ a, b, c, d, e, f, g ] }));
  let ExpressionItem = __curry__((a, b) => ({ __constructor: "ExpressionItem", __args: [ a, b ] }));
  let TypeItem = __curry__((a, b) => ({ __constructor: "TypeItem", __args: [ a, b ] }));
  let AliasItem = __curry__((a, b) => ({ __constructor: "AliasItem", __args: [ a, b ] }));
  let InterfaceItem = __curry__((a, b) => ({ __constructor: "InterfaceItem", __args: [ a, b ] }));
  let InstanceItem = __curry__((a, b) => ({ __constructor: "InstanceItem", __args: [ a, b ] }));
  let docJson = "{\n  \"modules\": [\n    {\n      \"path\": \"/home/runner/work/madparser/madparser/src/Main.spec.mad\",\n      \"description\": \"\",\n      \"typeDeclarations\": [\n        \n      ],\n      \"aliases\": [\n        \n      ],\n      \"interfaces\": [\n        \n      ],\n      \"instances\": [\n        \n      ],\n      \"expressions\": [\n        \n      ]\n    },\n    {\n      \"path\": \"/home/runner/work/madparser/madparser/src/Main.mad\",\n      \"description\": \"\",\n      \"typeDeclarations\": [\n        {\n          \"type\": \"ADT\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"name\": \"Location\",\n          \"params\": \"\",\n          \"constructors\": [\n            \"Loc Number Number Number\"\n          ]\n        },\n        {\n          \"type\": \"ADT\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"name\": \"Parser\",\n          \"params\": \"a\",\n          \"constructors\": [\n            \"Parser (String -> Location -> <List <a, String>, Location>)\"\n          ]\n        },\n        {\n          \"type\": \"ADT\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"name\": \"Error\",\n          \"params\": \"\",\n          \"constructors\": [\n            \"Error Location\"\n          ]\n        }\n      ],\n      \"aliases\": [\n        \n      ],\n      \"interfaces\": [\n        \n      ],\n      \"instances\": [\n        {\n          \"name\": \"Functor\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"constraints\": \"\",\n          \"declaration\": \"Functor Parser\"\n        },\n        {\n          \"name\": \"Applicative\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"constraints\": \"\",\n          \"declaration\": \"Applicative Parser\"\n        },\n        {\n          \"name\": \"Monad\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"constraints\": \"\",\n          \"declaration\": \"Monad Parser\"\n        },\n        {\n          \"name\": \"Alternative\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"constraints\": \"\",\n          \"declaration\": \"Alternative Parser\"\n        }\n      ],\n      \"expressions\": [\n        {\n          \"name\": \"runParser\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"Parser a -> String -> Either Error a\"\n        },\n        {\n          \"name\": \"anyChar\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"Parser String\"\n        },\n        {\n          \"name\": \"location\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"Parser Location\"\n        },\n        {\n          \"name\": \"oneOf\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"List String -> Parser String\"\n        },\n        {\n          \"name\": \"notOneOf\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"List String -> Parser String\"\n        },\n        {\n          \"name\": \"choice\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"List (Parser a) -> Parser a\"\n        },\n        {\n          \"name\": \"many\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"Parser a -> Parser (List a)\"\n        },\n        {\n          \"name\": \"some\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"Parser a -> Parser (List a)\"\n        },\n        {\n          \"name\": \"manyTill\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"Parser a -> Parser b -> Parser (List a)\"\n        },\n        {\n          \"name\": \"someTill\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"Parser a -> Parser b -> Parser (List a)\"\n        },\n        {\n          \"name\": \"lookAhead\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"Parser a -> Parser a\"\n        },\n        {\n          \"name\": \"takeWhile\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"(String -> Boolean) -> Parser String\"\n        },\n        {\n          \"name\": \"satisfy\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"(String -> Boolean) -> Parser String\"\n        },\n        {\n          \"name\": \"char\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"String -> Parser String\"\n        },\n        {\n          \"name\": \"notChar\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"String -> Parser String\"\n        },\n        {\n          \"name\": \"eof\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"Parser ()\"\n        },\n        {\n          \"name\": \"string\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"String -> Parser String\"\n        },\n        {\n          \"name\": \"spaces\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"Parser String\"\n        },\n        {\n          \"name\": \"token\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"Parser a -> Parser a\"\n        },\n        {\n          \"name\": \"symbol\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"String -> Parser String\"\n        },\n        {\n          \"name\": \"digit\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"Parser String\"\n        },\n        {\n          \"name\": \"letter\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"Parser String\"\n        },\n        {\n          \"name\": \"letters\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"type\": \"Parser String\"\n        }\n      ]\n    }\n  ]\n}\n";
  let parser = J.field("modules", J.list(J.map7(ModuleDocumentation, J.field("path", J.string), J.field("description", J.string), J.field("expressions", J.list(J.map5(Definition, J.field("name", J.string), J.field("description", J.string), J.field("type", J.string), J.field("since", J.string), J.field("example", J.string)))), J.field("typeDeclarations", J.list(J.map3(TypeDefinition, J.field("name", J.string), J.field("params", J.string), J.field("constructors", J.list(J.string))))), J.field("aliases", J.list(J.map3(AliasDefinition, J.field("name", J.string), J.field("params", J.string), J.field("aliasedType", J.string)))), J.field("interfaces", J.list(J.map4(InterfaceDefinition, J.field("name", J.string), J.field("vars", J.string), J.field("constraints", J.string), J.field("methods", J.list(J.string))))), J.field("instances", J.list(J.map2(InstanceDefinition, J.field("declaration", J.string), J.field("constraints", J.string)))))));
  let parsedDocumentation = J.parse(parser, docJson);
  let sort = __curry__((fn, xs) => xs.sort(fn));
  let deriveModuleName = __curry__((_P_) => fromMaybe("")(nth(0)(split(".")(fromMaybe("???")(last(split("/")(_P_)))))));
  let getDocItemName = __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "ExpressionItem" && true && __x__.__args[1].__constructor === "Definition" && true && true && true && true && true) {
      let name = __x__.__args[1].__args[0];
      return name;
    }
    else if (__x__.__constructor === "TypeItem" && true && __x__.__args[1].__constructor === "TypeDefinition" && true && true && true) {
      let name = __x__.__args[1].__args[0];
      return name;
    }
    else if (__x__.__constructor === "AliasItem" && true && __x__.__args[1].__constructor === "AliasDefinition" && true && true && true) {
      let name = __x__.__args[1].__args[0];
      return name;
    }
    else if (__x__.__constructor === "InterfaceItem" && true && __x__.__args[1].__constructor === "InterfaceDefinition" && true && true && true && true) {
      let name = __x__.__args[1].__args[0];
      return name;
    }
    else if (__x__.__constructor === "InstanceItem" && true && __x__.__args[1].__constructor === "InstanceDefinition" && true && true) {
      let name = __x__.__args[1].__args[0];
      return name;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  let initialState = ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let modules = __x__.__args[0];
      return __curry__((_P_) => __curry__((docItems) => ({ docItems: docItems, search: "" }))(sort(__curry__((a, b) => getDocItemName(a) > getDocItemName(b) ? 1 : -1))(flatten(Functor.List.map(__curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "ModuleDocumentation" && true && true && true && true && true && true && true) {
      let path = __x__.__args[0];
      let exps = __x__.__args[2];
      let typeDefs = __x__.__args[3];
      let aliasDefs = __x__.__args[4];
      let interfaces = __x__.__args[5];
      let instances = __x__.__args[6];
      return ([ ...Functor.List.map(__curry__((exp) => ExpressionItem(deriveModuleName(path), exp)), exps),  ...Functor.List.map(__curry__((typeDef) => TypeItem(deriveModuleName(path), typeDef)), typeDefs),  ...Functor.List.map(__curry__((aliasDef) => AliasItem(deriveModuleName(path), aliasDef)), aliasDefs),  ...Functor.List.map(__curry__((interfac) => InterfaceItem(deriveModuleName(path), interfac)), interfaces),  ...Functor.List.map(__curry__((inst) => InstanceItem(deriveModuleName(path), inst)), instances)]);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(__x__)))(_P_)))))(modules);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(parsedDocumentation);
  let getDefName = __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "Definition" && true && true && true && true && true) {
      let name = __x__.__args[0];
      return name;
    }
    else {
      return "";
    }
  })(__x__));
  let getDefType = __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "Definition" && true && true && true && true && true) {
      let tipe = __x__.__args[2];
      return tipe;
    }
    else {
      return "";
    }
  })(__x__));
  let getDefSince = __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "Definition" && true && true && true && true && true) {
      let since = __x__.__args[3];
      return since;
    }
    else {
      return "";
    }
  })(__x__));
  let getDefExample = __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "Definition" && true && true && true && true && true) {
      let example = __x__.__args[4];
      return example;
    }
    else {
      return "";
    }
  })(__x__));
  let getDefDescription = __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "Definition" && true && true && true && true && true) {
      let desc = __x__.__args[1];
      return desc;
    }
    else {
      return "";
    }
  })(__x__));
  let getTypeDefName = __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "TypeDefinition" && true && true && true) {
      let name = __x__.__args[0];
      return name;
    }
    else {
      return "";
    }
  })(__x__));
  let getTypeDefParams = __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "TypeDefinition" && true && true && true) {
      let params = __x__.__args[1];
      return params;
    }
    else {
      return "";
    }
  })(__x__));
  let getTypeDefConstructors = __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "TypeDefinition" && true && true && true) {
      let ctors = __x__.__args[2];
      return ctors;
    }
    else {
      return ([]);
    }
  })(__x__));
  let getAliasName = __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "AliasDefinition" && true && true && true) {
      let n = __x__.__args[0];
      return n;
    }
    else {
      return "";
    }
  })(__x__));
  let getAliasParams = __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "AliasDefinition" && true && __x__.__args[1] === "" && true) {
      return "";
    }
    else if (__x__.__constructor === "AliasDefinition" && true && true && true) {
      let params = __x__.__args[1];
      return " " + params;
    }
    else {
      return "";
    }
  })(__x__));
  let getAliasType = __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "AliasDefinition" && true && true && true) {
      let tipe = __x__.__args[2];
      return tipe;
    }
    else {
      return "";
    }
  })(__x__));
  let getInterfaceName = __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "InterfaceDefinition" && true && true && true && true) {
      let n = __x__.__args[0];
      return n;
    }
    else {
      return "";
    }
  })(__x__));
  let getInterfaceVars = __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "InterfaceDefinition" && true && true && true && true) {
      let vars = __x__.__args[1];
      return vars;
    }
    else {
      return "";
    }
  })(__x__));
  let getInterfaceConstraints = __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "InterfaceDefinition" && true && true && true && true) {
      let constraints = __x__.__args[2];
      return constraints;
    }
    else {
      return "";
    }
  })(__x__));
  let getInterfaceMethods = __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "InterfaceDefinition" && true && true && true && true) {
      let methods = __x__.__args[3];
      return methods;
    }
    else {
      return ([]);
    }
  })(__x__));
  let getInstanceDeclaration = __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "InstanceDefinition" && true && true) {
      let decl = __x__.__args[0];
      return decl;
    }
    else {
      return "";
    }
  })(__x__));
  let getInstanceConstraints = __curry__((__x__) => ((__x__) => {
    if (__x__.__constructor === "InstanceDefinition" && true && true) {
      let constraints = __x__.__args[1];
      return constraints;
    }
    else {
      return "";
    }
  })(__x__));
  let handleInput = __curry__((state, event) => ((__x__) => {
    if (__x__.__constructor === "InputEvent" && true) {
      let e = __x__.__args[0];
      return ([Monad.Wish.of(always(({ ...state, search: e.target.value })))]);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(event));
  let DocApp = __curry__((state) => {
      let filteredItems = state.docItems.filter((s) => getDocItemName(s).match(state.search));
      return div(([className("documentation")]), ([header(([className("documentation__header")]), ([input(([inputType("text"), placeholder("What are you looking for?"), className("search-field"), onInput(handleInput)]), ([]))])), main(([className("documentation__content")]), ([DocItemList(filteredItems)]))]));
  });
  let DocItemList = __curry__((docItems) => ul(([]), ([ ...Functor.List.map(DocItem, docItems)])));
  let DocItem = __curry__((docItem) => ((__x__) => {
    if (__x__.__constructor === "ExpressionItem" && true && true) {
      return ExpressionItemView(docItem);
    }
    else if (__x__.__constructor === "TypeItem" && true && true) {
      return TypeItemView(docItem);
    }
    else if (__x__.__constructor === "AliasItem" && true && true) {
      return AliasItemView(docItem);
    }
    else if (__x__.__constructor === "InterfaceItem" && true && true) {
      return InterfaceItemView(docItem);
    }
    else if (__x__.__constructor === "InstanceItem" && true && true) {
      return InstanceItemView(docItem);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(docItem));
  let ExpressionItemView = __curry__((docItem) => {
      let moduleName = ((__x__) => {
    if (__x__.__constructor === "ExpressionItem" && true && true) {
      let n = __x__.__args[0];
      return n;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(docItem);
      let definition = ((__x__) => {
    if (__x__.__constructor === "ExpressionItem" && true && true) {
      let def = __x__.__args[1];
      return def;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(docItem);
      let descriptionParagraphs = __curry__((_P_) => Functor.List.map(__curry__((desc) => p(([]), ([desc]))))(lines(getDefDescription(_P_))))(definition);
      return li(([className("definition")]), ([div(([className("definition__etiquette")]), ([text(`Function`)])), h2(([className("definition__title")]), ([span(([]), ([text(`${getDefName(definition)}`)])), span(([className("definition__module")]), ([text(moduleName)]))])), p(([]), ([span(([className("definition__type")]), ([text(getDefType(definition))]))])), p(([className("definition__since")]), ([text("Added in v"), text(getDefSince(definition))])), div(([className("definition__description")]), ([ ...descriptionParagraphs])), p(([className((__eq__(getDefExample(definition), "") ? "" : "definition__example"))]), ([Example(getDefExample(definition))]))]));
  });
  let AliasItemView = __curry__((docItem) => {
      let moduleName = ((__x__) => {
    if (__x__.__constructor === "AliasItem" && true && true) {
      let n = __x__.__args[0];
      return n;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(docItem);
      let aliasDef = ((__x__) => {
    if (__x__.__constructor === "AliasItem" && true && true) {
      let def = __x__.__args[1];
      return def;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(docItem);
      let aliasedType = getAliasType(aliasDef);
      return li(([className("definition")]), ([div(([className("definition__etiquette")]), ([text("Alias")])), h2(([className("definition__title")]), ([span(([]), ([text(getAliasName(aliasDef))])), span(([className("definition__module")]), ([text(moduleName)]))])), div(([className("definition__adt")]), ([span(([className("highlight")]), ([text("alias")])), span(([]), ([text(" "), text(getAliasName(aliasDef)), text(getAliasParams(aliasDef))])), span(([className("definition__constructors")]), ([span(([className("definition__constructor")]), ([span(([className("highlight")]), ([text(" = ")])), span(([]), ([text(aliasedType)]))]))]))]))]));
  });
  let InterfaceItemView = __curry__((docItem) => {
      let moduleName = ((__x__) => {
    if (__x__.__constructor === "InterfaceItem" && true && true) {
      let n = __x__.__args[0];
      return n;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(docItem);
      let interfaceDef = ((__x__) => {
    if (__x__.__constructor === "InterfaceItem" && true && true) {
      let def = __x__.__args[1];
      return def;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(docItem);
      let methods = getInterfaceMethods(interfaceDef);
      let constraints = getInterfaceConstraints(interfaceDef);
      let constraintElements = (!__eq__(constraints, "") ? ([span(([]), ([text(constraints)])), span(([className("highlight")]), ([text(` => `)]))]) : ([]));
      return li(([className("definition")]), ([div(([className("definition__etiquette")]), ([text("Interface")])), h2(([className("definition__title")]), ([span(([]), ([text(getInterfaceName(interfaceDef))])), span(([className("definition__module")]), ([text(moduleName)]))])), div(([className("definition__interface")]), ([span(([className("highlight")]), ([text("interface ")])), span(([]), ([ ...constraintElements])), span(([]), ([text(getInterfaceName(interfaceDef)), text(" "), text(getInterfaceVars(interfaceDef))])), span(([className("highlight")]), ([text(` {`)])), div(([]), ([ ...Functor.List.map(__curry__((method) => div(([]), ([text("  "), method]))), methods)])), span(([className("highlight")]), ([text(`}`)]))]))]));
  });
  let InstanceItemView = __curry__((docItem) => {
      let moduleName = ((__x__) => {
    if (__x__.__constructor === "InstanceItem" && true && true) {
      let n = __x__.__args[0];
      return n;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(docItem);
      let instanceDef = ((__x__) => {
    if (__x__.__constructor === "InstanceItem" && true && true) {
      let def = __x__.__args[1];
      return def;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(docItem);
      let constraints = getInstanceConstraints(instanceDef);
      let constraintElements = (!__eq__(constraints, "") ? ([span(([]), ([text(constraints)])), span(([className("highlight")]), ([text(` => `)]))]) : ([]));
      return li(([className("definition")]), ([div(([className("definition__etiquette")]), ([text("Instance")])), h2(([className("definition__title")]), ([span(([]), ([text(getInstanceDeclaration(instanceDef))])), span(([className("definition__module")]), ([text(moduleName)]))])), div(([className("definition__interface")]), ([span(([className("highlight")]), ([text("instance ")])), span(([]), ([ ...constraintElements])), span(([]), ([text(getInstanceDeclaration(instanceDef))]))]))]));
  });
  let TypeItemView = __curry__((docItem) => {
      let moduleName = ((__x__) => {
    if (__x__.__constructor === "TypeItem" && true && true) {
      let n = __x__.__args[0];
      return n;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(docItem);
      let typeDefinition = ((__x__) => {
    if (__x__.__constructor === "TypeItem" && true && true) {
      let def = __x__.__args[1];
      return def;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(docItem);
      let constructors = getTypeDefConstructors(typeDefinition);
      let manyCtors = len$1(constructors) > 1;
      let renderedConstructors = (manyCtors ? ConstructorsView("=", constructors) : ([span(([className("definition__constructor")]), ([span(([className("highlight")]), ([text("= ")])), span(([]), ([text(fromMaybe("???", first(constructors)))]))]))]));
      return li(([className("definition")]), ([div(([className("definition__etiquette")]), ([text("Type")])), h2(([className("definition__title")]), ([span(([]), ([text(getTypeDefName(typeDefinition))])), span(([className("definition__module")]), ([text(moduleName)]))])), div(([className("definition__adt")]), ([span(([className("highlight")]), ([text("type")])), span(([]), ([text(" "), text(getTypeDefName(typeDefinition)), text(" "), text(getTypeDefParams(typeDefinition))])), span(([className("definition__constructors")]), ([ ...renderedConstructors]))]))]));
  });
  let ConstructorsView = __curry__((separator, items) => ((__x__) => {
    if (__x__.length >= 2 && true && true) {
      let [ctor,...more] = __x__;
      return ([ConstructorView(separator, ctor),  ...ConstructorsView("|", more)]);
    }
    else if (__x__.length === 1 && true) {
      let [ctor] = __x__;
      return ([ConstructorView(separator, ctor)]);
    }
    else if (__x__.length === 0) {
      return ([]);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      throw 'non exhaustive patterns!';
    }
  })(items));
  let ConstructorView = __curry__((separator, constructor) => div(([className("definition__constructor")]), ([span(([className("highlight")]), ([text("  "), separator])), span(([]), ([text(" "), constructor]))])));
  let Example = __curry__((example) => {
      let lineList = split("\n", example);
      return div(([]), ([ ...Functor.List.map(__curry__((l) => div(([className("example__line")]), ([l]))), lineList)]));
  });
  render(DocApp, initialState, "app");
  var Main = { parser };

  exports.default = Main;
  exports.parser = parser;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
