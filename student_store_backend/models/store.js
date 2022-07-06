const db = require("../db")

class Store 
{
    static async listProducts()
    {
        //Run SQL query that search the database for all products
        //Return the list

        const results = await db.query(
            `
                SELECT products.id,
                        products.name,
                        products.category,
                        products.image,
                        products.description,
                        products.price
                FROM products
            `
        )

        return results.rows
    }
}

module.exports = Store