File Upload - This feature will allow a user to upload a CSV file or something like that so that they can instantly populate their cellar with wine

Edit Cellar Item - part of the remaining CRUD operations that need to be finished

complete all code for CRUD operations:
  cellar: update 
  
  celaritem: read (reading operation will be coupled with edit I think because it more about viewing the wine than editing the  quantity), update, delete (Although most of the time a user will simply leave a cellaritem with a quantity of 0, in some cases they may need or want to actually delete the item so we can enable this operation)
  
  user: update, delete
  
  wine: update, delete - For now, this app will allow multiple users to edit the same wine info which is something that would need to be addressed in future.  Only administrators would be allowed to edit the wine information which raises the question of what to do with the process of uploading CSV files.  We would have to search for each wine first to see if it was an existing wine (even if a different vintage)  This could get tricky but will need to be addressed if this is to be used out in the wild.
  
Basic styling - even just for the sake of havong something that looks vaguely like a real website
  
replace mongoose's deprecated promise library - get rid of this warning that keeps popping up

ngOnDestroy - make sure you unsubscribe from your observables in all your components! There is a way to do this automagically as soon as you connect to the observable the first time
  
How to deal with sessions and keeping users logged in.  Provide the option but otherwise set the cookie timeout to be something reasonable

Map Feature for Wine objects - It would be awesome to be able to see where a producer / domain is on a map.  It would be cool to have a map view of a cellar as well so a user could see the distribution of their cellar across the globe.

Move constants from Utils to a Constants class...makes more sense

put business objects in a models folder and then maybe subfolders for things like business

Form validation

Do a security review of this app before deploying it...even if its only for personal use.

create guest user account when you deploy so that visitors can see how it all works.

Make API truly RESTful with Hypermedia

Feature - Add same wine with different vintage

How to replace a single item in a list after editing it? - not sure this is really going to be an issue.  Once the server verifies that we successfully updated an item then we can replace it in the list with the "edit" version of the item or just edit the properties that have changed

Search all wines once there is a body of searcheable wines, we need the ability to add a wine to a cellar after finding it in a search.

Semantic Layout - consider using something like semantic layout to organize components and containers

Cellar Stats on Dashboard - display data to the user on the dashboard about their collection:  How many reds?  How many whites? Sparkling?  How much money is it worth?

Image Upload - allow a user to upload a wine label image for a wine.  Ultimately it would be nice to ties this in to Delectable / Banquet

Consider not loading ALL wines in a cellar when initializing a cellar.  This *could* become an issue with large cellars but its not worth worrying about this until there is an issue.  Something like Angular Fire could be used to page data from the server.

Tasting Notes - new Schema? A cool feature would be to allow bot public and private tasting notes...or the ability to mark a tasting note as public / private.
