from core.llm import get_llm
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from typing import List, Dict, Any
from agents.state import AgentState
import json

class Cluster(BaseModel):
    cluster_name: str = Field(description="Name of the topic cluster")
    themes: List[str] = Field(description="Major themes in this cluster")
    paper_filenames: List[str] = Field(description="List of filenames belonging to this cluster")

class DomainMap(BaseModel):
    clusters: List[Cluster] = Field(description="List of identified clusters")
    research_landscape: str = Field(description="A 2-paragraph summary of the overall research landscape")

def mapper_node(state: AgentState) -> Dict[str, Any]:
    if not state.get("paper_analyses"):
        return {"topic_clusters": [], "research_landscape": "No data available"}
        
    llm = get_llm()
    parser = JsonOutputParser(pydantic_object=DomainMap)
    
    # Prepare summary of all papers
    papers_summary = ""
    for filename, analysis in state["paper_analyses"].items():
        papers_summary += f"Filename: {filename}\nTitle: {analysis.get('title')}\nAbstract: {analysis.get('abstract')}\n\n"
        
    prompt = PromptTemplate(
        template="You are a Research Domain Mapper.\n"
                 "Analyze the following list of research papers and group them into logical topic clusters.\n"
                 "Identify major themes and generate a research landscape summary.\n"
                 "{format_instructions}\n\n"
                 "Papers:\n{papers}\n",
        input_variables=["papers"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    
    chain = prompt | llm | parser
    
    try:
        res = chain.invoke({"papers": papers_summary})
        return {
            "topic_clusters": res.get("clusters", []),
            "research_landscape": res.get("research_landscape", "")
        }
    except Exception as e:
        print(f"Error mapping domains: {e}")
        return {
            "topic_clusters": [],
            "research_landscape": "Error generating research landscape."
        }
