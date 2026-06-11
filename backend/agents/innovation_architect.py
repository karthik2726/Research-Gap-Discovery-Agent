from core.llm import get_llm
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from typing import List, Dict, Any
from agents.state import AgentState
import json

class Idea(BaseModel):
    title: str = Field(description="Title of the project or startup idea")
    description: str = Field(description="Description of the idea based on the research gap")
    innovation_score: float = Field(description="Score from 1.0 to 10.0 indicating novelty")
    difficulty: str = Field(description="Easy, Medium, Hard, or Expert")
    tech_stack: List[str] = Field(description="Proposed technology stack")
    implementation_plan: str = Field(description="Brief step-by-step implementation plan")

class IdeaList(BaseModel):
    ideas: List[Idea] = Field(description="List of top 20 ideas based on the gaps")

def innovation_architect_node(state: AgentState) -> Dict[str, Any]:
    llm = get_llm()
    parser = JsonOutputParser(pydantic_object=IdeaList)
    
    gaps_summary = json.dumps(state.get("research_gaps", []), indent=2)
    
    prompt = PromptTemplate(
        template="You are an Innovation Architect.\n"
                 "Use the following research gaps to generate novel project ideas, startup ideas, or publication ideas.\n"
                 "Generate up to 20 highly innovative ideas.\n"
                 "{format_instructions}\n\n"
                 "Research Gaps:\n{gaps}\n",
        input_variables=["gaps"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    
    chain = prompt | llm | parser
    
    try:
        res = chain.invoke({"gaps": gaps_summary[:30000]})
        return {"project_ideas": res.get("ideas", [])}
    except Exception as e:
        print(f"Error architecting ideas: {e}")
        return {"project_ideas": []}
