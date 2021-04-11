DATABASE_URL = process.env.DATABASE_URL

exports.config = {
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}
