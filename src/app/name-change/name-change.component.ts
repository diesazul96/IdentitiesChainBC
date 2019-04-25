import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';

declare let require: any;
const namechangecoin_artifacts = require('../../../build/contracts/NameChange.json');


@Component({
  selector: 'app-name-change',
  templateUrl: './name-change.component.html',
  styleUrls: ['./name-change.component.css']
})
export class NameChangeComponent implements OnInit {
   name = 'Initial name from component';
   NewName : string;
   status: string;
   NameChangeCoin: any;
   accounts: string[];
  
   model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };
  
	
  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar) {
      console.log('Constructor: ' + web3Service);
  }

 ngOnInit(): void {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();
	
    this.web3Service.artifactsToContract(namechangecoin_artifacts)
      .then((NameChangeCoinAbstraction) => {
        this.NameChangeCoin = NameChangeCoinAbstraction;
        this.NameChangeCoin.deployed().then(deployed => {
          console.log(deployed);
           this.refreshName();
         
        });

      });
  }
  
  
  async changeName(){
	 if (!this.NameChangeCoin) {
       this.setStatus('Metacoin is not loaded, unable to send transaction');
       return;
     }
	
  	 console.log('Cambiar nombre ' + this.NewName);
 	 this.setStatus('Initiating transaction... (please wait)');
	  
	  try {
      const deployedNameChangeCoin = await this.NameChangeCoin.deployed();
      const nameChangeCoinTransaction = await deployedNameChangeCoin.changename.sendTransaction(this.NewName,{from: this.model.account});
	   
	   
      if (!nameChangeCoinTransaction) {
        this.setStatus('Transaction failed!');
      } else {
        this.setStatus('Transaction complete!');
		this.refreshName();
      }
    } catch (e) {
      console.log(e);
      this.setStatus('Error sending coin; see log.');
    }
	
	
  }
  
    

   watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
      this.refreshName();
    });
  }
  
  async refreshName() {
    console.log('Refreshing Name');

    try {
      const deployedNameChangeCoin = await this.NameChangeCoin.deployed();
      console.log(deployedNameChangeCoin);
      console.log('Account', this.model.account);
      const nameChangeCoinBalance = await deployedNameChangeCoin.showName.call();
      console.log('Name : ' + nameChangeCoinBalance);
      this.model.name = nameChangeCoinBalance;
	  this.name = this.model.name ;
    } catch (e) {
      console.log(e);
      this.setStatus('Error getting balance; see log.');
    }
  }
  
   setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }
}
