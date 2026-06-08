import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Account }      from '../models/account.model';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accounts: Account[] = [
    { id: 1, accountNo: 'SB001234', holderName: 'Priya Sharma',
      balance: 125000, accountType: 'savings', isActive: true,
      createdAt: '2023-01-15' },
    { id: 2, accountNo: 'CU002345', holderName: 'Raj Patel',
      balance: 450000, accountType: 'current', isActive: true,
      createdAt: '2023-03-20' },
    { id: 3, accountNo: 'FD003456', holderName: 'Anita Singh',
      balance: 200000, accountType: 'fixed', isActive: false,
      createdAt: '2022-11-05' },
  ];
  private nextId = 4;

  getAccounts(): Observable<Account[]> {
    return of([...this.accounts]);
  }

  getAccountById(id: number): Observable<Account | undefined> {
    return of(this.accounts.find(a => a.id === id));
  }

  createAccount(account: Omit<Account, 'id'>): Observable<Account> {
    const newAcc = { ...account, id: this.nextId++ };
    this.accounts.push(newAcc);
    return of(newAcc);
  }

  updateAccount(id: number, updates: Partial<Account>): Observable<Account> {
    const idx = this.accounts.findIndex(a => a.id === id);
    if (idx === -1) return throwError(() => new Error('Not found'));
    this.accounts[idx] = { ...this.accounts[idx], ...updates };
    return of(this.accounts[idx]);
  }

  deleteAccount(id: number): Observable<void> {
    this.accounts = this.accounts.filter(a => a.id !== id);
    return of(undefined);
  }

}
