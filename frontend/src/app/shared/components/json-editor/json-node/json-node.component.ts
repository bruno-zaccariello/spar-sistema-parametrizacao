import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { NgGlyph } from '@ng-icons/core';
import { BasicTypes, JsonNode, JsonNodeValidator } from '../json-editor.models';
import { JsonNodeActionsComponent, NodeAddEvent } from '../json-node-actions/json-node-actions.component';

export enum HighlightLevels {
  NONE = 'signal_cellular_alt_1_bar',
  LINE = 'signal_cellular_alt_2_bar',
  FULL = 'signal_cellular_alt'
}

export type JsonNodeOptions = {
  highlightLevel: HighlightLevels;
  coloredTypes: Record<string, boolean>;
};

@Component({
  selector: 'spar-json-node',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgGlyph, JsonNodeActionsComponent, MatMenuModule],
  templateUrl: './json-node.component.html',
  styleUrl: './json-node.component.scss'
})
export class JsonNodeComponent {

  @Input() node!: JsonNode;
  @Output('node') nodeEmitter = new EventEmitter<JsonNode>();

  @Input() focusedNode!: JsonNode;
  @Input() options: JsonNodeOptions = {
    highlightLevel: HighlightLevels.LINE,
    coloredTypes: {
      [BasicTypes.STRING]: true,
      [BasicTypes.NUMBER]: true,
      [BasicTypes.BOOLEAN]: true,
      [BasicTypes.OBJECT]: true,
      [BasicTypes.ARRAY]: true
    }
  };

  @Output('selectNode') selectEmitter = new EventEmitter<JsonNode>();
  @Output('addChild') addChildEmitter = new EventEmitter<NodeAddEvent>();
  @Output('removeChild') removeChildEmitter = new EventEmitter<JsonNode>();
  @Output('valueChange') valueChangeEmitter = new EventEmitter<JsonNode>();

  BasicTypes = BasicTypes;
  HighlightTypes = HighlightLevels;

  focusNode(node: JsonNode) {
    this.selectEmitter.emit(node);
  }

  isFocused(node: JsonNode, checkFull: boolean = false) {
    if (checkFull && HighlightLevels.FULL !== this.options.highlightLevel) {
      return false;
    }
    if (![HighlightLevels.FULL, HighlightLevels.LINE].includes(this.options.highlightLevel)) {
      return false;
    }
    return this.focusedNode === node;
  }

  changeType(node: JsonNode, type: string) {
    node.type = type;
    this.validateNode(node);
  }

  validateNode(node: JsonNode) {
    JsonNodeValidator.validateNode(node, false);
    this.nodeEmitter.emit(node);
    this.valueChangeEmitter.emit(node);
  }

  fixArrayIndexes(node: JsonNode) {
    const parentArrayNode = node?.parentRef;
    if (!parentArrayNode || parentArrayNode.type !== BasicTypes.ARRAY) {
      return;
    }
    parentArrayNode.children.forEach((child, index) => {
      child.arrayIndex = index;
    });
    this.valueChangeEmitter.emit(node);
  }

  addChild(event: NodeAddEvent) {
    const { node, type } = event;

    if (BasicTypes.hasChildrenType(node?.type ?? '')) {
      const isArrayItem = node.type === BasicTypes.ARRAY;
      const arrayIndex = node?.children?.length;

      const childNode = new JsonNode({
        key: isArrayItem ? arrayIndex.toString() : 'new',
        value: null,
        arrayIndex: arrayIndex,
        level: node.level + 1,
        type: type,
        children: []
      });

      childNode.parentRef = node;
      node.children.push(childNode);
    }
    this.nodeEmitter.emit(node);
    this.addChildEmitter.emit(event);
  }

  removeChild(node: JsonNode) {
    if (node.parentRef) {
      const index = node.parentRef.children.indexOf(node);
      if (index > -1) {
        node.parentRef.children.splice(index, 1);
      }
      this.fixArrayIndexes(node);
    }
    this.nodeEmitter.emit(node);
    this.removeChildEmitter.emit(node);
  }

  getInputWidth(data: any): string {
    try {
      const text = String(data);
      if (!text) {
        return '5ch';
      }
      if (text?.length < 5) {
        return text.length + 1 + 'ch';
      }

      const offset = 20;
      const totalOffsets = Math.floor(text.length / offset);
      switch (totalOffsets) {
        case 0:
          return text.length + 'ch';
        case 1:
        case 2:
          return text.length * .9 + 'ch';
        case 3:
        case 4:
          return text.length * .85 + 'ch';
        case 5:
          return text.length * .8 + 'ch';
        default:
          return text.length + 'ch';
      }
    } catch (error) {
      return '10ch';
    }
  }

  getDetail(node: JsonNode) {
    switch (node.type) {
      case BasicTypes.STRING:
        return 'string';
      case BasicTypes.NUMBER:
        return 'number';
      case BasicTypes.BOOLEAN:
        return 'boolean';
      case BasicTypes.OBJECT:
        const totalKeys = node.children?.length ?? 0;
        return `object {${totalKeys}}`;
      case BasicTypes.ARRAY:
        const totalItems = node.children?.length ?? 0;
        return `array [${totalItems}]`;
      default:
        return '';
    }
  }

  typeIsColored(type: string) {
    return this.options.coloredTypes[type] ?? false;
  }

}
