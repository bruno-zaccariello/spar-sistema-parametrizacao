import { IdUtils } from "../../../core/utils/id.util";


export class JsonNode<T = any> {
    private static idGenerator = IdUtils.idGenerator();

    constructor(partial: Partial<JsonNode<T>>) {
        Object.assign(this, partial);
    }

    id?: number = JsonNode.idGenerator.next().value;
    key!: string;
    children!: JsonNode<any>[];

    level!: number;
    type?: string;

    value!: T;
    expanded: boolean = true;

    parentRef: JsonNode<any> | null = null;
    arrayIndex?: number;

    error?: string;

    static getType(value: any): string {
        if (Array.isArray(value)) {
            return BasicTypes.ARRAY;
        }
        return typeof value;
    }

    getPadding() {
        return `${this.level * 1.3}rem`;
    }

    hasChildren() {
        return this.children && this.children.length > 0;
    }

    isObject() {
        return this.type === BasicTypes.OBJECT;
    }

    isArrayItem() {
        return this.parentRef?.type === BasicTypes.ARRAY;
    }

}

export class JsonNodeValidator {
    static validateNode(node: JsonNode, runChildren = true) {
        if (BasicTypes.hasChildrenType(node.type ?? '') && !runChildren) {
            return;
        }
        if (BasicTypes.hasChildrenType(node.type ?? '')) {
            return node.children.forEach((child) => {
                this.validateNode(child);
            });
        }

        switch (node.type) {
            case BasicTypes.STRING:
                this.validateString(node);
                break;
            case BasicTypes.NUMBER:
                this.validateNumber(node);
                break;
            case BasicTypes.BOOLEAN:
                this.validateBoolean(node);
                break;
        }
    }

    static validateNumber(node: JsonNode) {
        const value = Number(node.value);
        if (isNaN(value)) {
            node.error = `Tipo inválido. Esperava ${node.type} mas recebeu ${node.value} (${JsonNode.getType(node.value)})`;
        } else {
            delete node.error;
        }
    }

    static validateString(node: JsonNode) {
        if (typeof node.value !== BasicTypes.STRING) {
            node.error = `Tipo inválido. Esperava ${node.type} mas recebeu ${node.value} (${JsonNode.getType(node.value)})`;
        } else {
            delete node.error;
        }
    }

    static validateBoolean(node: JsonNode) {
        try {
            const bool: unknown = JSON.parse(node.value);
            if (typeof bool !== BasicTypes.BOOLEAN) {
                node.error = `Tipo inválido. Esperava ${node.type} mas recebeu ${node.value} (${JsonNode.getType(node.value)})`;
            } else {
                delete node.error;
            }
        } catch (e) {
            node.error = `O valor recebido é incompatível com o tipo do campo`;
        }
    }
}


export class BasicTypes {
    static readonly STRING = 'string';
    static readonly NUMBER = 'number';
    static readonly BOOLEAN = 'boolean';
    static readonly OBJECT = 'object';
    static readonly ARRAY = 'array';

    static getTypes(): string[] {
        return [this.STRING, this.NUMBER, this.BOOLEAN, this.OBJECT, this.ARRAY];
    }

    static getColoredTypes(): string[] {
        return [this.STRING, this.NUMBER, this.BOOLEAN];
    }

    static fromString(value: string): string | null {
        switch (value) {
            case 'string':
                return this.STRING;
            case 'number':
                return this.NUMBER;
            case 'boolean':
                return this.BOOLEAN;
            case 'object':
                return this.OBJECT;
            case 'array':
                return this.ARRAY;
            default:
                return null;
        }
    }

    static hasChildrenType(type: string): boolean {
        return [this.OBJECT, this.ARRAY].includes(type);
    }
}

