from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from models.user import User
from models.lesson import Lesson
from models.result import Result
from models.parent_student import ParentStudent
from models.lesson_note import LessonNote
from models.finance import Finance
from models.payment import Payment

from routes.users import router as users_router
from routes.lms import router as lms_router
from routes.results import router as results_router
from routes.lesson_notes import router as lesson_notes_router
from routes.reports import router as reports_router
from routes.finance import router as finance_router
from routes.parent_student import router as parent_student_router
from routes.payments import router as payments_router

app = FastAPI(
    title="Calmbridge School API"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://16.192.149.100"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)


app.include_router(users_router)
app.include_router(lms_router)
app.include_router(results_router)
app.include_router(lesson_notes_router)
app.include_router(reports_router)
app.include_router(finance_router)
app.include_router(parent_student_router)
app.include_router(payments_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to Calmbridge School API"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }