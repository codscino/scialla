import { Client, Databases, Permission, Role } from 'node-appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

export default async ({ req, res, log, error }) => {

    log('Hello, Logs!');

    if (req.method === 'GET') {
        // Send a response with the res object helpers
        return res.send(`ciao ${process.env.DOG_NAME}`);
    } else if (req.method === 'POST') {
        // Create a document in the specified collection
        let promise = databases.createDocument(
            process.env.APPWRITE_DATABASE_ID,
            process.env.APPWRITE_USERINFO_ID,
            {'name': 'Chris', 'surname': 'Evans', 'country': 'Italy'},
            [     // Admins can update this document
                Permission.delete(Role.user("65cfcc64a2e0faf8ffb8")), // User tu@tu.com can crud this document 
            ]
        );
        
        // error handling
        promise.then(function (response) {
            console.log(response);
            return res.send(`ce l'abbiamo fatta, forse...`);
            //return res.json(response); // Return the response as JSON
        }).catch(function (error) {
            console.log(error);
            return res.send(`errorre cazzo`);
            //return res.status(500).json({ error: 'Internal server error' }); // Return an error response
        });
    }

    /*return res.json({
        motto: 'Build like a team of hundreds_',
        learn: 'https://appwrite.io/docs',
        connect: 'https://appwrite.io/discord',
        getInspired: 'https://builtwith.appwrite.io',
    });*/
};
