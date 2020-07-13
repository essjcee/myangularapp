import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact';
@Component({
  selector: 'app-contact-add-edit',
  templateUrl: './contact-add-edit.component.html',
  styleUrls: ['./contact-add-edit.component.css']
})
export class ContactAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  id: number;
  errorMessage: any;
  existingContact: Contact;

  constructor(private contactService: ContactService, private formBuilder: FormBuilder, 
    private avRoute: ActivatedRoute, private router: Router) { 
      const idParam = 'id';
      this.actionType = 'Add';
      if(this.avRoute.snapshot.params[idParam]){
        this.id = this.avRoute.snapshot.params[idParam];
      }
	    this.form = this.formBuilder.group({
          id: 0,
          firstName: ['', Validators.required],
          lastname: ['', Validators.required],
          email: ['', Validators.compose([
            Validators.required,
            Validators.email
          ])],
          phone: ['', Validators.required]
        }
      );
    }


  ngOnInit(): void {
    if(this.id > 0){
      this.actionType = 'Edit';
      this.contactService.getContact(this.id)
      .subscribe(data => (
        this.existingContact = data,
        this.form.controls['firstName'].setValue(data.firstName),
        this.form.controls['lastname'].setValue(data.lastName),
        this.form.controls['email'].setValue(data.email),
        this.form.controls['phone'].setValue(data.phone)
      ));
    }
  }

  save(){
    if(!this.form.valid){
      return;
    }
    if(this.actionType === 'Add'){
      let contact: Contact = {
        firstName: this.form.get('firstName').value,
        lastName: this.form.get('lastname').value,
        email: this.form.get('email').value,
        phone: this.form.get('phone').value
      };
      this.contactService.saveContact(contact).subscribe((data)=>{
        this.router.navigate(['/contact',data.id]);
      });
    }

    if(this.actionType === 'Edit'){
      let contact: Contact = {
        id: this.existingContact.id,
        firstName: this.form.get('firstName').value,
        lastName: this.form.get('lastname').value,
        email: this.form.get('email').value,
        phone: this.form.get('phone').value
      };
      this.contactService.updateContact(contact.id,contact)
      .subscribe((data) => {
        this.router.navigate(['/']);
      });

    }
  }

  cancel(){
    this.router.navigate(['/']);
  }

  get firstName() { return this.form.get('firstName');}
  get lastname() { return this.form.get('lastname');}
  get email() { return this.form.get('email');}
  get phone() { return this.form.get('phone');}

}
