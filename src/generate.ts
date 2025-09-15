import { SimpleDirectoryReader } from "@llamaindex/readers/directory";
import "dotenv/config";
import { storageContextFromDefaults, VectorStoreIndex } from "llamaindex";
import { initSettings } from "./app/settings";

async function generateDatasource() {
  console.log(`Generating storage context...`);
  // Split documents, create embeddings and store them in the storage context
  const storageContext = await storageContextFromDefaults({
    persistDir: "storage",
  });
  // load documents from current directory into an index
  const reader = new SimpleDirectoryReader();
  const allDocuments = await reader.loadData("data");

  // Filter out image files that cannot be embedded by the current vector store
  const documents = allDocuments.filter((doc: any) => {
    const filePath =
      (doc?.metadata && (doc.metadata.file_path || doc.metadata.filePath)) ||
      doc?.id_ ||
      "";
    const lower = String(filePath).toLowerCase();
    return !/(\.png|\.jpe?g|\.gif|\.bmp|\.webp|\.svg)$/i.test(lower);
  });

  await VectorStoreIndex.fromDocuments(documents, {
    storageContext,
  });
  console.log("Storage context successfully generated.");
}

(async () => {
  const args = process.argv.slice(2);
  const command = args[0];

  initSettings();

  if (command === "ui") {
    console.error("This project doesn't use any custom UI.");
    return;
  } else {
    if (command !== "datasource") {
      console.error(
        `Unrecognized command: ${command}. Generating datasource by default.`,
      );
    }
    await generateDatasource();
  }
})();
