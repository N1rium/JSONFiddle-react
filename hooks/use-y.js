import React, { useState, useEffect } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

const useY = ({ room = "", password = null, event = "" }) => {
  const [value, setValue] = useState(null);
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(room, ydoc, {
      ...(password && { password }),
    });
    const ymap = ydoc.getMap(event, Y.Map);
    ymap.observe(() => {
      setValue(ymap.get(event));
    });
    setDoc(ydoc);
  }, []);

  const set = (data) => {
    if (doc) {
      const state = doc.getMap(event);
      console.log(data);
      state.set(event, data);
    }
  };

  return [value, set];
};

export default useY;
