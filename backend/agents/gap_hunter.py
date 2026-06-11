from core.llm import get_llm
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from typing import List, Dict, Any
from agents.state import AgentState

class Gap(BaseModel):
    title: str = Field(description="Short title for the gap")
    description: str = Field(description="Detailed description of the missing research or opportunity")
    potential_impact: str = Field(description="High, Medium, or Low")
    difficulty_score: float = Field(description="Score from 1.0 to 10.0 indicating difficulty")

class GapReport(BaseModel):
    gaps: List[Gap] = Field(description="List of top 10 research gaps")

def gap_hunter_node(state: AgentState) -> Dict[str, Any]:
    llm = get_llm()
    parser = JsonOutputParser(pydantic_object=GapReport)
    
    context = ""
    for filename, analysis in state.get("paper_analyses", {}).items():
        context += f"Paper: {analysis.get('title', 'Unknown')}\nMethodology: {analysis.get('methodology', '')}\nLimitations: {analysis.get('limitations', '')}\n\n"
        
    prompt = PromptTemplate(
        template="You are a Research Gap Hunter.\n"
                 "Analyze the following methodologies and limitations from a set of research papers.\n"
                 "Identify up to 10 major research gaps (unexplored directions, weakly explored areas, cross-domain opportunities).\n"
                 "{format_instructions}\n\n"
                 "Context:\n{context}\n",
        input_variables=["context"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    
    chain = prompt | llm | parser
    
    try:
        res = chain.invoke({"context": context[:30000]})
        return {"research_gaps": res.get("gaps", [])}
    except Exception as e:
        print(f"Error hunting gaps: {e}")
        return {"research_gaps": []}
