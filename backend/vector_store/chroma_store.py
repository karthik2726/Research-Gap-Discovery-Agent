import chromadb
from chromadb.config import Settings
import os

CHROMA_PERSIST_DIR = os.getenv("CHROMA_PERSIST_DIR", "./vector_store/chromadb_data")

class VectorStore:
    def __init__(self):
        self.client = chromadb.PersistentClient(path=CHROMA_PERSIST_DIR)
        self.collection = self.client.get_or_create_collection(
            name="research_papers",
            metadata={"hnsw:space": "cosine"}
        )
        
    def add_documents(self, documents: list[str], metadatas: list[dict], ids: list[str]):
        """Adds documents to the collection. Assumes embeddings are generated internally by Chroma or via langchain."""
        self.collection.add(
            documents=documents,
            metadatas=metadatas,
            ids=ids
        )
        
    def search(self, query_text: str, n_results: int = 5):
        """Searches the vector store for relevant chunks."""
        results = self.collection.query(
            query_texts=[query_text],
            n_results=n_results
        )
        return results

# Singleton instance
vector_store = VectorStore()
