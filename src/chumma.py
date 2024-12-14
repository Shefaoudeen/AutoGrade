from fastapi import FastAPI, File, Form, UploadFile
from pydantic import BaseModel
from typing import Optional
import os

app = FastAPI()

# Directory where files will be saved
UPLOAD_DIR = "./uploads"

# Create the uploads directory if it doesn't exist
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Endpoint to handle the assignment creation
@app.post("/professor/postAssignment")
async def create_assignment(
    p_id: int = Form(...),
    title: str = Form(...),
    deadline: str = Form(...),
    total_marks: int = Form(...),
    technical_setting: bool = Form(...),
    grammer_setting: bool = Form(...),
    spelling_setting: bool = Form(...),
    status: str = Form(...),
    question_path: UploadFile = File(...),
    key_path: UploadFile = File(...),
):
    # Save the uploaded files
    question_file_path = os.path.join(UPLOAD_DIR, f"question_{p_id}.pdf")
    key_file_path = os.path.join(UPLOAD_DIR, f"key_{p_id}.pdf")

    with open(question_file_path, "wb") as f:
        f.write(await question_path.read())

    with open(key_file_path, "wb") as f:
        f.write(await key_path.read())

    # Log the received data
    assignment_data = {
        "p_id": p_id,
        "title": title,
        "deadline": deadline,
        "total_marks": total_marks,
        "technical_setting": technical_setting,
        "grammer_setting": grammer_setting,
        "spelling_setting": spelling_setting,
        "status": status,
        "question_path": question_file_path,
        "key_path": key_file_path,
    }

    # You can now insert the assignment_data into your database here (not implemented in this example).

    return {"message": "Assignment created successfully!", "data": assignment_data}

# Start the FastAPI application with the command:
# uvicorn main:app --reload
