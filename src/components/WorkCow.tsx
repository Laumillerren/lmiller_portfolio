"use client";

import { CowUnit } from "./CowUnit";
import { WalkingFieldContext } from "./WalkingFieldContext";

// The big "at work" cow in the home page hero. It sits inside the
// WalkingField's tree, so give it a null context: CowUnit then falls back
// to inert motion values and the cow stays put instead of walking with the
// side-project herd.
export function WorkCow() {
  return (
    <WalkingFieldContext.Provider value={null}>
      <CowUnit
        href="/work"
        label="AT WORK"
        meta="Data Engineering · Aramark"
        ctaLabel="SEE MY WORK →"
        size={24}
        depth={1}
      />
    </WalkingFieldContext.Provider>
  );
}
