import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { bootstrapCaretDown, bootstrapCaretRight, bootstrapDashCircle, bootstrapGripVertical, bootstrapPlusCircle } from '@ng-icons/bootstrap-icons';
import { NgGlyph, provideIcons } from '@ng-icons/core';
import { BasicTypes, JsonNode, JsonNodeValidator } from './json-editor.models';
import { JsonNodeBreadcrumbsComponent } from './json-node-breadcrumbs/json-node-breadcrumbs.component';
import { HighlightLevels, JsonNodeComponent } from './json-node/json-node.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

export enum EditorView {
  JSON = 'JSON',
  TREE = 'TREE'
}

@Component({
  selector: 'spar-json-editor',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgGlyph,
    MatMenuModule,
    MatCheckboxModule,
    JsonNodeComponent,
    JsonNodeBreadcrumbsComponent
  ],
  providers: [
    provideIcons({ bootstrapGripVertical, bootstrapCaretRight, bootstrapCaretDown, bootstrapPlusCircle, bootstrapDashCircle }),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: JsonEditorComponent,
      multi: true
    }
  ],
  templateUrl: './json-editor.component.html',
  styleUrl: './json-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonEditorComponent implements OnInit, ControlValueAccessor {

  json: string = '';

  private ROOT_NODE = 'root';
  private ROOT_LEVEL = 0;

  BasicTypes = BasicTypes;

  highlightTypes = HighlightLevels;
  views = EditorView;
  view = EditorView.TREE;

  focusedNode!: JsonNode;

  coloredTypes: { [key: string]: boolean } = BasicTypes.getTypes()
    .reduce((acc: { [key: string]: boolean }, type) => {
      acc[type] = true;
      return acc;
    }, {});

  nodeOptions = {
    highlightLevel: HighlightLevels.FULL,
    coloredTypes: this.coloredTypes
  };

  root!: JsonNode;

  constructor(
    private readonly cdr: ChangeDetectorRef
  ) {}

  writeValue(json: string | object): void {
    if (typeof json === 'object') {
      this.json = JSON.stringify(json);
    } else {
      this.json = json;
    }
    this.buildRootNode();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange = (_: any) => { };
  onTouched = () => { };

  updateValue() {
    this.onChange(JSON.stringify(this.nodeToJson(this.root)));
  }

  ngOnInit(): void {
    this.buildRootNode();
  }

  buildRootNode(ignoreJson = false) {
    this.root = new JsonNode({
      id: 0,
      key: this.ROOT_NODE,
      children: [],
      level: this.ROOT_LEVEL,
      type: BasicTypes.OBJECT
    });

    this.focusedNode = this.root;
    if (!ignoreJson && this.isInputJsonValid()) {
      this.root.children = this.jsonToNodes(JSON.parse(this.json), this.ROOT_LEVEL, this.root);
    }
    this.updateView();
  }

  isInputJsonValid() {
    try {
      JSON.parse(this.json);
      return true;
    } catch (e) {
      return false;
    }
  }

  jsonToNodes(json: any, level: number, parent?: JsonNode<any>): JsonNode<any>[] {
    level = level + 1;
    return Object.keys(json).map((k) => {
      const node = new JsonNode({
        key: k,
        children: [],
        level
      });

      const isObject = typeof json[k] === BasicTypes.OBJECT;
      const isArray = Array.isArray(json[k]);

      if (isObject && !isArray) {
        node.children = this.jsonToNodes(json[k], level, node);
      } else if (isObject && isArray) {
        node.children = this.arrayToNodes(json[k], level, node);
      } else {
        node.value = json[k];
      }

      node.type = JsonNode.getType(json[k]);
      if (isArray) {
        node.type = BasicTypes.ARRAY;
      }

      if (parent) {
        node.parentRef = parent;
      }
      return node;
    });
  }

  arrayToNodes(array: any[], level: number, parent?: JsonNode<any>): JsonNode<any>[] {
    level = level + 1;
    return array.map((item, index) => {
      const node = new JsonNode({
        key: `${index}`,
        children: [],
        level
      });
      node.arrayIndex = index;
      node.value = item;
      node.type = JsonNode.getType(item);
      if (Array.isArray(item)) {
        node.type = BasicTypes.ARRAY;
        node.children = this.arrayToNodes(item, level, node);
      }
      if (parent) {
        node.parentRef = parent;
      }
      return node;
    });
  }

  obterDetalhe(node: JsonNode) {
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

  updateJsonText() {
    this.buildRootNode();
  }

  nodeToJson(node: JsonNode) {
    if (node.type === BasicTypes.ARRAY) {
      return this.arrayToJson(node.children);
    }

    if (!BasicTypes.hasChildrenType(node?.type ?? '')) {
      return node.value;
    }

    return node.children.reduce((acc: any, node) => {
      switch (node.type) {
        case BasicTypes.STRING:
          acc[node.key] = node.value;
          break;
        case BasicTypes.NUMBER:
          acc[node.key] = Number(node.value);
          break;
        case BasicTypes.BOOLEAN:
          acc[node.key] = Boolean(node.value);
          break;
        case BasicTypes.ARRAY:
          acc[node.key] = this.arrayToJson(node.children);
          break;
        case BasicTypes.OBJECT:
          acc[node.key] = node.children.reduce((acc: { [key: string]: any }, child) => {
            acc[child.key] = this.nodeToJson(child);
            return acc;
          }, {});
          break;
      }
      return acc;
    }, {});
  }

  arrayToJson(array: JsonNode[]): string[] | number[] | boolean[] {
    return array.map((node) => {
      switch (node.type) {
        case BasicTypes.STRING:
        case BasicTypes.NUMBER:
        case BasicTypes.BOOLEAN:
          return node.value;
        case BasicTypes.OBJECT:
        case BasicTypes.ARRAY:
          return this.nodeToJson(node);
      }
    });
  }

  toggleHighlight() {
    switch (this.nodeOptions.highlightLevel) {
      case HighlightLevels.NONE:
        this.nodeOptions.highlightLevel = HighlightLevels.LINE;
        break;
      case HighlightLevels.LINE:
        this.nodeOptions.highlightLevel = HighlightLevels.FULL;
        break;
      case HighlightLevels.FULL:
        this.nodeOptions.highlightLevel = HighlightLevels.NONE;
        break;
    }
  }

  validateJson() {
    this.root.children.forEach((node) => {
      JsonNodeValidator.validateNode(node);
    });
  }

  udpateOptions() {
    this.nodeOptions.coloredTypes = this.coloredTypes;
    this.updateView();
  }

  updateView() {
    this.cdr.markForCheck();
  }

  expandAll() {
    this.expandCollapseAll(this.root, true);
  }

  collapseAll() {
    this.expandCollapseAll(this.root, false);
  }

  expandCollapseAll(node: JsonNode, expand: boolean) {
    node.expanded = expand;
    node.children.forEach((child) => {
      this.expandCollapseAll(child, expand);
    });
  }

  focusNode(node: JsonNode) {
    this.focusedNode = node;
    this.updateView();
  }

  changeVision() {
    this.view = this.view === EditorView.JSON ? EditorView.TREE : EditorView.JSON;
    this.updateView();
  }

  log() {
    console.log(this.root);
    console.log(this.nodeToJson(this.root));
    console.log(JSON.stringify(this.nodeToJson(this.root)));
    console.log(JSON.stringify(this.nodeToJson(this.root)));
  }

}
