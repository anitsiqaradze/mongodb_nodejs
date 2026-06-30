MongoDB queries for tasks:

Retrieve all documents from a users collection where status is "active" and return only their name and email fields.
{ _id, name, email, status, createdAt }

db.users.find(
    { status: "active" },
    { name: 1, email: 1, _id: 0 }
)


Count orders by status
{_id, userId, status, total}

db.orders.aggregate([
    {
        $group: {
            _id: "$status",
            count: { $sum: 1 }
        }
    }
])


Using the orders collection, aggregate total spend per userId and return the top 5 highest spenders.
{ _id, userId, items: [...], totalAmount, date }

db.orders.aggregate([
    {
        $group: {
            _id: "$userId",
            totalSpend: { $sum: "$totalAmount" }
        }
    },
    { $sort: { totalSpend: -1 } },
    { $limit: 5 }
])





4. Add to our NodeJS Rest api project Product model.
 Products consists from fields: 
 category, title, price, array of warehouses where product is located within its quantity, field which contains all specifications of product.
  Add Rest method for to retrieve all records, one record by id, add new product and update product specifications. Add search method, which returns products with pagination and can filter product list by title of product. This should be written on NodeJS




1. Retrieve all active users and return only name and email

db.users.find(
  { status: "active" },
  { _id: 0, name: 1, email: 1 }
)

{ status: "active" } → filters users with active status.
{ _id: 0, name: 1, email: 1 } → returns only name and email, excluding _id.

2. count orders by status

db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 }
    }
  }
])

1
db.orders.aggregate([
  {
    $group: {
      _id: "$userId",
      totalSpend: { $sum: "$totalAmount" }
    }
  },
  {
    $sort: {
      totalSpend: -1
    }
  },
  {
    $limit: 5
  }
])

<!-- The equality operator($eq) is used to match the documents where the value of the field is equal to the specified value -->

<!-- Retrieve and display all documents from the 'article' collection where the author is "devil -->

db.article.find({author:{$eq:"devil"}}).pretty() 



<!-- Use $gte and $lte in find() to filter documents by numeric ranges (greater/less than or equal). -->

<!-- 
db.collection_name.find({< key > : {$gte : < value >}}) 
or 
db.collection_name.find({< key > : {$lte : < value >}})  -->


<!-- 
Retrieve and display all documents from the 'article' collection where the length is greater than or equal to 510. -->


db.article.find({length:{$gte:510}}).pretty()



// Specify AND Conditions

db.articles.find({
  $and: [
    { author: "Alen" },
    { level: "basic" }
  ]
}).pretty()

// OR

db.article.find({
  $or: [
    { level: "basic", author: "Alen" },
    { $and: [
        { level: "medium" },
        { author: "Rim" }
      ]
    }
  ]
}).pretty()

db.articles.find({
  $or: [
    { author: "Rim" },
    { level: "high" }
  ]
}).pretty()


Limit the Number of Results
db. article. find({author : "devil" }). limit(2) . pretty() 

$eq: Equal to
$gt: Greater than
$gte: Greater than or equal to
$lt: Less than
$lte: Less than or equal to
$ne: Not equal to
$in: Matches any value in an array
$nin: Matches none of the values in an array
$exists: Checks for the existence of a field
$or: Performs a logical OR operation


///////////////////////
{
  "_id": ObjectId(),
  "name": "Alice",
  "email": "alice@example.com",
  "age": 25,
  "status": "active",
  "city": "New York",
  "role": "customer",
  "createdAt": ISODate("2024-01-10")
}


{
  "_id": ObjectId(),
  "userId": ObjectId(),
  "items": [
    {
      "productId": ObjectId(),
      "quantity": 2,
      "price": 50
    }
  ],
  "status": "completed",
  "totalAmount": 100,
  "paymentMethod": "card",
  "date": ISODate("2024-02-15")
}



{
  "_id": ObjectId(),
  "name": "Laptop",
  "category": "Electronics",
  "price": 1200,
  "stock": 25,
  "rating": 4.7
}


# find

In find(), there are two arguments:
db.collection.find(filter, projection)
{} means "no filter" or "match all documents."


1. find({status:"active"})
2. find({age: {$gt(e)/$lt(e)):25}})
3. find({city: "London"})
4. find({rolw:"admin"})
5. find({createdAt:{$gt:ISODate("2024-01-01)}})



# projection

// mixed 0 and 1s are only possible when mixed with id other will throw an error, just include all that needs to be projected or omitted

1. find( {},
        {
            name:1,
            email:1,
            _id: 0
        }
)

2. exclude email
    {
        email:0
    }
3. users not living in paris
    find(
        {city:{
            $ne:"paris"
        }}
    )





# comparison

1. price between range
db.products.find({
    price: {
        $gte: 100,
        $lte: 500
    }
})

or could be
 db.products.find({
    $and: [
        { price: { $gte: 100 } },
        { price: { $lte: 500 } }
    ]
})


2. order containing at least one item 

db.orders.find({
    "items.0": {
        $exists: true
    }
})

3. orders where any item's quantity is greater than 5
db.orders.find({
    "items.quantity": {
        $gt: 5
    }
})

4. products whose tags contain "sale"
tags: ["sale","electronics"]

db.products.find({
    tags: "sale"
})

db.products.find({
    tags: {
        $in: ["sale"]
    }
})




# Sort

1. sort users by age
find().sort({age:1}) asc
age: -1 desc

2. orders sorted by newest first
find().sort({date:-1})


# Limit & Skip

1. first 5 users
find().limit(5)

2. pagination page 3 size 10
  db.users.find()
  .skip(20)
  .limit(10)

# Count queries

db.users.countDocuments({})
db.users.countDocuments({status:"active"})
db.users.countDocuments({ age: { $gt: 40 } })


# Update

db.users.updateOne(
  { _id: ObjectId("USER_ID") },
  { $set: { status: "active" } }
)

db.users.updateMany(
  { status: "inactive" },
  { $set: { status: "active" } }
)

increase product price by 10%
db.products.updateMany(
  {},
  { $mul: { price: 1.10 } }
)

increase stock by 5

db.products.updateMany(
  {},
  { $inc: { stock: 5 } }
)

# Delete

db.users.deleteOne({ status: "inactive" })
db.orders.deleteMany({ status: "cancelled" })

# Aggregate
1. count users by city
users.aggregate([
  {
    $group: {
      _id:"$city",
      count: { $sum:1}
    }
  }
])

2. count orders by status
aggregate([
  $group:{
    _id: "$status",
    count: {$sum:1}
  }
])

3. average product price

aggregate([
  {
    $group: {
      _id:null,
      avgPrice: {$avg:"$price" }
    }
  }
])

4. total spending per user 
db.orders.aggregate([
  {
    $group: {
      _id: "$userId",
      totalSpent: { $sum: "$totalAmount" }
    }
  }
])

5. total products per category
products.aggregate([
  $group:{
    _id: "$category",
    totalProducts: {$sum:1}
  }
])

6. average user age
aggregate([
  {
    $group: {
      _id: null,
      avgAge: {$avg: "$age"}
    }
  }
])

7. average spending per customer
aggregate([
  {
    $group: {
      _id: "$userId",
      avgSpent: {$avg: "$totalAmount"}
    }
  }
])

8. average product price by category
aggregate([
  {
    $group:{
      _id:"$categor",
      avgPrice: {$avg:"$price"}
    }
  }
])



9. highest product price
db.products.aggregate([
  {
    $group: {
      _id: null,
      maxPrice: { $max: "$price" }
    }
  }
])


# Grouping

1. users grouped by city 

db.users.aggregate([
  {
    $group: {
      _id: "$city",
      users: { $sum: 1 }
    }
  }
])


2. products by category

db.products.aggregate([
  {
    $group: {
      _id: "$category",
      count: { $sum: 1 }
    }
  }
])

3. active vs inactive 

db.users.aggregate([
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 }
    }
  }
])


# Sorting Grouping

1. top 5 spenders

.aggregate([
  {
    $group: {
      _id:  "userId",
      totalSpent: {$sum: "$totalAmount"}

    }
  }
  ,
  {
    $sort: {totalSpent: -1}
  },
  {
    $limit: 5
  }
])

2. top 10 expensive products

db.products.find().sort({ price: -1 }).limit(10)

3. cities with most users 

db.users.aggregate([
  {
    $group: {
      _id: "$city",
      count: { $sum: 1 } #for every document in a group, add 1
    }
  },
  { $sort: { count: -1 } } # sort by count descending
])

4. most popular payment method

aggregate([
  {
    $group: {
      _id: "$paymentMethod",
      count: {$sum:1}
    }
  },
  {
    $sort: {count: -1}
  },
  {$limit:1}
])


5. highest selling category

aggregate([
  {
    $group:{
      _id: "$category",
      total: {$sum:1}
    }
  },
  {$sort: {total: -1}},
  {$limit:1}
])


6. orders last year

db.orders.find({
  date: {
    $gte: new Date("2025-01-01"),
    $lte: new Date("2025-12-31")
  }
})





Concept 1 — Filter + projection (find)
Retrieve all active users, return only name and email.
javascriptdb.users.find(
  { status: "active" },
  { name: 1, email: 1, _id: 0 }   // 1 = include, _id excluded explicitly
)
The first {} is the filter, the second is the projection. You can't mix 1 and 0 except to drop _id.
Concept 2 — Comparison & range operators
Find products priced between 20 and 100, cheapest first.
javascriptdb.products.find({ price: { $gte: 20, $lte: 100 } }).sort({ price: 1 })
$gte/$lte build the range; sort({ price: 1 }) is ascending (-1 for descending).
Concept 3 — Logical operators
Find orders that are "paid" OR over 500.
javascriptdb.orders.find({ $or: [{ status: "paid" }, { total: { $gt: 500 } }] })
Use $or/$and/$nor when conditions span different rules. Listing multiple fields in one object is an implicit AND.
Concept 4 — Array membership (dot notation)
Find products stored in the "Tbilisi-Central" warehouse.
javascriptdb.products.find({ "warehouses.name": "Tbilisi-Central" })
A scalar against an array field tests membership — matches if any element's name equals it.
Concept 5 — $elemMatch (same-element match)
Find products where one warehouse holds at least 100 units of that same warehouse.
javascriptdb.products.find({
  warehouses: { $elemMatch: { name: "Tbilisi-Central", quantity: { $gte: 100 } } }
})
Without `elemMatch`, `{ "warehouses.name": "X", "warehouses.quantity": {
gte:100} }` could match if different elements satisfy each condition. $elemMatch forces both onto the same element.
Concept 6 — Counting
Count orders by status.
javascriptdb.orders.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } }
])
// → { _id: "paid", count: 120 }, { _id: "cancelled", count: 9 }, ...
{ $sum: 1 } adds 1 per document in each group. For a single total instead, use db.orders.countDocuments({ status: "paid" }).
Concept 7 — Group + sum + top-N
Total spend per userId, return the top 5 spenders.
javascriptdb.orders.aggregate([
  { $group: { _id: "$userId", totalSpent: { $sum: "$total" } } },
  { $sort: { totalSpent: -1 } },
  { $limit: 5 }
])
The classic top-N shape: $group → $sort → $limit. This is the single most common analytics pattern.
Concept 8 — Multiple accumulators per group
Average, min, and max price per category.
javascriptdb.products.aggregate([
  { $group: {
      _id: "$category",
      avgPrice: { $avg: "$price" },
      minPrice: { $min: "$price" },
      maxPrice: { $max: "$price" }
  } }
])
A single $group can compute many aggregates at once — $avg, $min, $max, $sum, $first, $last.
Concept 9 — Summing an array field
Total stock per product (sum across its warehouses).
javascriptdb.products.aggregate([
  { $project: { title: 1, totalStock: { $sum: "$warehouses.quantity" } } }
])
$sum applied to an array path ("$warehouses.quantity") adds up every element — no $unwind needed when you only want the per-document total.
Concept 10 — $unwind + group
Total quantity held in each warehouse across all products.
javascriptdb.products.aggregate([
  { $unwind: "$warehouses" },                        // one row per warehouse entry
  { $group: {
      _id: "$warehouses.name",
      totalQuantity: { $sum: "$warehouses.quantity" }
  } },
  { $sort: { totalQuantity: -1 } }
])
$unwind explodes the array so each warehouse becomes its own document; then you can group across products by warehouse name.
Concept 11 — $lookup (join) + $match as HAVING
Group + filter on the aggregate: categories whose average price exceeds 100.
javascriptdb.products.aggregate([
  { $group: { _id: "$category", avgPrice: { $avg: "$price" } } },
  { $match: { avgPrice: { $gt: 100 } } },   // filter AFTER grouping = SQL HAVING
  { $sort: { avgPrice: -1 } }
])
`match‘∗before∗‘match` *before* `
match‘∗before∗‘group` is a WHERE; `match‘∗after∗‘match` *after* `
match‘∗after∗‘group` is a HAVING.
Join orders to customers, return each order with the customer's name.
javascriptdb.orders.aggregate([
  { $lookup: { from: "customers", localField: "customerId",
               foreignField: "_id", as: "customer" } },
  { $unwind: "$customer" },                          // flatten the 1-element array
  { $project: { total: 1, customerName: "$customer.name", _id: 0 } }
])
$lookup joins; $unwind turns the joined array into a plain object. Add preserveNullAndEmptyArrays: true to the unwind for a left join.
Concept 12 — Update with the positional $
Sell 5 units from one product's "Tbilisi-Central" warehouse.
javascriptdb.products.updateOne(
  { _id: id, "warehouses.name": "Tbilisi-Central" },  // filter matches the element
  { $inc: { "warehouses.$.quantity": -5 } }           // $ = the matched element
)
