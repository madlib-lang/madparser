(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.exe = factory());
}(this, (function () { 'use strict';

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
        return l.length === r.length && l.reduce((res, _, i) => res && __eq__(l[i], r[i]), true);
      }
      const keysL = Object.keys(l);
      const keysR = Object.keys(r);
      return keysL.length === keysR.length && keysL.reduce((res, k) => res && __eq__(l[k], r[k]), true);
    }
    return l === r;
  };

  const __applyMany__ = (f, params) => params.reduce((_f, param) => _f(param), f);
  window.__apMtdDicts__ = (dict, dicts) =>
    Object.keys(dict).reduce((o, k) => ({ ...o, [k]: () => __applyMany__(dict[k](), dicts) }), {});

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

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Function.mad
  let complement = (fn => x => !(fn(x)));
  let always = (a => b => a);
  let identity = (a => a);
  let equals = (val => a => __eq__(val, a));
  let notEquals = (val => a => !__eq__(val, a));
  let ifElse = (predicate => truthy => falsy => value => (predicate(value) ? truthy(value) : falsy(value)));
  let when = (predicate => truthy => value => ifElse(predicate)(truthy)(always(value))(value));
  let not = (b => !(b));
  let flip = (f => b => a => f(a)(b));
  let any = (predicate => xs => xs.some(predicate));
  let all = (predicate => xs => xs.every(predicate));
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
  let memoize = (fn => nativeMemoize(fn));
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
  let memoize2 = (fn => nativeMemoize2((a, b) => fn(a)(b)));
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
  let memoize3 = (fn => nativeMemoize3(fn));
  var Fun = { complement, always, identity, equals, notEquals, ifElse, when, not, flip, any, all, memoize, memoize2, memoize3 };

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Functor.mad

  window.Functor = {};
  let mapL = (Functor_d107) => {
    window.Functor_d107 = Functor_d107;

    return mapL__ND__()
  };
  let mapL__ND__ = __once__(() => (_P_ => Functor_d107.map()(always(_P_))));

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Applicative.mad

  window.Applicative = {};
  let apL = (Functor_r121) => (Applicative_r121) => {
    window.Applicative_r121 = Applicative_r121;
    window.Functor_r121 = Functor_r121;

    return apL__ND__()
  };
  let apL__ND__ = __once__(() => (a => b => Applicative_r121.ap()(Functor_r121.map()(always)(a))(b)));
  __once__(() => (f => x1 => x2 => (_P_ => (__ph0__ => Applicative_l141.ap()(__ph0__)(x2))(Functor_l141.map()(f)(_P_)))(x1)));
  __once__(() => (f => x1 => x2 => x3 => (_P_ => (__ph0__ => Applicative_k166.ap()(__ph0__)(x3))((__ph0__ => Applicative_k166.ap()(__ph0__)(x2))(Functor_k166.map()(f)(_P_))))(x1)));

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Monad.mad

  window.Monad = {};
  __once__(() => (b => a => Monad_t201.chain()((_ => b))(a)));

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Bifunctor.mad
  window.Bifunctor = {};

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Show.mad
  window.Show = {};

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Either.mad

  let Left = (a => ({ __constructor: "Left", __args: [ a ] }));
  let Right = (a => ({ __constructor: "Right", __args: [ a ] }));
  Functor['Either'] = {};
  Functor['Either']['map'] = () => (f => __x__ => ((__x__) => {
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
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  Applicative['Either'] = {};
  Applicative['Either']['ap'] = () => (mf => m => ((__x__) => {
    if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return Left(e);
    }
    else if (__x__.__constructor === "Right" && true) {
      let f = __x__.__args[0];
      return Functor.Either.map()(f)(m);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(mf));
  Applicative['Either']['pure'] = () => Right;
  Monad['Either'] = {};
  Monad['Either']['chain'] = () => (f => __x__ => ((__x__) => {
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
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  Monad['Either']['of'] = () => Applicative.Either.pure();
  Bifunctor['Either'] = {};
  Bifunctor['Either']['bimap'] = () => (leftF => rightF => __x__ => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return Right(rightF(a));
    }
    else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return Left(leftF(e));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  Bifunctor['Either']['mapFirst'] = () => mapLeft;
  Bifunctor['Either']['mapSecond'] = () => Functor.Either.map();
  Show['Either'] = {};
  let __ShowEithershow = __once__(() => (__x__ => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return "Right " + Show_t357.show()(a);
    }
    else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return "Left " + Show_w360.show()(e);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__)));
  Show['Either']['show'] = () => (Show_t357) => (Show_w360) => {
    window.Show_w360 = Show_w360;
    window.Show_t357 = Show_t357;
    return __ShowEithershow();
  };
  let mapRight = Functor.Either.map();
  let mapLeft = (f => m => ((__x__) => {
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
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(m));
  let isLeft = (either => ((__x__) => {
    if (__x__.__constructor === "Left" && true) {
      return true;
    }
    else {
      return false;
    }
  })(either));
  let fromRight = (a => either => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let x = __x__.__args[0];
      return x;
    }
    else {
      return a;
    }
  })(either));

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Semigroup.mad
  window.Semigroup = {};

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Monoid.mad

  window.Monoid = {};

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Maybe.mad

  let Just = (a => ({ __constructor: "Just", __args: [ a ] }));
  let Nothing = ({ __constructor: "Nothing", __args: [  ] });
  Functor['Maybe'] = {};
  Functor['Maybe']['map'] = () => (f => __x__ => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let x = __x__.__args[0];
      return Just(f(x));
    }
    else if (__x__.__constructor === "Nothing") {
      return Nothing;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  Applicative['Maybe'] = {};
  Applicative['Maybe']['ap'] = () => (mf => mx => ((__x__) => {
    if (__x__.length === 2 && __x__[0].__constructor === "Just" && true && __x__[1].__constructor === "Just" && true) {
      let [{ __args: [f]},{ __args: [x]}] = __x__;
      return Applicative.Maybe.pure()(f(x));
    }
    else {
      return Nothing;
    }
  })(([mf, mx])));
  Applicative['Maybe']['pure'] = () => Just;
  Monad['Maybe'] = {};
  Monad['Maybe']['chain'] = () => (f => m => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let x = __x__.__args[0];
      return f(x);
    }
    else if (__x__.__constructor === "Nothing") {
      return Nothing;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(m));
  Monad['Maybe']['of'] = () => Applicative.Maybe.pure();
  Show['Maybe'] = {};
  let __ShowMaybeshow = __once__(() => (__x__ => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let a = __x__.__args[0];
      return "Just " + Show_u514.show()(a);
    }
    else if (__x__.__constructor === "Nothing") {
      return "Nothing";
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__)));
  Show['Maybe']['show'] = () => (Show_u514) => {
    window.Show_u514 = Show_u514;
    return __ShowMaybeshow();
  };
  let fromMaybe = (or => __x__ => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let a = __x__.__args[0];
      return a;
    }
    else if (__x__.__constructor === "Nothing") {
      return or;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  let isJust = (__x__ => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      return true;
    }
    else if (__x__.__constructor === "Nothing") {
      return false;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/String.mad

  Semigroup['String'] = {};
  Semigroup['String']['assoc'] = () => (a => b => a + b);
  Monoid['String'] = {};
  Monoid['String']['mappend'] = () => (a => b => a + b);
  Monoid['String']['mempty'] = () => "";
  Show['String'] = {};
  Show['String']['show'] = () => (a => a);
  let toLower = (s => s.toLowerCase());
  let toUpper = (s => s.toUpperCase());
  let replace = (regex => replacing => input => input.replace(new RegExp(regex), replacing));
  let split = (separator => str => str.split(separator));
  let lines = split("\n");
  let mapChars = (f => s => s.split("").map(f).join(""));
  let reduceChars = (f => initial => s => s.split("").reduce((a, b) => f(a)(b), initial));
  let slice$1 = (start => end => s => s.slice(start, end));
  let isEmpty$1 = (s => !s);
  let nthChar = (n => s => {
    const c = s[n];
    return !!c ? Just(c) : Nothing
  });
  let firstChar = nthChar(0);
  let lastChar = (s => nthChar(len$2(s) - 1)(s));
  let drop$1 = (n => s => slice$1(n)(len$2(s))(s));
  let dropLast$1 = (n => s => slice$1(0)(-n)(s));
  let trim = (s => s.trim());
  let trimStart = (s => s.trimStart());
  let trimEnd = (s => s.trimEnd());
  let isLetter = (s => {
    if (s.length !== 1) {
      return false
    }

    return RegExp(/^\p{L}/,'u').test(s)
  });
  let len$2 = (s => s.length);
  let isDigit = (s => (!__eq__(len$2(s), 1) ? false : __eq__(s, "0") || __eq__(s, "1") || __eq__(s, "2") || __eq__(s, "3") || __eq__(s, "4") || __eq__(s, "5") || __eq__(s, "6") || __eq__(s, "7") || __eq__(s, "8") || __eq__(s, "9")));
  let repeat = (n => s => s.repeat(n));
  let match = (regex => input => input.match(regex));
  var String = { toLower, toUpper, replace, split, lines, mapChars, reduceChars, slice: slice$1, isEmpty: isEmpty$1, nthChar, firstChar, lastChar, drop: drop$1, dropLast: dropLast$1, trim, trimStart, trimEnd, isLetter, len: len$2, isDigit, repeat, match };

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Compare.mad
  window.Comparable = {};
  Comparable['Number'] = {};
  Comparable['Number']['compare'] = () => (a => b => (a > b ? MORE : (__eq__(a, b) ? EQUAL : LESS)));
  Comparable['String'] = {};
  Comparable['String']['compare'] = () => (a => b => a > b ? MORE : a == b ? EQUAL : LESS);
  Comparable['Boolean'] = {};
  Comparable['Boolean']['compare'] = () => (a => b => ((__x__) => {
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
  let EQUAL = 0;
  __once__(() => (a => b => __eq__(Comparable_u566.compare()(a)(b), MORE)));
  __once__(() => (a => b => Comparable_e576.compare()(a)(b) >= EQUAL));
  __once__(() => (a => b => __eq__(Comparable_o586.compare()(a)(b), LESS)));
  __once__(() => (a => b => Comparable_y596.compare()(a)(b) <= EQUAL));

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Tuple.mad

  Show['Tuple_2'] = {};
  let __ShowTuple_2show = __once__(() => (__x__ => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [a,b] = __x__;
      return "<" + Show_m740.show()(a) + ", " + Show_n741.show()(b) + ">";
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__)));
  Show['Tuple_2']['show'] = () => (Show_n741) => (Show_m740) => {
    window.Show_m740 = Show_m740;
    window.Show_n741 = Show_n741;
    return __ShowTuple_2show();
  };
  Show['Tuple_3'] = {};
  let __ShowTuple_3show = __once__(() => (__x__ => ((__x__) => {
    if (__x__.length === 3 && true && true && true) {
      let [a,b,c] = __x__;
      return "<" + Show_f759.show()(a) + ", " + Show_g760.show()(b) + ", " + Show_h761.show()(c) + ">";
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__)));
  Show['Tuple_3']['show'] = () => (Show_h761) => (Show_g760) => (Show_f759) => {
    window.Show_f759 = Show_f759;
    window.Show_g760 = Show_g760;
    window.Show_h761 = Show_h761;
    return __ShowTuple_3show();
  };
  Show['Tuple_4'] = {};
  let __ShowTuple_4show = __once__(() => (__x__ => ((__x__) => {
    if (__x__.length === 4 && true && true && true && true) {
      let [a,b,c,d] = __x__;
      return "<" + Show_g786.show()(a) + ", " + Show_h787.show()(b) + ", " + Show_i788.show()(c) + ", " + Show_j789.show()(d) + ">";
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__)));
  Show['Tuple_4']['show'] = () => (Show_j789) => (Show_i788) => (Show_h787) => (Show_g786) => {
    window.Show_g786 = Show_g786;
    window.Show_h787 = Show_h787;
    window.Show_i788 = Show_i788;
    window.Show_j789 = Show_j789;
    return __ShowTuple_4show();
  };
  let fst = (tuple => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [a,] = __x__;
      return a;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(tuple));
  let snd = (tuple => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [,b] = __x__;
      return b;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(tuple));
  var Tuple = { fst, snd };

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Control.mad

  let loop = (start => pred => evaluate => {
      let s = start;
      while(pred(s)) {
      s = evaluate(s);
    }    return s;
  });
  let maybeLoop = (start => evaluate => {
      let s = start;
      while(true) {
      let tmp = evaluate(s);
      if (isJust(tmp)) {
        s = tmp.__args[0];
      } else {
        break
      }
    }    return s;
  });

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/List.mad

  Functor['List'] = {};
  Functor['List']['map'] = () => (f => xs => xs.map((x) => f(x)));
  Applicative['List'] = {};
  Applicative['List']['ap'] = () => (mf => ma => (_P_ => flatten(Functor.List.map()((f => Functor.List.map()(f)(ma)))(_P_)))(mf));
  Applicative['List']['pure'] = () => (x => ([x]));
  Monad['List'] = {};
  Monad['List']['chain'] = () => (f => xs => (_P_ => flatten(Functor.List.map()(f)(_P_)))(xs));
  Monad['List']['of'] = () => Applicative.List.pure();
  Semigroup['List'] = {};
  Semigroup['List']['assoc'] = () => (xs1 => xs2 => xs1.concat(xs2));
  Monoid['List'] = {};
  Monoid['List']['mappend'] = () => Semigroup.List.assoc();
  Monoid['List']['mempty'] = () => ([]);
  Show['List'] = {};
  let __ShowListshow = __once__(() => (_P_ => (x => `[${x}]`)(reduceL(Monoid.String.mappend())("")(intercalate(", ")(Functor.List.map()(Show_g942.show())(_P_))))));
  Show['List']['show'] = () => (Show_g942) => {
    window.Show_g942 = Show_g942;
    return __ShowListshow();
  };
  let singleton = Applicative.List.pure();
  let unlines = (_P_ => reduce(Monoid.String.mappend())("")(intercalate("\n")(_P_)));
  let intercalate = (a => xs => ((__x__) => {
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
    else if (__x__.length >= 1 && true && true) {
      let [one,...rest] = __x__;
      return ([one, a,  ...intercalate(a)(rest)]);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(xs));
  let _intercalateWithIndex = (i => f => xs => ((__x__) => {
    if (__x__.length === 0) {
      return ([]);
    }
    else if (__x__.length === 1 && true) {
      let [one] = __x__;
      return ([one]);
    }
    else if (__x__.length === 2 && true && true) {
      let [one,two] = __x__;
      return ([one, f(i), two]);
    }
    else if (__x__.length >= 1 && true && true) {
      let [one,...rest] = __x__;
      return ([one, f(i),  ..._intercalateWithIndex(i + 1)(f)(rest)]);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(xs));
  let intercalateWithIndex = _intercalateWithIndex(0);
  let join = (Show_y1012) => (Show_x1011) => {
    window.Show_x1011 = Show_x1011;
    window.Show_y1012 = Show_y1012;

    return join__ND__()
  };
  let join__ND__ = __once__(() => (a => xs => (_P_ => reduce(Monoid.String.mappend())("")(intercalate(Show_x1011.show()(a))(Functor.List.map()(Show_y1012.show())(_P_))))(xs)));
  let mapWithIndex = (f => xs => xs.map((a, b) => f(a)(b)));
  let concat = (xs1 => xs2 => xs1.concat(xs2));
  let append = (v => xs => [...xs, v]);
  let last = (xs => {
    const item = xs.slice(-1)[0];
    return item ? Just(item) : Nothing;
  });
  let first = (xs => {
    const item = xs[0];
    return item ? Just(item) : Nothing;
  });
  let init$1 = (xs => xs.slice(0, -1));
  let tail = (xs => xs.slice(1));
  let nth = (i => xs => {
    const x = xs[i];
    return x === undefined
      ? Nothing
      : Just(x);
  });
  let reduceR = (f => initial => xs => xs.reduceRight((a, b) => f(a)(b), initial));
  let reduceL = (f => initial => xs => xs.reduce((a, b) => f(a)(b), initial));
  let reduce = reduceL;
  let reduceM = (Functor_g1098) => (Applicative_g1098) => (Monad_g1098) => {
    window.Monad_g1098 = Monad_g1098;
    window.Applicative_g1098 = Applicative_g1098;
    window.Functor_g1098 = Functor_g1098;

    return reduceM__ND__()
  };
  let reduceM__ND__ = __once__(() => (fn => initial => xs => (_P_ => fst((__ph0__ => loop(__ph0__)((_P_ => Fun.complement(isEmpty)(snd(_P_))))((__x__ => ((__x__) => {
    if (__x__.length === 2 && true && __x__[1].length >= 1 && true && true) {
      let [initialM,[h, ...rest]] = __x__;
      return ([Monad_g1098.chain()((__ph0__ => fn(__ph0__)(h)))(initialM), rest]);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__))))(_P_)))(([Monad_g1098.of()(initial), xs]))));
  let filter = (predicate => xs => xs.filter(predicate));
  let reject = (predicate => xs => xs.filter(Fun.complement(predicate)));
  let find = (predicate => xs => {
    const found = xs.find(predicate);
    if (found === undefined) {
      return Nothing
    }
    else {
      return Just(found)
    }
  });
  let len$1 = (xs => xs.length);
  let slice = (start => end => xs => xs.slice(start, end));
  let isEmpty = (xs => __eq__(len$1(xs), 0));
  let uniqueBy = (f => reduce((result => elem => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      return result;
    }
    else if (__x__.__constructor === "Nothing") {
      return ([ ...result, elem]);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(find(f(elem))(result))))(([])));
  let sortBy = (fn => xs => xs.sort((a, b) => fn(a)(b)));
  let sort = (Comparable_f1201) => {
    window.Comparable_f1201 = Comparable_f1201;

    return sort__ND__()
  };
  let sort__ND__ = __once__(() => sortBy(Comparable_f1201.compare()));
  let sortAsc = (Comparable_k1206) => {
    window.Comparable_k1206 = Comparable_k1206;

    return sortAsc__ND__()
  };
  let sortAsc__ND__ = __once__(() => sort(Comparable_k1206));
  let sortDesc = (Comparable_n1209) => {
    window.Comparable_n1209 = Comparable_n1209;

    return sortDesc__ND__()
  };
  let sortDesc__ND__ = __once__(() => sortBy((a => b => Comparable_n1209.compare()(a)(b) * -1)));
  let flatten = reduceL(concat)(([]));
  let zip = (as => bs => ((__x__) => {
    if (__x__.length === 2 && __x__[0].length >= 1 && true && true && __x__[1].length >= 1 && true && true) {
      let [[a, ...aa],[b, ...bb]] = __x__;
      return Monoid.List.mappend()(([([a, b])]))(zip(aa)(bb));
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
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(([as, bs])));
  let includes = (x => xs => xs.includes(x));
  let drop = (amount => xs => slice(amount)(len$1(xs))(xs));
  let dropLast = (amount => xs => slice(0)(len$1(xs) - amount)(xs));
  let dropWhile = (pred => xs => {
    const n = xs.length;
    let i = 0;

    for (; i < n; i++) {
        if (!pred(xs[i])) {
            break
        }
    }

    return xs.slice(i)
  });
  var List = { singleton, unlines, intercalate, intercalateWithIndex, join, mapWithIndex, concat, append, last, first, init: init$1, tail, nth, reduceR, reduceL, reduce, reduceM, filter, reject, find, len: len$1, slice, isEmpty, uniqueBy, sortBy, sort, sortAsc, sortDesc, flatten, zip, includes, drop, dropLast, dropWhile };

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Dictionary.mad

  let Dictionary = (a => ({ __constructor: "Dictionary", __args: [ a ] }));
  Functor['Dictionary'] = {};
  Functor['Dictionary']['map'] = () => (fn => __x__ => ((__x__) => {
    if (__x__.__constructor === "Dictionary" && true) {
      let items = __x__.__args[0];
      return fromList(Functor.List.map()((i => ([Tuple.fst(i), fn(Tuple.snd(i))])))(items));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  let fromList = (_P_ => Dictionary(List.uniqueBy((a => b => __eq__(Tuple.fst(a), Tuple.fst(b))))(_P_)));
  let empty$1 = fromList(([]));
  let insert = (k => v => m => ((__x__) => {
    if (__x__.__constructor === "Dictionary" && true) {
      let items = __x__.__args[0];
      return Dictionary(List.append(([k, v]))(List.reject((item => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [kk,] = __x__;
      return __eq__(kk, k);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(item)))(items)));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(m));
  let get = (k => __x__ => ((__x__) => {
    if (__x__.__constructor === "Dictionary" && true) {
      let items = __x__.__args[0];
      return (_P_ => Functor.Maybe.map()(Tuple.snd)(List.find((item => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [kk,] = __x__;
      return __eq__(k, kk);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(item)))(_P_)))(items);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  let keys = (m => ((__x__) => {
    if (__x__.__constructor === "Dictionary" && true) {
      let items = __x__.__args[0];
      return Functor.List.map()(Tuple.fst)(items);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(m));
  let values = (m => ((__x__) => {
    if (__x__.__constructor === "Dictionary" && true) {
      let items = __x__.__args[0];
      return Functor.List.map()(Tuple.snd)(items);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(m));
  let len = (m => List.len(keys(m)));
  let mapWithKey = (fn => __x__ => ((__x__) => {
    if (__x__.__constructor === "Dictionary" && true) {
      let items = __x__.__args[0];
      return fromList(Functor.List.map()((i => ([Tuple.fst(i), fn(Tuple.fst(i))(Tuple.snd(i))])))(items));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  let merge = (a => b => ((__x__) => {
    if (__x__.length === 2 && __x__[0].__constructor === "Dictionary" && true && __x__[1].__constructor === "Dictionary" && true) {
      let [{ __args: [itemsA]},{ __args: [itemsB]}] = __x__;
      return fromList(List.concat(itemsA)(itemsB));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(([a, b])));
  var D = { fromList, empty: empty$1, insert, get, keys, values, len, mapWithKey, merge, Dictionary };

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Json.mad

  let succeed = (a => _ => Right(a));
  let fail = (err => _ => Left(err));
  let string$1 = (input => typeof input === "string"
      ? Right(input)
      : Left(`${input} is not a string`));
  let number = (input => typeof input === "number"
      ? Right(input)
      : Left(`${input} is not a number`));
  let boolean = (input => typeof input === "boolean"
      ? Right(input)
      : Left(`${input} is not a boolean`));
  let dict = (parser => input => {
    try {
      const keys = Object.keys(input);
      let result = D.empty;
      keys.forEach((k) => {
        const parsed = parser(input[k]);
        if (isLeft(parsed)) {
          throw parsed;
        } else {
          result = D.insert(k)(fromRight("")(parsed))(result);
        }
      });

      return Right(result);
    } catch(e) {
      return Left("Mapping failed!");
    }
  });
  let list = (parser => input => {
    try {
      let result = [];
      input.forEach((a) => {
        const parsed = parser(a);
        if (isLeft(parsed)) {
          throw parsed;
        } else {
          result.push(fromRight("")(parsed));
        }
      });
      return Right(result);
    } catch(e) {
      return Left("Mapping failed!");
    }
  });
  let chain1 = (fn => parser => input => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return fn(a)(input);
    }
    else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return Left(e);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(parser(input)));
  let chain2 = (fn => parserA => parserB => input => ((__x__) => {
    if (__x__.length === 2 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]}] = __x__;
      return fn(a)(b)(input);
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
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input)])));
  let chain3 = (fn => parserA => parserB => parserC => input => ((__x__) => {
    if (__x__.length === 3 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]},{ __args: [c]}] = __x__;
      return fn(a)(b)(c)(input);
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
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input), parserC(input)])));
  let chain4 = (fn => parserA => parserB => parserC => parserD => input => ((__x__) => {
    if (__x__.length === 4 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]},{ __args: [c]},{ __args: [d]}] = __x__;
      return fn(a)(b)(c)(d)(input);
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
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input), parserC(input), parserD(input)])));
  let chain5 = (fn => parserA => parserB => parserC => parserD => parserE => input => ((__x__) => {
    if (__x__.length === 5 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true && __x__[4].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]},{ __args: [c]},{ __args: [d]},{ __args: [e]}] = __x__;
      return fn(a)(b)(c)(d)(e)(input);
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
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input), parserC(input), parserD(input), parserE(input)])));
  let chain6 = (fn => parserA => parserB => parserC => parserD => parserE => parserF => input => ((__x__) => {
    if (__x__.length === 6 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true && __x__[4].__constructor === "Right" && true && __x__[5].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]},{ __args: [c]},{ __args: [d]},{ __args: [e]},{ __args: [f]}] = __x__;
      return fn(a)(b)(c)(d)(e)(f)(input);
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
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input), parserC(input), parserD(input), parserE(input), parserF(input)])));
  let chain7 = (fn => parserA => parserB => parserC => parserD => parserE => parserF => parserG => input => ((__x__) => {
    if (__x__.length === 7 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true && __x__[4].__constructor === "Right" && true && __x__[5].__constructor === "Right" && true && __x__[6].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]},{ __args: [c]},{ __args: [d]},{ __args: [e]},{ __args: [f]},{ __args: [g]}] = __x__;
      return fn(a)(b)(c)(d)(e)(f)(g)(input);
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
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input), parserC(input), parserD(input), parserE(input), parserF(input), parserG(input)])));
  let map1 = (fn => parser => input => ((__x__) => {
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
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(parser(input)));
  let map2 = (fn => parserA => parserB => input => ((__x__) => {
    if (__x__.length === 2 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]}] = __x__;
      return Right(fn(a)(b));
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
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input)])));
  let map3 = (fn => parserA => parserB => parserC => input => ((__x__) => {
    if (__x__.length === 3 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]},{ __args: [c]}] = __x__;
      return Right(fn(a)(b)(c));
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
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input), parserC(input)])));
  let map4 = (fn => parserA => parserB => parserC => parserD => input => ((__x__) => {
    if (__x__.length === 4 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]},{ __args: [c]},{ __args: [d]}] = __x__;
      return Right(fn(a)(b)(c)(d));
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
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input), parserC(input), parserD(input)])));
  let map5 = (fn => parserA => parserB => parserC => parserD => parserE => input => ((__x__) => {
    if (__x__.length === 5 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true && __x__[4].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]},{ __args: [c]},{ __args: [d]},{ __args: [e]}] = __x__;
      return Right(fn(a)(b)(c)(d)(e));
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
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input), parserC(input), parserD(input), parserE(input)])));
  let map6 = (fn => parserA => parserB => parserC => parserD => parserE => parserF => input => ((__x__) => {
    if (__x__.length === 6 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true && __x__[4].__constructor === "Right" && true && __x__[5].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]},{ __args: [c]},{ __args: [d]},{ __args: [e]},{ __args: [f]}] = __x__;
      return Right(fn(a)(b)(c)(d)(e)(f));
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
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input), parserC(input), parserD(input), parserE(input), parserF(input)])));
  let map7 = (fn => parserA => parserB => parserC => parserD => parserE => parserF => parserG => input => ((__x__) => {
    if (__x__.length === 7 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true && __x__[4].__constructor === "Right" && true && __x__[5].__constructor === "Right" && true && __x__[6].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]},{ __args: [c]},{ __args: [d]},{ __args: [e]},{ __args: [f]},{ __args: [g]}] = __x__;
      return Right(fn(a)(b)(c)(d)(e)(f)(g));
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
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input), parserC(input), parserD(input), parserE(input), parserF(input), parserG(input)])));
  let map8 = (fn => parserA => parserB => parserC => parserD => parserE => parserF => parserG => parserH => input => ((__x__) => {
    if (__x__.length === 8 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true && __x__[4].__constructor === "Right" && true && __x__[5].__constructor === "Right" && true && __x__[6].__constructor === "Right" && true && __x__[7].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]},{ __args: [c]},{ __args: [d]},{ __args: [e]},{ __args: [f]},{ __args: [g]},{ __args: [h]}] = __x__;
      return Right(fn(a)(b)(c)(d)(e)(f)(g)(h));
    }
    else if (__x__.length === 8 && __x__[0].__constructor === "Left" && true && true && true && true && true && true && true && true) {
      let [{ __args: [e]},,,,,,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 8 && true && __x__[1].__constructor === "Left" && true && true && true && true && true && true && true) {
      let [,{ __args: [e]},,,,,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 8 && true && true && __x__[2].__constructor === "Left" && true && true && true && true && true && true) {
      let [,,{ __args: [e]},,,,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 8 && true && true && true && __x__[3].__constructor === "Left" && true && true && true && true && true) {
      let [,,,{ __args: [e]},,,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 8 && true && true && true && true && __x__[4].__constructor === "Left" && true && true && true && true) {
      let [,,,,{ __args: [e]},,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 8 && true && true && true && true && true && __x__[5].__constructor === "Left" && true && true && true) {
      let [,,,,,{ __args: [e]},,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 8 && true && true && true && true && true && true && __x__[6].__constructor === "Left" && true && true) {
      let [,,,,,,{ __args: [e]},] = __x__;
      return Left(e);
    }
    else if (__x__.length === 8 && true && true && true && true && true && true && true && __x__[7].__constructor === "Left" && true) {
      let [,,,,,,,{ __args: [e]}] = __x__;
      return Left(e);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input), parserC(input), parserD(input), parserE(input), parserF(input), parserG(input), parserH(input)])));
  let map9 = (fn => parserA => parserB => parserC => parserD => parserE => parserF => parserG => parserH => parserI => input => ((__x__) => {
    if (__x__.length === 9 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true && __x__[4].__constructor === "Right" && true && __x__[5].__constructor === "Right" && true && __x__[6].__constructor === "Right" && true && __x__[7].__constructor === "Right" && true && __x__[8].__constructor === "Right" && true) {
      let [{ __args: [a]},{ __args: [b]},{ __args: [c]},{ __args: [d]},{ __args: [e]},{ __args: [f]},{ __args: [g]},{ __args: [h]},{ __args: [i]}] = __x__;
      return Right(fn(a)(b)(c)(d)(e)(f)(g)(h)(i));
    }
    else if (__x__.length === 9 && __x__[0].__constructor === "Left" && true && true && true && true && true && true && true && true && true) {
      let [{ __args: [e]},,,,,,,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 9 && true && __x__[1].__constructor === "Left" && true && true && true && true && true && true && true && true) {
      let [,{ __args: [e]},,,,,,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 9 && true && true && __x__[2].__constructor === "Left" && true && true && true && true && true && true && true) {
      let [,,{ __args: [e]},,,,,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 9 && true && true && true && __x__[3].__constructor === "Left" && true && true && true && true && true && true) {
      let [,,,{ __args: [e]},,,,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 9 && true && true && true && true && __x__[4].__constructor === "Left" && true && true && true && true && true) {
      let [,,,,{ __args: [e]},,,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 9 && true && true && true && true && true && __x__[5].__constructor === "Left" && true && true && true && true) {
      let [,,,,,{ __args: [e]},,,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 9 && true && true && true && true && true && true && __x__[6].__constructor === "Left" && true && true && true) {
      let [,,,,,,{ __args: [e]},,] = __x__;
      return Left(e);
    }
    else if (__x__.length === 9 && true && true && true && true && true && true && true && __x__[7].__constructor === "Left" && true && true) {
      let [,,,,,,,{ __args: [e]},] = __x__;
      return Left(e);
    }
    else if (__x__.length === 9 && true && true && true && true && true && true && true && true && __x__[8].__constructor === "Left" && true) {
      let [,,,,,,,,{ __args: [e]}] = __x__;
      return Left(e);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(([parserA(input), parserB(input), parserC(input), parserD(input), parserE(input), parserF(input), parserG(input), parserH(input), parserI(input)])));
  let maybe = (parser => input => {
    if (input) {
      let parsed = parser(input);
      if (isLeft(parsed)) {
        return Right(Nothing);
      }
      return mapRight(Just)(parsed);
    } else {
      return Right(Nothing)
    }
  });
  let lazy = (wrapped => input => wrapped(({ __constructor: "Unit", __args: [] }))(input));
  let field = (fieldName => parser => input => parser(input[fieldName]));
  let parse$1 = (parser => input => {
    try {
      return parser(JSON.parse(input))
    } catch(e) {
      console.log(e);
      return Left("Parsing error!\nInvalid input you might have called parse on an already parsed input or the given JSON is invalid.")
    }
  });
  var Json = { succeed, fail, string: string$1, number, boolean, dict, list, chain1, chain2, chain3, chain4, chain5, chain6, chain7, map1, map2, map3, map4, map5, map6, map7, map8, map9, maybe, lazy, field, parse: parse$1 };

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Wish.mad

  let Wish = (a => ({ __constructor: "Wish", __args: [ a ] }));
  Functor['Wish'] = {};
  Functor['Wish']['map'] = () => (f => m => Wish((badCB => goodCB => ((__x__) => {
    if (__x__.__constructor === "Wish" && true) {
      let run = __x__.__args[0];
      return run(badCB)((x => goodCB(f(x))));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(m))));
  Applicative['Wish'] = {};
  Applicative['Wish']['ap'] = () => (mf => m => Wish((badCB => goodCB => ((__x__) => {
    if (__x__.length === 2 && __x__[0].__constructor === "Wish" && true && __x__[1].__constructor === "Wish" && true) {
      let [{ __args: [runMF]},{ __args: [runM]}] = __x__;
      return runM(badCB)((x => runMF(badCB)((f => goodCB(f(x))))));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(([mf, m])))));
  Applicative['Wish']['pure'] = () => (a => Wish((_ => goodCB => goodCB(a))));
  Monad['Wish'] = {};
  Monad['Wish']['chain'] = () => (f => m => Wish((badCB => goodCB => ((__x__) => {
    if (__x__.__constructor === "Wish" && true) {
      let run = __x__.__args[0];
      return run(badCB)((x => ((__x__) => {
    if (__x__.__constructor === "Wish" && true) {
      let r = __x__.__args[0];
      return r(badCB)(goodCB);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(f(x))));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(m))));
  Monad['Wish']['of'] = () => Applicative.Wish.pure();
  Bifunctor['Wish'] = {};
  Bifunctor['Wish']['bimap'] = () => (leftF => rightF => m => Wish((badCB => goodCB => ((__x__) => {
    if (__x__.__constructor === "Wish" && true) {
      let run = __x__.__args[0];
      return run((_P_ => badCB(leftF(_P_))))((_P_ => goodCB(rightF(_P_))));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(m))));
  Bifunctor['Wish']['mapFirst'] = () => mapRej;
  Bifunctor['Wish']['mapSecond'] = () => Functor.Wish.map();
  let mapRej = (f => m => Wish((badCB => goodCB => ((__x__) => {
    if (__x__.__constructor === "Wish" && true) {
      let run = __x__.__args[0];
      return run((x => badCB(f(x))))(goodCB);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(m))));
  let fulfill = (badCB => goodCB => m => {
      ((__x__) => {
    if (__x__.__constructor === "Wish" && true) {
      let run = __x__.__args[0];
      return setTimeout(() => run(badCB)(goodCB), 0);  }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(m);
      return ({ __constructor: "Unit", __args: [] });
  });

  function createElement(tagName, options) {
      return document.createElement(tagName, options);
  }
  function createElementNS(namespaceURI, qualifiedName, options) {
      return document.createElementNS(namespaceURI, qualifiedName, options);
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

  function vnode(sel, data, children, text, elm) {
      const key = data === undefined ? undefined : data.key;
      return { sel, data, children, text, elm, key };
  }

  const array = Array.isArray;
  function primitive(s) {
      return typeof s === "string" || typeof s === "number";
  }

  function isUndef(s) {
      return s === undefined;
  }
  function isDef(s) {
      return s !== undefined;
  }
  const emptyNode = vnode("", {}, [], undefined, undefined);
  function sameVnode(vnode1, vnode2) {
      var _a, _b;
      const isSameKey = vnode1.key === vnode2.key;
      const isSameIs = ((_a = vnode1.data) === null || _a === void 0 ? void 0 : _a.is) === ((_b = vnode2.data) === null || _b === void 0 ? void 0 : _b.is);
      const isSameSel = vnode1.sel === vnode2.sel;
      return isSameSel && isSameKey && isSameIs;
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
  const hooks = [
      "create",
      "update",
      "remove",
      "destroy",
      "pre",
      "post",
  ];
  function init(modules, domApi) {
      let i;
      let j;
      const cbs = {
          create: [],
          update: [],
          remove: [],
          destroy: [],
          pre: [],
          post: [],
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
          const id = elm.id ? "#" + elm.id : "";
          // elm.className doesn't return a string when elm is an SVG element inside a shadowRoot.
          // https://stackoverflow.com/questions/29454340/detecting-classname-of-svganimatedstring
          const classes = elm.getAttribute("class");
          const c = classes ? "." + classes.split(" ").join(".") : "";
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
          if (sel === "!") {
              if (isUndef(vnode.text)) {
                  vnode.text = "";
              }
              vnode.elm = api.createComment(vnode.text);
          }
          else if (sel !== undefined) {
              // Parse selector
              const hashIdx = sel.indexOf("#");
              const dotIdx = sel.indexOf(".", hashIdx);
              const hash = hashIdx > 0 ? hashIdx : sel.length;
              const dot = dotIdx > 0 ? dotIdx : sel.length;
              const tag = hashIdx !== -1 || dotIdx !== -1
                  ? sel.slice(0, Math.min(hash, dot))
                  : sel;
              const elm = (vnode.elm =
                  isDef(data) && isDef((i = data.ns))
                      ? api.createElementNS(i, tag, data)
                      : api.createElement(tag, data));
              if (hash < dot)
                  elm.setAttribute("id", sel.slice(hash + 1, dot));
              if (dotIdx > 0)
                  elm.setAttribute("class", sel.slice(dot + 1).replace(/\./g, " "));
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
                      if (child != null && typeof child !== "string") {
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
                  else {
                      // Text node
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
              else if (sameVnode(oldStartVnode, newEndVnode)) {
                  // Vnode moved right
                  patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                  api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                  oldStartVnode = oldCh[++oldStartIdx];
                  newEndVnode = newCh[--newEndIdx];
              }
              else if (sameVnode(oldEndVnode, newStartVnode)) {
                  // Vnode moved left
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
                  if (isUndef(idxInOld)) {
                      // New element
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
          const elm = (vnode.elm = oldVnode.elm);
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
                      api.setTextContent(elm, "");
                  addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
              }
              else if (isDef(oldCh)) {
                  removeVnodes(elm, oldCh, 0, oldCh.length - 1);
              }
              else if (isDef(oldVnode.text)) {
                  api.setTextContent(elm, "");
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
      data.ns = "http://www.w3.org/2000/svg";
      if (sel !== "foreignObject" && children !== undefined) {
          for (let i = 0; i < children.length; ++i) {
              const childData = children[i].data;
              if (childData !== undefined) {
                  addNS(childData, children[i].children, children[i].sel);
              }
          }
      }
  }
  function h(sel, b, c) {
      let data = {};
      let children;
      let text;
      let i;
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
      if (sel[0] === "s" &&
          sel[1] === "v" &&
          sel[2] === "g" &&
          (sel.length === 3 || sel[3] === "." || sel[3] === "#")) {
          addNS(data, children, sel);
      }
      return vnode(sel, data, children, text, undefined);
  }

  const xlinkNS = "http://www.w3.org/1999/xlink";
  const xmlNS = "http://www.w3.org/XML/1998/namespace";
  const colonChar = 58;
  const xChar = 120;
  function updateAttrs(oldVnode, vnode) {
      let key;
      const elm = vnode.elm;
      let oldAttrs = oldVnode.data.attrs;
      let attrs = vnode.data.attrs;
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
                  elm.setAttribute(key, "");
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
  const attributesModule = {
      create: updateAttrs,
      update: updateAttrs,
  };

  function invokeHandler(handler, vnode, event) {
      if (typeof handler === "function") {
          // call function handler
          handler.call(vnode, event, vnode);
      }
      else if (typeof handler === "object") {
          // call multiple handlers
          for (let i = 0; i < handler.length; i++) {
              invokeHandler(handler[i], vnode, event);
          }
      }
  }
  function handleEvent(event, vnode) {
      const name = event.type;
      const on = vnode.data.on;
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
      const oldOn = oldVnode.data.on;
      const oldListener = oldVnode.listener;
      const oldElm = oldVnode.elm;
      const on = vnode && vnode.data.on;
      const elm = (vnode && vnode.elm);
      let name;
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
          const listener = (vnode.listener =
              oldVnode.listener || createListener());
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
      destroy: updateEventListeners,
  };

  function updateProps(oldVnode, vnode) {
      let key;
      let cur;
      let old;
      const elm = vnode.elm;
      let oldProps = oldVnode.data.props;
      let props = vnode.data.props;
      if (!oldProps && !props)
          return;
      if (oldProps === props)
          return;
      oldProps = oldProps || {};
      props = props || {};
      for (key in props) {
          cur = props[key];
          old = oldProps[key];
          if (old !== cur && (key !== "value" || elm[key] !== cur)) {
              elm[key] = cur;
          }
      }
  }
  const propsModule = { create: updateProps, update: updateProps };

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadUI/src/Main.mad
  let KEY_ENTER = ({ __constructor: "KEY_ENTER", __args: [  ] });
  let KEY_BACKSPACE = ({ __constructor: "KEY_BACKSPACE", __args: [  ] });
  let KEY_ANY = ({ __constructor: "KEY_ANY", __args: [  ] });
  let AbstractEvent = (a => ({ __constructor: "AbstractEvent", __args: [ a ] }));
  let ClickEvent = (a => ({ __constructor: "ClickEvent", __args: [ a ] }));
  let InputEvent = (a => ({ __constructor: "InputEvent", __args: [ a ] }));
  let KeyPressEvent = (a => ({ __constructor: "KeyPressEvent", __args: [ a ] }));
  let UrlEvent = (a => ({ __constructor: "UrlEvent", __args: [ a ] }));
  let AttributeClass = (a => ({ __constructor: "AttributeClass", __args: [ a ] }));
  let AttributePlaceholder = (a => ({ __constructor: "AttributePlaceholder", __args: [ a ] }));
  let AttributeType = (a => ({ __constructor: "AttributeType", __args: [ a ] }));
  let AttributeKey = (a => ({ __constructor: "AttributeKey", __args: [ a ] }));
  let AttributeHref = (a => ({ __constructor: "AttributeHref", __args: [ a ] }));
  let AttributeSrc = (a => ({ __constructor: "AttributeSrc", __args: [ a ] }));
  let AttributeAlt = (a => ({ __constructor: "AttributeAlt", __args: [ a ] }));
  let AttributeTo = (a => ({ __constructor: "AttributeTo", __args: [ a ] }));
  let AttributeOnInput = (a => ({ __constructor: "AttributeOnInput", __args: [ a ] }));

  const AppEnv = {
    patch: null,
    currentElement: null,
    currentState: null,
    rootView: null,
    onUrlChangedAction: null,
  };
  let KEY_CODE_MAPPINGS = fromList(([([13, KEY_ENTER]), ([8, KEY_BACKSPACE])]));
  let getKeyFromCode = (keyCode => fromMaybe(KEY_ANY)(get(keyCode)(KEY_CODE_MAPPINGS)));
  const buildKeyPressEvent = event => {
    const key = getKeyFromCode(event.keyCode);

    return KeyPressEvent({ ...event, key })
  };

  const EventConstructors = Object.freeze({
    mouseout: AbstractEvent,
    mouseover: AbstractEvent,
    change: AbstractEvent,
    click: ClickEvent,
    input: InputEvent,
    keypress: buildKeyPressEvent,
    transitionend: AbstractEvent
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
  let key = AttributeKey;
  let placeholder = AttributePlaceholder;
  let inputType = AttributeType;
  let to = AttributeTo;
  let href = AttributeHref;
  let src = AttributeSrc;
  let alt = AttributeAlt;
  let onInput = AttributeOnInput;
  let text$1 = (content => content);
  let tag = (tagName => attrs => children => h(tagName, objectifyAttrs(attrs), children));
  let a = tag("a");
  let blockquote$1 = tag("blockquote");
  let br = tag("br");
  let code$1 = tag("code");
  let div = tag("div");
  let h1 = tag("h1");
  let h2 = tag("h2");
  let h3 = tag("h3");
  let h4 = tag("h4");
  let h5 = tag("h5");
  let h6 = tag("h6");
  let header = tag("header");
  let i = tag("em");
  let img = tag("img");
  let input = tag("input");
  let li = tag("li");
  let main = tag("main");
  let p = tag("p");
  let span = tag("span");
  let strong = tag("strong");
  let ul = tag("ul");
  let empty = (attrs => children => null);
  let link$1 = (attrs => children => {
    const objAttrs = objectifyAttrs(attrs);
    if (objAttrs.to) {
      if (!objAttrs.attrs) {
        objAttrs.attrs = {};
      }
      objAttrs.attrs.href = `\#${objAttrs.to}`;
    }

    return h("a", { ...objAttrs }, children);
  });
  let onUrlChanged = (action => {
    AppEnv.onUrlChangedAction = action;

    window.onpopstate = function(event) {
      const path = document.location.hash.substr(1) || "/";
      const wishes = AppEnv.onUrlChangedAction(getCurrentState())(UrlEvent({ url: path }));
      wishes.forEach(fulfill(runAction)(runAction));
    };
  });
  let getUrl = (_ => document.location.hash.substr(1) || "/");
  let syncAction = (stateUpdate => state => event => ([Monad.Wish.of()((_ => stateUpdate(state)(event)))]));
  let render = (view => initialState => containerId => {
      let initialElement = view(initialState);
      const patch = init([attributesModule, propsModule, eventListenersModule]);
    patch(document.getElementById(containerId), initialElement);

    AppEnv.patch = patch;
    AppEnv.currentElement = initialElement;
    AppEnv.rootView = view;
    AppEnv.currentState = initialState;
      return ({ __constructor: "Unit", __args: [] });
  });

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/URL.mad
  let encode = encodeURI;
  let decode = decodeURI;
  var URL = { encode, decode };

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadDoc/src/Views/Etiquette.mad

  let Etiquette = (content => div(([className("definition__etiquette")]))(([text$1(content)])));

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadDoc/src/Views/Title.mad

  let Title = (title => moduleName => h2(([className("definition__title")]))(([span(([]))(([text$1(title)])), span(([className("definition__module")]))(([text$1(moduleName)]))])));

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadDoc/src/Views/Since.mad

  let Since = (_P_ => ifElse(isEmpty$1)(always(empty()(([]))))((since => p(([className("definition__since")]))(([text$1("since v"), text$1(since)]))))((__R__ => __R__.since)(_P_)));

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Alternative.mad

  window.Alternative = {};

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Read.mad
  window.Read = {};

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/Number.mad

  Show['Number'] = {};
  Show['Number']['show'] = () => (x => x.toString());
  Read['Number'] = {};
  Read['Number']['read'] = () => fromString;
  let fromString = (str => {
    const n = parseFloat(str);
    return isNaN(n) ? Nothing : Just(n)
  });

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadParser/src/Main.mad

  let Loc = (a => b => c => ({ __constructor: "Loc", __args: [ a, b, c ] }));
  let Parser = (a => ({ __constructor: "Parser", __args: [ a ] }));
  let Error = (a => ({ __constructor: "Error", __args: [ a ] }));
  Functor['Parser'] = {};
  Functor['Parser']['map'] = () => (f => m => Parser((s => l => ((__x__) => {
    if (__x__.length === 2 && __x__[0].length === 1 && __x__[0][0].length === 2 && true && true && true) {
      let [[[a, b]],loc] = __x__;
      return ([([([f(a), b])]), loc]);
    }
    else if (__x__.length === 2 && __x__[0].length === 0 && true) {
      let [[],loc] = __x__;
      return ([([]), loc]);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(parse(m)(s)(l)))));
  Applicative['Parser'] = {};
  Applicative['Parser']['ap'] = () => (parserA => parserB => Parser((s => l => ((__x__) => {
    if (__x__.length === 2 && __x__[0].length === 0 && true) {
      let [[],l1] = __x__;
      return ([([]), l1]);
    }
    else if (__x__.length === 2 && __x__[0].length === 1 && __x__[0][0].length === 2 && true && true && true) {
      let [[[f, s1]],l1] = __x__;
      return ((__x__) => {
    if (__x__.length === 2 && __x__[0].length === 1 && __x__[0][0].length === 2 && true && true && true) {
      let [[[a, s2]],l2] = __x__;
      return ([([([f(a), s2])]), l2]);
    }
    else if (__x__.length === 2 && __x__[0].length === 0 && true) {
      let [[],l2] = __x__;
      return ([([]), l2]);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(parse(parserB)(s1)(l1));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(parse(parserA)(s)(l)))));
  Applicative['Parser']['pure'] = () => (a => Parser((s => l => ([([([a, s])]), l]))));
  Monad['Parser'] = {};
  Monad['Parser']['chain'] = () => (f => m => Parser((s => l => ((__x__) => {
    if (__x__.length === 2 && __x__[0].length === 0 && true) {
      let [[],ll] = __x__;
      return ([([]), ll]);
    }
    else if (__x__.length === 2 && __x__[0].length === 1 && __x__[0][0].length === 2 && true && true && true) {
      let [[[a, s1]],l1] = __x__;
      return parse(f(a))(s1)(l1);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(parse(m)(s)(l)))));
  Monad['Parser']['of'] = () => Applicative.Parser.pure();
  Alternative['Parser'] = {};
  Alternative['Parser']['alt'] = () => (ma => mb => Parser((s => l => ((__x__) => {
    if (__x__.length === 2 && __x__[0].length === 0 && true) {
      return parse(mb)(s)(l);
    }
    else {
      let res = __x__;
      return res;
    }
  })(parse(ma)(s)(l)))));
  Alternative['Parser']['empty'] = () => Parser((_ => l => ([([]), l])));
  let incLoc = (c => __x__ => ((__x__) => {
    if (__x__.__constructor === "Loc" && true && true && true) {
      let abs = __x__.__args[0];
      let line = __x__.__args[1];
      let col = __x__.__args[2];
      return (__eq__(c, "\n") ? Loc(abs + 1)(line + 1)(0) : Loc(abs + 1)(line)(col + 1));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  let parse = (parser => input => loc => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(parser));
  let runParser = (m => s => ((__x__) => {
    if (__x__.length === 2 && __x__[0].length === 1 && __x__[0][0].length === 2 && true && __x__[0][0][1] === "" && true) {
      let [[[res, ]],] = __x__;
      return Right(res);
    }
    else if (__x__.length === 2 && __x__[0].length === 1 && __x__[0][0].length === 2 && true && true && true) {
      let [[[, rest]],l] = __x__;
      return Left(Error(l));
    }
    else if (__x__.length === 2 && true && true) {
      let [,l] = __x__;
      return Left(Error(l));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(parse(m)(s)(Loc(0)(0)(0))));
  let anyChar = Parser((s => l => {
    let c = s[0];
    return c !== undefined
      ? [[[c, s.slice(1)]], incLoc(c)(l)]
      : [[], l]
  }));
  let location = Parser((s => l => ([([([l, s])]), l])));
  let oneOf = (cs => satisfy((__ph0__ => includes(__ph0__)(cs))));
  let notOneOf = (cs => satisfy(complement((__ph0__ => includes(__ph0__)(cs)))));
  let choice = (ps => reduce(Alternative.Parser.alt())(Alternative.Parser.empty())(ps));
  let many = (p => Parser((s => l => {
    let ss = s;
    let ll = l;
    let acc = [];
    while (true) {
      let [[res], loc] = parse(p)(ss)(ll);
      if (!res) break
      let [parsed, rest] = res;
      acc.push(parsed);
      ss = rest;
      ll = loc;
    }
    return [[[acc, ss]], ll]
  })));
  let some = (p => Monad.Parser.chain()((first => Functor.Parser.map()((rest => Monoid.List.mappend()(([first]))(rest)))(many(p))))(p));
  let manyTill = (p => end => Parser((s => l => {
      let result = maybeLoop(([s, l, ([])]))((state => ((__x__) => {
    if (__x__.length === 3 && true && true && true) {
      let [ss,ll,acc] = __x__;
      return ((__x__) => {
    if (__x__.length === 2 && __x__[0].length === 1 && __x__[0][0].length === 2 && true && true && true) {
      return Nothing;
    }
    else {
      return ((__x__) => {
    if (__x__.length === 2 && __x__[0].length === 1 && __x__[0][0].length === 2 && true && true && true) {
      let [[[parsed, rest]],loc] = __x__;
      return Just(([rest, loc, acc.push(parsed) && acc]));
    }
    else {
      return Nothing;
    }
  })(parse(p)(ss)(ll));
    }
  })(parse(end)(ss)(ll));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(state)));
      return ((__x__) => {
    if (__x__.length === 3 && true && true && true) {
      let [rest,loc,parseResult] = __x__;
      return ([([([parseResult, rest])]), loc]);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(result);
  })));
  let someTill = (p => end => Monad.Parser.chain()((first => Functor.Parser.map()((rest => Monoid.List.mappend()(([first]))(rest)))(manyTill(p)(end))))(p));
  let lookAhead = (p => Parser((s => l => ((__x__) => {
    if (__x__.length === 2 && __x__[0].length === 1 && __x__[0][0].length === 2 && true && true && true) {
      let [[[a, ]],] = __x__;
      return ([([([a, s])]), l]);
    }
    else {
      return ([([]), l]);
    }
  })(parse(p)(s)(l)))));
  let takeWhile = (pred => Parser((s => l => {
      let result = maybeLoop(([s, l, ""]))((state => ((__x__) => {
    if (__x__.length === 3 && true && true && true) {
      let [ss,ll,acc] = __x__;
      return ((__x__) => {
    if (__x__.length === 2 && __x__[0].length === 1 && __x__[0][0].length === 2 && true && true && true) {
      let [[[parsed, rest]],loc] = __x__;
      return (pred(parsed) ? Just(([rest, loc, acc + parsed])) : Nothing);
    }
    else {
      return Nothing;
    }
  })(parse(anyChar)(ss)(ll));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(state)));
      return ((__x__) => {
    if (__x__.length === 3 && true && true && true) {
      let [rest,loc,parseResult] = __x__;
      return ([([([parseResult, rest])]), loc]);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(result);
  })));
  let satisfy = (pred => Monad.Parser.chain()(ifElse(pred)(Monad.Parser.of())(always(Alternative.Parser.empty())))(anyChar));
  let char = (_P_ => satisfy(equals(_P_)));
  let notChar = (_P_ => satisfy(notEquals(_P_)));
  let eof = Parser((s => l => ((__x__) => {
    if (__x__.length === 2 && __x__[0].length === 0 && true) {
      return ([([([({ __constructor: "Unit", __args: [] }), ""])]), l]);
    }
    else {
      return ([([]), l]);
    }
  })(parse(anyChar)(s)(l))));
  let string = (s => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let c = __x__.__args[0];
      return (_P_ => (__ph0__ => Applicative.Parser.ap()(__ph0__)(string(drop$1(1)(s))))(Functor.Parser.map()((a => b => a + b))(_P_)))(char(c));
    }
    else if (__x__.__constructor === "Nothing") {
      return Applicative.Parser.pure()("");
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(firstChar(s)));
  let spaces = (_P_ => Functor.Parser.map()(reduce(Monoid.String.mappend())(""))(some(oneOf(_P_))))(([" ", "\n", "\r", "\t"]));
  let token = (__ph0__ => apL(Functor.Parser)(Applicative.Parser)(__ph0__)(spaces));
  let symbol = (_P_ => token(string(_P_)));
  let digit = satisfy(isDigit);
  let letter = satisfy(isLetter);
  let letters = (_P_ => Functor.Parser.map()(reduce(Monoid.String.mappend())(""))(many(satisfy(_P_))))(isLetter);
  var P = { runParser, anyChar, location, oneOf, notOneOf, choice, many, some, manyTill, someTill, lookAhead, takeWhile, satisfy, char, notChar, eof, string, spaces, token, symbol, digit, letter, letters, Loc, Error };

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadMarkdownParser/src/Main.mad

  let Text = (a => ({ __constructor: "Text", __args: [ a ] }));
  let Bold = (a => ({ __constructor: "Bold", __args: [ a ] }));
  let Italic = (a => ({ __constructor: "Italic", __args: [ a ] }));
  let InlineCode = (a => ({ __constructor: "InlineCode", __args: [ a ] }));
  let Link = (a => b => ({ __constructor: "Link", __args: [ a, b ] }));
  let Image = (a => b => ({ __constructor: "Image", __args: [ a, b ] }));
  let LineReturn = ({ __constructor: "LineReturn", __args: [  ] });
  let H1 = (a => ({ __constructor: "H1", __args: [ a ] }));
  let H2 = (a => ({ __constructor: "H2", __args: [ a ] }));
  let H3 = (a => ({ __constructor: "H3", __args: [ a ] }));
  let H4 = (a => ({ __constructor: "H4", __args: [ a ] }));
  let H5 = (a => ({ __constructor: "H5", __args: [ a ] }));
  let H6 = (a => ({ __constructor: "H6", __args: [ a ] }));
  let Paragraph = (a => ({ __constructor: "Paragraph", __args: [ a ] }));
  let Blockquote = (a => ({ __constructor: "Blockquote", __args: [ a ] }));
  let Code = (a => b => ({ __constructor: "Code", __args: [ a, b ] }));
  let UnorderedList = (a => ({ __constructor: "UnorderedList", __args: [ a ] }));
  let between = (start => mid => end => (_P_ => (__ph0__ => apL(Functor.Parser)(Applicative.Parser)(__ph0__)(end))((__ph0__ => Applicative.Parser.ap()(__ph0__)(mid))(mapL(Functor.Parser)(identity)(_P_))))(start));
  P.choice(([P.letter, P.digit, P.char("!"), P.char("?"), P.char(" ")]));
  let linkCharacter = P.choice(([P.letter, P.digit, P.char("/"), P.char(":"), P.char("?"), P.char("."), P.char("-"), P.char("_"), P.char("="), P.char("#")]));
  let bold = (_P_ => (__ph0__ => apL(Functor.Parser)(Applicative.Parser)(__ph0__)(P.string("**")))((__ph0__ => Applicative.Parser.ap()(__ph0__)((_P_ => Functor.Parser.map()(reduce(Monoid.String.mappend())(""))((a => P.someTill(a)(P.lookAhead(P.string("**"))))(_P_)))(P.notChar("\n"))))(mapL(Functor.Parser)(Bold)(_P_))))(P.string("**"));
  let italic = (_P_ => (__ph0__ => apL(Functor.Parser)(Applicative.Parser)(__ph0__)(P.char("*")))((__ph0__ => Applicative.Parser.ap()(__ph0__)((_P_ => Functor.Parser.map()(reduce(Monoid.String.mappend())(""))(P.many(_P_)))(P.notOneOf((["*", "\n"])))))((__ph0__ => Applicative.Parser.ap()(__ph0__)(P.notChar(" ")))(mapL(Functor.Parser)((a => b => Italic(a + b)))(_P_)))))(P.char("*"));
  let inlineCode = (_P_ => (__ph0__ => apL(Functor.Parser)(Applicative.Parser)(__ph0__)(P.char("`")))((__ph0__ => Applicative.Parser.ap()(__ph0__)((_P_ => Functor.Parser.map()(reduce(Monoid.String.mappend())(""))(P.many(_P_)))(P.notOneOf((["`", "\n"])))))(mapL(Functor.Parser)(InlineCode)(_P_))))(P.char("`"));
  let link = (_P_ => (__ph0__ => Applicative.Parser.ap()(__ph0__)(between(P.char("("))((_P_ => Functor.Parser.map()(reduce(Monoid.String.mappend())(""))(P.many(_P_)))(linkCharacter))(P.char(")"))))(Functor.Parser.map()(Link)(_P_)))(between(P.char("["))((_P_ => Functor.Parser.map()(reduce(Monoid.String.mappend())(""))(P.many(_P_)))(P.notOneOf((["]", "\n"]))))(P.char("]")));
  let image = (_P_ => (__ph0__ => Applicative.Parser.ap()(__ph0__)(between(P.char("("))((_P_ => Functor.Parser.map()(reduce(Monoid.String.mappend())(""))(P.many(_P_)))(linkCharacter))(P.char(")"))))((__ph0__ => Applicative.Parser.ap()(__ph0__)(between(P.char("["))((_P_ => Functor.Parser.map()(reduce(Monoid.String.mappend())(""))(P.many(_P_)))(P.notOneOf((["]", "\n"]))))(P.char("]"))))(mapL(Functor.Parser)(Image)(_P_))))(P.char("!"));
  let textTerminals = P.choice(([Functor.Parser.map()(always(""))(bold), Functor.Parser.map()(always(""))(italic), Functor.Parser.map()(always(""))(inlineCode), Functor.Parser.map()(always(""))(image), Functor.Parser.map()(always(""))(link), Functor.Parser.map()(always(""))(P.eof), P.char("\n")]));
  let text = (_P_ => Functor.Parser.map()((_P_ => Text(reduce(Monoid.String.mappend())("")(_P_))))((__ph0__ => P.someTill(__ph0__)(P.lookAhead(textTerminals)))(_P_)))(P.notChar("\n"));
  let lineReturn = Functor.Parser.map()(always(LineReturn))(P.char("\n"));
  let content = (_P_ => P.many(P.choice(_P_)))(([bold, italic, inlineCode, image, link, text]));
  let lineReturnExceptBefore = (before => (_P_ => Monad.Parser.chain()((__x__ => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      return Alternative.Parser.empty();
    }
    else if (__x__.__constructor === "Nothing") {
      return lineReturn;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__)))(P.lookAhead((__ph0__ => Applicative.Parser.ap()(__ph0__)(Alternative.Parser.alt()(Functor.Parser.map()(always(Just(({ __constructor: "Unit", __args: [] }))))(before))(Applicative.Parser.pure()(Nothing))))(mapL(Functor.Parser)(identity)(_P_)))))(lineReturn));
  let contentWithLineReturn = (delimiter => (_P_ => Functor.Parser.map()(dropWhile(equals(LineReturn)))(P.some(P.choice(_P_))))(([bold, italic, inlineCode, image, link, text, lineReturnExceptBefore(delimiter)])));
  let heading = (constructor => _P_ => (__ph0__ => apL(Functor.Parser)(Applicative.Parser)(__ph0__)(singleReturnTerminal))((__ph0__ => Applicative.Parser.ap()(__ph0__)(content))(mapL(Functor.Parser)(constructor)(P.symbol(_P_)))));
  let singleReturnTerminal = Alternative.Parser.alt()(P.char("\n"))(Functor.Parser.map()(always(""))(P.eof));
  let doubleReturnTerminal = P.choice(([P.string("\n\n"), Functor.Parser.map()(always(""))(P.eof), (_P_ => (__ph0__ => Applicative.Parser.ap()(__ph0__)(P.eof))(Applicative.Parser.ap()(Applicative.Parser.pure()((_ => __ => "")))(_P_)))(P.char("\n"))]));
  let code = (_P_ => (__ph0__ => apL(Functor.Parser)(Applicative.Parser)(__ph0__)(P.choice(([Functor.Parser.map()((_ => ""))(apL(Functor.Parser)(Applicative.Parser)(P.string("\n```"))(P.eof)), P.string("\n```\n")]))))((__ph0__ => Applicative.Parser.ap()(__ph0__)(Functor.Parser.map()(reduce(Monoid.String.mappend())(""))(P.manyTill(P.anyChar)(P.lookAhead(P.string("\n```"))))))((__ph0__ => apL(Functor.Parser)(Applicative.Parser)(__ph0__)(P.char("\n")))((__ph0__ => Applicative.Parser.ap()(__ph0__)(Alternative.Parser.alt()(P.letters)(Applicative.Parser.pure()(""))))(mapL(Functor.Parser)((lang => c => Code(lang)(c)))(_P_))))))(P.string("```"));
  let blockquote = (_P_ => (__ph0__ => apL(Functor.Parser)(Applicative.Parser)(__ph0__)(P.choice(([doubleReturnTerminal, P.lookAhead(P.string("\n```")), P.lookAhead(P.string("\n>"))]))))((__ph0__ => Applicative.Parser.ap()(__ph0__)(contentWithLineReturn(P.choice(([P.char("\n"), P.string("```"), P.char(">")])))))(mapL(Functor.Parser)(Blockquote)(_P_))))(Alternative.Parser.alt()(P.symbol(">"))(P.string(">")));
  let listItemStart = Functor.Parser.map()(always(""))(apL(Functor.Parser)(Applicative.Parser)(P.many(P.char(" ")))(apL(Functor.Parser)(Applicative.Parser)(P.oneOf((["*", "-", "+"])))(P.some(P.char(" ")))));
  let unorderedListItem = (_P_ => Monad.Parser.chain()(always(apL(Functor.Parser)(Applicative.Parser)(content)(singleReturnTerminal)))(_P_))(listItemStart);
  let unorderedList = (_P_ => Functor.Parser.map()(UnorderedList)(P.some(_P_)))(unorderedListItem);
  let paragraph = (_P_ => (__ph0__ => apL(Functor.Parser)(Applicative.Parser)(__ph0__)(P.choice(([doubleReturnTerminal, P.lookAhead(P.string("\n```")), P.lookAhead(P.string("\n>")), P.lookAhead(apL(Functor.Parser)(Applicative.Parser)(P.char("\n"))(listItemStart))]))))(Functor.Parser.map()(Paragraph)(_P_)))(contentWithLineReturn(P.choice(([listItemStart, P.char("\n"), P.string("```"), P.char(">")]))));
  let block = P.choice(([heading(H6)("######"), heading(H5)("#####"), heading(H4)("####"), heading(H3)("###"), heading(H2)("##"), heading(H1)("#"), unorderedList, blockquote, code, paragraph]));
  let markdownParser = (_P_ => Functor.Parser.map()((_P_ => Functor.List.map()((__x__ => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let x = __x__.__args[0];
      return x;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__)))(filter((__x__ => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      __x__.__args[0];
      return true;
    }
    else if (__x__.__constructor === "Nothing") {
      return false;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__)))(_P_))))(P.many(P.choice(_P_))))(([Functor.Parser.map()(always(Nothing))(P.spaces), Functor.Parser.map()(Just)(block)]));
  let parseMarkdown = (_P_ => mapLeft(always("Malformed markdown input"))(P.runParser(markdownParser)(_P_)));

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadMarkdownRenderer/src/Config.mad

  let defaultConfig = ({ linkView: (name => url => a(([href(url)]))(([text$1(name)]))) });
  let setLinkView = (linkView => config => ({ ...config, linkView: linkView }));

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadMarkdownRenderer/src/Main.mad

  let doRender = (config => markdown => div(([className("markdown")]))(([ ...Functor.List.map()(renderBlock(config))(markdown)])));
  let renderBlock = (config => __x__ => ((__x__) => {
    if (__x__.__constructor === "H1" && true) {
      let content = __x__.__args[0];
      return h1(([]))(([ ...renderContent(config)(content)]));
    }
    else if (__x__.__constructor === "H2" && true) {
      let content = __x__.__args[0];
      return h2(([]))(([ ...renderContent(config)(content)]));
    }
    else if (__x__.__constructor === "H3" && true) {
      let content = __x__.__args[0];
      return h3(([]))(([ ...renderContent(config)(content)]));
    }
    else if (__x__.__constructor === "H4" && true) {
      let content = __x__.__args[0];
      return h4(([]))(([ ...renderContent(config)(content)]));
    }
    else if (__x__.__constructor === "H5" && true) {
      let content = __x__.__args[0];
      return h5(([]))(([ ...renderContent(config)(content)]));
    }
    else if (__x__.__constructor === "H6" && true) {
      let content = __x__.__args[0];
      return h6(([]))(([ ...renderContent(config)(content)]));
    }
    else if (__x__.__constructor === "Paragraph" && true) {
      let content = __x__.__args[0];
      return p(([]))(([ ...renderContent(config)(content)]));
    }
    else if (__x__.__constructor === "Blockquote" && true) {
      let content = __x__.__args[0];
      return blockquote$1(([]))(([ ...renderContent(config)(content)]));
    }
    else if (__x__.__constructor === "Code" && true && true) {
      let content = __x__.__args[1];
      return code$1(([]))(([text$1(content)]));
    }
    else if (__x__.__constructor === "UnorderedList" && true) {
      let items = __x__.__args[0];
      return ul(([]))(([ ...Functor.List.map()((item => li(([]))(([ ...renderContent(config)(item)]))))(items)]));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  let renderContentPart = (config => __x__ => ((__x__) => {
    if (__x__.__constructor === "Text" && true) {
      let t = __x__.__args[0];
      return span(([className("markdown__text")]))(([text$1(t)]));
    }
    else if (__x__.__constructor === "Bold" && true) {
      let t = __x__.__args[0];
      return strong(([className("markdown__bold")]))(([text$1(t)]));
    }
    else if (__x__.__constructor === "Italic" && true) {
      let t = __x__.__args[0];
      return i(([className("markdown__italic")]))(([text$1(t)]));
    }
    else if (__x__.__constructor === "InlineCode" && true) {
      let t = __x__.__args[0];
      return span(([className("markdown__inline-code")]))(([text$1(t)]));
    }
    else if (__x__.__constructor === "Link" && true && true) {
      let t = __x__.__args[0];
      let l = __x__.__args[1];
      return config.linkView(t)(l);
    }
    else if (__x__.__constructor === "Image" && true && true) {
      let alt_ = __x__.__args[0];
      let s = __x__.__args[1];
      return img(([className("markdown__image"), src(s), alt(alt_)]))(([]));
    }
    else if (__x__.__constructor === "LineReturn") {
      return br(([]))(([]));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  let renderContent = (config => Functor.List.map()(renderContentPart(config)));
  let renderMarkdownWithConfig = (config => _P_ => (__x__ => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let ast = __x__.__args[0];
      return doRender(config)(ast);
    }
    else if (__x__.__constructor === "Left" && true) {
      return p(([]))(([text$1("Error processing the given markdown")]));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__))(parseMarkdown(_P_)));

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadDoc/src/Markdown.mad

  let mdConfig = (_P_ => setLinkView((txt => url => link$1(([className("markdown__link"), to(url)]))(([text$1(txt)]))))(_P_))(defaultConfig);
  let renderMarkdown = renderMarkdownWithConfig(mdConfig);

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadDoc/src/Views/Description.mad

  let Description = (_P_ => (content => div(([className("definition__description")]))(([content])))(renderMarkdown((__R__ => __R__.description)(_P_))));

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadDoc/src/Views/Example.mad

  let Example = (_P_ => ifElse(isEmpty$1)(always(empty()(([]))))((example => p(([className("definition__example")]))(([text$1(example)]))))((__R__ => __R__.example)(_P_)));

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadDoc/src/Views/Typing.mad

  let Typing = (_P_ => (typing => p(([]))(([span(([className("definition__type")]))(([text$1(typing)]))])))((__R__ => __R__.typing)(_P_)));

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadDoc/src/Views/Expression.mad

  let Expression = (moduleName => definition => li(([className("definition")]))(([ ...([Etiquette("Function"), Title(definition.name)(moduleName), Typing(definition), Since(definition), Description(definition), Example(definition)])])));

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadDoc/src/Views/SideMenu.mad

  let ModuleLink = (module => li(([className("side-menu__link-item")]))(([link$1(([className("side-menu__link"), to(`/${module.name}`)]))(([span(([className("side-menu__link-name")]))(([text$1(module.name)]))]))])));
  let MenuLink = (__x__ => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [name,moduleName] = __x__;
      return li(([className("side-menu__link-item")]))(([link$1(([className("side-menu__link"), to(`/${moduleName}/${name}`)]))(([span(([className("side-menu__link-name")]))(([text$1(name)])), span(([className("side-menu__link-extra")]))(([text$1(moduleName)]))]))]));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  let LinksForType = (search => getItems => getName => _P_ => itemsToLinks(Monad.List.chain()((module => (_P_ => Functor.List.map()((a => ([getName(a), module.name])))(List.filter((_P_ => String.match(search)(String.toLower(getName(_P_)))))(getItems(_P_))))(module)))(_P_)));
  let itemsToLinks = (_P_ => Functor.List.map()(MenuLink)(List.sortBy((a => b => Comparable.String.compare()(Tuple.fst(a))(Tuple.fst(b))))(_P_)));
  let sortAndFilterModules = (search => _P_ => List.sortBy((a => b => Comparable.String.compare()(a.name)(b.name)))(List.filter((_P_ => String.match(search)(String.toLower((__R__ => __R__.name)(_P_)))))(_P_)));
  let MenuSection = (title => items => (List.isEmpty(items) ? ([]) : ([h3(([className("side-menu__title")]))(([text$1(title)])), ul(([className("side-menu__link-list")]))(([ ...items]))])));
  let SideMenu = (search => modules => {
      let moduleLinks = Functor.List.map()(ModuleLink)(sortAndFilterModules(search)(modules));
      let functionLinks = LinksForType(search)((__R__ => __R__.expressions))((__R__ => __R__.name))(modules);
      let typeLinks = LinksForType(search)((__R__ => __R__.typeDeclarations))((__R__ => __R__.name))(modules);
      let aliasLinks = LinksForType(search)((__R__ => __R__.aliases))((__R__ => __R__.name))(modules);
      let interfaceLinks = LinksForType(search)((__R__ => __R__.interfaces))((__R__ => __R__.name))(modules);
      let instanceLinks = LinksForType(search)((__R__ => __R__.instances))((__R__ => __R__.declaration))(modules);
      let notFound = all(List.isEmpty)(([moduleLinks, functionLinks, typeLinks, aliasLinks, interfaceLinks, instanceLinks]));
      return (notFound ? div(([className("side-menu")]))(([p(([className("side-menu__no-result")]))(([text$1("No result was found for "), span(([className("side-menu__no-result-search")]))(([text$1(search)]))]))])) : div(([className("side-menu")]))(([div(([className("side-menu__scrollbar-container")]))(([ ...MenuSection("MODULES")(moduleLinks),  ...MenuSection("FUNCTIONS")(functionLinks),  ...MenuSection("TYPES")(typeLinks),  ...MenuSection("ALIASES")(aliasLinks),  ...MenuSection("INTERFACES")(interfaceLinks),  ...MenuSection("INSTANCES")(instanceLinks)]))])));
  });

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadDoc/src/Views/Header.mad

  let handleInput = (state => event => ((__x__) => {
    if (__x__.__constructor === "InputEvent" && true) {
      let e = __x__.__args[0];
      return ([Monad.Wish.of()(always(({ ...state, search: String.toLower(e.target.value) })))]);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(event));
  let Header = (_ => header(([className("header")]))(([h1(([className("header__title")]))(([text$1("MadDoc")])), input(([inputType("text"), placeholder("What are you looking for?"), className("search-field"), onInput(handleInput)]))(([]))])));

  // file: /opt/hostedtoolcache/node/14.17.5/x64/lib/node_modules/@madlib-lang/madlib/node_modules/binary-install/bin/prelude/__internal__/FilePath/Posix.mad

  let dropTrailingPathSeparator = ifElse((path => !__eq__(path, "/") && __eq__(String.lastChar(path), Just("/"))))(String.dropLast(1))(identity);
  let performSplitPath = (buffer => foundSlash => path => ((__x__) => {
    if (__x__.__constructor === "Nothing") {
      return ([buffer]);
    }
    else if (__x__.__constructor === "Just" && __x__.__args[0] === "/") {
      return performSplitPath(buffer + "/")(true)(String.drop(1)(path));
    }
    else if (__x__.__constructor === "Just" && true) {
      let char = __x__.__args[0];
      return (foundSlash ? Monoid.List.mappend()(([buffer]))(performSplitPath(char)(false)(String.drop(1)(path))) : performSplitPath(buffer + char)(false)(String.drop(1)(path)));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(String.firstChar(path)));
  let splitPath = performSplitPath("")(false);
  let joinPath = (_P_ => ifElse((_P_ => equals(Just("/"))(first(_P_))))((_P_ => Monoid.String.mappend()("/")(join(Show.String)(Show.String)("/")(Functor.List.map()(dropTrailingPathSeparator)(drop(1)(_P_))))))((_P_ => join(Show.String)(Show.String)("/")(Functor.List.map()(dropTrailingPathSeparator)(_P_))))(filter(complement(String.isEmpty))(_P_)));
  let canonicalizePath = (_P_ => joinPath(Functor.List.map()(ifElse((_P_ => equals(Just("/"))(String.lastChar(_P_))))(String.replace("([^/]*)/*")("$1/"))(identity))(splitPath(_P_))));
  let dropPathSegments = (howMany => _P_ => joinPath(drop(howMany)(splitPath(_P_))));
  let isRootPathOf = (root => path => {
      let rootParts = splitPath(root);
      let pathParts = splitPath(path);
      let rootStart = dropTrailingPathSeparator(fromMaybe("")(first(rootParts)));
      let pathStart = dropTrailingPathSeparator(fromMaybe("")(first(pathParts)));
      return (__eq__(rootStart, pathStart) || __eq__(rootStart, "") ? (__eq__(rootStart, "") ? true : isRootPathOf(dropPathSegments(1)(root))(dropPathSegments(1)(path))) : false);
  });

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadDoc/src/Views/Breadcrumbs.mad

  let Breadcrumb = (a => b => ({ __constructor: "Breadcrumb", __args: [ a, b ] }));
  let getLink = (__x__ => ((__x__) => {
    if (__x__.__constructor === "Breadcrumb" && true && true) {
      let l = __x__.__args[1];
      return l;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  let getName = (__x__ => ((__x__) => {
    if (__x__.__constructor === "Breadcrumb" && true && true) {
      let l = __x__.__args[0];
      return l;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  let generateBreadcrumbName = (_P_ => (pathSegment => (__eq__(pathSegment, "/") || __eq__(pathSegment, "") ? "home" : pathSegment))(canonicalizePath(_P_)));
  let computeBreadcrumbs = (_P_ => snd(reduce((acc => pathSegment => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [prevPath,breadcrumbs] = __x__;
      return (_P_ => (path => ([path, append(Breadcrumb(generateBreadcrumbName(pathSegment))(path))(breadcrumbs)]))(joinPath(append(pathSegment)(_P_))))(([prevPath]));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(acc)))((["", ([])]))(splitPath((__R__ => __R__.path)(_P_)))));
  let BreadcrumbItem = (breadcrumb => li(([className("breadcrumbs__item"), key(getLink(breadcrumb))]))(([link$1(([to(getLink(breadcrumb))]))(([text$1(getName(breadcrumb))]))])));
  let Breadcrumbs = (_P_ => (breadcrumbs => ul(([className("breadcrumbs")]))(([ ...breadcrumbs])))(intercalateWithIndex((i => span(([className("breadcrumbs__separator"), key(`sep-${Show.Number.show()(i)}`)]))(([text$1("/")]))))(Functor.List.map()(BreadcrumbItem)(computeBreadcrumbs(_P_)))));

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadDoc/src/Views/Type.mad

  let Type = (moduleName => typeDefinition => {
      let constructors = typeDefinition.constructors;
      let manyCtors = len$1(constructors) > 1;
      let renderedConstructors = (manyCtors ? ConstructorsView("=")(constructors) : ([span(([className("definition__constructor")]))(([span(([className("highlight")]))(([text$1(" = ")])), span(([]))(([text$1(fromMaybe("???")(first(constructors)))]))]))]));
      return li(([className("definition")]))(([ ...([Etiquette("Type"), Title(typeDefinition.name)(moduleName)]), div(([className("definition__adt")]))(([span(([className("highlight")]))(([text$1("type")])), span(([]))(([text$1(" "), text$1(typeDefinition.name), text$1(" "), text$1(typeDefinition.params)])), span(([className("definition__constructors")]))(([ ...renderedConstructors]))])),  ...([Since(typeDefinition), Description(typeDefinition), Example(typeDefinition)])]));
  });
  let ConstructorsView = (separator => items => ((__x__) => {
    if (__x__.length >= 1 && true && true) {
      let [ctor,...more] = __x__;
      return ([ConstructorView(separator)(ctor),  ...ConstructorsView("|")(more)]);
    }
    else if (__x__.length === 1 && true) {
      let [ctor] = __x__;
      return ([ConstructorView(separator)(ctor)]);
    }
    else if (__x__.length === 0) {
      return ([]);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(items));
  let ConstructorView = (separator => constructor => div(([className("definition__constructor")]))(([span(([className("highlight")]))(([text$1("  "), text$1(separator)])), span(([]))(([text$1(" "), text$1(constructor)]))])));

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadDoc/src/Views/Alias.mad

  let Alias = (moduleName => aliasDef => {
      let aliasedType = aliasDef.aliasedType;
      let params = (String.isEmpty(aliasDef.params) ? "" : ` ${aliasDef.params}`);
      return li(([className("definition")]))(([ ...([Etiquette("Alias"), Title(aliasDef.name)(moduleName)]), div(([className("definition__adt")]))(([span(([className("highlight")]))(([text$1("alias")])), span(([]))(([text$1(" "), text$1(aliasDef.name), text$1(params)])), span(([className("definition__constructors")]))(([span(([className("definition__constructor")]))(([span(([className("highlight")]))(([text$1(" = ")])), span(([]))(([text$1(aliasedType)]))]))]))])),  ...([Since(aliasDef), Description(aliasDef), Example(aliasDef)])]));
  });

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadDoc/src/Views/Interface.mad

  let Interface = (moduleName => interfaceDef => {
      let methods = interfaceDef.methods;
      let constraints = interfaceDef.constraints;
      let constraintElements = (!__eq__(constraints, "") ? ([span(([]))(([text$1(constraints)])), span(([className("highlight")]))(([text$1(` => `)]))]) : ([]));
      return li(([className("definition")]))(([ ...([Etiquette("Interface"), Title(interfaceDef.name)(moduleName)]), div(([className("definition__interface")]))(([span(([className("highlight")]))(([text$1("interface ")])), span(([]))(([ ...constraintElements])), span(([]))(([text$1(interfaceDef.name), text$1(" "), text$1(interfaceDef.vars)])), span(([className("highlight")]))(([text$1(` {`)])), div(([]))(([ ...Functor.List.map()((method => div(([]))(([text$1("  "), text$1(method)]))))(methods)])), span(([className("highlight")]))(([text$1(`}`)]))])),  ...([Since(interfaceDef), Description(interfaceDef), Example(interfaceDef)])]));
  });

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadDoc/src/Views/Instance.mad

  let Instance = (moduleName => instanceDef => {
      let constraints = instanceDef.constraints;
      let constraintElements = (!__eq__(constraints, "") ? ([span(([]))(([text$1(constraints)])), span(([className("highlight")]))(([text$1(` => `)]))]) : ([]));
      Title(instanceDef.declaration)(moduleName);
      return li(([className("definition")]))(([ ...([Etiquette("Instance"), Title(instanceDef.declaration)(moduleName)]), div(([className("definition__interface")]))(([span(([className("highlight")]))(([text$1("instance ")])), span(([]))(([ ...constraintElements])), span(([]))(([text$1(instanceDef.declaration)]))])),  ...([Since(instanceDef), Description(instanceDef), Example(instanceDef)])]));
  });

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadDoc/src/Parser/Documentation.mad

  let makeInstance = (declaration => constraints => description => since => example => ({ declaration: declaration, constraints: constraints, description: description, since: since, example: example }));
  let makeInterface = (name => vars => constraints => methods => description => since => example => ({ name: name, vars: vars, constraints: constraints, methods: methods, description: description, since: since, example: example }));
  let makeAlias = (name => params => aliasedType => description => since => example => ({ name: name, params: params, aliasedType: aliasedType, description: description, since: since, example: example }));
  let makeType = (name => params => constructors => description => since => example => ({ name: name, params: params, constructors: constructors, description: description, since: since, example: example }));
  let makeExpression = (name => description => typing => since => example => ({ name: name, description: description, typing: typing, since: since, example: example }));
  let makeModule = (path => name => description => expressions => typeDeclarations => aliases => interfaces => instances => ({ path: path, name: name, description: description, expressions: expressions, typeDeclarations: typeDeclarations, aliases: aliases, interfaces: interfaces, instances: instances }));
  let parser = Json.field("modules")(Json.list(Json.map8(makeModule)(Json.field("path")(Json.string))(Json.field("moduleName")(Json.string))(Json.field("description")(Json.string))(Json.field("expressions")(Json.list(Json.map5(makeExpression)(Json.field("name")(Json.string))(Json.field("description")(Json.string))(Json.field("type")(Json.string))(Json.field("since")(Json.string))(Json.field("example")(Json.string)))))(Json.field("typeDeclarations")(Json.list(Json.map6(makeType)(Json.field("name")(Json.string))(Json.field("params")(Json.string))(Json.field("constructors")(Json.list(Json.string)))(Json.field("description")(Json.string))(Json.field("since")(Json.string))(Json.field("example")(Json.string)))))(Json.field("aliases")(Json.list(Json.map6(makeAlias)(Json.field("name")(Json.string))(Json.field("params")(Json.string))(Json.field("aliasedType")(Json.string))(Json.field("description")(Json.string))(Json.field("since")(Json.string))(Json.field("example")(Json.string)))))(Json.field("interfaces")(Json.list(Json.map7(makeInterface)(Json.field("name")(Json.string))(Json.field("vars")(Json.string))(Json.field("constraints")(Json.string))(Json.field("methods")(Json.list(Json.string)))(Json.field("description")(Json.string))(Json.field("since")(Json.string))(Json.field("example")(Json.string)))))(Json.field("instances")(Json.list(Json.map5(makeInstance)(Json.field("declaration")(Json.string))(Json.field("constraints")(Json.string))(Json.field("description")(Json.string))(Json.field("since")(Json.string))(Json.field("example")(Json.string)))))));

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadDoc/src/PathResolver.mad

  let ModuleResult = (a => ({ __constructor: "ModuleResult", __args: [ a ] }));
  let ExpressionResult = (a => b => ({ __constructor: "ExpressionResult", __args: [ a, b ] }));
  let TypeResult = (a => b => ({ __constructor: "TypeResult", __args: [ a, b ] }));
  let AliasResult = (a => b => ({ __constructor: "AliasResult", __args: [ a, b ] }));
  let InterfaceResult = (a => b => ({ __constructor: "InterfaceResult", __args: [ a, b ] }));
  let InstanceResult = (a => b => ({ __constructor: "InstanceResult", __args: [ a, b ] }));
  let NotFound = ({ __constructor: "NotFound", __args: [  ] });
  let filterByPath = (path => {
      let canPath = canonicalizePath(path);
      return List.filter((module => (_P_ => ifElse(isRootPathOf(drop$1(1)(toLower(canPath))))(always(!(List.isEmpty(module.expressions)) || !(List.isEmpty(module.typeDeclarations)) || !(List.isEmpty(module.aliases)) || !(List.isEmpty(module.interfaces)) || !(List.isEmpty(module.instances))))((_P_ => any(isRootPathOf(drop$1(1)(toLower(canPath))))(Functor.List.map()((_P_ => toLower(Monoid.String.mappend()(`${module.name}/`)(_P_))))(always(([ ...Functor.List.map()((__R__ => __R__.name))(module.expressions),  ...Functor.List.map()((__R__ => __R__.name))(module.typeDeclarations),  ...Functor.List.map()((__R__ => __R__.name))(module.aliases),  ...Functor.List.map()((__R__ => __R__.name))(module.interfaces),  ...Functor.List.map()((__R__ => __R__.declaration))(module.instances)]))(_P_)))))(toLower((__R__ => __R__.name)(_P_))))(module)));
  });
  let getModulesToShow = (state => (_P_ => filterByPath(state.path)((__R__ => __R__.modules)(_P_)))(state));
  let isItemView = (path => ifElse((_P_ => equals(1)(List.len(_P_))))((_P_ => (__x__ => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let m = __x__.__args[0];
      return len$2(canonicalizePath(path)) > len$2(`/${m.name}`);
    }
    else if (__x__.__constructor === "Nothing") {
      return false;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__))(List.first(_P_))))(always(false)));
  let tryItemByKind = (constructor => getName => items => path => module => (_P_ => (__x__ => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let found = __x__.__args[0];
      return constructor(module.name)(found);
    }
    else if (__x__.__constructor === "Nothing") {
      return NotFound;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__))(List.find((e => __eq__(Just(getName(e)), List.last(split("/")(path)))))(_P_)))(items));
  let _findItem = (finders => path => module => ((__x__) => {
    if (__x__.length >= 1 && true && true) {
      let [_$_try_$_,...others] = __x__;
      return ((__x__) => {
    if (__x__.__constructor === "NotFound") {
      return _findItem(others)(path)(module);
    }
    else {
      let found = __x__;
      return found;
    }
  })(_$_try_$_(path)(module));
    }
    else if (__x__.length === 0) {
      return NotFound;
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(finders));
  let findItem = (path => module => _findItem(([tryItemByKind(ExpressionResult)((__R__ => __R__.name))(module.expressions), tryItemByKind(TypeResult)((__R__ => __R__.name))(module.typeDeclarations), tryItemByKind(AliasResult)((__R__ => __R__.name))(module.aliases), tryItemByKind(InterfaceResult)((__R__ => __R__.name))(module.interfaces), tryItemByKind(InstanceResult)((__R__ => __R__.declaration))(module.instances)]))(path)(module));
  let processPath = (state => (_P_ => ifElse(isItemView(state.path))((_P_ => (__x__ => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let m = __x__.__args[0];
      return findItem(state.path)(m);
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__))(List.first(_P_))))(ModuleResult)(getModulesToShow(_P_)))(state));

  // file: /home/runner/work/madparser/madparser/madlib_modules/MadDoc/src/Main.mad

  let docJson = "{\n  \"modules\": [\n    {\n      \"path\": \"/home/runner/work/madparser/madparser/src/Main.mad\",\n      \"moduleName\": \"Main\",\n      \"description\": \"\",\n      \"typeDeclarations\": [\n        {\n          \"type\": \"ADT\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"name\": \"Location\",\n          \"params\": \"\",\n          \"constructors\": [\n            \"Loc Number Number Number\"\n          ]\n        },\n        {\n          \"type\": \"ADT\",\n          \"description\": \"\",\n          \"example\": \"\",\n          \"since\": \"\",\n          \"name\": \"Error\",\n          \"params\": \"\",\n          \"constructors\": [\n            \"Error Location\"\n          ]\n        }\n      ],\n      \"aliases\": [\n        \n      ],\n      \"interfaces\": [\n        \n      ],\n      \"instances\": [\n        {\n          \"name\": \"Functor\",\n          \"description\": \"maps the contained value of a Parser.\",\n          \"example\": \"type Letter = Letter String\\nmap(Letter, anyChar) // Parser Letter\",\n          \"since\": \"0.0.1\",\n          \"constraints\": \"\",\n          \"declaration\": \"Functor Parser\"\n        },\n        {\n          \"name\": \"Applicative\",\n          \"description\": \"This the heart of how parser combinators work. With ap you can apply many\\narguments to a mapping function.\",\n          \"example\": \"parser = pipe(\\n  map((a, b, c) => a ++ b ++ c),\\n  ap($, abcParser),\\n  ap($, abcParser)\\n)(abcParser)\",\n          \"since\": \"0.0.1\",\n          \"constraints\": \"\",\n          \"declaration\": \"Applicative Parser\"\n        },\n        {\n          \"name\": \"Monad\",\n          \"description\": \"The Monad instance of Parser helps when you need to parse something based on\\nthe previous computation.\",\n          \"example\": \"\",\n          \"since\": \"0.0.1\",\n          \"constraints\": \"\",\n          \"declaration\": \"Monad Parser\"\n        },\n        {\n          \"name\": \"Alternative\",\n          \"description\": \"Alternative provides a way to fail over in case a parser failed. alt takes two\\nparsers, and if the first one fails, it tries to run the second one.\",\n          \"example\": \"runParser(alt(char(\\\"c\\\"), char(\\\"a\\\")), \\\"a\\\") // Right \\\"a\\\"\",\n          \"since\": \"0.0.1\",\n          \"constraints\": \"\",\n          \"declaration\": \"Alternative Parser\"\n        }\n      ],\n      \"expressions\": [\n        {\n          \"name\": \"runParser\",\n          \"description\": \"Runs a given parser with a given input. If it successful it returns a Right\\nof the parsed type, otherwise it returns an error with the location of where\\nit failed.\",\n          \"example\": \"runParser(anyChar, \\\"a\\\")\",\n          \"since\": \"0.0.1\",\n          \"type\": \"Parser a -> String -> Either Error a\"\n        },\n        {\n          \"name\": \"anyChar\",\n          \"description\": \"A parser combinator that matches any character and returns a Parser String\\ncontaining that character.\",\n          \"example\": \"parse(anyChar, \\\"?\\\") // Right \\\"?\\\"\",\n          \"since\": \"0.0.1\",\n          \"type\": \"Parser String\"\n        },\n        {\n          \"name\": \"location\",\n          \"description\": \"A parser combinator that returns the current location in the given input. This\\ncombinator can be used to collect location information for your parsed AST.\",\n          \"example\": \"type Letter = L Location Location String\\nexpected = Right()\\n\\nabcParser = pipe(\\n  map((start, c, end) => L(start, end, c)),\\n  ap($, oneOf([\\\"a\\\", \\\"b\\\", \\\"c\\\"])),\\n  ap($, location)\\n)(location)\\n\\nparser = pipe(\\n  map((a, b, c) => [a, b, c]),\\n  ap($, abcParser),\\n  ap($, abcParser)\\n)(abcParser)\\n\\nrunParser(parser, \\\"cba\\\")\\n// Right [\\n//   L(Loc(0, 0, 0), Loc(1, 0, 1), \\\"c\\\"),\\n//   L(Loc(1, 0, 1), Loc(2, 0, 2), \\\"b\\\"),\\n//   L(Loc(2, 0, 2), Loc(3, 0, 3), \\\"a\\\")\\n// ]\",\n          \"since\": \"0.0.1\",\n          \"type\": \"Parser Location\"\n        },\n        {\n          \"name\": \"oneOf\",\n          \"description\": \"A parser combinator that matches any of the given characters.\",\n          \"example\": \"runParser(oneOf([\\\"1\\\", \\\"-\\\", \\\"?\\\"]), \\\"?\\\") // Right \\\"?\\\"\\nrunParser(oneOf([\\\"1\\\", \\\"-\\\", \\\"?\\\"]), \\\"1\\\") // Right \\\"1\\\"\\nrunParser(oneOf([\\\"1\\\", \\\"-\\\", \\\"?\\\"]), \\\"2\\\") // Left (Loc 0 0 0)\",\n          \"since\": \"0.0.1\",\n          \"type\": \"List String -> Parser String\"\n        },\n        {\n          \"name\": \"notOneOf\",\n          \"description\": \"A parser combinator that matches all except the given characters.\",\n          \"example\": \"runParser(notOneOf([\\\"1\\\", \\\"-\\\", \\\"?\\\"]), \\\"?\\\") // Left (Loc 0 0 0)\\nrunParser(notOneOf([\\\"1\\\", \\\"-\\\", \\\"?\\\"]), \\\"1\\\") // Left (Loc 0 0 0)\\nrunParser(notOneOf([\\\"1\\\", \\\"-\\\", \\\"?\\\"]), \\\"2\\\") // Right \\\"2\\\"\",\n          \"since\": \"0.0.1\",\n          \"type\": \"List String -> Parser String\"\n        },\n        {\n          \"name\": \"choice\",\n          \"description\": \"A parser combinator that successively tries all given parsers until one\\nsucceeds, or fails if none has succeeded.\",\n          \"example\": \"parser = choice([string(\\\"good\\\"), string(\\\"really good\\\")])\\nrunParser(parser, \\\"good\\\")        // Right \\\"good\\\"\\nrunParser(parser, \\\"really good\\\") // Right \\\"really good\\\"\\nrunParser(parser, \\\"really\\\")      // Left (Loc 0 0 0)\",\n          \"since\": \"0.0.1\",\n          \"type\": \"List (Parser a) -> Parser a\"\n        },\n        {\n          \"name\": \"many\",\n          \"description\": \"A parser combinator that applies 0 or more times the given parser.\",\n          \"example\": \"runParser(many(string(\\\"OK\\\")), \\\"OKOKOK\\\") // Right [\\\"OK\\\", \\\"OK\\\", \\\"OK\\\"]\\nrunParser(many(string(\\\"O\\\")), \\\"OKOKOK\\\")  // Left (Loc 1 0 1)\",\n          \"since\": \"0.0.1\",\n          \"type\": \"Parser a -> Parser (List a)\"\n        },\n        {\n          \"name\": \"some\",\n          \"description\": \"A parser combinator that applies 1 or more times the given parser. If no parse\\nfound at all it\'ll fail.\",\n          \"example\": \"runParser(some(string(\\\"OK\\\")), \\\"OKOKOK\\\") // Right [\\\"OK\\\", \\\"OK\\\", \\\"OK\\\"]\\nrunParser(some(string(\\\"OK\\\")), \\\"NOPE\\\")   // Left (Loc 0 0 0)\",\n          \"since\": \"0.0.1\",\n          \"type\": \"Parser a -> Parser (List a)\"\n        },\n        {\n          \"name\": \"manyTill\",\n          \"description\": \"A parser combinator that matches many times the first given parser until the\\nsecond one matches. Note that the input matched by the end parser will then\\nbe consumed. If you don\'t want to consume the end parser\'s matched input,\\nyou can use lookAhead.\",\n          \"example\": \"parser = manyTill(char(\\\"a\\\"), char(\\\"b\\\"))\\nrunParser(parser, \\\"aaaaab\\\") // Right \\\"aaaaa\\\"\",\n          \"since\": \"0.0.1\",\n          \"type\": \"Parser a -> Parser b -> Parser (List a)\"\n        },\n        {\n          \"name\": \"someTill\",\n          \"description\": \"A parser combinator that matches one or more times the first given parser until the\\nsecond one matches. If the first parser does not match the input, it will fail.\\nNote that the input matched by the end parser will then be consumed. If you don\'t\\nwant to consume the end parser\'s matched input, you can use lookAhead.\",\n          \"example\": \"parser1 = someTill(char(\\\"a\\\"), char(\\\"b\\\"))\\nrunParser(parser1, \\\"aaaaab\\\") // Right \\\"aaaaa\\\"\\n\\nparser2 = someTill(char(\\\"a\\\"), char(\\\"b\\\"))\\nrunParser(parser2, \\\"b\\\") // Left (Loc 0 0 0)\",\n          \"since\": \"0.0.1\",\n          \"type\": \"Parser a -> Parser b -> Parser (List a)\"\n        },\n        {\n          \"name\": \"lookAhead\",\n          \"description\": \"A parser combinator that makes the given parser not consume any input.\",\n          \"example\": \"alt(char(\\\"a\\\"), lookAhead(anyChar))\",\n          \"since\": \"0.0.1\",\n          \"type\": \"Parser a -> Parser a\"\n        },\n        {\n          \"name\": \"takeWhile\",\n          \"description\": \"A parser combinator that parses all characters while the given predicate\\nreturns true.\",\n          \"example\": \"runParser(takeWhile(notEquals(\\\"-\\\")), \\\"abcdef-\\\")\",\n          \"since\": \"0.0.1\",\n          \"type\": \"(String -> Boolean) -> Parser String\"\n        },\n        {\n          \"name\": \"satisfy\",\n          \"description\": \"A parser combinator that parses a character based on a given predicate.\",\n          \"example\": \"runParser(satisfy(isDigit), \\\"1\\\")  // Right \\\"1\\\"\\nrunParser(satisfy(isLetter), \\\"1\\\") // Left (Loc 0 0 0)\",\n          \"since\": \"0.0.1\",\n          \"type\": \"(String -> Boolean) -> Parser String\"\n        },\n        {\n          \"name\": \"char\",\n          \"description\": \"A parser combinator that parses a single given character.\",\n          \"example\": \"runParser(char(\\\"a\\\"), \\\"a\\\") // Right \\\"a\\\"\\nrunParser(char(\\\"a\\\"), \\\"b\\\") // Left (Loc 0 0 0)\",\n          \"since\": \"0.0.1\",\n          \"type\": \"String -> Parser String\"\n        },\n        {\n          \"name\": \"notChar\",\n          \"description\": \"The complement of char, it parses any char that not the one given.\",\n          \"example\": \"runParser(notChar(\\\"a\\\"), \\\"a\\\") // Left (Loc 0 0 0)\\nrunParser(notChar(\\\"a\\\"), \\\"b\\\") // Right \\\"a\\\"\",\n          \"since\": \"0.0.1\",\n          \"type\": \"String -> Parser String\"\n        },\n        {\n          \"name\": \"eof\",\n          \"description\": \"A parser combinator that parses the eof token, or the end of the input.\",\n          \"example\": \"runParser(eof, \\\"\\\")  // Right ()\\nrunParser(eof, \\\"a\\\") // Left (Loc 0 0 0)\",\n          \"since\": \"0.0.1\",\n          \"type\": \"Parser ()\"\n        },\n        {\n          \"name\": \"string\",\n          \"description\": \"A parser combinator that parses a given string.\",\n          \"example\": \"runParser(string(\\\"hello world\\\"), \\\"hello world\\\") // Right \\\"hello world\\\"\\nrunParser(string(\\\"hello world\\\"), \\\"hello\\\")       // Left (Loc 0 0 0)\",\n          \"since\": \"0.0.1\",\n          \"type\": \"String -> Parser String\"\n        },\n        {\n          \"name\": \"spaces\",\n          \"description\": \"A parser combinator that parses empty characters such as spaces, line returns\\nor tabs.\",\n          \"example\": \"runParser(spaces, \\\" \\\\t\\\\n\\\")  // Right \\\" \\\\t\\\\n\\\"\\nrunParser(spaces, \\\" \\\\t\\\\na\\\") // Left (Loc 0 0 0)\",\n          \"since\": \"0.0.1\",\n          \"type\": \"Parser String\"\n        },\n        {\n          \"name\": \"token\",\n          \"description\": \"A parser combinator that parses the given parser and discards all trailing\\nspaces.\",\n          \"example\": \"runParser(token(string(\\\"hello\\\")), \\\"hello\\\\n\\\")  // Right \\\"hello\\\"\\nrunParser(token(string(\\\"hello\\\")), \\\"hello\\\\n!\\\") // Left (Loc 0 0 0)\",\n          \"since\": \"0.0.1\",\n          \"type\": \"Parser a -> Parser a\"\n        },\n        {\n          \"name\": \"symbol\",\n          \"description\": \"A parser combinator that parses a given string and discards all trailing\\nspaces.\",\n          \"example\": \"runParser(symbol(\\\"hello\\\"), \\\"hello\\\\n\\\")  // Right \\\"hello\\\"\\nrunParser(symbol(\\\"hello\\\"), \\\"hello\\\\n!\\\") // Left (Loc 0 0 0)\",\n          \"since\": \"0.0.1\",\n          \"type\": \"String -> Parser String\"\n        },\n        {\n          \"name\": \"digit\",\n          \"description\": \"A parser combinator that parses a digit.\",\n          \"example\": \"\",\n          \"since\": \"0.0.1\",\n          \"type\": \"Parser String\"\n        },\n        {\n          \"name\": \"letter\",\n          \"description\": \"A parser combinator that parses a letter.\",\n          \"example\": \"\",\n          \"since\": \"0.0.1\",\n          \"type\": \"Parser String\"\n        },\n        {\n          \"name\": \"letters\",\n          \"description\": \"A parser combinator that parses many letters.\",\n          \"example\": \"\",\n          \"since\": \"0.0.1\",\n          \"type\": \"Parser String\"\n        }\n      ]\n    }\n  ]\n}\n";
  let parsedDocumentation = Json.parse(parser)(docJson);
  let initialState = ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let modules = __x__.__args[0];
      return ({ modules: modules, search: "", path: URL.decode(getUrl()) });
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(parsedDocumentation);
  let ModuleView = (module => div(([className("module")]))(([h2(([className("module__title")]))(([link$1(([to(`/${module.name}`)]))(([text$1(module.name)]))])), (String.isEmpty(module.description) ? empty()(([])) : p(([className("module__description")]))(([renderMarkdown(module.description)]))), ul(([className("content__items")]))(([ ...Functor.List.map()(Type(module.name))(module.typeDeclarations),  ...Functor.List.map()(Alias(module.name))(module.aliases),  ...Functor.List.map()(Interface(module.name))(module.interfaces),  ...Functor.List.map()(Instance(module.name))(module.instances),  ...Functor.List.map()(Expression(module.name))(module.expressions)]))])));
  let ContentView = (__x__ => ((__x__) => {
    if (__x__.__constructor === "ModuleResult" && true) {
      let modules = __x__.__args[0];
      return div(([]))(([ ...Functor.List.map()(ModuleView)(modules)]));
    }
    else if (__x__.__constructor === "ExpressionResult" && true && true) {
      let moduleName = __x__.__args[0];
      let exp = __x__.__args[1];
      return ul(([className("content__items")]))(([Expression(moduleName)(exp)]));
    }
    else if (__x__.__constructor === "TypeResult" && true && true) {
      let moduleName = __x__.__args[0];
      let t = __x__.__args[1];
      return ul(([className("content__items")]))(([Type(moduleName)(t)]));
    }
    else if (__x__.__constructor === "AliasResult" && true && true) {
      let moduleName = __x__.__args[0];
      let t = __x__.__args[1];
      return ul(([className("content__items")]))(([Alias(moduleName)(t)]));
    }
    else if (__x__.__constructor === "InterfaceResult" && true && true) {
      let moduleName = __x__.__args[0];
      let t = __x__.__args[1];
      return ul(([className("content__items")]))(([Interface(moduleName)(t)]));
    }
    else if (__x__.__constructor === "InstanceResult" && true && true) {
      let moduleName = __x__.__args[0];
      let t = __x__.__args[1];
      return ul(([className("content__items")]))(([Instance(moduleName)(t)]));
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(__x__));
  let DocApp = (state => {
      getModulesToShow(state);
      let pathResult = processPath(state);
      return div(([className("documentation")]))(([Header(), SideMenu(state.search)(state.modules), main(([className("documentation__content")]))(([Breadcrumbs(state), ContentView(pathResult)]))]));
  });
  onUrlChanged(syncAction((state => event => ((__x__) => {
    if (__x__.__constructor === "UrlEvent" && true) {
      let { url: url } = __x__.__args[0];
      return ({ ...state, path: URL.decode(url) });
    }
    else {
      console.log('non exhaustive patterns for value: ', __x__.toString()); 
      console.trace(); 
      throw 'non exhaustive patterns!';
    }
  })(event))));
  render(DocApp)(initialState)("app");
  var Main = {};

  return Main;

})));
