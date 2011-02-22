if (typeof require === 'function'){
	var Binary = require('../js/binary.js').Binary;
	console.log('a');
}

var	fromFloat32	= Binary.fromFloat32,
	fromInt32	= Binary.fromInt32,
	fromInt16	= Binary.fromInt16,
	fromInt8	= Binary.fromInt8,
	fromUint32	= Binary.fromUint32,
	fromUint16	= Binary.fromUint16,
	fromUint8	= Binary.fromUint8,

	content		= '',
	tableStart	= '',
	rowStart	= '| ',
	tabDelimiter	= '\t\t| ',
	lineEnd		= '\t\t|\n',
	tableEnd	= '\n';

function test(values, functions){
	var	l	= values.length,
		m	= functions.length,
		i, n;
	content += tableStart;
	for (i=0; i<l; i++){
		content += rowStart + values[i];
		for (n=0; n<m; n++){
			content += tabDelimiter + functions[n](values[i]);
		}
		content += lineEnd;
	}
	content += tableEnd;
}

function reverseTest(name, values){
	var	fromFunc	= Binary['from' + name],
		toFunc		= Binary['to' + name],
		l		= values.length,
		value,
		i;

	for (i=0; i<l; i++){
		try{
			value = toFunc(fromFunc(values[i]));
			content += name + '(' + values[i] + '):\t' + (value === values[i] ? 'success' : 'fail (' + value + ')') + '\n';
		} catch(e){
			content += name + '(' + values[i] + '):\tfail\n';
		}
	}
}

content		+= '| Floats\t| 32 bit\t|\n';
test([1.0, 0.75, 0.5, 0.25, 0.0, -0.25, -0.5, -0.75, -1.0], [fromFloat32]);
content		+= '\n';
content		+= '| Integers\t| 32 bit\t| 16 bit\t| 8 bit\t\t|\n';
test([255, 100, 50, 1000], [fromInt32, fromInt16, fromInt8]);
content		+= '\n';
content		+= '| Uint\t\t| 32 bit\t| 16 bit\t| 8 bit\t\t|\n';
test([255, -100, 50, 1000, -500], [fromUint32, fromUint16, fromUint8]);
content		+= '\n';

reverseTest('Float32'	, [1.0, 0.75, 0.5, 0.25, 0.0, -0.25, -0.5, -0.75, -1.0]);
reverseTest('Int32'	, [255, -100, 50, 1000, -500, -2147483648, 2147483647]);
reverseTest('Int16'	, [255, -100, 50, 1000, -500, -32768, 32767]);
reverseTest('Int8'	, [-100, 50, 127, -128]);
reverseTest('Uint32'	, [255, 100, 50, 1000]);
reverseTest('Uint16'	, [255, 100, 50, 1000]);
reverseTest('Uint8'	, [255, 100, 50]);

console.log(content);
