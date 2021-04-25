# madparser
[![build](https://github.com/madlib-lang/madparser/actions/workflows/build.yml/badge.svg)](https://github.com/madlib-lang/madparser/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/madlib-lang/madparser/badge.svg?branch=master)](https://coveralls.io/github/madlib-lang/madparser?branch=master)

Parser is a parser library consisting of a Parser Monad and a lot of combinators. It is very close to attoparsec in its essense and should be used in a similar way. In most cases using Applicative and Functor instances should be enough and prefered.

## API Reference
The full documentation of all combinators available is available here: [api reference](https://madlib-lang.github.io/madparser/).

## How to install it
Add it to the dependencies of your `madlib.json` file:
```json
{
  "dependencies": {
    "MadParser": "https://github.com/madlib-lang/madparser/archive/refs/heads/master.zip"
}
```
Run `madlib install`

## Basic usage
```madlib
import { oneOf, runParser } from "MadParser"
import IO from "IO"

input = "cba"

abcParser = oneOf(["a", "b", "c"])

parser = pipe(
  map((a, b, c) => a ++ b ++ c),
  ap($, abcParser),
  ap($, abcParser)
)(abcParser)

runParser(parser, input) |> IO.log
```

## Examples
There is currently a markdown parser based on it that is mainly used to render markdown within [MadUI](https://github.com/madlib-lang/madui) applications. You can find it here: [https://github.com/madlib-lang/madmarkdown-parser](https://github.com/madlib-lang/madmarkdown-parser).
