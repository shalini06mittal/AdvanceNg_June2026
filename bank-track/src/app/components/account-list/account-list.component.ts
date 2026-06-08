import { Component, OnDestroy,OnInit } from '@angular/core';
import { Account }         from '../../models/account.model';
import { AccountService }  from '../../services/account.service';
import { Subscription }    from 'rxjs';


@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit, OnDestroy {
  accounts:    Account[] = [];
  isLoading:   boolean   = false;
  private sub: Subscription = new Subscription();

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.sub = this.accountService.getAccounts().subscribe({
      next:     (data) => { this.accounts = data; this.isLoading = false; },
      error:    ()     => { this.isLoading = false; }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe(); // Prevent memory leaks
  }

  delete(id: number): void {
    if (confirm('Delete this account?')) {
      this.accountService.deleteAccount(id).subscribe(() => {
        this.accounts = this.accounts.filter(a => a.id !== id);
      });
    }
  }
}

