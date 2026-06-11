from sqlalchemy import Column, Integer, String, Float, Text, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class Paper(Base):
    __tablename__ = "papers"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    upload_time = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Extracted data
    title = Column(String, nullable=True)
    abstract = Column(Text, nullable=True)
    methodology = Column(Text, nullable=True)
    datasets = Column(JSON, nullable=True)
    results = Column(Text, nullable=True)
    limitations = Column(Text, nullable=True)
    references = Column(JSON, nullable=True)
    
    # Audit Scores
    reliability_score = Column(Float, nullable=True)
    humanization_score = Column(Float, nullable=True)
    
class ResearchGap(Base):
    __tablename__ = "research_gaps"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    potential_impact = Column(String)
    difficulty_score = Column(Float)

class ProjectIdea(Base):
    __tablename__ = "project_ideas"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    innovation_score = Column(Float)
    difficulty = Column(String)
    tech_stack = Column(JSON)
    implementation_plan = Column(Text)
    
class TopicCluster(Base):
    __tablename__ = "topic_clusters"
    
    id = Column(Integer, primary_key=True, index=True)
    cluster_name = Column(String)
    themes = Column(JSON)
    paper_ids = Column(JSON) # List of paper IDs in this cluster
