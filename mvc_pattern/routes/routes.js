import express from 'express';

//Router() is a method of express use to define routes, used at a place or app

const router = express.Router();

import  { 
    get_Contacts, 
    get_Contact, 
    add_Contact,
    save_Contact,
    get_Update,
    save_Update,
    delete_Contact
} from '../controller/controllers.js'

router.get('/', get_Contacts)

router.get('/show-contact/:id', get_Contact)

router.get('/add-contact', add_Contact)

router.post('/add-contact', save_Contact)

router.get('/update-contact/:id', get_Update)

router.post('/update-contact/:id', save_Update)

router.get('/delete-contact/:id', delete_Contact)

export default router;
