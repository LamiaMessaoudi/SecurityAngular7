import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { first } from '../../../../node_modules/rxjs/operators';
import { SignatureService } from '../../services/signature.service';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss']
})
export class SignatureComponent implements OnInit {

  SignatureForm:FormGroup;
  loading = false;
  algo:string;
  hashage:string;
  algos=["SHA1withDSA","SHA1withRSA","SHA256withRSA"];
  hashs=["SHA-256","md5"]
  submitted = false;
  valid = false;
  file1:File;
  file2:File;
  file3:File;
  constructor(   private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private signservice : SignatureService
     ) { }

  ngOnInit() {
    this.initForm();
  }


  get f() { return this.SignatureForm.controls; }

  initForm() {
    this.SignatureForm = this.formBuilder.group({
      file1:[],
  
    });
 }

 selectFile1(event)
 {
    let reader=new FileReader();
    if(event.target.files && event.target.files.length>0)
    {
       this.file1=event.target.files[0];
       console.log(this.file1);
    }
 }

 

 
 SelectAlgo(i:number)
 {
  this.algo=this.algos[i];
  
 }

 SelectHashage(i:number)
 {

  this.hashage=this.hashs[i];
 }


 onSubmit() {
  
  this.submitted = true;

 // stop here if form is invalid
  if (this.SignatureForm.invalid) {
      return ;
  }

  this.loading = true;
 
console.log(this.algo);
console.log(this.hashage);

const don :FormData = new FormData();
don.append("algosign",this.algo);
don.append("file",this.file1); 
don.append("algohash",this.hashage)


 this.signservice.SignDocument(don)
  .pipe(first())
  .subscribe(
   data=>{
            //console.log("succes");
   },
   error=>{
            //console.log("erreur");
            this.loading = false;
            this.valid = true;
   }
  );
 }


}
