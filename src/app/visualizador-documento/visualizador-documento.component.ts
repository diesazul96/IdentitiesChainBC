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

  constructor(private web3Service: Web3Service, private route: ActivatedRoute) {
    console.log(web3Service);
    //route.params.subscribe(params => {this.key = params['key'];});
    console.log("const");
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
          });
          console.log("Vamos al DOC");
          this.getDoc();
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
      const ICBalance = await deployedIC.getCedula.call(res => {
        this.doc.nombre = res[0];
        //this.doc.gs = res[1];
        //this.doc.rh = res[2];
        this.doc.fecha = res[1];
        this.doc.sexo = res[2];
        this.doc.ciudad = res[3];
        this.doc.dep = res[4];
      });
    } catch (e) {
      console.log(e);
      console.log('Error getting balance; see log.');
    }
    console.log(this.doc);
  }
}
