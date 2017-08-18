export module SerializationUtils {

    export function deserialize(json: any, environment: any) {
        try {
            var instance = new environment[json.$name]();
            for (var prop in json) {
                if (!json.hasOwnProperty(prop)) {
                    continue;
                }
                if (Array.isArray(json[prop])) {
                    var arr: any = [];
                    Array.from(json[prop]).forEach((i) => {
                        arr.push(deserialize(json[prop], environment));
                    });
                    instance[prop] = arr;
                } else if (typeof json[prop] === 'object') {
                    instance[prop] = deserialize(json[prop], environment);
                } else {
                    instance[prop] = json[prop];
                }
            }
            return instance;
        } catch (err) {
            // console.error("Failed to deserialize:");
            // console.error(json);
            throw err;
        }
    }

    export function jsonStringify(obj: any): string {
        var cache: any = [];
        return JSON.stringify(obj, function (key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        });
    }
    export function jsonParse(jsonString: string): any {
        return JSON.parse(jsonString);
    }


}