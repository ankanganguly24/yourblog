import conf from "../config/conf";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  database;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteURl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteCollectionId,
        conf.appwriteDatabaseId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (e) {
      console.error(e);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteCollectionId,
        conf.appwriteDatabaseId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (e) {
      console.error(e);
    }
  }

  async deletepost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteCollectionId,
        conf.appwriteDatabaseId,
        slug
      );
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteCollectionId,
        conf.appwriteDatabaseId,
        slug
      );
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async getposts(queries = [Query.equal("status", "active")]) {
    try {
      await this.databases.listDocuments(
        conf.appwriteCollectionId,
        conf.appwriteDatabaseId,
        queries
      );
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  // Storage
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async getFile(fileId) {
    try {
      return await this.bucket.getFileView(conf.appwriteBucketId, fileId);
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

const service = new Service();
export default service;
