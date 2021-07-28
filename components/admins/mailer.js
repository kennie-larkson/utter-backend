import dotenv from "dotenv";
import mailchimp from "@mailchimp/mailchimp_marketing";

dotenv.config();

const listId = process.env.MAILCHIMP_LIST_ID;
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});
//Uploading the data to the server
async function mailchimpSubscription(newuser) {
  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: newuser.email,
      status: "subscribed",
    });
    console.log(
      `Successfully added contact as an audience member. The contact's id is ${response.id}.`
    );
    return response;
  } catch (e) {
    console.log(`Error adding subscriber: ${e.message}`);
  }
}

export default mailchimpSubscription;
