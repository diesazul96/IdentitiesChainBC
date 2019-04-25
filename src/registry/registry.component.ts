import { Component, OnInit, Input } from '@angular/core';
import { User } from './user';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from '../app/util/web3.service';

declare let require: any;
const identitieschain_artifacts = require('../../build/contracts/IdentitiesChain.json');

@Component({
  selector: 'app-registry',
  templateUrl: 'registry.component.html',
  providers: [NgbModalConfig, NgbModal],
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {

  IC: any;
  accounts: string[];
  
  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };

  public same = true;

  @Input() userName: string;
  @Input() password: string;
  @Input() password2: string;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private web3Service: Web3Service) {
    console.log('Constructor: ' + web3Service);
  }

  ngOnInit(): void {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();
	
    this.web3Service.artifactsToContract(identitieschain_artifacts)
      .then((ICAbstraction) => {
        this.IC = ICAbstraction;
        this.IC.deployed().then(deployed => {
          console.log(deployed);
        });
      });
  }

  onChanges(){
    if(this.password != this.password2){
      this.same = false;
    }else{
      this.same = true;
    }
  }

  async addUser(user: string, pass: string, pass2: string, content){
    let us = new User();
    us.user = user;
    if(pass == pass2){
      us.password = pass;

      this.userName= '';
      this.password = '';
      this.password2 = '';

      this.modalService.open(content, { centered: true, size:'sm' });

      try {
        const deployedIC = await this.IC.deployed();
        const iCTransaction = await deployedIC.nuevoUsuario.sendTransaction(this.userName, this.password, {from: this.model.account});
       
       
        if (!iCTransaction) {
          console.log('Transaction failed!');
        } else {
          console.log('Transaction complete!');
        }
      } catch (e) {
        console.log(e);
        console.log('Error sending coin; see log.');
      }
    }


  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
    });
  }
}
