import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../util/web3.service';

export interface documento {
  nombre: string,
  url: string,
  hash: string
}

declare let require: any;
const identitieschain_artifacts = require('../../../build/contracts/IdentitiesChain.json');

@Component({
  selector: 'app-ver-docs',
  templateUrl: './ver-docs.component.html',
  styleUrls: ['./ver-docs.component.css']
})
export class VerDocsComponent implements OnInit {

  IC: any;
  accounts: string[];
  
  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };

  adr:any;
  doc: any = {};
  documentos: documento[] = [];

  constructor(private web3Service: Web3Service, private route: ActivatedRoute) {
    console.log(web3Service);
    //route.params.subscribe(params => {this.key = params['key'];});
    console.log("const");
    route.params.subscribe(params => {this.adr = params['adr'];});
  }

  ngOnInit() {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);

    this.accounts = this.web3Service.getAccounts();
    console.log("--------------------"+this.accounts);
    this.model.account = this.accounts[0];
    
    this.web3Service.artifactsToContract(identitieschain_artifacts)
      .then((ICAbstraction) => {
        if(ICAbstraction != null){
          console.log("Todo bien: "+ICAbstraction);
          this.IC = ICAbstraction;
          this.IC.deployed().then(deployed => {
            console.log(deployed);
            this.getDoc()
          });
          console.log("Vamos al DOC");
        } else{
          console.log("ESTAMOS JODIDOS");
        }
      });
    console.log("Terminando OnInit");
  }

  async getDoc(){
    
    console.log("GET DOC");
    try {
      const deployedIC = await this.IC.deployed();
      console.log(deployedIC);
      console.log('Account', this.model.account);
      var cedula :any={};
      var done: boolean =false;
      var event = deployedIC.Documentos((error, result)=> {
        if (!error)
            console.log("evento!!!!");
            console.log(result);
            var data: any = result.returnValues[0];
            console.log("DATA: ");
            //console.log(data);
            console.log(data[0]);
            //console.log(data.nombre);
            console.log(data[1]);
            //console.log(data.url);
            console.log(data[2]);
            //console.log(data.hash);

            this.doc.nombre = data[0];
            this.doc.url = data[1];
            this.doc.hash = data[2];
            
            console.log(this.doc.nombre);
            console.log(this.doc.url);
            console.log(this.doc.hash);

            this.documentos.push(this.doc);
            console.log(this.documentos);

            this.doc = {};
      });

      const ICBalance = await deployedIC.getDocumentos.sendTransaction({from: this.model.account});
    } catch (e) {
      console.log(e);
      console.log('Error getting balance; see log.');
    }

  }

}
