import { Directive , Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Directive({
  selector: '[appIfRole]'
})
export class IfRoleDirective implements OnInit {
  @Input('appIfRole') allowedRole: string = '';

  constructor(
    private tmpl: TemplateRef<any>,
    private vcr:  ViewContainerRef,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (this.auth.getUserRole() === this.allowedRole) {
      this.vcr.createEmbeddedView(this.tmpl);
    } else {
      this.vcr.clear();
    }
  }

}
