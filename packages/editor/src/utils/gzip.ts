	import pako from "pako";
	// ArrayBuffer转为字符串，参数为ArrayBuffer对象
	export function ab2str(buf: Iterable<number>) {
 
	    let binaryString = '';
 
	    const bytes = new Uint16Array(buf);
 
	    const length = bytes.length;
 
	    for (let i = 0; i < length; i++) {
 
	        binaryString += String.fromCharCode(bytes[i]);
 
	    }
 
	    return binaryString;
 
	}
 
	export function unzip(b64Data: string) {
 
	    let result;
 
	    let binData;
 
	    try {
 
	        const strData = atob(b64Data);
 
	        // Convert binary string to character-number array
 
	        const charData = strData.split('').map(x => {
 
	            return x.charCodeAt(0);
 
	        });
 
	        // Turn number array into byte-array
 
	        binData = new Uint8Array(charData);
 
	        // unzip
 
	    } catch (e) {
 
	        return {};
 
	    }
 
	
 
	
 
	    const data = pako.inflate(binData);
 
	    // Convert gunzipped byteArray back to ascii string:
 
	    try {
 
	        result = JSON.parse(decodeURIComponent(ab2str(data)));
 
	    } catch (e) {
 
	        result = decodeURIComponent(ab2str(data));
 
	    }
 
	
 
	    return result;
 
	}
 
	
 
	export function zip(str: string | number | boolean) {
 
	    if (str && typeof str === 'object') {
 
	        str = JSON.stringify(str);
 
	    }
 
	    const binaryString = pako.deflate(encodeURIComponent(str), { level: 9 });
 
	    const v = ab2str(binaryString);
 
	    return btoa(v);
 
	} 
