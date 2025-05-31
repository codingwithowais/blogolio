import {Client , Account, ID} from 'appwrite'
import conf from '../conf/conf'


class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client.setEndpoint(conf.appwriteId);
        this.client.setProject(conf.projectId);
        this.account = new Account(this.client);
    }
    async createAccount({email , password, name}){
        try{
            const newAccount = await this.account.create(ID.unique() , email, password, name);
            if(newAccount){
                return await this.logIn({email , password});
            }
            return newAccount;
        }
        catch(err){
            console.log("Appwrite Services::account creation::", err);
            return false;
        }
    }
    async logIn({email , password}){
        try{
            return await this.account.createEmailPasswordSession(email , password);
        }catch(err){
            console.log("Appwrite Service::Log In::" , err);
            return false;
        }

    }
    async currUser(){
        try{
            return await this.account.get();
        }catch(err){
            console.log("Appwrite Service::User Details::" , err);   
            return false;
        }
    }
    async logOut(){
        try{
             await this.account.deleteSessions();
            return true;
        }
        catch(err){
            console.log("Appwrite Service :: logOut :: " , err);
            return false;
            
        }
    }
    async forgetPassword({email}){
        try {
            return await this.account.createRecovery(email , `${conf.baseUrl}/reset-password`);
        } catch (error) {
         console.log("Appwrite Serivie :: create password recovery :: " , error);
         return false;
        }
    }
    async resetPassword({userId , secret , password, confirmPassword}){
        try {
            return await this.account.updateRecovery(userId , secret , password , confirmPassword);
        } catch (error) {
            console.log("Appwrite Service :: reset password :: " , error);
            return false;
        }
    }
};


const authService = new AuthService();
export default authService 