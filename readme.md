# binary.js

Provides a ~~very fast~~ and ~~robust~~ interface for binary conversions in JavaScript.
Ships with a few built-in conversion functions (from and to Q32, Int32, Int16, Int8, Uint32, Uint16 and Uint8), and it's very simple to expand and make your own.

## Reference (e.g. Q32 [Q: a ranged value, -1 – +1] )

```javascript

// to convert from Q32 to string
Binary.fromQ32(Q32 num, bool useBigEndian [ = false])

// to convert from String to Q32
Binary.toQ32(char* str, bool useBigEndian [ = false])

// to create custom Q16 conversion functions
// use Binary(int bitCount, bool isSigned [ = false], bool isQ [ = false], bool isFromFunction [ = false])
Binary.fromQ16 = Binary(16, true, true, true);
Binary.toQ16 = Binary(16, true, true, false);

```

Those calls will create functions all ready and optimized for you to use.

Tips:
* Be sure to make the functions you use local to make most of the superb performance.
* Doesn't support converting data that is not byte aligned (bitCount % 8 !== 0)

## Disclaimer

You're probably better off not using this library, and I suggest you don't, so don't come blaming me if it doesn't work like you thought it would.

## License

Licensed under BSD License.
