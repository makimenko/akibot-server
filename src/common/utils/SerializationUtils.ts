export module SerializationUtils {

    export function deserialize(json: any, environment: any) {
        var instance = new environment[json.$name]();
        for (var prop in json) {
            if (!json.hasOwnProperty(prop)) {
                continue;
            }

            if (typeof json[prop] === 'object') {
                instance[prop] = deserialize(json[prop], environment);
            } else {
                instance[prop] = json[prop];
            }
        }
        return instance;
    }


}