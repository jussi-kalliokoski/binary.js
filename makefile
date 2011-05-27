all:
	yui-compressor js/binary.js -o binary.min.js
	cat js/* > binarystream.js
