FROM python:3.10

WORKDIR /app

COPY . /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD ["uvicorn", "run_batch_analysis:app", "--host", "0.0.0.0", "--port", "7860"]
