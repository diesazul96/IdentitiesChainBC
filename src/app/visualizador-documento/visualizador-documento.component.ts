import { ActivatedRoute } from '@angular/router';
import { documento } from './visualizador-documento.component';
import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../util/web3.service';

export interface documento {
  key: string,
  nombre: string,
  fecha: string,
  //gs: string,
  //rh: string,
  departamento: string,
  ciudad: string,
  sexo: string
}

declare let require: any;
const identitieschain_artifacts = require('../../../build/contracts/IdentitiesChain.json');

@Component({
    selector: 'visualizador-documento',
    templateUrl: 'visualizador-documento.html',
    styleUrls: ['visualizador-documento.css']
})

export class VisualizadorDocumento implements OnInit {

  IC: any;
  accounts: string[];
  
  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };
  
  //private key:string;
  doc: any = {};
  documentos: documento[];
  adr:any;
  constructor(private web3Service: Web3Service, private route: ActivatedRoute) {
    console.log(web3Service);
    //route.params.subscribe(params => {this.key = params['key'];});
    console.log("const");
    route.params.subscribe(params => {this.adr = params['adr'];});
  }

  ngOnInit(): void {
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
      var event = deployedIC.Cedulita(function(error, result) {
        if (!error)
            console.log("evento!!!!");
            console.log(result);
    });
      const ICBalance = await deployedIC.getCedula.sendTransaction(this.adr, {from: this.model.account}).then(res => {
        console.log("RES:");
        console.log(res);
      });
      if(!ICBalance){
        console.log("REtorno: ");
        console.log(ICBalance);
      } else {
        console.log("Se jodiop...");
        console.log(ICBalance);
      }
        this.doc.nombre = ICBalance[0];
        //this.doc.gs = res[1];
        //this.doc.rh = res[2];
        this.doc.fecha = ICBalance[1];
        this.doc.sexo = ICBalance[2];
        this.doc.ciudad = ICBalance[3];
        this.doc.dep = ICBalance[4];
    } catch (e) {
      console.log(e);
      console.log('Error getting balance; see log.');
    }
    console.log(this.doc);
  }
}
