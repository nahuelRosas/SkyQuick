/* eslint-disable camelcase */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {logger} from "firebase-functions";
import {v2 as Cloudinary} from "cloudinary";

admin.initializeApp();
const firestore = admin.firestore();

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  secure: true,
};

Cloudinary.config(cloudinaryConfig);

export const createUser = functions.auth.user().onCreate(async (user) => {
  logger.info("Creating user 😎");
  const {uid, email, displayName, photoURL, emailVerified, providerData} =
    user;
  const userRef = firestore.collection("users").doc(uid);
  const userDoc = await userRef.get();
  if (userDoc.exists) {
    logger.info("User already exists 🫡");
    return;
  }

  const {secure_url} = await Cloudinary.uploader.upload(photoURL as string, {
    folder: "Avatar",
    public_id: uid,
    overwrite: true,
    invalidate: true,
    format: "WebP",
    image_metadata: false,
  });
  logger.info("Photo uploaded to Cloudinary 📸");

  const userObj = {
    uid,
    email,
    displayName,
    photoURL: secure_url,
    createdAt: new Date(),
    updatedAt: new Date(),
    emailVerified,
    providerData,
  };
  await userRef.set(userObj);
  logger.info("User created 🥳");
});

export const copyFunction = functions.firestore
    .document("users/{userUID}/chats/{chatUID}")
    .onCreate(async (snap, context) => {
      const {chatUID} = context.params;
      const {
        message,
        reciverName,
        reciverPhotoURL,
        reciverUID,
        senderName,
        senderPhotoURL,
        senderUID,
        timestamp,
      } = snap.data();
      const chatRef = firestore
          .collection("users")
          .doc(reciverUID)
          .collection("chats")
          .doc(chatUID);
      const chatDoc = await chatRef.get();
      if (chatDoc.exists) {
        logger.info("Message already exists 🫡");
        return;
      }
      const chatObj = {
        message,
        reciverName,
        reciverPhotoURL,
        reciverUID,
        senderName,
        senderPhotoURL,
        senderUID,
        timestamp,
      };
      await chatRef.set(chatObj);
      logger.info("Message created 🥳");
    });
