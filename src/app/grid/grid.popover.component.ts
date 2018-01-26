import { Component, ViewChild, ViewContainerRef } from "@angular/core";

@Component({
  selector: "grid-popover",
  template: ` <button type="button" class="btn btn-outline-secondary" [ngbPopover]="popContent" popoverTitle="Fancy content">
  Load Content
  </button>  `
})
export class GridPopoverComponent {
  private params: any;
  public popContent: any;

  agInit(params: any): void {
    debugger;
    this.params = params;
    this.popContent = params.context.parent.content;
  }

  isPopup(): boolean {
    return true;
  }
}
