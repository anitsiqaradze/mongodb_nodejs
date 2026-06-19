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

