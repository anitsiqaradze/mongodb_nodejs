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



# 1
public class CustomerPaymentDto {
    private String fullName;
    private Double totalAmount;
}




    @Query("""
           SELECT new com.example.dto.CustomerPaymentDto(c.fullName, SUM(p.amount))
           FROM Payment p
           JOIN p.customer c
           GROUP BY c.id, c.fullName
           HAVING SUM(p.amount) > 1000
           ORDER BY SUM(p.amount) DESC
           """)
    List<CustomerPaymentDto> findCustomerPaymentTotals();



# 2 

public interface EmployeeDepartmentView {
    String getFullName();
    String getDepartmentName();
}


  @Query("""
           SELECT e.fullName AS fullName, d.name AS departmentName
           FROM Employee e
           JOIN e.department d
           """)
    List<EmployeeDepartmentView> findEmployeeDepartmentViews();


# 3

  @Query("""
           SELECT new com.example.dto.InvoiceDto(i.clientName, i.total)
           FROM Invoice i
           WHERE i.createdAt >= :startOfYear AND i.createdAt <= :endOfYear
           ORDER BY i.total DESC
           """)
    Page<InvoiceDto> findInvoicesForYear(
            @Param("startOfYear") LocalDate startOfYear,
            @Param("endOfYear") LocalDate endOfYear,
            Pageable pageable);


# 4

 @Query("SELECT d FROM Doctor d WHERE d.specialization LIKE CONCAT('%', :keyword, '%')")
    List<Doctor> findBySpecializationContaining(@Param("keyword") String keyword);



# 5
Write a JPQL query that returns, per region: the region name, the number of orders, and the average order total.
Include only regions that have more than 5 orders.
Sort by average order total descending.

 @Query("""
           SELECT new com.example.dto.RegionStatsDto(o.region, COUNT(o), AVG(o.totalPrice))
           FROM Order o
           GROUP BY o.region
           HAVING COUNT(o) > 5
           ORDER BY AVG(o.totalPrice) DESC
           """)


# 6

Create an interface projection named BookDetailView returning: book title, author full name, publisher name.
Write a JPQL query using two JOINs.

  @Query("""
           SELECT b.title AS title, a.fullName AS authorName, p.name AS publisherName
           FROM Book b
           JOIN b.author a
           JOIN b.publisher p
           """)


# 7
Write a JPQL constructor query returning products whose price is between two parameters (minPrice, maxPrice) and whose stock is greater than 0.
Sort by price ascending.
@Query("""
        SELECT new ProductDto(p.name, p.price, p.category)
        FROM Product p
        Where p.price BETWEEN :minPrice AND :maxPrice
        AND p.stock > 0
        ORDER BY p.price ASC
        """)

# 8 
Write a JPQL query that returns all transactions from the last 30 days whose amount is greater than the overall average transaction amount (use a subquery).
@Query("""
    SELECT new TransactionDto(a.owner, t.amount, t.createdAt)
    FROM Transaction t
    JOIN t.account a
    WHERE t.createdAt >= :since
    AND t.amount > (SELECT AVG(t2.amount) FROM transaction t2)
    ORDER BY t.amount DESC
    )


# 9
Write a JPQL query that returns only active courses whose title contains a keyword (case-insensitive — hint: LOWER(...)).

SELECT c FROM Course c
WHERE c.active = true
AND LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%))
# 10
Write a JPQL query using LEFT JOIN so that teams with zero players are still included (count = 0).
Sort by player count descending, then by team name ascending.

 @Query("""
           SELECT new com.example.dto.TeamSizeDto(t.name, COUNT(p))
           FROM Team t
           LEFT JOIN t.players p
           GROUP BY t.id, t.name
           ORDER BY COUNT(p) DESC, t.name ASC
           """) 
