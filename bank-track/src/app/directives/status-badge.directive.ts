import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStatusBadge]'
})
export class StatusBadgeDirective implements OnChanges {
  @Input('appStatusBadge') isActive: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    const color = this.isActive ? '#166534' : '#991B1B';
    const bg    = this.isActive ? '#DCFCE7'  : '#FEE2E2';
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
    this.renderer.setStyle(this.el.nativeElement, 'background-color', bg);
    this.renderer.setStyle(this.el.nativeElement, 'padding', '3px 10px');
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '9999px');
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', '600');
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '12px');

  }

}
