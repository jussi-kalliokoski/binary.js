var Binary = (function(Math){

	var	fromCharCode	= String.fromCharCode,
		// the following two aren't really *optimization*, but compression optimization.
		y		= true,
		n		= false;

	function convertToBinaryBE(num, size){
			return size ? fromCharCode(num & 255) + convertToBinaryBE(num >> 8, size - 1) : '';
	}

	function convertToBinaryLE(num, size){ // I don't think this is right
			return size ? convertToBinaryLE(num >> 8, size - 1) + fromCharCode(255 - num & 255) : '';
	}

	function convertToBinary(num, size, littleEndian){
		return littleEndian ? convertToBinaryLE(num, size) : convertToBinaryBE(num, size);
	}

	function convertFromBinary(str, littleEndian){
		var	l	= str.length,
			last	= l - 1,
			n	= 0,
			pow	= Math.pow,
			i;
		if (littleEndian){
			for (i = l-1; i >= 0; i--){
				n += (255 - str.charCodeAt(i)) * pow(256, i);
			}
		} else {
			for (i=0; i<l; i++){
				n += str.charCodeAt(i) * pow(256, last - i);
			}
		}
		return n;
	}

	// The main function creates all the functions used.
	function Binary(bitCount, signed, /* false === unsigned */ isFloat, from /* false === to */){

		// This is all just for major optimization benefits.
		var	pow			= Math.pow,
			floor			= Math.floor,
			convertFromBinary	= Binary.convertFromBinary,
			convertToBinary		= Binary.convertToBinary,

			byteCount		= bitCount / 8,
			bitMask			= pow(2, bitCount),
			semiMask		= bitMask / 2,
			floatMask		= semiMask - 0.5,
			intMask			= bitMask - 1,
			byteSize		= 255,
			invBitMask		= 1 / bitMask,
			invSemiMask		= 1 / semiMask,
			invFloatMask		= 1 / floatMask,
			invIntMask		= 1 / intMask;

		return from ?
			isFloat ?
				signed ? function(num, littleEndian){
					num = floor(num * semiMask);
					return convertToBinary(
						num < 0 ? semiMask - num : num,
						byteCount,
						littleEndian
					);
				} : function(num, littleEndian){
					return convertToBinary(
						floor(num * semiMask),
						byteCount,
						littleEndian
					);
				}
			:
				signed ? function(num, littleEndian){
					return convertToBinary(
						num < 0 ? semiMask - num : num,
						byteCount,
						littleEndian
					);
				} : function(num, littleEndian){
					return convertToBinary(
						num,
						byteCount,
						littleEndian
					);
				}
		:
			isFloat ?
				signed ? function(str, littleEndian){
					return convertFromBinary(str, littleEndian) * invFloatMask - 0.5;
				} : function(str, littleEndian){
					return convertFromBinary(str, littleEndian) * invBitMask;
				}
			:
				signed ? function(str, littleEndian){
					return convertFromBinary(str, littleEndian) - intMask;
				} : function(str, littleEndian){
					return convertFromBinary(str, littleEndian);
				};
	}

	Binary.convertToBinary		= convertToBinary;
	Binary.convertFromBinary	= convertFromBinary;
	// bits, signed, float, from
	Binary.fromFloat64		= Binary(64, y, y, y);
	Binary.toFloat64		= Binary(64, y, y, n);
	Binary.fromFloat32		= Binary(32, y, y, y);
	Binary.toFloat32		= Binary(32, y, y, n);
	Binary.fromInt32		= Binary(32, y, n, y);
	Binary.toInt32			= Binary(32, y, n, n);
	Binary.fromInt16		= Binary(16, y, n, y);
	Binary.toInt16			= Binary(16, y, n, n);
	Binary.fromInt8			= Binary( 8, y, n, y);
	Binary.toInt8			= Binary( 8, y, n, n);
	Binary.fromUint32		= Binary(32, n, n, y);
	Binary.toUint32			= Binary(32, n, n, n);
	Binary.fromUint16		= Binary(16, n, n, y);
	Binary.toUint16			= Binary(16, n, n, n);
	Binary.fromUint8		= Binary( 8, n, n, y);
	Binary.toUint8			= Binary( 8, n, n, n);

	return Binary;
}(Math));
