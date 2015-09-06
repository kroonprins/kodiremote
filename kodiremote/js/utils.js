/**
 * Function merging n arrays into 1 array of maps.
 * The input of the function is a list of arrays and for each array a "key" that will be used in the map.
 * For example:
 * 	input: [{"array":[100,200],"key":"aa"},{"array":[300,400],"key":"bb"},{"array":[500,600],"key":"cc"},{"array":[700,800],"key":"dd"}]
 * 	output: [{"aa":100,"bb":300,"cc":500,"dd":700},{"aa":200,"bb":400,"cc":600,"dd":800}]
 * Note, the function assumes that the input is correct:
 * 	* correct use of properties "array" and "key"
 * 	* all arrays have the same size
 * 	* arrays at least empty (not undefined, null, or whatnot)
 * 	If this is not the case the output might be unexpected.
 */
function arrayMerge(input){
	var output = [];
	for(var i=0; i<input.length; i++){
		for(var j=0; j<input[i].array.length; j++){
			var map = output[j];
			if(!map){
				map = {};
				output[j]=map;
			}
			map[input[i].key]=input[i].array[j];
		}
	}
	return output;
}
