const conf = {
    appwriteId: String(import.meta.env.VITE_APPWRITE_ID),
    projectId: String(import.meta.env.VITE_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_DATABASE_ID),
    collectionId: String(import.meta.env.VITE_COLLECTION_ID),
    bucketId: String(import.meta.env.VITE_BUCKET_ID),
    commentsCollectionId: String(import.meta.env.VITE_COLLECTION_COMMENTS_ID),
    baseUrl: String(import.meta.env.VITE_BASE_URL)
}

export default conf;