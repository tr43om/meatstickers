import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.config";

export const useDocument = (col, id) => {
  const [document, setDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // realtime data for document
  useEffect(() => {
    if (!id) return;
    const ref = doc(db, col, id);

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
          setIsLoading(false);
        } else {
          setError("no such document exists");
          setIsLoading(false);
        }
      },
      (err) => {
        console.log(err.message);
        setError("failed to get document");
      }
    );

    return () => unsub();
  }, [col, id]);

  return { document, error, isLoading };
};
