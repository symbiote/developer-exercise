

This is a simple exercise for us to get an idea of your thought process when working on web based problems. While trivial in nature, we're looking for responses that indicate to us that your capabilities match those of the available position. 

The task...

Write an application that allows a user to create and update a series of content items in a web application. 

A Page in the system should have

* A name field
* A boolean indicator of whether the page is the 'home' page
* A content field

When a user hits the 'home' page of the application, the content that is displayed should be that of the page marked 'home'. 

All pages in the system should be displayed in a layout that has a list of all pages down the left side of the screen, and the page title and content on the right hand side. 

Menu		Page Title
- page name	
- other page	Page content
- other		....


When adding (or editing) a page, the page name should be unique within the system, so any attempt to save a page with the same name as an existing page should throw an error. 

Users should not be able to submit the form with an empty page name field. 

If the user is logged in, they should see an 'add page' button below the list, which will provide an interface for the user to add a new page with the indicated fields. 

If the user is logged in, they should see an 'edit' link beneath the page content to edit that page. 


Questions

Do I need to use a database?

No, data can be stored however you like, so long as it can be re-edited later. This can be in a flat file, or even the session. We're interested how you go about abstracting the specifics of the data storage / retrieval. 

Do I need to write a user management system?

No, the 'login' system can be as simple as checking a hardcoded username and password, and setting a session flag that the user is logged in. We're wanting to see that you can handle requests to 'protected' actions

Can I use a framework? 

Absolutely! You may have your own library of code that you use to roll together small applications, or prefer to use a 3rd party framework like Zend, Sapphire, Symfony, Cake etc. Any existing code libraries that do some or all of the above can be used. The one caveat being that it must be able to be distributed (so, open source or home baked) along with your response so that we can evaluate it. 

Do I need to provide documentation?

Only so we can get your code up and running - assume a standard LAMP stack on our end.

Do I need to provide unit tests?

Not required, but we won't ignore them if they are provided.

How long should this take? 

We don't want you to spend much more than a couple of hours putting together a response. 


Thanks for your time, there's no right or wrong answer out of this. If you have any further questions, don't hesitate to email jobs@silverstripe.com.au and we'll get back to you asap. 







