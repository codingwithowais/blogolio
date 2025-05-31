import {Client , Databases , Storage ,  ID, Query} from 'appwrite'
import conf from '../conf/conf'
import authServices from './auth'

class DBServices{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client.setEndpoint(conf.appwriteId);
        this.client.setProject(conf.projectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async addPost({title , slug, content, featuredImage , userId , status, username}){
        try{
            return await this.databases.createDocument(conf.databaseId , conf.collectionId, slug , {
                title, 
                content, 
                featuredImage,
                userId , 
                status,
                username
            })
        }catch(err){
            console.log("Appwrite Servie :: AddPost Error :: " , err);
            return false;
        }
    }

    async updatePost(slug , {title , content, featuredImage, userId, status,likes, Bookmarks, username}){
        try{
            return await this.databases.updateDocument(conf.databaseId , conf.collectionId , slug,
                {
                    title, 
                    content,
                    featuredImage,
                    userId,
                    status,
                    likes,
                    Bookmarks,
                    username
                }
            )
        }catch(err){
            console.log("Appwrite Service :: updatePost Error" , err);
            return false;
            
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(conf.databaseId, conf.collectionId, slug);
            return true;
        }catch(err){
            console.log("Appwrite Servie :: DeletPost error" , err);
            return false;
        }
    }

    async getSinglePost(slug){
        try {
            return await this.databases.getDocument(conf.databaseId, conf.collectionId, slug)
        } catch (error) {
            console.log("Appwrite Servie :: single post error" , error);
            return false;
        }
    }

    async getAllPost(queries = [Query.equal('status' , 'active')]){
         
   
  
        try {
            return await this.databases.listDocuments(conf.databaseId , conf.collectionId , queries);
        } catch (error) {
            console.log("Appwrite Servie :: all post error" , error);
        }
    }

    // File upload and Storage functionalities

    async uploadImage(file){
        try{
            return await this.bucket.createFile(conf.bucketId , ID.unique() , file);
        }catch(err){
            console.log("Appwrite Service :: upload image error" , err);
            return false;   
        }
    }

    async deleteImage(imageId){
        try {
            await this.bucket.deleteFile(conf.bucketId , imageId);
            return true;
        } catch (error) {
            console.log("Appwrite Servie :: delete image error" , err);
            return false;
        }
    } 

    previewImage(imageId){
       return this.bucket.getFileView(conf.bucketId , imageId);
    }

};



const dbServices = new DBServices();
export default dbServices