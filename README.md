1. 
Retrieve all documents from a users collection where status is "active" and return only their name and email fields.
{ _id, name, email, status, createdAt }
2. 
Count orders by status
{_id, userId, status, total}
3. 
Using the orders collection, aggregate total spend per userId and return the top 5 highest spenders.
{ _id, userId, items: [...], totalAmount, date }

4. Add to our NodeJS Rest api project Product model. Products consists from fields: category, title, price, array of warehouses where product is located within its quantity, field which contains all specifications of product. Add Rest method for to retrieve all records, one record by id, add new product and update product specifications. Add search method, which returns products with pagination and can filter product list by title of product. This should be written on NodeJS