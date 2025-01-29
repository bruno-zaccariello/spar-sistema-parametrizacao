import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgGlyph } from '@ng-icons/core';
import { JsonNode } from '../json-editor.models';

export class JsonNodeBreadcrumbItem {
  constructor(
    public displayName: string,
    public node: JsonNode
  ) { }
}

@Component({
  selector: 'spar-json-node-breadcrumbs',
  imports: [CommonModule, NgGlyph],
  templateUrl: './json-node-breadcrumbs.component.html',
  styleUrl: './json-node-breadcrumbs.component.scss'
})
export class JsonNodeBreadcrumbsComponent {

  @Output('selectNode') selectEmitter = new EventEmitter<JsonNode>();

  @Input()
  set node(value: JsonNode) {
    this._node = value;
    this.buildBreadcrumbs();
  }

  get node(): JsonNode {
    return this._node;
  }

  private _node!: JsonNode;

  breadcrumbs: JsonNodeBreadcrumbItem[] = [];

  emitSelect(node: JsonNode) {
    this.selectEmitter.emit(node);
  }

  buildBreadcrumbs(): void {
    const breadcrumbs: JsonNodeBreadcrumbItem[] = [];
    let current: JsonNode | null = this.node;
    while (current) {
      breadcrumbs.unshift(new JsonNodeBreadcrumbItem(current.key, current));
      current = current.parentRef;
    }
    this.breadcrumbs = breadcrumbs;
  }
}
