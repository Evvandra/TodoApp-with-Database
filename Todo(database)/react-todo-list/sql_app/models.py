from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    username = Column(String)
    hashed_password = Column(String)
    profileURL = Column(String)

    items = relationship("Item", back_populates="owner")


class Item(Base):
    __tablename__ = "Todos"

    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    completed = Column(Boolean)
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="items")