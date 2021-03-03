import React, {Component} from 'react';
import Contacts from './contacts';
import CreateContacts from './create-contact';
import ContactView from "./view-contact";

class Home extends Component {

    contacts = [];

    currentContact = {name:'', email:'', phone:'', id:'', notes:''};

    constructor(props) {
        super(props);
        this.state = {refresh:false, items:[], currentContact: this.currentContact, isview:false};
        this.getContacts = this.getContacts.bind(this);
        this.onContactAdded = this.onContactAdded.bind(this);
        this.saveContact = this.saveContact.bind(this);
        this.editContact = this.editContact.bind(this);
        this.viewContact = this.viewContact.bind(this);
       // this.getContacts();
    }

    getContacts(){
        fetch('http://dev.samples.com/getcontacts.php')
            .then(rsp=>rsp.json())
            .then(response =>{
                this.setState({items:response.data});
                console.log(response.data,"home.js")
            })
    }

    saveContact(data){
        fetch("http://dev.samples.com/insertcontacts.php",
            {
                body: data,
                method: "post"
            }).then(()=>{  this.onContactAdded() });
    }

    onContactAdded(){
        this.getContacts();
        this.setState({currentContact: {}});
    }

    viewContact(contact){
        this.setState({currentContact: contact, isview:true});
    }

    editContact(contact){
       // let contactObject = {};
       // contactObject
        console.log(contact);
        this.setState({currentContact: contact, isview:false});
        /*
        fetch('http://dev.samples.com/getcontacts.php?id='+id)
            .then(rsp=>rsp.json())
            .then(response =>{
                const res = response.data.shift();
                const contact = {name:res.name, email:res.email};
                this.setState({currentContact: contact});
                console.log(res,"home.js")
            })
            */
    }

    render(){
        return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <h1 className="mt-5">New contacts</h1>
                    <p className="lead">Adding a new contact</p>
                    {!this.state.isview ?
                        <CreateContacts currentContact={this.state.currentContact}
                                    refresh={this.state.refresh}
                                    onContactAdded={this.onContactAdded}
                                    saveContact={this.saveContact}/> :
                        <ContactView currentContact={this.state.currentContact}/>
                    }
                </div>
                <div className="col-lg-6">
                    <h1 className="mt-5">List of contacts</h1>
                    <p className="lead">List of your contacts where you can edit and manage them</p>
                    <Contacts editContact={this.editContact}
                              viewContact={this.viewContact}
                              refresh={this.state.refresh}
                              contacts={this.state.items}/>
                </div>
            </div>
        </div>
        );
    }
}

export default Home;