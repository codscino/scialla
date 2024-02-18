import { Client, Databases, ID, Permission, Role } from 'node-appwrite';

export default async ({ req, res, log, error }) => {

  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);

  // You can log messages to the console
  log('Hello, Logs!');

  // If something goes wrong, log an error
  error('Hello, Errors!');

  // Parse the request body to get IDINPUT
  const { IDINPUT } = JSON.parse(req.body);
  log(IDINPUT);

  if (req.method === 'GET') {
    // Send a response with the res object helpers
    return res.send(`hello ${process.env.DOG_NAME}`);
  } else if (req.method === 'POST') {
    try {
      /// Create a document in the specified collection
      const response = await databases.createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_USERINFO_ID,
        ID.unique(),
        // name not require could be not written, but at least one other require parameter
        {surname: 'dibba'},
        [
          Permission.write(Role.user(IDINPUT)),
          Permission.read(Role.user(IDINPUT)),
          //Permission.write(Role.any()),
          //Permission.read(Role.any()),
        ]
      );

      console.log(response);
      return res.send('document created');

    } catch (err) {
      console.log(err);
      return res.send('document not created ' + err);
    }
  }

  return res.json({
    motto: 'Build like a team of hundreds_',
    learn: 'https://appwrite.io/docs',
    connect: 'https://appwrite.io/discord',
    getInspired: 'https://builtwith.appwrite.io',
  });
};
