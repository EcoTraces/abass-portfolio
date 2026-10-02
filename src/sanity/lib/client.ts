import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION || "2024-01-01";

export const sanityConfig = {
  projectId: projectId || "",
  dataset: dataset || "production",
  apiVersion,
  useCdn: false,
};

export const hasSanityConfig = Boolean(projectId && dataset);

type ReadClient = {
  fetch: <T = unknown>(query: string) => Promise<T>;
};

type WriteClient = {
  createOrReplace: <T>(document: T) => Promise<T>;
  assets: {
    upload: (...args: any[]) => Promise<{ _id: string; _type: string }>;
  };
};

export const readClient: ReadClient = hasSanityConfig
  ? createClient({
      ...sanityConfig,
      token: process.env.SANITY_API_READ_TOKEN,
    })
  : {
      fetch: async <T = unknown>(_query: string): Promise<T> => Promise.resolve(undefined as T),
    };

export const writeClient: WriteClient = hasSanityConfig
  ? createClient({
      ...sanityConfig,
      token: process.env.SANITY_WRITE_TOKEN,
      useCdn: false,
    })
  : {
      createOrReplace: async <T>(document: T): Promise<T> => document,
      assets: {
        upload: async (..._args: any[]) => ({ _id: "placeholder", _type: "sanity.imageAsset" }),
      },
    };
