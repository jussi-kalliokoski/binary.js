binary.js
=========

Provides a very fast and robust interface for binary conversions in JavaScript.
Ships with a few built-in conversion functions (from and to Float32, Int32, Int16, Int8, Uint32, Uint16 and Uint8), and it's very simple to expand and make your own.

Reference (e.g. Float32)
------------------------

```javascript

// to convert from Float32 to string
Binary.fromFloat32(float32 num, bool useLittleEndian [ = false])

// to convert from String to Float32
Binary.toFloat32(char* str, bool useLittleEndian [ = false])

// to create custom Float16 conversion functions
// use Binary(int bitCount, bool isSigned [ = false], bool isFloat [ = false], bool isFromFunction [ = false])
Binary.fromFloat16 = Binary(16, true, true, true);
Binary.toFloat16 = Binary(16, true, true, false);

```

Those calls will create functions all ready and optimized for you to use.

Tips:
* Be sure to make the functions you use local to make most of the superb performance.
* Doesn't support converting data that is not byte aligned (bitCount % 8 !== 0)

Licensed under MIT License.