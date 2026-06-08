import { Component, OnInit } from '@angular/core';
import { AccountService }    from '../../services/account.service';
import { Account }           from '../../models/account.model';
import { AuthService }       from '../../services/auth.service';

@Component({ selector: 'app-dashboard',
             templateUrl: './dashboard.component.html',
             styleUrls: ['./dashboard.component.scss'] })
export class DashboardComponent implements OnInit {
  totalAccounts  = 0;
  activeAccounts = 0;
  totalBalance   = 0;
  savingsCount   = 0;
  currentCount   = 0;
  fixedCount     = 0;
  recentAccounts: Account[] = [];
  greeting = '';

  constructor(
    private service: AccountService,
    private auth:    AuthService
  ) {}

  ngOnInit(): void {
    const hour = new Date().getHours();
    this.greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

    this.service.getAccounts().subscribe(accounts => {
      this.totalAccounts  = accounts.length;
      this.activeAccounts = accounts.filter(a => a.isActive).length;
      this.totalBalance   = accounts.reduce((s, a) => s + a.balance, 0);
      this.savingsCount   = accounts.filter(a => a.accountType === 'savings').length;
      this.currentCount   = accounts.filter(a => a.accountType === 'current').length;
      this.fixedCount     = accounts.filter(a => a.accountType === 'fixed').length;
      this.recentAccounts = [...accounts]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);
    });
  }

  get userRole(): string { return this.auth.getUserRole(); }
}
