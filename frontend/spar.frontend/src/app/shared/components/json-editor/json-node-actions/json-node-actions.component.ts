import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { NgGlyph } from '@ng-icons/core';
import { BasicTypes, JsonNode } from '../json-editor.models';

export type NodeAddEvent = {
  node: JsonNode;
  type: string;
};

@Component({
  selector: 'spar-json-node-actions',
  imports: [CommonModule, MatMenuModule, NgGlyph],
  templateUrl: './json-node-actions.component.html',
  styleUrl: './json-node-actions.component.scss'
})
export class JsonNodeActionsComponent {
  @Input() node!: JsonNode;
  @Output('addChild') addEmitter = new EventEmitter<NodeAddEvent>();
  @Output('removeChild') removeEmitter = new EventEmitter<JsonNode>();
  BasicTypes = BasicTypes;

  addChild(type: string) {
    this.addEmitter.emit({ node: this.node, type });
  }

  removeChild() {
    this.removeEmitter.emit(this.node);
  }

}
