import {Contact} from "../models/contact.model.js";
// import mongoose from 'mongoose';

export const get_Contacts = async (req,res)=>{ 
    const cont = await Contact.find();
    res.render('home',{contacts:cont});
}

export const get_Contact =  async (req,res)=> {
    const cont = await Contact.findById({_id: req.params.id}); 
    res.render('show-contact', {contact:cont}) 
}

export const add_Contact = (req,res)=>{ res.render('add-contact')}

export const save_Contact = async (req,res)=>{
    await Contact.create(req.body);
    res.redirect("/");}

export const get_Update = async (req,res)=>{ 
    const contact = await Contact.findById(req.params.id);
    res.render('update-contact',{contact})
}

export const save_Update =async (req,res)=>{
    await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
}

export const delete_Contact = async(req,res)=>{
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/');
}