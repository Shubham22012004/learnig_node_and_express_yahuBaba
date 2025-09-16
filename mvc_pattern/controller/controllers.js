import {Contact} from "../models/contact.model.js";
import mongoose from 'mongoose';

export const get_Contacts = async (req,res)=>{ 
    try{
    // const cont = await Contact.find();
        
        const {page=1, limit= 3} = req.query; 
        /*
        first time req is empty as localhost:3000 so the default value work

        req.query take the data from href of home.ejs

        <%for(let i=1; i<=totalPages; i++){ %>
                    <li class="page-item"><a class="page-link" 
                    
                    href="/?page=<%= i%>">
                    
                    <%= i%></a></li> 
                    <!-- href is used to provide the query to req of / -->
                    <% }%>
        */
        const options ={
            page:parseInt(page),//req.body provide string
            limit:parseInt(limit)
        }
        const result = await Contact.paginate({},options);
        
        // console.log(result.prevPage);
        // console.log(result.nextPage);
        
        res.render('home',{
            totalDocs: result.totalDocs,
            limit: result.limit,
            totalPages: result.totalPages,
            page: result.page,            
            pagingCounter: result.pagingCounter,
            hasPrevPage: result.hasPrevPagealse,
            hasNextPage: result.hasNextPagerue,
            prevPage: result.prevPageull,
            nextPage: result.nextPage,
            contacts: result.docs  //docs contain all data coming from database save in contacts
        });

        
    }catch(err){
        console.log(err);
    }
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