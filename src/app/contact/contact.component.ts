import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact$: Observable<Contact>;
  id: number;
  constructor(private contactService: ContactService, private avRoute: ActivatedRoute) { 
    const idParam = 'id';
    if(this.avRoute.snapshot.params[idParam]){
      this.id = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.loadContact();
  }

  loadContact(){
    this.contact$ = this.contactService.getContact(this.id);
  }

}
