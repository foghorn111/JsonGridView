# JsonGridView
A JQuery Widget that can automatically display tabular data and allows customization.
Version # 0.1
Purpose: This Widget can be pointed at most Json data structures and will produce a tabular display. It's designed to work with bootstrap 4+ styles, but can take a css class to put on the table object itself.
Eventual Goal: I'd like this to become a completely customizable control for displaying and editing data, but as of now it's focused on the display side of that equation.
Working on a screen capture video to demonstrate the functionality. Will update this document as new versions roll out.

Let's start the documentation with a discussion of the options presented on the JQuery widget and an example of using them in a script.
1. jsonUrl: Required - string variable that points at any Json bearing data source. Can be pointed at any .json file or at an API that returns Json data. 
2. dataClass: Optional - This is used where you want to customize the presentation of the data in a specific way. For instance, if you're tracking standings for a sports team, you might have data containing values for Wins, Losses, and Ties, but you might want to display those as a combined string field called "Record" with a format of <wins>-<losses>-<ties>. Just make a class that accepts a Json object and concatenates those fields into one "Record" property. The grid will display the exposed properties of your class instead of the underlying data.
3. replacementHeaders: Optional - Array. Used for when you want the headers to have different names than the json object's exposed properties. Perhaps a property is named "Winning_Percentage", and you want to simplify it to just the symbol "%". If you decide to change a column, you will need to include all columns
4. cssClass: Optional - string. Will become the main class for the resulting table. You can then style the rest of the table from that class.
5. caption: Optional - string. Will display a caption for your table.
6. headerWordDelimiter: Optional - string. Allows you to tokenize the property names based on rules. If you used an underscore between words in your property names, pass in an underscore and this will replace all underscores with spaces.  Special Value: "caps" - used when you're properties use capitalized letters to indicate word breaks. In this case, capitalized letters will be prepended with a space. So "HomeScore" becomes "Home Score" and "HomeTeamScore" becomes "Home Team Score".
7. dark: Optional - boolean. When true it will apply the 'table-dark' boostrap class to your table.
8. light: Optional - boolean. When true it will apply the 'table-light' bootstrap class to your table.
9. striped: Optional - boolean. When true it will apply the 'table-striped' bootstrap class to your table.
10. hover: Optional - boolean. When true it will apply the 'table-hover' bootstrap class to your table.
11. bordered: Optional - boolean. When true it will apply the 'table-bordered' bootstrap class to your table.
12. responsiveAlways: Optional - boolean. When true it will apply the 'table-responsive' bootstrap class to your table.
13. responsiveSm: Optional - boolean. When true it will apply the 'table-responsive-sm' bootstrap class to your table.
14. responsiveMd: Optional - boolean. When true it will apply the 'table-responsive-md' bootstrap class to your table.
15. responsiveLg: Optional - boolean. When true it will apply the 'table-responsive-lg' bootstrap class to your table.
16. responsiveXl: Optional - boolean. When true it will apply the 'table-responsive-xl' bootstrap class to your table.
  
This is a jQuery widgit, so to be blunt, expect it to be dependent on both jquery and jquery-ui.
