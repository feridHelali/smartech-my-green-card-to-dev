# MERN Stack Cheat Sheet

## Stack Overview
```
Browser (React)  ──HTTP/JSON──►  Express API (Node.js)  ──Mongoose──►  MongoDB
     ▲                                                                        │
     └─────────────────── JSON Response ────────────────────────────────────┘
```

## MongoDB (Document DB)
```js
// Connect
mongoose.connect('mongodb://localhost:27017/mydb')

// Schema + Model
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
})
const User = mongoose.model('User', userSchema)

// CRUD
await User.create({ email: 'a@b.com', name: 'Alice' })
await User.find({ role: 'admin' })
await User.findById(id)
await User.findByIdAndUpdate(id, { name: 'Bob' }, { new: true })
await User.findByIdAndDelete(id)

// Query operators
User.find({ age: { $gte: 18, $lt: 65 } })
User.find({ tags: { $in: ['js', 'python'] } })
User.find({ $or: [{ role: 'admin' }, { verified: true }] })

// Aggregation
User.aggregate([
  { $match: { role: 'admin' } },
  { $group: { _id: '$role', count: { $sum: 1 } } }
])
```

## Express (REST API)
```js
import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'

const app = express()
app.use(cors())
app.use(json())

// Route with middleware
app.get('/users', authenticate, async (req, res) => {
  const users = await User.find()
  res.json(users)
})

app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Router pattern
const router = express.Router()
router.get('/', listUsers)
router.post('/', createUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
app.use('/users', router)

app.listen(3000)
```

## JWT Authentication Pattern
```js
import jwt from 'jsonwebtoken'

// Sign token
const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })

// Verify middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token' })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}
```

## React (Frontend)
```tsx
// Component
const UserCard = ({ user }: { user: User }) => (
  <div className="card">
    <h2>{user.name}</h2>
    <p>{user.email}</p>
  </div>
)

// State
const [count, setCount] = useState(0)

// Side effect
useEffect(() => {
  fetchUsers().then(setUsers)
}, []) // [] = run once on mount

// Context (global state)
const AuthContext = createContext<AuthState | null>(null)
const useAuth = () => useContext(AuthContext)!
```

## TanStack Query (data fetching)
```tsx
// Query (GET)
const { data: users, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(r => r.json())
})

// Mutation (POST/PUT/DELETE)
const mutation = useMutation({
  mutationFn: (newUser) => fetch('/api/users', { method: 'POST', body: JSON.stringify(newUser) }),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
})
```

## React Router v6
```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/users" element={<Users />} />
    <Route path="/users/:id" element={<UserDetail />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>

// Navigation
const navigate = useNavigate()
navigate('/users/42')

// Params
const { id } = useParams()

// Link
<Link to="/users">Users</Link>
```

## Environment Files
```bash
# backend/.env
PORT=9000
MONGODB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=supersecretkey
MASTER_KEY=masterkey123

# webapp/.env
VITE_API_URL=http://localhost:9000
```

## Project Structure (MERN)
```
backend/
  src/
    models/        # Mongoose schemas
    routes/        # Express routers
    controllers/   # Business logic
    middleware/    # Auth, validation, errors
    services/      # DB, email, external APIs
  index.js

webapp/
  src/
    components/   # Reusable UI
    pages/        # Route-level components
    hooks/        # Custom React hooks
    api/          # Fetch/axios wrappers
    store/        # Global state (Context/Zustand)
  main.tsx
  App.tsx
```
