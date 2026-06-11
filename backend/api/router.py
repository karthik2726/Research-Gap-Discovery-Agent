from fastapi import APIRouter, UploadFile, File, BackgroundTasks, Depends
from sqlalchemy.orm import Session
from typing import List
import os
import shutil
from database.session import get_db
from database.models import Paper, TopicCluster, ResearchGap, ProjectIdea
from tools.pdf_processor import extract_text_from_pdf, chunk_text
from vector_store.chroma_store import vector_store
from agents.graph import research_graph
from agents.state import AgentState

router = APIRouter()

UPLOAD_DIR = "./uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# In-memory store for task status (in a real app, use Redis/Celery)
tasks_status = {}
tasks_results = {}

def process_papers_background(task_id: str, file_paths: List[str], db: Session):
    try:
        tasks_status[task_id] = "Processing PDFs"
        paper_texts = {}
        for path in file_paths:
            filename = os.path.basename(path)
            text = extract_text_from_pdf(path)
            paper_texts[filename] = text
            
            # Save to DB
            db_paper = Paper(filename=filename, title=filename)
            db.add(db_paper)
            db.commit()
            db.refresh(db_paper)
            
            # Add to Vector Store
            chunks = chunk_text(text)
            metadatas = [{"source": filename, "paper_id": db_paper.id} for _ in chunks]
            ids = [f"{filename}_{i}" for i in range(len(chunks))]
            vector_store.add_documents(documents=chunks, metadatas=metadatas, ids=ids)
            
        tasks_status[task_id] = "Running Agentic Workflow"
        
        # Initialize LangGraph State
        initial_state = AgentState(
            paper_files=file_paths,
            paper_texts=paper_texts,
            paper_analyses={},
            topic_clusters=[],
            research_landscape="",
            research_gaps=[],
            project_ideas=[],
            quality_audits={},
            writing_evaluations={},
            master_report="",
            current_step="start"
        )
        
        # Run Graph
        final_state = research_graph.invoke(initial_state)
        
        tasks_results[task_id] = final_state
        tasks_status[task_id] = "Completed"
        
    except Exception as e:
        tasks_status[task_id] = f"Error: {str(e)}"
        print(f"Workflow error: {e}")

@router.post("/upload")
async def upload_papers(background_tasks: BackgroundTasks, db: Session = Depends(get_db), files: List[UploadFile] = File(...)):
    file_paths = []
    for file in files:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        file_paths.append(file_path)
        
    import uuid
    task_id = str(uuid.uuid4())
    tasks_status[task_id] = "Pending"
    
    background_tasks.add_task(process_papers_background, task_id, file_paths, db)
    
    return {"message": "Files uploaded and processing started", "task_id": task_id}

@router.get("/status/{task_id}")
async def get_status(task_id: str):
    return {"status": tasks_status.get(task_id, "Unknown")}

@router.get("/results/{task_id}")
async def get_results(task_id: str):
    if task_id in tasks_results:
        return tasks_results[task_id]
    return {"error": "Results not ready or task not found."}

@router.get("/search")
async def search_papers(query: str, n_results: int = 5):
    results = vector_store.search(query, n_results)
    return {"results": results}
