const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

module.exports = new (class Service {

    constructor() { }

/**
 * Initialize Admin in MongoDB, but only if the collection is empty.
 */
async  dbInitialiserAdmin() {
    try {
          // Check if an admin with the default email exists
          const foundAdmin = await Admin.findOne({ email: process.env.DEFAULT_USER_EMAIL });
          if (!foundAdmin) {
            // No users found, create a default admin
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(process.env.DEFAULT_USER_PASSWORD, salt);

            const newAdmin = new Admin({
                firstName: process.env.DEFAULT_USER_FIRST_NAME,
                lastName: process.env.DEFAULT_USER_LAST_NAME,
                email: process.env.DEFAULT_USER_EMAIL,
                password: hashedPassword,
            });

            const savedAdmin = await newAdmin.save();
            console.log('Default admin created');
        } else {
        }
    } catch (e) {
        console.error('Error creating default admin');
        console.error(e);
    }
}

});