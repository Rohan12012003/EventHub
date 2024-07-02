import { Client, Account,ID,Databases} from 'appwrite';

export const client = new Client();
const databases = new Databases(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66164d085829ba6b56ac'); // Replace with your project ID
    
export const account = new Account(client);

export async function createUserDocument(user) {
    const promise = databases.createDocument(
        '661be5176c7022701679',
        '661be5a605351bb29633',
        ID.unique(),
        user,
    );
    promise.then(function (response) {
        //console.log(response);
    }, function (error) {
        console.log(error);
    });
}

export async function createRegistration(user,eventId) {
    const userId=user.userId;
    const promise = databases.createDocument(
        '661be5176c7022701679',
        '661bf3fcf31e500a1e5b',
        ID.unique(),
        user,
    );
    promise.then(function (response) {
        //console.log(response);
    }, function (error) {
        console.log(error);
    });
}

export async function listsEvents(){
    return new Promise((resolve, reject) => {
        databases.listDocuments(
            '661be5176c7022701679',
            '661ca58a0a9a43fbf3a1',
        ).then(function (response) {
           // console.log(response.documents);
            resolve(response.documents); // Resolve with the documents data
        }).catch(function (error) {
            console.log(error);
            reject(error); // Reject with the error
        });
    });
}

export async function getEventDetails(eventId) {
    return new Promise((resolve, reject) => {
        databases.getDocument(
            '661be5176c7022701679',
            '661ca58a0a9a43fbf3a1',
            eventId // Use eventId to specify the document ID
        ).then(function (response) {
            //console.log(response);
            resolve(response); // Resolve with the document data
        }).catch(function (error) {
            console.log(error);
            reject(error); // Reject with the error
        });
    });
}

export async function editEvent(eventId,event){
    return new Promise((resolve,reject)=>{
        databases.updateDocument(
            '661be5176c7022701679',
            '661ca58a0a9a43fbf3a1',
            eventId,
            event
        ).then(function (response){
            console.log(response);
            resolve(response);
        }).catch(function(error){
            console.log(error);
            reject(error);
        })
    })
}

export async function getUserDetails(userId) {
    return new Promise((resolve, reject) => {
        databases.listDocuments(
            '661be5176c7022701679', // Replace with your actual collection ID
            '661be5a605351bb29633', // Replace with your actual document ID
        ).then(function (response) {
            //console.log(response);
            const users = response.documents; // Assuming users is an array of user objects in the document
            const user = users.find(user => user.accountid === userId);
            if (user) {
                //console.log(user);
                resolve(user); // Resolve with the user details
            } else {
                reject(new Error('User not found')); // Reject if user not found
            }
        }).catch(function (error) {
            console.error(error);
            reject(error); // Reject with the error
        });
    });
}

export async function createEvent(event) {
    const promise = databases.createDocument(
        '661be5176c7022701679',
        '661ca58a0a9a43fbf3a1',
        ID.unique(),
        event,
    );
    promise.then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
}


export function getRegistration() {
    return new Promise((resolve, reject) => {
        databases.listDocuments(
            '661be5176c7022701679',
            '661bf3fcf31e500a1e5b'
        ).then(
            response => {
                resolve(response.documents);
            },
            error => {
                console.error('Error fetching registrations:', error);
                reject(error);
            }
        );
    });
}


export { ID } from 'appwrite';
