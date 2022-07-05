import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth } from "../firebase.config";
import { storage } from "../firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useFirestore } from "../hooks/useFirestore";
export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { addDocument } = useFirestore("meatstickers");
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // sign up user
      await createUserWithEmailAndPassword(auth, email, password);

      // upload user thumbnail
      const uploadPath = `thumbnails/${auth.currentUser.uid}/${thumbnail.name}`;

      const storagePath = ref(storage, uploadPath);

      const img = await uploadBytes(storagePath, thumbnail);
      const imgUrl = await getDownloadURL(img.ref);

      // add display name to user
      await updateProfile(auth.currentUser, { displayName, photoURL: imgUrl });

      await addDocument(
        {
          name: displayName,
          avatar: imgUrl,
          description: "",
        },
        auth.currentUser.uid
      );
      // dispatch login action
      dispatch({ type: "LOGIN", payload: auth.currentUser });
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
