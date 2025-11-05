"use client";

import { AuthContext } from "@/contexts/authContext";
import { ShopInterface } from "@/interface/interface";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { Alert } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Skeleton from "../loading/Skeleton";

type DocKey =
  | "proof_of_identity"
  | "business_registration"
  | "business_address";

type DocSpec = {
  slug: DocKey;
  label: string;
  hint?: string;
};

type ExistingDoc = {
  slug: DocKey;
  link?: string;
  label: string;
};

type FileState = {
  file?: File;
  previewUrl?: string;
  status: "idle" | "ready" | "uploading" | "uploaded" | "error";
  progress: number;
  error?: string | null;
};

const DOCS: DocSpec[] = [
  {
    slug: "proof_of_identity",
    label: "Proof of Identity",
    hint: "International Passport, Driver's Licence, Voter's Card, Etc.",
  },
  {
    slug: "business_registration",
    label: "Business Registration Document",
    hint: "CAC certificate, Incorporation Docs, Etc.",
  },
  {
    slug: "business_address",
    label: "Proof of Business Address",
    hint: "Utility Bill, Bank Statement (≤ 3 Months), Etc.",
  },
];

const MAX_FILE_SIZE_BYTES = 1.5 * 1024 * 1024;
// images and pdf files
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const VendorDocsUploader = () => {
  const isVendorOnboarding =
    process.env.NEXT_PUBLIC_VENDOR_ONBOARDING === "true";
  const token = useSelector(globalSelectors.selectAuthToken);
  const { user } = useContext(AuthContext);

  const shopId = user?.shopId;

  const getShopQuery = zeapApiSlice.useGetShopQuery(
    {},
    { skip: !token || !shopId }
  );
  const shop: ShopInterface = getShopQuery?.data?.data || null;
  const editable = shop?.disabled; // true = can edit
  const getShopDocsQuery = zeapApiSlice.useGetShopOnboardingDocumentsQuery(
    { shopId },
    { skip: !shopId || !token }
  );
  const isLoading = getShopDocsQuery.isLoading;
  const existingDocs = getShopDocsQuery?.data?.data as
    | ExistingDoc[]
    | undefined;
  const [addDocument, { isLoading: isUploading }] =
    zeapApiSlice.useAddOnboardingDocumentMutation();

  const [files, setFiles] = useState<Record<DocKey, FileState>>({
    proof_of_identity: { status: "idle", progress: 0 },
    business_registration: { status: "idle", progress: 0 },
    business_address: { status: "idle", progress: 0 },
  });

  // Hydrate from fetched docs
  useEffect(() => {
    if (existingDocs?.length) {
      const updated = { ...files };
      (existingDocs as ExistingDoc[]).forEach((doc) => {
        if (doc.slug in updated && doc.link) {
          updated[doc.slug as DocKey] = {
            status: "uploaded",
            progress: 100,
            previewUrl: doc.link,
          };
        }
      });
      setFiles(updated);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingDocs]);

  const uploadedCount = useMemo(
    () => Object.values(files).filter((f) => f.status === "uploaded").length,
    [files]
  );

  const totalDocs = DOCS.length;

  const handleFileSelect = (slug: DocKey, file?: File | null) => {
    setFiles((prev) => {
      if (prev[slug].previewUrl) URL.revokeObjectURL(prev[slug].previewUrl);

      if (!file) return { ...prev, [slug]: { status: "idle", progress: 0 } };

      if (!ALLOWED_TYPES.includes(file.type)) {
        return {
          ...prev,
          [slug]: {
            status: "error",
            progress: 0,
            error: "Only PNG, JPEG, WEBP, and PDF files are allowed.",
          },
        };
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        return {
          ...prev,
          [slug]: {
            status: "error",
            progress: 0,
            error: "File is too large (max 1.5 MB).",
          },
        };
      }

      const previewUrl = URL.createObjectURL(file);
      return {
        ...prev,
        [slug]: { file, previewUrl, status: "ready", progress: 0, error: null },
      };
    });
  };

  const handleClearSelection = (slug: DocKey) => {
    setFiles((prev) => {
      if (prev[slug].previewUrl) URL.revokeObjectURL(prev[slug].previewUrl);
      return { ...prev, [slug]: { status: "idle", progress: 0 } };
    });
  };

  const uploadSingle = async (slug: DocKey) => {
    if (!shopId) return;
    const fileState = files[slug];
    if (!fileState.file || !editable) return;

    setFiles((prev) => ({
      ...prev,
      [slug]: { ...prev[slug], status: "uploading", progress: 0, error: null },
    }));

    const formData = new FormData();
    formData.append("file", fileState.file);
    formData.append("shopId", shopId);
    formData.append("slug", slug);
    const payload = formData;
    try {
      await addDocument({ payload }).unwrap();
      setFiles((prev) => ({
        ...prev,
        [slug]: { ...prev[slug], status: "uploaded", progress: 100 },
      }));
    } catch (error: unknown) {
      const message =
        error && typeof error === "object" && "data" in error
          ? (error as { data: { error?: string } }).data?.error ??
            "Upload failed"
          : "Upload failed";
      setFiles((prev) => ({
        ...prev,
        [slug]: { ...prev[slug], status: "error", error: message },
      }));
    }
  };

  const uploadAllReady = async () => {
    const readyKeys = Object.entries(files)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, v]) => v.status === "ready")
      .map(([k]) => k as DocKey);
    for (const slug of readyKeys) await uploadSingle(slug);
  };

  const getSelectFileButtonLabel = (slug: DocKey) => {
    const fileState = files[slug];
    if (fileState.status === "uploaded") return "Change file";
    return "Select file";
  };

  const getIsFileImageOrPdf = (slug: DocKey) => {
    let isPdf = false;
    const fileState = files[slug];
    if (fileState.file) {
      isPdf = fileState.file.type === "application/pdf";
    } else if (fileState.previewUrl) {
      isPdf = fileState.previewUrl.endsWith(".pdf");
    }
    return isPdf;
  };
  if (isLoading)
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  if (!shop) return null;
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {user && !shopId && (
        <Alert color="warning" className="mb-4  ">
          <div className="flex flex-col">
            <span className="text-sm">
              You need to create a shop before uploading onboarding documents.
              Please go to the vendor onboarding page to create your shop.
            </span>
            <Link
              href="/vendor-onboarding"
              className="font-semibold mt-2 bg-primary text-white p-2 rounded-md text-sm w-fit flex items-center justify-center"
            >
              Vendor Onboarding
            </Link>
          </div>
        </Alert>
      )}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 className="text-lg font-semibold text-white">
          Upload Onboarding Documents
        </h3>
        <div className="text-sm text-gray-300">
          <span className="font-medium text-white">{uploadedCount}</span> /{" "}
          {totalDocs} uploaded
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {DOCS.map((doc) => {
          const s = files[doc.slug];

          const isReady = s.status === "ready";
          const disable =
            !editable ||
            isUploading ||
            (!isReady && s.status !== "error") ||
            !s.file;

          return (
            <div
              key={doc.slug}
              className="bg-white/5 rounded-xl p-4 flex flex-col gap-3 backdrop-blur-sm shadow-sm hover:bg-white/10 transition"
            >
              <div className="flex flex-col">
                <span className="flex flex-col items-center gap-2">
                  {" "}
                  <p className="text-sm font-semibold text-info">
                    {doc.label}
                  </p>{" "}
                </span>
                {doc.hint && (
                  <Alert color="info" className="mt-1 p-1 py-0.5">
                    <span className="flex flex-col">
                      <p className="text-xs text-gray-400">Examples include:</p>
                      <p className="text-xs text-gray-400">{doc.hint}</p>
                    </span>
                  </Alert>
                )}
                <span className="text-xs text-gray-400  justify-start flex">
                  {s.status === "uploaded"
                    ? "✅ Uploaded"
                    : s.status === "uploading"
                    ? "⏳ Uploading"
                    : isReady
                    ? "🖼️ Ready"
                    : s.status === "error"
                    ? "⚠️ Error"
                    : ""}
                </span>
              </div>

              {/* Image Container */}
              <div className="flex flex-col gap-2 flex-grow">
                <div className="relative w-full aspect-square bg-white/5 border border-white/10 rounded-md overflow-hidden flex items-center justify-center">
                  {s.previewUrl ? (
                    <>
                      {getIsFileImageOrPdf(doc.slug) ? (
                        <iframe
                          src={s.previewUrl}
                          title={doc.label}
                          className="w-full h-full "
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <Image
                          src={s.previewUrl}
                          alt={doc.label}
                          fill
                          className="object-contain cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => window.open(s.previewUrl!, "_blank")}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                    </>
                  ) : (
                    <div className="text-sm text-gray-500">
                      No file selected
                    </div>
                  )}
                </div>
                <div className="w-full bg-white/10 rounded-full h-[2rem]">
                  {(s.status === "uploading" || s.status === "uploaded") && (
                    <div
                      className="h-2 rounded-full bg-emerald-400 transition-all"
                      style={{ width: `${s.progress}%` }}
                    />
                  )}
                </div>
                {s.error && (
                  <div className="text-xs text-red-400">{s.error}</div>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <label
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                    editable
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-gray-700/30 cursor-not-allowed text-gray-400"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      handleFileSelect(doc.slug, file || null);
                      e.currentTarget.value = "";
                    }}
                    disabled={!editable}
                  />
                  {getSelectFileButtonLabel(doc.slug)}
                </label>

                <button
                  className="px-3 py-2 rounded-md bg-white/5 text-sm text-white/80 hover:bg-white/10 transition disabled:opacity-40"
                  onClick={() => handleClearSelection(doc.slug)}
                  disabled={!editable}
                >
                  Clear
                </button>

                <button
                  className={`ml-auto px-3 py-2 rounded-md text-sm font-semibold ${
                    !disable
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : "bg-white/5 text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => uploadSingle(doc.slug)}
                  disabled={disable}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex-col md:flex-row gap-2  items-center flex justify-center md:justify-start flex">
        <button
          className={`px-5 py-2 rounded-md font-semibold w-[9rem] text-sm  ${
            editable
              ? "bg-emerald-500 hover:bg-emerald-600 text-white"
              : "bg-white/5 text-gray-400 cursor-not-allowed"
          }`}
          onClick={uploadAllReady}
          disabled={!editable || isUploading}
        >
          Upload All
        </button>
        <Link
          href={isVendorOnboarding ? "/vendor-onboarding" : "/shop"}
          className={`px-5 py-2 rounded-md font-semibold bg-primary text-white hover:bg-primary/90 w-[9rem]  text-center text-sm `}
        >
          Finish
        </Link>
      </div>

      <p className="mt-4 text-xs text-gray-400 text-center sm:text-left">
        Files must be images or pdf (PNG/JPEG/WEBP, PDF), max 1.5 MB each. You
        can upload them in any order. Editing is only available until your shop
        has been verified.
      </p>
    </div>
  );
};

export default VendorDocsUploader;
