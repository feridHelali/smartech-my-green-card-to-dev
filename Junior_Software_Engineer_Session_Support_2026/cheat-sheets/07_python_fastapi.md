# Python / FastAPI / PostgreSQL Cheat Sheet

## FastAPI App Skeleton
```python
from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession

app = FastAPI(title="My API", version="1.0.0")

# Pydantic schemas (validation + serialization)
class UserCreate(BaseModel):
    email: EmailStr
    name: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    class Config:
        from_attributes = True  # ORM mode

@app.get("/users", response_model=list[UserResponse])
async def list_users(db: AsyncSession = Depends(get_db)):
    users = await db.execute(select(User))
    return users.scalars().all()

@app.post("/users", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(payload: UserCreate, db: AsyncSession = Depends(get_db)):
    user = User(**payload.dict())
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: AsyncSession = Depends(get_db)):
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
```

## SQLAlchemy ORM (async)
```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, DateTime, func

DATABASE_URL = "postgresql+asyncpg://user:pass@localhost/db"
engine = create_async_engine(DATABASE_URL, echo=True)

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(100))
    created_at: Mapped[DateTime] = mapped_column(server_default=func.now())

# Dependency
async def get_db():
    async with AsyncSession(engine) as session:
        yield session

# Queries
from sqlalchemy import select, update, delete

stmt = select(User).where(User.email == "a@b.com")
result = await db.execute(stmt)
user = result.scalar_one_or_none()
```

## Alembic Migrations
```bash
alembic init alembic
alembic revision --autogenerate -m "add users table"
alembic upgrade head
alembic downgrade -1
alembic history
```

## Authentication (JWT)
```python
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta

pwd_context = CryptContext(schemes=["bcrypt"])
SECRET_KEY = "secret"
ALGORITHM = "HS256"

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_token(data: dict, expires_delta: timedelta = timedelta(days=7)) -> str:
    payload = {**data, "exp": datetime.utcnow() + expires_delta}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# Dependency for protected routes
async def current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = await db.get(User, int(payload["sub"]))
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    if not user:
        raise HTTPException(status_code=401)
    return user
```

## Python Essentials for Backend
```python
# List comprehension
squares = [x**2 for x in range(10) if x % 2 == 0]

# Dict comprehension
user_map = {u.id: u.name for u in users}

# f-strings
greeting = f"Hello, {user.name}! You have {len(messages)} messages."

# Dataclasses (lightweight models)
from dataclasses import dataclass
@dataclass
class Point:
    x: float
    y: float

# Context managers
with open("file.txt") as f:
    content = f.read()

# Async/await
import asyncio
async def fetch_all(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        return await asyncio.gather(*tasks)

# Type hints
def process(items: list[str], limit: int = 10) -> dict[str, int]:
    return {item: len(item) for item in items[:limit]}
```

## PostgreSQL Essentials
```sql
-- Create table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- CRUD
INSERT INTO users (email, name) VALUES ('a@b.com', 'Alice');
SELECT * FROM users WHERE role = 'admin' ORDER BY name LIMIT 20 OFFSET 40;
UPDATE users SET name = 'Bob' WHERE id = 1;
DELETE FROM users WHERE id = 1;

-- Joins
SELECT u.name, p.title
FROM users u
JOIN posts p ON p.user_id = u.id
WHERE u.role = 'admin';

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_user ON posts(user_id);

-- Transactions
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;  -- or ROLLBACK on error
```

## Project Structure
```
backend/
  app/
    main.py          # FastAPI app + router includes
    core/
      config.py      # pydantic-settings env vars
      security.py    # JWT, password hashing
    db/
      base.py        # SQLAlchemy Base
      session.py     # engine + get_db
      models.py      # ORM models
    schemas/         # Pydantic request/response models
    routers/         # APIRouter per resource
    services/        # Business logic
  alembic/           # migrations
  tests/
    conftest.py      # fixtures
    test_users.py
  .env
  requirements.txt
```
