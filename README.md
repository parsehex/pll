# pll

A simple NodeJS script to help run commands in parallel ("pll" === "parallel").

**WARNING**: Do not pass unsanitized user input to `pll`!

`pll` is just a basic wrapper for Node's `exec` function. It doesn't do anything with the output other than provide a way to read it.

## Usage

See `example.js`.

## Options

Pass an options object as the second argument with any of the following properties:

- `noCommandEcho`: By default the first `output` will be the called command. Setting this to `true` will avoid that behavior.
- `noColor`: Disable color in output by setting to `true`.
