import {Component, OnInit} from '@angular/core';
import {HomeService} from './home.service';
import {Router, ActivatedRoute} from '@angular/router';
import { Accounts } from './accounts.model';

@Component({
  selector: 'online-banking-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  totalAccounts: number;
  loanAccounts = [];
  savingAccounts = [];
  shareAccounts = [];
  totalSavings = '0';
  totalLoan = '0';
  // TODO: Dim the screen while values are loading
  loading = true;

  constructor(private homeService: HomeService,
              private route: ActivatedRoute,
              private router: Router) {

                this.homeService.getAccounts().subscribe((accounts: Accounts ) => {
                  const { loanAccounts, savingAccounts} = accounts
                  this.loanAccounts = accounts.loanAccounts ? loanAccounts : [];
                  this.savingAccounts = accounts.savingAccounts ? savingAccounts : [];
                  this.shareAccounts = [] ;
                  console.log("this is loanAccounts",this.loanAccounts);
                  this.totalAccounts = this.loanAccounts.length + this.savingAccounts.length + this.shareAccounts.length;
                  console.log('From the set acounts method here is the total accounts', this.totalAccounts);
                  let savingsBalance = 0;
                  this.savingAccounts.forEach((account) => {
                    const {accountBalance} = account;
                    if (accountBalance) {
                      savingsBalance += parseInt(accountBalance, 10);
                    }
                  });
                  this.totalSavings = savingsBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                  let loansBalance = 0;
                  this.loanAccounts.forEach((account) => {
                    const {loanBalance} = account;
                    if (loanBalance) {
                      loansBalance += loanBalance;
                    }
                  });
                  this.totalLoan = loansBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                  this.loading = false;
                
                 
                });


                // this.homeService.getAccounts().subscribe((data: { accounts: Accounts }) => {
                //   const { loanAccounts, savingsAccounts, shareAccounts } = data.accounts;
                //   this.loanAccounts = loanAccounts ? loanAccounts : [];
                //   this.savingsAccounts = savingsAccounts ? savingsAccounts : [];
                //   this.shareAccounts = shareAccounts ? shareAccounts : [] ;
                // });
  }

  ngOnInit(): void {

    console.log('from ngoninit for home.component', 'loan Accounts ', this.loanAccounts);

    //this.setAccounts();
  }

  // setAccounts(): void {

    
  //       }
}
