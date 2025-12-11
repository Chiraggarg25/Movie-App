import {Client,ID, Query,Databases} from "appwrite";

const PROJECT_ID=import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID=import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID=import.meta.env.VITE_APPWRITE_TABLE_ID;


const client = new Client()
    .setEndpoint('https://sgp.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    //1. Use APPwrite API to check if the search terms exists in the table.
    try{
        const result = await database.listDocuments(DATABASE_ID,TABLE_ID,
            [Query.equal('searchTerm', searchTerm)]);
        //2. If it does, update the count
        if(result.documents.length > 0){
            const  documents = result.documents[0];
            await database.updateDocument(DATABASE_ID,TABLE_ID,documents.$id,
                { count: documents.count +1 })
        } else {
            //3. If not, create a new row with the search term and update the count as 1
            await database.createDocument(DATABASE_ID,TABLE_ID,ID.unique(),{
                searchTerm,
                count:1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            })
        }
    }
    catch(err){
        console.log(err);
    }



}

export const getTrendingMovies = async (query) => {
    try{
        const result=await database.listDocuments(DATABASE_ID,TABLE_ID, [
                Query.limit(10),
                Query.orderDesc("count")
            ])
        return result.documents;
    }catch (e) {
        console.log(e);
    }
}