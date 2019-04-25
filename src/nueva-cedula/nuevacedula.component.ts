import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Web3Service } from '../app/util/web3.service';

declare let require: any;
const identitieschain_artifacts = require('../../build/contracts/IdentitiesChain.json');

@Component({
  selector: 'nuevacedula',
  templateUrl: './nuevacedula.component.html',
  styleUrls: ['./nuevacedula.component.css']
})
export class CedulaComponent implements OnInit{

  IC: any;
  accounts: string[];
  
  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };

  private genre:string;
  private key:string;
  
  constructor(private web3Service: Web3Service,private route: ActivatedRoute, private router: Router) {
    console.log(web3Service);
    route.params.subscribe(params => {this.key = params['key'];});
  }

  ngOnInit():void {
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

  public alert(){
    alert("Documento registrado correctamente!");
    var list= document.getElementsByClassName("input");
    for (var i = 0; i < list.length; i++) {
      (<HTMLInputElement>list[i]).value = "";
    }
  }

  async createCedula(nombre: string, fecha: Date, gs: string, rh: string, depto: string,ciudad: string){

    try {
      const deployedIC = await this.IC.deployed();
      const iCTransaction = await deployedIC.nuevaCedula.sendTransaction(nombre, gs, rh, fecha, this.genre, ciudad, depto, {from: this.model.account});
     
     
      if (!iCTransaction) {
        console.log('Transaction failed!');
      } else {
        console.log('Transaction complete!');
        this.alert();
        this.redireccionar(this.key);
      }
    } catch (e) {
      console.log(e);
      console.log('Error sending coin; see log.');
    }

  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
    });
  }

  redireccionar(key){
    let route = this.router.config.find(r => r.path === 'nueva-cedula/:key');
    route.data =  key;    // START: One way of using routerLink    
    this.router.navigateByUrl(`${'nueva-cedula'}/${key}`);
  }

}
