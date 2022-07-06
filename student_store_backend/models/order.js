const db = require("../db")
const {BadRequestError, NotFoundError} = require("../utils/errors")

class Order 
{
    static async listOrdersForUser(user)
    {
        //Return all orders the authenticated user has created
        const results = await db.query(
            `
                SELECT orders.id AS "orderId",
                        orders.customer_id AS "customerId",
                        order_details.quantity AS quantity,
                        products.name AS name,
                        products.price AS price
                FROM orders
                    JOIN order_details ON order_details.order_id = orders.id
                    JOIN products ON products.id = order_details.product_id
                WHERE orders.customer_id = (SELECT id FROM users WHERE email = $1)
            `, [user.email]
        )

        return results.rows
    }

    static async createOrder({user, order})
    {
        //Take in an order and store it in database
        // const requiredFields = ["customerId"]
        // requiredFields.forEach(field => {
        //     throw new BadRequestError(`Required Field ${field} missing from request body`)
        // })

        const results = await db.query(
            `
                INSERT INTO orders (customer_id)
                VALUES ((SELECT id FROM users WHERE email = $1))
                RETURNING id
            ` , [user.email]
        )
        const orderId = results.rows[0].id;

        order.map(async (product) => {
           const result =  await db.query(
                `
                    INSERT INTO order_details (order_id, product_id, quantity)
                    VALUES ($1, $2, $3)
                    RETURNING order_id
                `, [orderId, product.id, product.quantity]
            )
        })

        return order
    }
}

module.exports = Order