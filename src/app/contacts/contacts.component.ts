import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts$: Observable<Contact[]>;
  constructor(private contactService: ContactService) { 
  }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(){
    this.contacts$ = this.contactService.getContacts();
  }

  delete(id) {
    const ans = confirm('Do you want to delete contact with id: ' + id);
    if (ans) {
      this.contactService.deleteContact(id).subscribe((data) => {
        this.loadContacts();
      });
    }
  }

}