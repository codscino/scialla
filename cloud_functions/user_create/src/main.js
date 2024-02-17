import { Client, Databases, Permission, Role } from 'node-appwrite';

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

  if (req.method === 'GET') {
    // Send a response with the res object helpers
    return res.send(`hello ${process.env.DOG_NAME}`);
  } else if (req.method === 'POST') {
    /// Create a document in the specified collection
    const document = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_USERINFO_ID,
      '64674744848484',
      {name: 'Chris'},
      [
        Permission.write(Role.any()),
        //Permission.write(Role.user("65cfcc64a2e0faf8ffb8")), // User tu@tu.com can crud this document 
      ]
    );
    log('fine creazione');
    return res.send('document created');

    // error handling
    /*promise.then(function (response) {
      console.log(response);
      return res.send('document created');
      //return res.json(response); // Return the response as JSON
    }).catch(function (error) {
      console.log(error);
      return res.send('document not created, internal erro');
      //return res.status(500).json({ error: 'Internal server error' }); // Return an error response
    });*/
  }

  log('qui ci sei?');
  return res.json({
    motto: 'Build like a team of hundreds_',
    learn: 'https://appwrite.io/docs',
    connect: 'https://appwrite.io/discord',
    getInspired: 'https://builtwith.appwrite.io',
  });
};
