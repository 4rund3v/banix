from src.models import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class Category(Base):

    __tablename__ = "categories"

    category_id = Column(Integer, primary_key=True, autoincrement=True)
    category_name = Column(String, nullable=False)
    category_slug = Column(String, nullable=False)

    def __repr__(self):
        return f"<Category(category_name={self.category_name}, category_slug={self.category_slug})>"

    def to_dict(self):
        return dict(category_id=str(self.category_id),
                    category_name=str(self.category_name),
                    category_slug=str(self.category_slug)
                    )
