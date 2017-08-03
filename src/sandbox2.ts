import "reflect-metadata";
import SERVICE_IDENTIFIER from "./server/constants/identifiers";
import container from "./server/config/ioc-config";
import { MessageHandlerRegistryImpl } from "./server/handlers/message-handler-registry-impl";
import { MessageHandlerRegistry } from "./server/handlers/message-handler-registry";
import { inject, injectable, named } from "inversify";

class Test {
    @inject(SERVICE_IDENTIFIER.MessageHandlerRegistry) 
    public registry: MessageHandlerRegistry;


    doIt() {
        console.log(this.registry.find("HelloMessage"));
    }

}

var registry:MessageHandlerRegistry = container.get<MessageHandlerRegistry>(SERVICE_IDENTIFIER.MessageHandlerRegistry);
registry.find("xxx");

