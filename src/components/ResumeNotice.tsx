"use client";

import { useState } from "react";

// Stand-in for the resume download while it's being updated. To restore the
// download, drop the file at public/resume.pdf and switch the RESUME entry in
// src/app/contact/page.tsx back to a link to `${BASE_PATH}/resume.pdf`.
export function ResumeNotice({ email }: { email: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="text-sm hover:text-accent transition-colors underline underline-offset-4 decoration-rule cursor-pointer"
      >
        Download PDF
      </button>
      {open && (
        <p className="mt-2 text-sm text-ink-soft" role="status">
          My resume is being updated. If you&apos;re interested, reach out at{" "}
          <a
            href={`mailto:${email}`}
            className="hover:text-accent transition-colors underline underline-offset-4 decoration-rule"
          >
            {email}
          </a>
          .
        </p>
      )}
    </>
  );
}
