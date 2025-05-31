import {Client , Databases, Query, ID, Permission , Role} from "appwrite"
import conf from '../conf/conf'


class CommentsServices{
    client = new Client();
    database;
    constructor(){
        this.client.setEndpoint(conf.appwriteId);
        this.client.setProject(conf.projectId);
        this.database = new Databases(this.client);
    }
    async addComment({postId , userId, username , content}){
        try{
           return await this.database.createDocument(conf.databaseId , conf.commentsCollectionId, ID.unique(), {
                postId,
                userId,
                username,
                content
            },     [
           Permission.read(Role.any()),
    Permission.write(Role.user(userId)),
    Permission.delete(Role.user(userId))     // Only the owner can delete
    ])

        }catch(err){
            console.log("Comments Service :: Add comment error" , err);
            return false;
        }
    }
    async deleteComment(comment_id){
        try{
             await this.database.deleteDocument(conf.databaseId , conf.commentsCollectionId , comment_id);
             return true;
        }catch(err){
            console.log("Comments Service Error :: delete comment error " , err );
            return false;  
        }
    }
   async getAllComments(postId){
        try {
            return await this.database.listDocuments(conf.databaseId , conf.commentsCollectionId , [Query.equal('postId' , postId)])
        } catch (error) {
            console.log("Comments Service Error :: Fetch All comments" , error);
            return false;
        }
    }
}


const commentServices = new CommentsServices();
export default commentServices;