
import cron from "node-cron";
import ProductModel from "../Model/Product.js";
import UserModel from "../Model/user.js";
import sendEmail from "../Config/nodemailer.js";

// Remaining warranty days calculate karna
const getDaysLeft = (warrantyEndDate) => {
    const today = new Date();
    const expiry = new Date(warrantyEndDate);

    const todayUTC = Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate()
    );

    const expiryUTC = Date.UTC(
        expiry.getUTCFullYear(),
        expiry.getUTCMonth(),
        expiry.getUTCDate()
    );

    return Math.round(
        (expiryUTC - todayUTC) / (1000 * 60 * 60 * 24)
    );
};

// Warranty reminders aur expired products delete
const warrantyReminder = () => {

    // Daily subah 9 baje reminder emails
    cron.schedule("0 9 * * *", async () => {
        try {
            const products = await ProductModel.find({
                warrantyEndDate: { $gte: new Date() }
            });

            for (const product of products) {

                const daysLeft = getDaysLeft(product.warrantyEndDate);

                let reminderField = "";
                let reminderMessage = "";

                if (daysLeft === 30 && !product.monthReminderSent) {
                    reminderField = "monthReminderSent";
                    reminderMessage = "Your product warranty will expire in 1 month.";
                }
                else if (daysLeft === 7 && !product.weekReminderSent) {
                    reminderField = "weekReminderSent";
                    reminderMessage = "Your product warranty will expire in 1 week.";
                }
                else if (daysLeft === 1 && !product.dayReminderSent) {
                    reminderField = "dayReminderSent";
                    reminderMessage = "Your product warranty will expire tomorrow.";
                }

                if (reminderField) {
                    const user = await UserModel.findById(product.userId);

                    if (!user) continue;

                    const sent = await sendEmail(
                        user.email,
                        "Warranty Expiration Reminder",
                        `Hello ${user.name},

${reminderMessage}

Product: ${product.productName}
Warranty Expiry Date: ${product.warrantyEndDate.toDateString()}

Thank you.`
                    );

                    if (sent) {
                        product[reminderField] = true;
                        await product.save();
                    }
                }
            }

            console.log("Warranty reminders checked");

        } catch (error) {
            console.log("Reminder Error:", error);
        }

    }, {
        timezone: "Asia/Kolkata"
    });


    // Daily raat 12 baje expired products delete
    cron.schedule("0 0 * * *", async () => {
        try {
            const today = new Date();

            // Aaj se 2 din pehle ki date
            const deleteDate = new Date(today);
            deleteDate.setDate(deleteDate.getDate() - 2);
            deleteDate.setHours(0, 0, 0, 0);

            const result = await ProductModel.deleteMany({
                warrantyEndDate: { $lt: deleteDate }
            });

            console.log(
                `${result.deletedCount} expired products deleted`
            );

        } catch (error) {
            console.log("Delete Error:", error);
        }

    }, {
        timezone: "Asia/Kolkata"
    });

};

export default warrantyReminder;
