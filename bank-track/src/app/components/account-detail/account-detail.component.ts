import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { AccountService }    from '../../services/account.service';
import { Account }           from '../../models/account.model';


@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
  account: Account | undefined;

  constructor(
    private route:   ActivatedRoute,
    private service: AccountService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getAccountById(id).subscribe(a => this.account = a);
  }


}
